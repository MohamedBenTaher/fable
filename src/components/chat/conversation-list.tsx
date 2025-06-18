"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MessageSquare, Trash2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Conversation {
  id: number;
  title: string;
  updated_at: string;
}

interface ConversationListProps {
  fileId: string;
  currentConversationId: number | null;
  onConversationSelect: (conversationId: number | null) => void;
}

export function ConversationList({
  currentConversationId,
  onConversationSelect,
}: ConversationListProps) {
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async (): Promise<Conversation[]> => {
      const response = await fetch("/api/conversations");
      return response.json();
    },
  });

  const archiveConversation = async (conversationId: number) => {
    await fetch(`/api/conversations?id=${conversationId}`, {
      method: "DELETE",
    });
    // Refresh conversations list
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="animate-pulse space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 dark:bg-gray-800 rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          Conversations
        </h3>

        {/* New Conversation Button */}
        <Button
          onClick={() => onConversationSelect(null)}
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-start mb-2 transition-all",
            "border-gray-300 dark:border-gray-600",
            "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700",
            "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100",
            !currentConversationId &&
              "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
          )}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>

        {/* Conversations List */}
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {conversations?.map((conversation: Conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group flex items-center justify-between p-2 rounded-md cursor-pointer transition-all",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                currentConversationId === conversation.id &&
                  "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700"
              )}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <MessageSquare className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {conversation.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(conversation.updated_at), "MMM d, h:mm a")}
                  </p>
                </div>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  archiveConversation(conversation.id);
                }}
                variant="ghost"
                size="sm"
                className={cn(
                  "opacity-0 group-hover:opacity-100 h-6 w-6 p-0 transition-opacity",
                  "hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
                )}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}

          {conversations && conversations.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No conversations yet
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Start chatting to create your first conversation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
