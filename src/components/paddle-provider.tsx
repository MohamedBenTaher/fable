"use client";

import { useEffect } from "react";
import { env } from "@/env";

interface PaddleEvent {
  name: string;
  data?: Record<string, unknown>;
}

interface PaddleSDK {
  Environment: {
    set: (environment: string) => Promise<void>;
  };
  Initialize: (config: {
    token: string;
    eventCallback: (data: PaddleEvent) => void;
  }) => Promise<void>;
  Checkout: {
    open: (options: Record<string, unknown>) => Promise<void>;
  };
}

declare global {
  interface Window {
    Paddle: PaddleSDK;
  }
}

export function PaddleProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if Paddle is already loaded
    if (window.Paddle) {
      return;
    }

    const loadPaddle = async () => {
      try {
        // Load Paddle Billing v2 script
        const script = document.createElement("script");
        script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
        script.async = true;
        script.defer = true;

        const scriptLoadPromise = new Promise((resolve, reject) => {
          script.onload = () => {
            console.log("Paddle script loaded successfully");
            resolve(true);
          };

          script.onerror = (error) => {
            console.error("Failed to load Paddle script:", error);
            reject(new Error("Failed to load Paddle script"));
          };
        });

        document.head.appendChild(script);
        await scriptLoadPromise;

        // Initialize Paddle with client-side token
        if (window.Paddle) {
          try {
            // For Paddle Billing v2, use Environment setup
            await window.Paddle.Environment.set(
              env.NEXT_PUBLIC_PADDLE_ENVIRONMENT
            );

            // Initialize with client token (this should be a client-side token, not API key)
            await window.Paddle.Initialize({
              token:
                env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ||
                env.NEXT_PUBLIC_PADDLE_VENDOR_ID,
              eventCallback: (data: PaddleEvent) => {
                console.log("Paddle event:", data);
              },
            });

            console.log("Paddle initialized successfully");
            console.log("Environment:", env.NEXT_PUBLIC_PADDLE_ENVIRONMENT);
          } catch (error) {
            console.error("Failed to initialize Paddle:", error);
          }
        }
      } catch (error) {
        console.error("Error loading Paddle:", error);
      }
    };

    loadPaddle();

    return () => {
      // Cleanup function
      const existingScripts = document.querySelectorAll(
        'script[src*="paddle"]'
      );
      existingScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return <>{children}</>;
}
