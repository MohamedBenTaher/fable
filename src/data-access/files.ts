import { db } from "@/db";
import { files, UploadStatus } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFile(fileId: number, userId: number) {
  const file = await db
    .select()
    .from(files)
    .where(and(eq(files.id, fileId), eq(files.userId, userId)))
    .limit(1)
    .then((rows) => rows[0] || null);

  console.log("file found", file);
  if (!file) {
    throw new Error("File not found");
  }

  return file;
}
export async function getFileByKey(key: string, userId: number) {
  const file = await db
    .select()
    .from(files)
    .where(and(eq(files.key, key), eq(files.userId, userId)))
    .limit(1)
    .then((rows) => rows[0] || null);

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
  await db.delete(files).where(eq(files.id, id));
}

export async function createFile(
  userId: UserId,
  key: string,
  fileName: string,

  size: number
) {
  const [file] = await db
    .insert(files)
    .values({
      userId: userId,
      key: key,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
      status: UploadStatus.Pending,
      fileName: fileName,
      mimeType: "application/pdf",
      size: size,
      uploadedAt: new Date(),
    })
    .returning();

  revalidatePath("/dashboard");
  return file;
}
