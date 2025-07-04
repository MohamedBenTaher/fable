import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import { Icons } from "../icons";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { forwardRef } from "react";

interface MessageProps {
  message: ExtendedMessage;
  isNextMessageSamePerson: boolean;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-end space-x-2 animate-fade-up", {
          "justify-end": message?.isUserMessage,
          "justify-start": !message?.isUserMessage,
        })}
      >
        {/* Avatar */}
        {!message?.isUserMessage && (
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 shadow-sm",
              {
                "opacity-0": isNextMessageSamePerson,
              }
            )}
          >
            <Icons.logo className="w-5 h-5 text-white" />
          </div>
        )}

        {/* Message Content */}
        <div
          className={cn("max-w-[85%] sm:max-w-[70%]", {
            "order-1": message?.isUserMessage,
            "order-2": !message?.isUserMessage,
          })}
        >
          <div
            className={cn("px-4 py-3 rounded-2xl shadow-sm transition-colors", {
              "bg-blue-600 text-white dark:bg-blue-500 dark:text-white shadow-blue-100 dark:shadow-blue-500/20":
                message?.isUserMessage,
              "bg-white text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 shadow-gray-100 dark:shadow-gray-800/50":
                !message?.isUserMessage,
              "rounded-br-md":
                !isNextMessageSamePerson && message?.isUserMessage,
              "rounded-bl-md":
                !isNextMessageSamePerson && !message?.isUserMessage,
            })}
          >
            {typeof message?.text === "string" ? (
              <ReactMarkdown
                className={cn("prose prose-sm max-w-none", {
                  "prose-invert": message?.isUserMessage,
                  "prose-gray dark:prose-invert": !message?.isUserMessage,
                })}
                components={{
                  p: ({ children }) => (
                    <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                  ),
                  code: ({ children }) => (
                    <code
                      className={cn(
                        "px-1.5 py-0.5 rounded text-sm font-mono",
                        message?.isUserMessage
                          ? "bg-blue-700 text-blue-100 dark:bg-blue-600 dark:text-blue-50"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      )}
                    >
                      {children}
                    </code>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 my-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1 my-2">
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote
                      className={cn(
                        "border-l-4 pl-4 italic my-2",
                        message?.isUserMessage
                          ? "border-blue-300 dark:border-blue-400"
                          : "border-gray-300 dark:border-gray-600"
                      )}
                    >
                      {children}
                    </blockquote>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-lg font-bold mb-2">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-bold mb-2">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-bold mb-1">{children}</h3>
                  ),
                }}
              >
                {message?.text}
              </ReactMarkdown>
            ) : (
              message?.text
            )}
          </div>

          {/* Timestamp */}
          {message?.id !== "loading-message" && !isNextMessageSamePerson && (
            <div
              className={cn(
                "text-xs text-gray-500 dark:text-gray-400 mt-1 px-1",
                {
                  "text-right": message?.isUserMessage,
                  "text-left": !message?.isUserMessage,
                }
              )}
            >
              {format(new Date(message?.createdAt ?? 0), "HH:mm")}
            </div>
          )}
        </div>

        {/* User Avatar */}
        {message?.isUserMessage && (
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 shadow-sm",
              {
                "opacity-0": isNextMessageSamePerson,
              }
            )}
          >
            <Icons.user className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
    );
  }
);

Message.displayName = "Message";

export default Message;
