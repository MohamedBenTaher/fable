import { createFile, updateFileKeyAndStatus } from "@/data-access/files";
import { getCurrentUser } from "@/lib/session";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { UploadStatus } from "@/db/schema";
import { extractAndEmbedPDF } from "@/lib/pdf-processor";

const f = createUploadthing();

console.log("Uploadthing core file loaded");

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({}) => {
      console.log("Middleware called");
      const user = await getCurrentUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("Upload complete, creating file record...");

        // Create file with the actual key and complete status
        const createdFile = await createFile(
          metadata.userId,
          file.key,
          file.name,
          file.size
        );

        console.log("File created:", createdFile.id);

        // Update file with the correct URL and mark as complete
        try {
          await updateFileKeyAndStatus(
            createdFile.id,
            file.key,
            "complete" as UploadStatus
          );
          console.log("File status updated to complete");
        } catch (updateError) {
          console.error("Error updating file status:", updateError);
          // Don't throw here, just log the error
        }

        // Process PDF in background (don't await to avoid timeout)
        // Use setTimeout to ensure this runs completely async
        setTimeout(async () => {
          try {
            console.log("Processing PDF in background...");
            console.log("PDF key:", file.key);
            console.log("PDF file ID:", createdFile.id);
            
            console.log("Starting background PDF processing...");
            const result = await extractAndEmbedPDF(createdFile.id, file.key);
            console.log("PDF processing completed successfully:", result);
          } catch (error) {
            console.error(`Failed to process PDF ${createdFile.id}:`, error);
            // Update file status to failed only if the error is critical
            try {
              await updateFileKeyAndStatus(
                createdFile.id,
                file.key,
                "failed" as UploadStatus
              );
            } catch (statusError) {
              console.error(
                "Failed to update file status to failed:",
                statusError
              );
            }
          }
        }, 1000); // Add 1 second delay to ensure upload completion

        return { uploadedBy: metadata.userId, fileId: createdFile.id };
      } catch (error) {
        console.error("Error in onUploadComplete:", error);
        throw new UploadThingError("Failed to process upload");
      }
    }),
} satisfies FileRouter;

console.log("File router configured");

export type OurFileRouter = typeof ourFileRouter;
