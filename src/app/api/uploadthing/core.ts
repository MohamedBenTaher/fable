import { createFile } from "@/data-access/files";
import { getCurrentUser } from "@/lib/session";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({}) => {
      const user = await getCurrentUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await createFile(
        metadata.userId,
        file.key,
        file.name,
        file.size
      );

      return { uploadedBy: metadata.userId, fileId: createdFile.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
