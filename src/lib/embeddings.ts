import { pipeline } from "@huggingface/transformers";

// Simplified type definitions to avoid complex union types
type EmbeddingArray = number[] | number[][];
type TensorLike = {
  data?: number[];
  tolist?: () => EmbeddingArray;
};

// Use a more generic type for the pipeline result
type PipelineResult = EmbeddingArray | TensorLike;

// Simplified embedding model type
type EmbeddingModel = (text: string) => Promise<PipelineResult>;

let embedder: EmbeddingModel | null = null;

export async function getEmbedder(): Promise<EmbeddingModel> {
  if (!embedder) {
    // Use explicit typing to avoid complex inference
    const pipelineInstance = await pipeline(
      "feature-extraction",
      "sentence-transformers/all-MiniLM-L6-v2"
    );

    // Create a wrapper function with explicit typing
    embedder = async (text: string): Promise<PipelineResult> => {
      return pipelineInstance(text) as PipelineResult;
    };
  }
  return embedder;
}

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const embedder = await getEmbedder();
    const embedding = await embedder(text);

    // Extract the embedding array with simplified type checking
    let embeddingArray: number[];

    // Handle different possible return types
    if (Array.isArray(embedding)) {
      // If it's already an array
      if (typeof embedding[0] === "number") {
        embeddingArray = embedding as number[];
      } else if (Array.isArray(embedding[0])) {
        embeddingArray = embedding[0] as number[];
      } else {
        throw new Error("Unexpected array format");
      }
    } else if (embedding && typeof embedding === "object") {
      // Handle object-like results (tensors)
      const tensorResult = embedding as TensorLike;

      if (tensorResult.data) {
        embeddingArray = Array.from(tensorResult.data);
      } else if (tensorResult.tolist) {
        const listed = tensorResult.tolist();
        if (Array.isArray(listed[0])) {
          embeddingArray = listed[0] as number[];
        } else {
          embeddingArray = listed as number[];
        }
      } else {
        throw new Error("Unknown tensor format");
      }
    } else {
      throw new Error("Unknown embedding output format");
    }

    // Validate the embedding
    if (!Array.isArray(embeddingArray) || embeddingArray.length === 0) {
      throw new Error("Invalid embedding output");
    }

    // Ensure all values are numbers
    const validatedArray = embeddingArray.map((val, index) => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error(`Non-numeric value at index ${index}: ${val}`);
      }
      return num;
    });

    console.log(`Generated embedding with dimension: ${validatedArray.length}`);

    // Expected dimension for all-MiniLM-L6-v2 is 384
    if (validatedArray.length !== 384) {
      console.warn(
        `Unexpected embedding dimension: ${validatedArray.length}, expected 384`
      );
    }

    return validatedArray;
  } catch (error) {
    console.error("Error getting embeddings:", error);
    throw error;
  }
}
