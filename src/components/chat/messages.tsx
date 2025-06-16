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
        <Loader2 className="h-4 w-4 animate-spin" />
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
    <div className="flex flex-col h-full overflow-hidden">
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
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
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
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="font-semibold text-xl text-gray-900 mb-2">
              Start a conversation
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Ask questions about your document. I&apos;ll help you understand
              and analyze the content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
