export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    // Using HuggingFace Inference API (free tier available)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`);
    }

    const embeddings = await response.json();
    return embeddings;
  } catch (error) {
    console.error("Error getting embeddings:", error);
    // Fallback to simple text matching
    return [];
  }
}
