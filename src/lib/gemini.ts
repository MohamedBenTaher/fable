import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/env";

const genAI = new GoogleGenerativeAI(env.ANTHROPIC_API_KEY); // You'll need to add GOOGLE_API_KEY to env

export const generateEmbeddings = async (text: string) => {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding;
};
