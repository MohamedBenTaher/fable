import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./chat-context";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, MessageSquare } from "lucide-react";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { getMessagesByFile } from "@/use-cases/messages";
import Message from "./message";
import Skeleton from "react-loading-skeleton";

// import { getCurrentUser } from "@/lib/session";

interface MessagesProps {
  fileId: string;
}

export function Messages({ fileId }: MessagesProps) {
  const { isLoading: isAiThinking } = useContext(ChatContext);
  const user = {};
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["messages", fileId],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await fetch(
          `/api/files/${fileId}/messages?limit=${INFINITE_QUERY_LIMIT}&page=${pageParam}`
        );
        return response.json();
      },

      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < INFINITE_QUERY_LIMIT) {
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

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, i) => {
          const isNextMessageSamePerson =
            combinedMessages[i - 1]?.isUserMessage ===
            combinedMessages[i]?.isUserMessage;

          if (i === combinedMessages.length - 1) {
            return (
              <Message
                ref={ref}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.id}
              />
            );
          } else
            return (
              <Message
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.id}
              />
            );
        })
      ) : isLoading ? (
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <h3 className="font-semibold text-xl">You&apos;re all set!</h3>
          <p className="text-zinc-500 text-sm">
            Ask your first question to get started.
          </p>
        </div>
      )}
      {isFetchingNextPage && (
        <div className="w-full flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default Messages;
