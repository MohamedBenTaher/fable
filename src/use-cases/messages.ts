import { createMessage, getMessagesByFileUser } from "@/data-access/messages";

export async function getMessagesByFile(
  fileId: string,
  userId: string,
  limit: number,
  page: number = 1
) {
  try {
    // Validate inputs
    if (!fileId || !userId || limit <= 0 || page <= 0) {
      throw new Error("Invalid input parameters");
    }

    // Fetch messages
    const messages = await getMessagesByFileUser(fileId, userId, limit, page);

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }
}

export async function createMessageByFile(
  fileId: string,
  userId: string,
  message: string,
  isUserMessage: boolean
) {
  try {
    // Validate inputs
    if (!fileId || !userId || !message) {
      throw new Error("Invalid input parameters");
    }

    // Create message
    const newMessage = await createMessage(
      fileId,
      userId,
      message,
      isUserMessage
    );

    return newMessage;
  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error("Failed to create message");
  }
}
