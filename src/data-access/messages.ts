import { db } from "@/db";
import { Message, messages } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const getMessages = async (
  fileId: string,
  userId: string,
  limit: number
): Promise<Message[]> => {
  const Messages = await db
    .select()
    .from(messages)
    .where(and(eq(messages.fileId, fileId), eq(messages.userId, userId)))
    .limit(limit)
    .then((rows) => rows || null);

  return Messages;
};
export const createMessage = async (
  fileId: string,
  userId: string,
  message: string,
  isUserMessage: boolean
): Promise<Message> => {
  const [Message] = await db
    .insert(messages)
    .values({
      fileId: fileId,
      userId: userId,
      isUserMessage: isUserMessage,
      message: message,
    })
    .returning();

  return Message;
};
