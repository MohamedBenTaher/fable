"use client";
import React, { useCallback, useEffect, useState } from "react";
import Messages from "./messages";
import ChatInput from "./chatInput";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
interface ChatWrapperProps {
  fileId: number;
  user: any;
  isSubscribed: boolean;
}
function ChatWrapper({ fileId, user, isSubscribed }: ChatWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [file, setFile] = useState<any>(null);
  const fetchFileStatus = useCallback(
    async (fileId: number, userId: number) => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          fileId: fileId.toString(),
          userId: userId.toString(),
        });

        const response = await fetch(`/api/files?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch file");
        }

        await response.json();
        setIsLoading(false);

        toast({
          title: "File uploaded successfully",
          description: "Your file has been uploaded successfully",
        });
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to fetch file:", error);
        toast({
          title: "Upload failed",
          description:
            "There was an error uploading your file. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFileStatus(fileId, user.id);
      setFile(result);
    };
    fetchData();
  }, [fetchFileStatus, fileId, user.id]);

  if (isLoading)
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <h3 className="font-semibold text-xl">Loading...</h3>
            <p className="text-zinc-500 text-sm">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  if (file?.status === "PROCESSING")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <h3 className="font-semibold text-xl">Processing PDF...</h3>
            <p className="text-zinc-500 text-sm">This won&apos;t take long.</p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  if (file?.status === "FAILED")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-500" />
            <h3 className="font-semibold text-xl">Too many pages in PDF</h3>
            <p className="text-zinc-500 text-sm">
              Your{" "}
              <span className="font-medium">
                {isSubscribed ? "Pro" : "Free"}
              </span>{" "}
              plan supports up to 5
              {/* {isSubscribed
                ? PLANS.find((p) => p.name === "Pro")?.pagesPerPdf
                : PLANS.find((p) => p.name === "Free")?.pagesPerPdf}{" "} */}
              pages per PDF.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-4",
              })}
            >
              <ChevronLeft className="h-3 w-3 mr-1.5" />
              Back
            </Link>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  return (
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-28">
        <Messages />
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatWrapper;
