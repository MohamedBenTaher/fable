import { ChromaClient } from "chromadb";

let chromaClient: any = null;

export async function getChromaClient() {
  if (!chromaClient) {
    try {
      chromaClient = new ChromaClient({
        path: process.env.CHROMA_URL || "http://localhost:8000",
      });

      // Test connection
      await chromaClient.heartbeat();
      console.log("ChromaDB client initialized and connected successfully");
    } catch (error) {
      console.error("Error initializing ChromaDB client:", error);
      throw error;
    }
  }
  return chromaClient;
}

export async function getOrCreateCollection(name: string) {
  const client = await getChromaClient();

  console.log(`Getting or creating collection: ${name}`);

  try {
    const collection = await client.getCollection({
      name,
    });
    console.log(`Collection ${name} retrieved successfully`);

    // Verify collection has data
    const count = await collection.count();
    console.log(`Collection ${name} contains ${count} items`);

    return collection;
  } catch (error) {
    console.log(`Collection ${name} not found, creating new one...`);
    try {
      const collection = await client.createCollection({
        name,
      });
      console.log(`Collection ${name} created successfully`);
      return collection;
    } catch (createError) {
      console.error(`Error creating collection ${name}:`, createError);
      throw createError;
    }
  }
}
