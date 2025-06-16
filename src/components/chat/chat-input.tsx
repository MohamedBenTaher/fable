import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useContext, useRef } from "react";
import { ChatContext } from "./chat-context";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled = false }: ChatInputProps) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="w-full bg-white border-t border-zinc-200">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              {/* Message Input */}
              <Textarea
                rows={1}
                ref={textareaRef}
                autoFocus
                onChange={handleInputChange}
                value={message}
                disabled={isLoading || isDisabled}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addMessage();
                    textareaRef.current?.focus();
                  }
                }}
                placeholder={
                  isDisabled
                    ? "Upload a document to start chatting..."
                    : "Ask a question about your document..."
                }
                className={cn(
                  "resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
                  isDisabled && "bg-gray-50 text-gray-400"
                )}
              />

              {/* Send Button */}
              <Button
                type="button"
                size="sm"
                disabled={isLoading || isDisabled || !message.trim()}
                onClick={() => {
                  if (message.trim()) {
                    addMessage();
                    textareaRef.current?.focus();
                  }
                }}
                className={cn(
                  "absolute bottom-1.5 right-[8px] h-8 w-8 rounded-full p-0 transition-all",
                  message.trim() && !isLoading && !isDisabled
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
                aria-label="send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Helper Text */}
            <div className="flex items-center justify-between mt-2 px-1">
              <p className="text-xs text-gray-500">
                {isDisabled
                  ? "Upload a PDF to start chatting"
                  : "Press Enter to send, Shift+Enter for new line"}
              </p>
              {!isDisabled && (
                <p className="text-xs text-gray-400">AI-powered responses</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
