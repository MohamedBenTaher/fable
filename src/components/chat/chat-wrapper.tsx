"use client";

import ChatInput from "@/components/chat/chat-input";
import Messages from "@/components/chat/messages";
import { ConversationList } from "./conversation-list";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { File } from "@/db/schema";

interface ChatWrapperProps {
  file: File;
  isSubscribed: boolean;
}

const ChatWrapper = ({ file, isSubscribed }: ChatWrapperProps) => {
  console.log("file", file);

  if (!file || file.status === "pending")
    return (
      <div className="relative min-h-full bg-gray-50 dark:bg-gray-950 flex divide-y divide-gray-200 dark:divide-gray-700 flex-col justify-between gap-2 transition-colors">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-blue-500 dark:text-blue-400 animate-spin" />
            <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
              Loading...
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );

  if (file.status === "processing")
    return (
      <div className="relative min-h-full bg-gray-50 dark:bg-gray-950 flex divide-y divide-gray-200 dark:divide-gray-700 flex-col justify-between gap-2 transition-colors">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-blue-500 dark:text-blue-400 animate-spin" />
            <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
              Processing PDF...
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              This won&apos;t take long.
            </p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );

  if (file.status === "failed")
    return (
      <div className="relative min-h-full bg-gray-50 dark:bg-gray-950 flex divide-y divide-gray-200 dark:divide-gray-700 flex-col justify-between gap-2 transition-colors">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
            <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
              Too many pages in PDF
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your{" "}
              <span className="font-medium">
                {isSubscribed ? "Pro" : "Free"}
              </span>{" "}
              plan supports up to 5 pages per PDF.
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
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors">
      {/* Conversation List */}
      <ConversationList
        fileId={file.id.toString()}
        currentConversationId={null} // This will be managed by ChatContext
        onConversationSelect={() => {}} // This will be implemented
      />

      {/* Chat Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
          {file.fileName}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <div
            className={`w-2 h-2 rounded-full ${
              file.status === "complete"
                ? "bg-green-500 dark:bg-green-400"
                : "bg-yellow-500 dark:bg-yellow-400"
            }`}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {file.status === "complete" ? "Ready to chat" : "Processing..."}
          </p>
        </div>
      </div>

      {/* Messages Area - Fixed height with proper overflow */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Messages fileId={file.id.toString()} />
      </div>

      {/* Chat Input */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors">
        <ChatInput isDisabled={file.status !== "complete"} />
      </div>
    </div>
  );
};

export default ChatWrapper;
