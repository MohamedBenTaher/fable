import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSubscriptionByUserId(userId: number) {
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  return subscription;
}

export async function isUserSubscribed(userId: number): Promise<boolean> {
  const subscription = await getSubscriptionByUserId(userId);

  if (!subscription) return false;

  const now = new Date();
  const isActive =
    subscription.status === "active" ||
    (subscription.status === "cancelled" &&
      subscription.currentPeriodEnd > now);

  return isActive;
}

export async function getUserPlan(userId: number): Promise<string> {
  const subscription = await getSubscriptionByUserId(userId);

  if (!subscription || subscription.status !== "active") {
    return "free";
  }

  return subscription.planName;
}
