import { pipeline } from "@huggingface/transformers";

let embedder: any = null;

export async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "sentence-transformers/all-MiniLM-L6-v2",
      {
        quantized: false,
        pooling: "mean", // Add explicit pooling
        normalize: true, // Normalize embeddings
      } as any
    );
  }
  return embedder;
}

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const embedder = await getEmbedder();
    const embedding = await embedder(text, {
      pooling: "mean",
      normalize: true,
    });

    // Extract the embedding array correctly
    let embeddingArray: number[];

    if (embedding && embedding.data) {
      // Handle Tensor output
      embeddingArray = Array.from(embedding.data);
    } else if (Array.isArray(embedding)) {
      // Handle array output - take the first embedding if batch
      if (Array.isArray(embedding[0])) {
        embeddingArray = embedding[0];
      } else {
        embeddingArray = embedding;
      }
    } else if (embedding.tolist) {
      // Handle tensor with tolist method
      const listed = embedding.tolist();
      embeddingArray = Array.isArray(listed[0]) ? listed[0] : listed;
    } else {
      // Fallback
      embeddingArray = Array.from(embedding);
    }

    // Ensure we have a flat array of numbers
    if (Array.isArray(embeddingArray[0])) {
      embeddingArray = embeddingArray[0] as number[];
    }

    // Validate the embedding
    if (!Array.isArray(embeddingArray) || embeddingArray.length === 0) {
      throw new Error("Invalid embedding output");
    }

    // Ensure all values are numbers
    embeddingArray = embeddingArray.map((val) => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error("Non-numeric value in embedding");
      }
      return num;
    });

    console.log(`Generated embedding with dimension: ${embeddingArray.length}`);

    // Expected dimension for all-MiniLM-L6-v2 is 384
    if (embeddingArray.length !== 384) {
      console.warn(
        `Unexpected embedding dimension: ${embeddingArray.length}, expected 384`
      );
    }

    return embeddingArray;
  } catch (error) {
    console.error("Error getting embeddings:", error);
    throw error;
  }
}
