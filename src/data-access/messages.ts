import { db } from "@/db";
import { Message, messages } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export const getMessagesByFileUser = async (
  fileId: string,
  userId: string,
  limit: number = 10,
  page: number = 1,
  conversationId?: number | null
) => {
  const offset = (page - 1) * limit;

  let whereCondition = and(
    eq(messages.fileId, parseInt(fileId)),
    eq(messages.userId, parseInt(userId))
  );

  // If conversationId is provided, filter by it
  if (conversationId) {
    whereCondition = and(
      whereCondition,
      eq(messages.conversationId, conversationId)
    );
  }

  const fileMessages = await db
    .select()
    .from(messages)
    .where(whereCondition)
    .orderBy(desc(messages.created_at))
    .limit(limit)
    .offset(offset);

  return {
    messages: fileMessages.map((msg) => ({
      id: msg.id.toString(),
      text: msg.message,
      isUserMessage: msg.isUserMessage,
      createdAt: msg.created_at,
      conversationId: msg.conversationId,
    })),
    hasMore: fileMessages.length === limit,
  };
};

export const createMessage = async (
  userId: string,
  fileId: string,
  message: string,
  isUserMessage: boolean,
  conversationId?: number | null
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
      conversationId: conversationId || null,
    })
    .returning();

  return newMessage;
};

export const getMessagesByConversation = async (
  conversationId: number,
  limit: number = 50,
  page: number = 1
) => {
  const offset = (page - 1) * limit;

  const conversationMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(desc(messages.created_at))
    .limit(limit)
    .offset(offset);

  return {
    messages: conversationMessages.map((msg) => ({
      id: msg.id.toString(),
      text: msg.message,
      isUserMessage: msg.isUserMessage,
      createdAt: msg.created_at,
      conversationId: msg.conversationId,
    })),
    hasMore: conversationMessages.length === limit,
  };
};
