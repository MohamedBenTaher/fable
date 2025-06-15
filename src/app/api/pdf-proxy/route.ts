import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getFile } from "@/data-access/files";
import { UTApi } from "uploadthing/server";
import { env } from "@/env";

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get("fileId");

  if (!fileId) {
    return new NextResponse("File ID is required", { status: 400 });
  }

  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const file = await getFile(Number(fileId), user.id);
    if (!file) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Initialize the UploadThing API with token
    const utapi = new UTApi({
      token: env.UPLOADTHING_TOKEN,
    });

    // Get the temporary URL for the file
    const signedUrlResponse = await utapi.getSignedURL(file.key);
    const fileUrl = signedUrlResponse.url;

    if (!fileUrl) {
      return new NextResponse("File not found on storage", { status: 404 });
    }

    // Fetch the file content
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const fileContent = await response.arrayBuffer();

    // Return the file content with appropriate headers
    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${file.fileName}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
