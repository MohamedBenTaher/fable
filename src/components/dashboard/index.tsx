import React, { Suspense } from "react";
import UploadButton from "@/components/upload-button";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { User } from "@/db/schema";
import FileListWrapper from "./file-list-wrapper";
import Skeleton from "react-loading-skeleton";
export default async function DashboardPage() {
  const user: User | null = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-6 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My Files</h1>
        <UploadButton user={user} />
      </div>
      <Suspense fallback={<Skeleton height={100} className="my-2" count={3} />}>
        <FileListWrapper userId={user.id} />
      </Suspense>
    </main>
  );
}
