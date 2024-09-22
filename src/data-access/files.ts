import { db } from "@/db";
import { files, File, UploadStatus } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { eq } from "drizzle-orm";
import { Upload } from "lucide-react";

export async function createFile(
  userId: UserId,
  key: string,
  url: string,
  fileName: string,
  mimeType: string,
  size: number
) {
  const [file] = await db
    .insert(files)
    .values({
      userId,
      key,
      url,
      status: UploadStatus.Pending,
      fileName,
      mimeType,
      size,
      uploadedAt: new Date(),
    })
    .returning();
  return file;
}
