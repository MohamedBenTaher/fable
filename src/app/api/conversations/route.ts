import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import {
  getConversationsByUser,
  createConversation,
  archiveConversation,
} from "@/data-access/conversations";
import { z } from "zod";

const CreateConversationValidator = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional().default(""),
});

export const GET = async (req: NextRequest) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversations = await getConversationsByUser(user.id);
    return new NextResponse(JSON.stringify(conversations), { status: 200 });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description } = CreateConversationValidator.parse(body);

    const conversation = await createConversation(user.id, title, description);
    return new NextResponse(JSON.stringify(conversation), { status: 201 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("id");

    if (!conversationId) {
      return new NextResponse("Conversation ID required", { status: 400 });
    }

    await archiveConversation(parseInt(conversationId), user.id);
    return new NextResponse("Conversation archived", { status: 200 });
  } catch (error) {
    console.error("Error archiving conversation:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
