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

  if (!file) {
    // Additional logging to help debug
    const fileWithoutUserCheck = await db
      .select()
      .from(files)
      .where(eq(files.id, fileId))
      .limit(1)
      .then((rows) => rows[0] || null);

    if (fileWithoutUserCheck) {
      console.log(
        `File ${fileId} exists but belongs to user ${fileWithoutUserCheck.userId}, not ${userId}`
      );
    } else {
      console.log(`File ${fileId} does not exist at all`);
    }

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

export async function updateFileStatus(fileId: number, status: UploadStatus) {
  await db.update(files).set({ status }).where(eq(files.id, fileId));

  revalidatePath("/dashboard");
}

export async function updateFileKeyAndStatus(
  fileId: number,
  key: string,
  status: UploadStatus
) {
  await db
    .update(files)
    .set({
      key,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
      status,
    })
    .where(eq(files.id, fileId));
  revalidatePath("/dashboard");
}

export async function createFile(
  userId: UserId,
  key: string,
  fileName: string,
  size: number
) {
  console.log(
    `Creating file for userId: ${userId}, key: ${key}, fileName: ${fileName}`
  );

  const [file] = await db
    .insert(files)
    .values({
      userId: userId,
      key: key || "",
      url: key
        ? `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`
        : "",
      status: "processing" as UploadStatus, // Set to processing initially
      fileName: fileName,
      mimeType: "application/pdf",
      size: size,
      uploadedAt: new Date(),
    })
    .returning();

  console.log(`Created file:`, file);
  revalidatePath("/dashboard");
  return file;
}
