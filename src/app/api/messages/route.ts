import { db } from "@/db";
import { getCurrentUser } from "@/lib/session";
import { getPineconeClient } from "@/lib/pinecone";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { NextRequest } from "next/server";
import { fetchAnthropicResponse } from "@/lib/anthropic";
import { StreamingTextResponse } from "ai";
import { getFile } from "@/data-access/files";
import { createMessage, getMessages } from "@/data-access/messages";
import { pipeline } from "@huggingface/transformers";

export const POST = async (req: NextRequest) => {
  // Endpoint for asking a question to a PDF file

  const body = await req.json();

  const user = await getCurrentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id: userId } = user;

  const { fileId, message } = SendMessageValidator.parse(body);

  const file = await getFile(fileId, userId);

  if (!file) {
    return new Response("Not found", { status: 404 });
  }

  await createMessage(userId.toString(), fileId, message, true);

  // 1: Vectorize message using transformers
  const embedder = await pipeline(
    "feature-extraction",
    "sentence-transformers/all-MiniLM-L6-v2"
  );
  const embeddings = await embedder(message);

  const pinecone = await getPineconeClient();
  const pineconeIndex = pinecone.Index("quill");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: file.id,
  });

  const results = await vectorStore.similaritySearch(message, 4);

  const prevMessages = await getMessages(fileId, userId.toString(), 5);

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? "user" : "assistant",
    content: msg.message,
  }));

  // 2: Prompt Anthropic Claude
  const anthropicResponse = await fetchAnthropicResponse({
    prompt: `Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format. If you don't know the answer, just say that you don't know, don't try to make up an answer.
    
    \n----------------\n
    
    PREVIOUS CONVERSATION:
    ${formattedPrevMessages.map((message) => {
      if (message.role === "user") return `User: ${message.content}\n`;
      return `Assistant: ${message.content}\n`;
    })}
    
    \n----------------\n
    
    CONTEXT:
    ${results.map((r) => r.pageContent).join("\n\n")}
    
    USER INPUT: ${message}`,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(anthropicResponse));
      controller.close();
    },
  });

  // 3: Store the LLM response
  await createMessage(userId.toString(), fileId, anthropicResponse, false);

  return new StreamingTextResponse(stream);
};

export const GET = async (req: NextRequest) => {
  const user = await getCurrentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id: userId } = user;

  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");
  const page = parseInt(searchParams.get("page") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!fileId) {
    return new Response("Bad Request", { status: 400 });
  }

  const file = await getFile(Number(fileId), userId);

  if (!file) {
    return new Response("Not found", { status: 404 });
  }

  const messages = await getMessages(fileId, userId.toString(), limit, page);

  return new Response(JSON.stringify(messages), { status: 200 });
};
