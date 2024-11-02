import { ReactNode, createContext, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import useSWR, { mutate } from "swr";

type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface Props {
  fileId: string;
  children: ReactNode;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ChatContextProvider = ({ fileId, children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const backupMessage = useRef("");

  const { data: fileMessages, error } = useSWR(
    `/api/files/${fileId}/messages?limit=${INFINITE_QUERY_LIMIT}`,
    fetcher
  );

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.body;
    },
    onMutate: async ({ message }) => {
      backupMessage.current = message;
      setMessage("");

      // Cancel any outgoing revalidations (so they don't overwrite our optimistic update)
      mutate(
        `/api/files/${fileId}/messages?limit=${INFINITE_QUERY_LIMIT}`,
        undefined,
        {
          revalidate: false,
        }
      );

      // Snapshot the previous value
      const previousMessages = fileMessages;

      // Optimistically update to the new value
      mutate(
        `/api/files/${fileId}/messages?limit=${INFINITE_QUERY_LIMIT}`,
        (old: any) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            };
          }

          const newPages = [...old.pages];

          const latestPage = newPages[0]!;

          latestPage.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ];

          newPages[0] = latestPage;

          return {
            ...old,
            pages: newPages,
          };
        },
        false
      );

      setIsLoading(true);

      return { previousMessages };
    },
    onSuccess: async (stream) => {
      setIsLoading(false);

      if (!stream) {
        return toast({
          title: "There was a problem sending this message",
          description: "Please refresh this page and try again",
          variant: "destructive",
        });
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // accumulated response
      let accResponse = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        accResponse += chunkValue;

        // append chunk to the actual message
        mutate(
          `/api/files/${fileId}/messages?limit=${INFINITE_QUERY_LIMIT}`,
          (old: any) => {
            if (!old) return { pages: [], pageParams: [] };

            const isAiResponseCreated = old.pages.some((page: any) =>
              page.messages.some((message: any) => message.id === "ai-response")
            );

            const updatedPages = old.pages.map((page: any) => {
              if (page === old.pages[0]) {
                let updatedMessages;

                if (!isAiResponseCreated) {
                  updatedMessages = [
                    {
                      createdAt: new Date().toISOString(),
                      id: "ai-response",
                      text: accResponse,
                      isUserMessage: false,
                    },
                    ...page.messages,
                  ];
                } else {
                  updatedMessages = page.messages.map((message: any) => {
                    if (message.id === "ai-response") {
                      return {
                        ...message,
                        text: accResponse,
                      };
                    }
                    return message;
                  });
                }

                return {
                  ...page,
                  messages: updatedMessages,
                };
              }

              return page;
            });

            return { ...old, pages: updatedPages };
          },
          false
        );
      }
    },

    onError: (_, __, context) => {
      setMessage(backupMessage.current);
      mutate(
        `/api/files/${fileId}/messages?limit=${INFINITE_QUERY_LIMIT}`,
        context?.previousMessages,
        false
      );
    },
    onSettled: async () => {
      setIsLoading(false);

      mutate(`/api/files/${fileId}/messages?limit=${INFINITE_QUERY_LIMIT}`);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const addMessage = () => sendMessage({ message });

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
