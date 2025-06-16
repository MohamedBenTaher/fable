"use client";

import { useState, useEffect } from "react";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUserAction } from "@/lib/session-actions";

export default function ProfileCompletionBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkProfileCompletion = async () => {
      try {
        // Check if banner was dismissed in this session
        const dismissed = sessionStorage.getItem("profile-banner-dismissed");
        if (dismissed) {
          setIsDismissed(true);
          return;
        }

        const userData = await getCurrentUserAction();
        if (userData) {
          setUser(userData);

          // Fetch profile data
          const profileResponse = await fetch(`/api/profile/${userData.id}`);
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            setProfile(profileData);

            // Show banner if profile is incomplete
            const isProfileIncomplete =
              !profileData.displayName ||
              !profileData.country ||
              !profileData.bio;

            setIsVisible(isProfileIncomplete);
          }
        }
      } catch (error) {
        console.error("Error checking profile completion:", error);
      }
    };

    checkProfileCompletion();
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("profile-banner-dismissed", "true");
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">
                Complete your profile to get the most out of Fable
              </p>
              <p className="text-xs text-blue-100 mt-1">
                Add your name, location, and bio to personalize your experience
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/profile">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-50"
                onClick={handleDismiss}
              >
                Complete Profile
              </Button>
            </Link>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 text-blue-200 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
