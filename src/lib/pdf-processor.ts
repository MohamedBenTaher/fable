import { getEmbeddings } from "@/lib/embeddings";
import { getOrCreateCollection } from "@/lib/chroma";
import { UTApi } from "uploadthing/server";
import pdf from "pdf-parse";

export async function extractAndEmbedPDF(fileId: number, fileKey: string) {
  try {
    console.log(
      `Starting PDF processing for file ${fileId} with key ${fileKey}`
    );

    const utapi = new UTApi();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("PDF processing timeout")), 120000);
    });

    const processingPromise = async () => {
      // Get the file URL from UploadThing - try different approaches
      let fileUrl;

      try {
        const signedUrlResponse = await utapi.getSignedURL(fileKey);
        fileUrl = signedUrlResponse.url;
        console.log(`Got signed URL: ${fileUrl}`);
      } catch (urlError) {
        console.error("Error getting signed URL:", urlError);
        // Fallback to direct URL construction
        fileUrl = `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${fileKey}`;
        console.log(`Using fallback URL: ${fileUrl}`);
      }

      if (!fileUrl) {
        throw new Error("Could not get file URL");
      }

      // Fetch the PDF content
      console.log(`Fetching PDF from: ${fileUrl}`);
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch PDF: ${response.status} ${response.statusText}`
        );
      }

      const pdfBuffer = await response.arrayBuffer();
      console.log(`Fetched PDF buffer of size: ${pdfBuffer.byteLength} bytes`);

      // Extract text from PDF using pdf-parse
      const text = await extractTextFromPDF(Buffer.from(pdfBuffer));

      if (!text || text.trim().length === 0) {
        console.warn("No text content found in PDF");
        return { success: false, error: "No text content found in PDF" };
      }

      console.log(`Extracted ${text.length} characters from PDF`);
      console.log(`First 200 characters: ${text.substring(0, 200)}...`);

      // Split text into chunks
      const chunks = splitTextIntoChunks(text, 800, 150);
      console.log(`Split into ${chunks.length} chunks`);

      if (chunks.length === 0) {
        console.warn("No chunks created from PDF text");
        return { success: false, error: "No chunks created from PDF text" };
      }

      try {
        // Get or create ChromaDB collection for this file
        console.log(`Getting/creating ChromaDB collection: file_${fileId}`);
        const collection = await getOrCreateCollection(`file_${fileId}`);
        console.log("ChromaDB collection ready");

        // Clear existing data for this file
        try {
          await collection.delete();
          console.log("Cleared existing collection data");
        } catch (error) {
          console.log("Collection didn't exist or was empty, continuing...");
        }

        const freshCollection = await getOrCreateCollection(`file_${fileId}`);

        // Process chunks using centralized embedding function
        const embeddings = [];
        const documents = [];
        const metadatas = [];
        const ids = [];

        console.log("Starting chunk processing...");
        let expectedDimension: number | null = null;

        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          console.log(
            `Processing chunk ${i + 1}/${chunks.length} (${chunk.length} chars)`
          );

          try {
            const embeddingArray = await getEmbeddings(chunk);

            // Set expected dimension from first successful embedding
            if (expectedDimension === null) {
              expectedDimension = embeddingArray.length;
              console.log(
                `Set expected embedding dimension: ${expectedDimension}`
              );
            }

            // Validate dimension consistency
            if (embeddingArray.length !== expectedDimension) {
              console.error(
                `Chunk ${i + 1} embedding has dimension ${
                  embeddingArray.length
                }, expected ${expectedDimension}. Skipping this chunk.`
              );
              continue; // Skip this chunk instead of failing
            }

            embeddings.push(embeddingArray);
            documents.push(chunk);
            metadatas.push({
              fileId,
              chunkIndex: i,
              chunkLength: chunk.length,
            });
            ids.push(`${fileId}_chunk_${i}`);

            console.log(`Chunk ${i + 1} processed successfully`);
          } catch (chunkError) {
            console.error(`Error processing chunk ${i + 1}:`, chunkError);
            // Continue with other chunks rather than failing completely
            continue;
          }
        }

        if (embeddings.length === 0) {
          throw new Error("No embeddings were created successfully");
        }

        console.log(
          `Successfully processed ${embeddings.length}/${chunks.length} chunks with dimension ${expectedDimension}`
        );

        // Add to ChromaDB
        console.log(`Adding ${embeddings.length} embeddings to ChromaDB...`);
        await freshCollection.add({
          ids,
          embeddings,
          documents,
          metadatas,
        });

        console.log(
          `Successfully processed ${embeddings.length} chunks for file ${fileId}`
        );

        // Verify the data was added
        const count = await freshCollection.count();
        console.log(`Collection now contains ${count} items`);

        return { success: true, chunksProcessed: embeddings.length };
      } catch (embeddingError) {
        console.error("Error with embedding/ChromaDB:", embeddingError);
        throw embeddingError; // Re-throw to be caught by outer try-catch
      }
    };

    // Race between processing and timeout
    return await Promise.race([processingPromise(), timeoutPromise]);
  } catch (error) {
    console.error(`Error processing PDF for file ${fileId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
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
  chunkSize: number = 800, // Reduced from 1000 for more consistent embeddings
  overlap: number = 150 // Reduced proportionally
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

  // Filter out very short chunks and ensure minimum length for consistent embeddings
  return finalChunks.filter((chunk) => chunk.length >= 30); // Increased minimum length
}
