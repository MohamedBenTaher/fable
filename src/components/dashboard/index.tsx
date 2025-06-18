import React, { Suspense } from "react";
import UploadButton from "@/components/upload-button";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { User } from "@/db/schema";
import FileListWrapper from "./file-list-wrapper";
import Skeleton from "react-loading-skeleton";

export default async function DashboardPage() {
  const user: User | null = (await getCurrentUser()) ?? null;
  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Documents
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Upload and chat with your PDF documents using AI
              </p>
            </div>
            <UploadButton user={user} />
          </div>
        </div>

        {/* Content */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <Skeleton height={200} />
                </div>
              ))}
            </div>
          }
        >
          <FileListWrapper userId={user.id} />
        </Suspense>
      </div>
    </div>
  );
}
