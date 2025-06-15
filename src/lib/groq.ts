import Groq from "groq-sdk";
import { env } from "@/env";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export async function fetchGroqResponse(prompt: string): Promise<string> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1000,
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error fetching Groq response:", error);
    throw new Error("Failed to get response from Groq");
  }
}
