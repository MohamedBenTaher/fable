"use client";

import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight, LogOut, User, HelpCircle } from "lucide-react";
import { getCurrentUserAction } from "@/lib/session-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ProfileCompletionBanner from "./profile-completion-banner";
import { ThemeToggle } from "./theme-toggle";

interface User {
  id: number;
  email: string;
}

function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUserAction()
      .then(
        (
          userData:
            | {
                id: number;
                role: string | null;
                email: string;
                emailVerified: Date | null;
                userType: "free" | "premium";
              }
            | null
            | undefined
        ) => {
          console.log("userData", userData);
          if (
            userData &&
            typeof userData.id === "number" &&
            typeof userData.email === "string"
          ) {
            setUser({ id: userData.id, email: userData.email });
          } else {
            setUser(null);
          }
        }
      )
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Profile Completion Banner */}
      {user && <ProfileCompletionBanner />}

      {/* Main Navbar */}
      <div className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur-md transition-all">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
            <Link href="/" className="flex z-40 font-semibold">
              <span className="text-2xl text-gray-900 dark:text-white">
                Fable.
              </span>
            </Link>

            <div className="hidden items-center space-x-4 sm:flex">
              {isLoading ? (
                // Loading skeleton
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"></div>
                </div>
              ) : user ? (
                // Authenticated user menu
                <>
                  <Link
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>

                  <ThemeToggle />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 rounded-full p-0"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={user.email} />
                          <AvatarFallback className="bg-blue-600 text-white text-sm">
                            {getUserInitials(user.email)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium text-sm">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Free Plan
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/help-center" className="cursor-pointer">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Help Center
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                // Unauthenticated user menu
                <>
                  <Link
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                  <Link
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                    href="/help-center"
                  >
                    Help Center
                  </Link>

                  <ThemeToggle />

                  <Link
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                    href="/sign-in"
                  >
                    Sign in
                  </Link>
                  <Link
                    className={buttonVariants({ size: "sm" })}
                    href="/pricing"
                  >
                    Get started
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Navbar;
