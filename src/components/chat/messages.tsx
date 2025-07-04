import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./chat-context";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, MessageSquare } from "lucide-react";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import Message from "./message";
import Skeleton from "react-loading-skeleton";

interface MessagesProps {
  fileId: string;
}

export function Messages({ fileId }: MessagesProps) {
  const { isLoading: isAiThinking } = useContext(ChatContext);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["messages", fileId],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await fetch(
          `/api/files/${fileId}/messages?limit=${INFINITE_QUERY_LIMIT}&page=${pageParam}`
        );
        const data = await response.json();
        return data;
      },

      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.hasMore) {
          return undefined;
        }
        return pages.length + 1;
      },
      initialPageParam: 1,
    });

  const messages = data?.pages.flatMap((page) => page.messages) || [];

  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: "loading-message",
    isUserMessage: false,
    text: (
      <span className="flex h-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
      </span>
    ),
  };

  const combinedMessages = [
    ...(isAiThinking ? [loadingMessage] : []),
    ...messages,
  ];

  const { ref: intersectionRef, entry } = useIntersection({
    root: scrollAreaRef.current,
    threshold: 1,
  });

  // Auto-scroll to bottom when new messages arrive or AI is thinking
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [combinedMessages.length, isAiThinking]);

  // Load more messages when scrolling to top
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Messages Container - Scrollable */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0 scroll-smooth"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {combinedMessages && combinedMessages.length > 0 ? (
          <>
            {/* Load More Indicator at Top */}
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400 dark:text-gray-600" />
              </div>
            )}

            {/* Intersection observer ref for loading more */}
            {hasNextPage && <div ref={intersectionRef} className="h-1" />}

            {/* Messages */}
            <div className="space-y-4">
              {combinedMessages
                .slice()
                .reverse() // Reverse to show oldest first, newest last
                .map((message, i, reversedArray) => {
                  const isNextMessageSamePerson =
                    reversedArray[i + 1]?.isUserMessage ===
                    message?.isUserMessage;

                  return (
                    <Message
                      message={message}
                      isNextMessageSamePerson={isNextMessageSamePerson}
                      key={message?.id}
                    />
                  );
                })}
            </div>

            {/* Bottom anchor for auto-scroll */}
            <div ref={bottomRef} className="h-1" />
          </>
        ) : isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-16 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-16 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-16 bg-gray-200 dark:bg-gray-800" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 max-w-md mx-auto transition-colors">
              <MessageSquare className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4 mx-auto" />
              <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100 mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Ask questions about your document. I&apos;ll help you understand
                and analyze the content with intelligent responses.
              </p>
              <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                💡 Try asking: &quot;What is this document about?&quot; or &quot;Summarize the
                key points&quot;
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
