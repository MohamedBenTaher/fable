import { getCurrentUser } from "@/lib/session";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { NextRequest, NextResponse } from "next/server";
import { fetchGroqResponse } from "@/lib/groq";
import { StreamingTextResponse } from "ai";
import { getFile } from "@/data-access/files";
import { createMessage, getMessagesByFileUser } from "@/data-access/messages";
import { pipeline } from "@huggingface/transformers";
import { getOrCreateCollection } from "@/lib/chroma";

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

    // Get embeddings using HuggingFace transformers (free)
    const embedder = await pipeline(
      "feature-extraction",
      "sentence-transformers/all-MiniLM-L6-v2"
    );
    const embeddings = await embedder(message);

    // Use Chroma for vector search (free)
    const collection = await getOrCreateCollection(`file_${file.id}`);
    const results = await collection.query({
      queryEmbeddings: [Array.from(embeddings.data)],
      nResults: 4,
    });

    // Get previous messages
    const prevMessages = await getMessagesByFileUser(
      fileId.toString(),
      userId.toString(),
      5
    );

    const formattedPrevMessages = prevMessages.messages.map((msg) => ({
      role: msg.isUserMessage ? "user" : "assistant",
      content: msg.text,
    }));

    // Create context from results
    const context = results.documents?.[0]?.join("\n\n") || "";

    // Use Groq for LLM response (free)
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

export const GET = async (req: NextRequest) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id: userId } = user;

    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!fileId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // Convert fileId string to number for getFile function
    const file = await getFile(Number(fileId), userId);

    if (!file) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const messages = await getMessagesByFileUser(
      fileId,
      userId.toString(),
      limit,
      page
    );

    return new NextResponse(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
