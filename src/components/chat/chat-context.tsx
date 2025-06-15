"use client";

import { ReactNode, createContext, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  fileId: number;
  children: ReactNode;
}

export const ChatContextProvider = ({ fileId, children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const backupMessage = useRef("");

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      console.log(`Sending message to file ${fileId}:`, message);

      const response = await fetch(`/api/files/${fileId}/messages`, {
        method: "POST",
        body: JSON.stringify({
          fileId: fileId.toString(),
          message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} - ${errorText}`);
        throw new Error(`Failed to send message: ${response.status} ${errorText}`);
      }

      return response.body;
    },
    onMutate: async ({ message }) => {
      backupMessage.current = message;
      setMessage("");

      // Cancel any outgoing revalidations
      await queryClient.cancelQueries({
        queryKey: ["messages", fileId.toString()],
      });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData([
        "messages",
        fileId.toString(),
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(["messages", fileId.toString()], (old: any) => {
        if (!old) {
          return {
            pages: [
              {
                messages: [
                  {
                    createdAt: new Date().toISOString(),
                    id: crypto.randomUUID(),
                    text: message,
                    isUserMessage: true,
                  },
                ],
                hasMore: false,
              },
            ],
            pageParams: [1],
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
      });

      setIsLoading(true);

      return { previousMessages };
    },
    onSuccess: async (stream) => {
      setIsLoading(false);

      if (!stream) {
        console.error("No stream received from API");
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

      try {
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);

          accResponse += chunkValue;
          console.log(`Received chunk: ${chunkValue}`);

          // append chunk to the actual message
          queryClient.setQueryData(
            ["messages", fileId.toString()],
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
            }
          );
        }

        if (!accResponse.trim()) {
          console.warn("Empty response received from AI");
          toast({
            title: "Empty response",
            description: "The AI didn't provide a response. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error reading stream:", error);
        toast({
          title: "Error reading response",
          description: "There was an error processing the AI response.",
          variant: "destructive",
        });
      }
    },

    onError: (error, __, context) => {
      console.error("Mutation error:", error);
      setMessage(backupMessage.current);
      queryClient.setQueryData(
        ["messages", fileId.toString()],
        context?.previousMessages
      );

      toast({
        title: "Error sending message",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
    onSettled: async () => {
      setIsLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["messages", fileId.toString()],
      });
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
