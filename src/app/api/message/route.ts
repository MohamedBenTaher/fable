import { db } from "@/db";
import { getCurrentUser } from "@/lib/session";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { NextRequest, NextResponse } from "next/server";
import { fetchGroqResponse } from "@/lib/groq";
import { StreamingTextResponse } from "ai";
import { getFile } from "@/data-access/files";
import { createMessage, getMessagesByFileUser } from "@/data-access/messages";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id: userId } = user;
    const { fileId, message } = SendMessageValidator.parse(body);

    // Convert fileId string to number for getFile function
    const file = await getFile(Number(fileId), userId);
    if (!file) {
      return new Response("Not found", { status: 404 });
    }

    // Store user message
    await createMessage(userId.toString(), fileId.toString(), message, true);

    // Get previous messages for context
    const prevMessages = await getMessagesByFileUser(
      fileId.toString(),
      userId.toString(),
      5
    );

    const formattedPrevMessages = prevMessages.map((msg) => ({
      role: msg.isUserMessage ? "user" : "assistant",
      content: msg.message,
    }));

    // For now, use a simple context approach without embeddings
    // TODO: Implement proper vector search when we have document processing
    const context =
      "Document context will be available once document processing is implemented.";

    // Use Groq for LLM response
    const prompt = `Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format. If you don't know the answer, just say that you don't know, don't try to make up an answer.
    
    \n----------------\n
    
    PREVIOUS CONVERSATION:
    ${formattedPrevMessages.map((message) => {
      if (message.role === "user") return `User: ${message.content}\n`;
      return `Assistant: ${message.content}\n`;
    })}
    
    \n----------------\n
    
    CONTEXT:
    ${context}
    
    USER INPUT: ${message}`;

    const groqResponse = await fetchGroqResponse(prompt);

    // Store LLM response
    await createMessage(
      userId.toString(),
      fileId.toString(),
      groqResponse,
      false
    );

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(groqResponse));
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error in messages API:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
