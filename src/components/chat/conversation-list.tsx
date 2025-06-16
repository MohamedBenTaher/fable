"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ConversationListProps {
  fileId: string;
  currentConversationId: number | null;
  onConversationSelect: (conversationId: number | null) => void;
}

export function ConversationList({
  fileId,
  currentConversationId,
  onConversationSelect,
}: ConversationListProps) {
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
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
      <div className="p-4">
        <div className="animate-pulse space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Conversations
        </h3>

        {/* New Conversation Button */}
        <Button
          onClick={() => onConversationSelect(null)}
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-start mb-2",
            !currentConversationId && "bg-blue-50 border-blue-200"
          )}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          New Conversation
        </Button>

        {/* Conversations List */}
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {conversations?.map((conversation: any) => (
            <div
              key={conversation.id}
              className={cn(
                "group flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100",
                currentConversationId === conversation.id &&
                  "bg-blue-50 border border-blue-200"
              )}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {conversation.title}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(conversation.updated_at), "MMM d, h:mm a")}
                </p>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  archiveConversation(conversation.id);
                }}
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
