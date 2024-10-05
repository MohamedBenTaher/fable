import { NextResponse } from "next/server";
import { deleteFile } from "@/data-access/files";

// Use 'DELETE' as a named export
export async function DELETE(req: Request) {
  console.log("called handler");

  try {
    const { fileId } = await req.json();

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    console.log("called delete file");
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
