import { db } from "@/db";
import { Message, messages } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const getMessagesByFileUser = async (
  fileId: string,
  userId: string,
  limit: number,
  page: number = 1
): Promise<Message[]> => {
  const offset = page * limit;

  const Messages = await db
    .select()
    .from(messages)
    .where(and(eq(messages.fileId, fileId), eq(messages.userId, userId)))
    .limit(limit)
    .offset(offset)
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
