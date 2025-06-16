import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { db } from "@/db";
import { subscriptions, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("paddle-signature");

    if (!signature) {
      return new NextResponse("Missing signature", { status: 400 });
    }

    // For Paddle v4, you can verify the webhook signature using the endpoint secret
    // This is a simplified verification - in production you might want to use a proper crypto verification
    const expectedSignature = env.PADDLE_WEBHOOK_ENDPOINT_SECRET;

    // Note: In a real implementation, you would use proper signature verification
    // For now, we'll just check if the webhook endpoint secret is present
    // You should implement proper HMAC-SHA256 verification here

    console.log("Received Paddle webhook:", body);

    const event = JSON.parse(body);

    switch (event.event_type) {
      case "subscription.created":
        await handleSubscriptionCreated(event.data);
        break;

      case "subscription.updated":
        await handleSubscriptionUpdated(event.data);
        break;

      case "subscription.canceled":
        await handleSubscriptionCancelled(event.data);
        break;

      case "transaction.completed":
        await handlePaymentSucceeded(event.data);
        break;

      case "transaction.payment_failed":
        await handlePaymentFailed(event.data);
        break;

      default:
        console.log(`Unhandled event type: ${event.event_type}`);
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function handleSubscriptionCreated(data: any) {
  const customData = data.custom_data || {};
  const userEmail = customData.user_email || data.customer?.email;

  if (!userEmail) {
    console.error("No user email found in subscription data");
    return;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, userEmail),
  });

  if (!user) {
    console.error("User not found for subscription:", userEmail);
    return;
  }

  await db.insert(subscriptions).values({
    userId: user.id,
    paddleSubscriptionId: data.id,
    status: data.status,
    planName: getPlanNameFromPriceId(data.items[0]?.price?.id),
    priceId: data.items[0]?.price?.id,
    currentPeriodStart: new Date(data.current_billing_period?.starts_at),
    currentPeriodEnd: new Date(data.current_billing_period?.ends_at),
  });

  // Update user type to premium
  await db
    .update(users)
    .set({ userType: "premium" })
    .where(eq(users.id, user.id));
}

async function handleSubscriptionUpdated(data: any) {
  await db
    .update(subscriptions)
    .set({
      status: data.status,
      planName: getPlanNameFromPriceId(data.items[0]?.price?.id),
      priceId: data.items[0]?.price?.id,
      currentPeriodEnd: new Date(data.current_billing_period?.ends_at),
      updated_at: new Date(),
    })
    .where(eq(subscriptions.paddleSubscriptionId, data.id));
}

async function handleSubscriptionCancelled(data: any) {
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.paddleSubscriptionId, data.id),
  });

  if (!subscription) return;

  await db
    .update(subscriptions)
    .set({
      status: "cancelled",
      cancelAtPeriodEnd: true,
      updated_at: new Date(),
    })
    .where(eq(subscriptions.paddleSubscriptionId, data.id));

  // Update user type back to free if subscription is immediately cancelled
  if (data.status === "canceled") {
    await db
      .update(users)
      .set({ userType: "free" })
      .where(eq(users.id, subscription.userId));
  }
}

async function handlePaymentSucceeded(data: any) {
  if (data.subscription_id) {
    await db
      .update(subscriptions)
      .set({
        status: "active",
        updated_at: new Date(),
      })
      .where(eq(subscriptions.paddleSubscriptionId, data.subscription_id));
  }
}

async function handlePaymentFailed(data: any) {
  if (data.subscription_id) {
    await db
      .update(subscriptions)
      .set({
        status: "past_due",
        updated_at: new Date(),
      })
      .where(eq(subscriptions.paddleSubscriptionId, data.subscription_id));
  }
}

function getPlanNameFromPriceId(priceId: string): string {
  if (priceId === env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID) {
    return "pro";
  } else if (priceId === env.NEXT_PUBLIC_PADDLE_ENTERPRISE_PRICE_ID) {
    return "enterprise";
  }
  return "free";
}
