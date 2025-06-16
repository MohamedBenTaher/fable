import { db } from "@/db";
import { conversations, Conversation } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function createConversation(
  userId: number,
  title: string,
  description: string = ""
): Promise<Conversation> {
  const [conversation] = await db
    .insert(conversations)
    .values({
      userId,
      title,
      description,
      created_at: new Date(),
      updated_at: new Date(),
      isArchived: false,
    })
    .returning();

  return conversation;
}

export async function getConversationsByUser(userId: number) {
  return await db
    .select()
    .from(conversations)
    .where(
      and(eq(conversations.userId, userId), eq(conversations.isArchived, false))
    )
    .orderBy(desc(conversations.updated_at));
}

export async function getConversation(conversationId: number, userId: number) {
  const conversation = await db
    .select()
    .from(conversations)
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.userId, userId)
      )
    )
    .limit(1)
    .then((rows) => rows[0] || null);

  return conversation;
}

export async function updateConversationTitle(
  conversationId: number,
  userId: number,
  title: string
) {
  await db
    .update(conversations)
    .set({
      title,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.userId, userId)
      )
    );
}

export async function archiveConversation(
  conversationId: number,
  userId: number
) {
  await db
    .update(conversations)
    .set({
      isArchived: true,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.userId, userId)
      )
    );
}

export async function deleteConversation(
  conversationId: number,
  userId: number
) {
  await db
    .delete(conversations)
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.userId, userId)
      )
    );
}
