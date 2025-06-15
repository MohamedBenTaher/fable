import { db } from "@/db";
import { Message, messages } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export const getMessagesByFileUser = async (
  fileId: string,
  userId: string,
  limit: number = 10,
  page: number = 1
) => {
  const offset = (page - 1) * limit;

  const fileMessages = await db
    .select()
    .from(messages)
    .where(
      and(
        eq(messages.fileId, parseInt(fileId)),
        eq(messages.userId, parseInt(userId))
      )
    )
    .orderBy(desc(messages.created_at))
    .limit(limit)
    .offset(offset);

  return {
    messages: fileMessages.map((msg) => ({
      id: msg.id.toString(),
      text: msg.message,
      isUserMessage: msg.isUserMessage,
      createdAt: msg.created_at,
    })),
    hasMore: fileMessages.length === limit,
  };
};

export const createMessage = async (
  userId: string,
  fileId: string,
  message: string,
  isUserMessage: boolean
): Promise<Message> => {
  const [newMessage] = await db
    .insert(messages)
    .values({
      fileId: Number(fileId),
      userId: Number(userId),
      isUserMessage: isUserMessage,
      message: message,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning();

  return newMessage;
};
