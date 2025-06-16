"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  MapPin,
  FileText,
  Crown,
  CheckCircle,
  Camera,
  Edit3,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { getCurrentUserAction } from "@/lib/session-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const profileSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface User {
  id: number;
  email: string;
  userType?: string;
}

interface Profile {
  displayName?: string;
  country?: string;
  bio?: string;
  image?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "",
      country: "",
      bio: "",
    },
  });

  // Calculate profile completion percentage
  useEffect(() => {
    const subscription = form.watch((value) => {
      let completed = 0;
      const total = 3;

      if (value.displayName?.trim()) completed++;
      if (value.country?.trim()) completed++;
      if (value.bio?.trim()) completed++;

      setProfileCompletion((completed / total) * 100);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const userData = await getCurrentUserAction();
        if (userData) {
          setUser(userData as User);

          const profileResponse = await fetch(`/api/profile/${userData.id}`);
          if (profileResponse.ok) {
            const profileData: Profile = await profileResponse.json();
            setProfile(profileData);
            form.reset({
              displayName: profileData.displayName || "",
              country: profileData.country || "",
              bio: profileData.bio || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndProfile();
  }, [form, toast]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/profile/${user.id}`, {
        method: profile ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getUserInitials = (email: string) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  const isPremium = user?.userType === "premium";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Overview Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                        <AvatarImage
                          src={profile?.image || ""}
                          alt={user?.email || ""}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold">
                          {user?.email ? getUserInitials(user.email) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 shadow-lg"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {profile?.displayName || "Complete your profile"}
                        </h2>
                        {isPremium && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{user?.email}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          Profile completion:
                        </span>
                        <span className="text-sm font-medium text-blue-600">
                          {Math.round(profileCompletion)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <Progress
                    value={profileCompletion}
                    className="h-2"
                    indicatorColor="bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                </div>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Display Name */}
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2 text-gray-700 font-medium">
                            <User className="h-4 w-4 text-blue-600" />
                            <span>Display Name *</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="Enter your display name"
                                className="pl-4 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                              />
                              <Edit3 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Country */}
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2 text-gray-700 font-medium">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span>Country</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="Enter your country"
                                className="pl-4 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                              />
                              <Edit3 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Bio */}
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2 text-gray-700 font-medium">
                            <FileText className="h-4 w-4 text-purple-600" />
                            <span>Bio</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about yourself..."
                              className="min-h-[120px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors resize-none"
                              maxLength={500}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <FormMessage />
                            <span className="text-sm text-gray-500">
                              {form.watch("bio")?.length || 0}/500
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="px-6"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {isSaving ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Saving...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Save Profile</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Account Type & Premium */}
          <div className="space-y-6">
            {/* Account Type Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {isPremium ? (
                    <Crown className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Star className="h-5 w-5 text-gray-500" />
                  )}
                  <span>Account Type</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Plan:</span>
                  <Badge
                    variant={isPremium ? "default" : "secondary"}
                    className={
                      isPremium
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                        : ""
                    }
                  >
                    {isPremium ? "Premium" : "Free"}
                  </Badge>
                </div>

                {isPremium ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Unlimited PDF uploads</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Advanced AI features</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Export conversations</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">
                          Upgrade to Premium
                        </span>
                      </div>
                      <p className="text-sm text-blue-700 mb-4">
                        Unlock powerful features and get the most out of Fable
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-blue-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Unlimited PDF uploads</span>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Advanced AI analysis</span>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Priority support</span>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Export & sharing</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade to Premium
                      </Button>
                    </div>

                    <Separator />

                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">
                        Free Plan Limits:
                      </p>
                      <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                        <div>• 5 PDF uploads per month</div>
                        <div>• Basic AI responses</div>
                        <div>• Standard support</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Documents uploaded:</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Conversations:</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member since:</span>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
