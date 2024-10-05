import { db } from "@/db";
import { files, UploadStatus, users } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { eq, and } from "drizzle-orm";

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

export async function getFile(fileId: number, userId: number) {
  const file = await db
    .select()
    .from(files)
    .where(and(eq(files.id, fileId), eq(files.userId, userId)));

  if (!file) {
    throw new Error("File not found");
  }

  return file;
}

export async function getFiles(userId: UserId) {
  const userFiles = await db.query.files.findMany({
    where: eq(files.userId, userId),
  });

  return userFiles;
}

export async function deleteFile(id: number) {
  console.log("id in delete", id);
  await db.delete(files).where(eq(files.id, id));
}
