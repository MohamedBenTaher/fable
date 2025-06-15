import { ChromaClient } from "chromadb";

let chromaClient: any = null;

export async function getChromaClient() {
  if (!chromaClient) {
    const chroma = await import("chromadb");

    chromaClient = new ChromaClient({
      path: process.env.CHROMA_URL || "http://localhost:8000",
    });
  }
  return chromaClient;
}

export async function getOrCreateCollection(name: string) {
  const client = await getChromaClient();

  try {
    return await client.getCollection({
      name,
    });
  } catch {
    return await client.createCollection({
      name,
    });
  }
}
