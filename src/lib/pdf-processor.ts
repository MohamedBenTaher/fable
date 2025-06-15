import { pipeline } from "@huggingface/transformers";
import { getOrCreateCollection } from "@/lib/chroma";
import { UTApi } from "uploadthing/server";
import pdf from "pdf-parse";
import { env } from "@/env";

export async function extractAndEmbedPDF(fileId: number, fileKey: string) {
  try {
    console.log(`Starting PDF processing for file ${fileId}`);

    // Initialize UTApi with token
    const utapi = new UTApi({
      token: env.UPLOADTHING_TOKEN,
    });

    // Add timeout for the entire process
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("PDF processing timeout")), 60000); // 60 second timeout
    });

    const processingPromise = async () => {
      // Get the file URL from UploadThing
      const signedUrlResponse = await utapi.getSignedURL(fileKey);
      const fileUrl = signedUrlResponse.url;

      if (!fileUrl) {
        throw new Error("Could not get file URL");
      }

      // Fetch the PDF content
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      const pdfBuffer = await response.arrayBuffer();

      // Extract text from PDF using pdf-parse
      const text = await extractTextFromPDF(Buffer.from(pdfBuffer));

      if (!text || text.trim().length === 0) {
        console.warn("No text content found in PDF, but continuing...");
        return { success: true, chunksProcessed: 0 };
      }

      console.log(`Extracted ${text.length} characters from PDF`);

      // Split text into chunks
      const chunks = splitTextIntoChunks(text, 1000, 200);
      console.log(`Split into ${chunks.length} chunks`);

      if (chunks.length === 0) {
        console.warn("No chunks created from PDF text");
        return { success: true, chunksProcessed: 0 };
      }

      try {
        // Get embeddings using HuggingFace transformers
        const embedder = await pipeline(
          "feature-extraction",
          "sentence-transformers/all-MiniLM-L6-v2"
        );

        // Get or create ChromaDB collection for this file
        const collection = await getOrCreateCollection(`file_${fileId}`);

        // Clear existing data for this file
        try {
          await collection.delete();
        } catch (error) {
          console.log("Collection didn't exist or was empty, continuing...");
        }

        // Process chunks and add to ChromaDB
        const embeddings = [];
        const documents = [];
        const metadatas = [];
        const ids = [];

        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          console.log(`Processing chunk ${i + 1}/${chunks.length}`);

          const embedding = await embedder(chunk);

          embeddings.push(Array.from(embedding.data));
          documents.push(chunk);
          metadatas.push({ fileId, chunkIndex: i, chunkLength: chunk.length });
          ids.push(`${fileId}_chunk_${i}`);
        }

        // Add to ChromaDB
        await collection.add({
          ids,
          embeddings,
          documents,
          metadatas,
        });

        console.log(
          `Successfully processed ${chunks.length} chunks for file ${fileId}`
        );
        return { success: true, chunksProcessed: chunks.length };
      } catch (embeddingError) {
        console.error("Error with embedding/ChromaDB:", embeddingError);
        // Return success even if embedding fails, so upload completes
        return { success: true, chunksProcessed: 0, embeddingFailed: true };
      }
    };

    // Race between processing and timeout
    return await Promise.race([processingPromise(), timeoutPromise]);
  } catch (error) {
    console.error(`Error processing PDF for file ${fileId}:`, error);
    // Don't throw error, just log it and return failure status
    return { success: false, error: error?.message };
  }
}

async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

function splitTextIntoChunks(
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): string[] {
  const chunks = [];

  // First, split by paragraphs (double newlines)
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  let currentChunk = "";

  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed chunk size
    if (
      (currentChunk + paragraph).length > chunkSize &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk.trim());

      // Start new chunk with overlap from previous chunk
      const words = currentChunk.split(/\s+/);
      const overlapWords = words.slice(-Math.floor(overlap / 10)); // Approximate word overlap
      currentChunk = overlapWords.join(" ") + " " + paragraph;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
    }
  }

  // Add the last chunk if it has content
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  // If we have very large chunks, split them further by sentences
  const finalChunks = [];
  for (const chunk of chunks) {
    if (chunk.length <= chunkSize) {
      finalChunks.push(chunk);
    } else {
      // Split large chunks by sentences
      const sentences = chunk
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0);
      let subChunk = "";

      for (const sentence of sentences) {
        if ((subChunk + sentence).length > chunkSize && subChunk.length > 0) {
          finalChunks.push(subChunk.trim() + ".");
          subChunk = sentence;
        } else {
          subChunk += (subChunk ? ". " : "") + sentence;
        }
      }

      if (subChunk.trim().length > 0) {
        finalChunks.push(subChunk.trim() + ".");
      }
    }
  }

  return finalChunks.filter((chunk) => chunk.length > 20); // Filter out very short chunks
}
