"use client";

import { useState, useEffect } from "react";
import { Check, Star, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getCurrentUserAction } from "@/lib/session-actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { env } from "@/env";

const pricingTiers = [
  {
    name: "Free",
    price: 0,
    priceId: null,
    description: "Perfect for getting started",
    features: [
      "5 PDF uploads per month",
      "Basic AI responses",
      "Standard support",
      "1 conversation per document",
      "Basic export options",
    ],
    limitations: [
      "Limited to 5 pages per PDF",
      "Basic AI model",
      "No priority support",
    ],
    popular: false,
    buttonText: "Get Started",
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Pro",
    price: 19,
    priceId: env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID,
    description: "Best for professionals and teams",
    features: [
      "Unlimited PDF uploads",
      "Advanced AI responses",
      "Priority support",
      "Unlimited conversations",
      "Advanced export options",
      "Document collaboration",
      "Custom AI prompts",
      "Analytics dashboard",
    ],
    popular: true,
    buttonText: "Upgrade to Pro",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Enterprise",
    price: 49,
    priceId: env.NEXT_PUBLIC_PADDLE_ENTERPRISE_PRICE_ID,
    description: "For large teams and organizations",
    features: [
      "Everything in Pro",
      "Advanced analytics",
      "Team management",
      "SSO integration",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom AI training",
    ],
    popular: false,
    buttonText: "Contact Sales",
    gradient: "from-purple-500 to-pink-600",
  },
];

interface PaddleEvent {
  name: string;
  data?: Record<string, unknown>;
}

// Remove this block if a similar Window interface augmentation exists elsewhere in your codebase (e.g., in paddle-provider.tsx).
// Only one augmentation of Window with Paddle: PaddleSDK should exist in your project.

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [paddleLoaded, setPaddleLoaded] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Load Paddle script
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if Paddle is already loaded
      if (window.Paddle) {
        setPaddleLoaded(true);
        return;
      }

      const loadPaddle = async () => {
        try {
          // Load Paddle script
          const script = document.createElement("script");
          script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
          script.async = true;
          script.defer = true;

          const scriptLoadPromise = new Promise((resolve, reject) => {
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Failed to load Paddle"));
          });

          document.head.appendChild(script);
          await scriptLoadPromise;

          if (window.Paddle) {
            try {
              // Set environment first
              await window.Paddle.Environment.set(
                env.NEXT_PUBLIC_PADDLE_ENVIRONMENT
              );

              // Initialize Paddle
              await window.Paddle.Initialize({
                token:
                  env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ||
                  env.NEXT_PUBLIC_PADDLE_VENDOR_ID,
                eventCallback: (data: PaddleEvent) => {
                  console.log("Paddle event:", data);
                  if (data.name === "checkout.completed") {
                    toast({
                      title: "Success!",
                      description: "Your subscription has been activated.",
                    });
                    router.push("/dashboard");
                  }
                },
              });

              setPaddleLoaded(true);
              console.log("Paddle initialized successfully");
            } catch (error) {
              console.error("Failed to initialize Paddle:", error);
              setPaddleLoaded(false);
            }
          }
        } catch (error) {
          console.error("Failed to load Paddle:", error);
          setPaddleLoaded(false);
        }
      };

      loadPaddle();

      return () => {
        // Cleanup
        const existingScripts = document.querySelectorAll(
          'script[src*="paddle"]'
        );
        existingScripts.forEach((script) => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
      };
    }
  }, [router, toast]);

  const handleSubscribe = async (priceId: string | null, tierName: string) => {
    if (!priceId) {
      router.push("/sign-up");
      return;
    }

    if (tierName === "Enterprise") {
      // Handle enterprise contact
      window.location.href =
        "mailto:enterprise@fable.com?subject=Enterprise Plan Inquiry";
      return;
    }

    setIsLoading(priceId);

    try {
      const user = await getCurrentUserAction();

      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to subscribe to a plan.",
        });
        router.push("/sign-in");
        return;
      }

      // Check if Paddle is loaded
      if (!paddleLoaded || !window.Paddle) {
        toast({
          title: "Payment system unavailable",
          description:
            "The payment system is currently unavailable. Please try again later or contact support.",
          variant: "destructive",
        });
        setIsLoading(null);
        return;
      }

      try {
        // Open Paddle checkout using v2 API with correct structure
        await window.Paddle.Checkout.open({
          items: [
            {
              priceId: priceId,
              quantity: 1,
            },
          ],
          customer: {
            email: user.email,
          },
          customData: {
            userId: user.id.toString(),
          },
          settings: {
            displayMode: "overlay",
            theme: "light",
            locale: "en",
          },
        });
      } catch (checkoutError) {
        console.error("Checkout error:", checkoutError);
        toast({
          title: "Checkout Error",
          description: "Failed to open checkout. Please try again.",
          variant: "destructive",
        });
      }

      setIsLoading(null);
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "Failed to start subscription process. Please try again.",
        variant: "destructive",
      });
      setIsLoading(null);
    }
  };

  const getDiscountedPrice = (price: number) => {
    return billingCycle === "yearly" ? Math.round(price * 0.8) : price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800">
            <Star className="w-3 h-3 mr-1" />
            Simple, transparent pricing
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core
            features with advanced capabilities in higher tiers.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span
              className={cn(
                "text-sm",
                billingCycle === "monthly"
                  ? "text-gray-900 dark:text-gray-100 font-medium"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                billingCycle === "yearly"
                  ? "bg-blue-600"
                  : "bg-gray-200 dark:bg-gray-700"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm",
                billingCycle === "yearly"
                  ? "text-gray-900 dark:text-gray-100 font-medium"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-2xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                tier.popular
                  ? "ring-2 ring-blue-500 shadow-xl scale-105"
                  : "hover:shadow-lg"
              )}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              )}

              <CardHeader className="text-center pb-4">
                {tier.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}

                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {tier.name}
                </CardTitle>

                <div className="mb-4">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      ${tier.price === 0 ? 0 : getDiscountedPrice(tier.price)}
                    </span>
                    {tier.price > 0 && (
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                  {billingCycle === "yearly" && tier.price > 0 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className="line-through">${tier.price}</span>
                      <span className="text-green-600 dark:text-green-400 ml-1">
                        Save 20%
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300">
                  {tier.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                          `bg-gradient-to-r ${tier.gradient}`
                        )}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() =>
                    handleSubscribe(tier.priceId ?? null, tier.name)
                  }
                  disabled={isLoading === tier.priceId}
                  className={cn(
                    "w-full py-3 rounded-lg font-semibold transition-all duration-200",
                    tier.popular
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                      : tier.name === "Enterprise"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        : "bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600"
                  )}
                >
                  {isLoading === tier.priceId ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{tier.buttonText}</span>
                      {tier.name !== "Free" && (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </Button>

                {tier.name === "Free" && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                    No credit card required
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Can I upgrade or downgrade anytime?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Yes, you can change your plan at any time. Changes take effect
                immediately and we&apos;ll prorate your billing accordingly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We accept all major credit cards, PayPal, and bank transfers for
                enterprise customers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Our Free plan lets you explore Fable&apos;s core features. Pro
                and Enterprise plans come with a 14-day money-back guarantee.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Do you offer discounts for students or nonprofits?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Yes! We offer special pricing for educational institutions and
                nonprofits. Contact us for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
