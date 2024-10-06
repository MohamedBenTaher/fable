import { NextResponse } from "next/server";
import { deleteFile, getFile } from "@/data-access/files";

// Use 'DELETE' as a named export
export async function DELETE(req: Request) {
  try {
    const { fileId } = await req.json();

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    await deleteFile(fileId);

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}

// New GET method to fetch a file by its ID and user ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fileId = url.searchParams.get("fileId");
    const userId = url.searchParams.get("userId");

    if (!fileId || !userId) {
      return NextResponse.json(
        { error: "File ID and User ID are required" },
        { status: 400 }
      );
    }

    const file = await getFile(Number(fileId), Number(userId));

    return NextResponse.json(file, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch file:", error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}
