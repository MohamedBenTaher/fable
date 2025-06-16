import { getCurrentUser } from "@/lib/session";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { NextRequest, NextResponse } from "next/server";
import { fetchGroqResponse } from "@/lib/groq";
import { StreamingTextResponse } from "ai";
import { getFile } from "@/data-access/files";
import { createMessage, getMessagesByFileUser } from "@/data-access/messages";
import { createConversation } from "@/data-access/conversations";
import { getOrCreateCollection } from "@/lib/chroma";
import { getEmbeddings } from "@/lib/embeddings";

export const POST = async (
  req: NextRequest,
  { params }: { params: { fileId: string } }
) => {
  try {
    const body = await req.json();
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id: userId } = user;
    const { fileId } = params;
    const { message, conversationId } = SendMessageValidator.parse(body);

    console.log(`Processing message for file ${fileId}: "${message}"`);

    const file = await getFile(Number(fileId), userId);
    if (!file) {
      return new Response("Not found", { status: 404 });
    }

    let currentConversationId = conversationId;

    // Create a new conversation if none exists
    if (!currentConversationId) {
      // Generate conversation title from first message (truncate if too long)
      const conversationTitle =
        message.length > 50 ? message.substring(0, 47) + "..." : message;

      const conversation = await createConversation(
        userId,
        conversationTitle,
        `Conversation about ${file.fileName}`
      );
      currentConversationId = conversation.id;
    }

    await createMessage(
      userId.toString(),
      fileId,
      message,
      true,
      currentConversationId
    );

    let context = "";
    let groqResponse =
      "I'm sorry, but I'm having trouble accessing the document content right now. Please try again later.";

    try {
      console.log("Starting vector search...");

      // Use centralized embedding function for consistency
      const embeddingArray = await getEmbeddings(message);
      console.log(
        `Generated query embedding with dimension: ${embeddingArray.length}`
      );

      const collection = await getOrCreateCollection(`file_${file.id}`);

      const count = await collection.count();
      console.log(`Collection file_${file.id} contains ${count} items`);

      if (count === 0) {
        console.warn("Collection is empty - no embeddings found");
        context =
          "No document content has been processed yet. Please ensure the PDF was uploaded successfully.";
      } else {
        console.log("Performing vector search...");
        const results = await collection.query({
          queryEmbeddings: [embeddingArray],
          nResults: Math.min(4, count),
          include: ["documents", "metadatas", "distances"],
        });

        console.log(
          `Vector search returned ${
            results.documents?.[0]?.length || 0
          } results`
        );

        if (
          results.documents &&
          results.documents[0] &&
          results.documents[0].length > 0
        ) {
          const documentsWithDistance = results.documents[0].map(
            (doc: string, index: number) => ({
              document: doc,
              distance: results.distances?.[0]?.[index] || 1,
              metadata: results.metadatas?.[0]?.[index],
            })
          );

          // Be more lenient with similarity threshold to capture more context
          const relevantDocs = documentsWithDistance
            .filter((item: { distance: number }) => item.distance < 1.2)
            .sort(
              (a: { distance: number }, b: { distance: number }) =>
                a.distance - b.distance
            )
            .slice(0, 5); // Increased from 3 to 5 for more context

          if (relevantDocs.length > 0) {
            context = relevantDocs
              .map((item: { document: string }) => item.document)
              .join("\n\n");
            console.log(
              `Found ${relevantDocs.length} relevant chunks, context length: ${context.length}`
            );
            console.log(`Context preview: ${context.substring(0, 200)}...`);
          } else {
            console.warn(
              "No relevant chunks found based on similarity threshold"
            );
            context =
              "I found the document content but it doesn't seem directly relevant to your question.";
          }
        } else {
          console.warn("Vector search returned no documents");
          context =
            "The document was processed but no relevant content was found for your question.";
        }
      }
    } catch (error) {
      console.warn("Vector search failed, proceeding without context:", error);
      context =
        "I'm having trouble searching the document content. I'll try to answer based on general knowledge.";
    }

    // Get previous messages from this conversation
    const prevMessages = await getMessagesByFileUser(
      fileId,
      userId.toString(),
      5,
      1,
      currentConversationId
    );

    const formattedPrevMessages = prevMessages.messages.map((msg) => ({
      role: msg.isUserMessage ? "user" : "assistant",
      content: msg.text,
    }));

    // Use Groq for LLM response with improved prompt
    const prompt = `You are an AI assistant helping users understand their uploaded documents. Use the following context from the document and previous conversation to answer the user's question thoroughly.

DOCUMENT CONTEXT:
${context}

PREVIOUS CONVERSATION:
${formattedPrevMessages
  .map((message) => {
    if (message.role === "user") return `User: ${message.content}`;
    return `Assistant: ${message.content}`;
  })
  .join("\n")}

USER QUESTION: ${message}

Instructions:
- Read through ALL the document context carefully before answering
- If the context contains relevant information, provide a detailed and complete answer
- Quote specific details from the document when possible
- If you find partial information, mention what you found and what might be missing
- Be thorough in your search through the provided context
- Use markdown formatting for better readability
- If the context doesn't contain the answer, clearly state that after thoroughly checking`;

    try {
      console.log("Sending request to Groq...");
      groqResponse = await fetchGroqResponse(prompt);
      console.log(`Groq response length: ${groqResponse.length}`);
    } catch (error) {
      console.error("Groq API failed:", error);
      groqResponse =
        "I'm sorry, but I'm experiencing technical difficulties. Please try again later.";
    }

    // Store LLM response with conversation ID
    await createMessage(
      userId.toString(),
      fileId,
      groqResponse,
      false,
      currentConversationId
    );

    // Create streaming response with conversation ID
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const responseData = JSON.stringify({
          content: groqResponse,
          conversationId: currentConversationId,
        });
        controller.enqueue(encoder.encode(responseData));
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error in messages API:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { fileId: string } }
) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id: userId } = user;
    const { fileId } = params;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const conversationId = searchParams.get("conversationId")
      ? parseInt(searchParams.get("conversationId")!, 10)
      : undefined;

    const file = await getFile(Number(fileId), userId);

    if (!file) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const messages = await getMessagesByFileUser(
      fileId,
      userId.toString(),
      limit,
      page,
      conversationId
    );

    return new NextResponse(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
