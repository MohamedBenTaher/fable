import fetch from "node-fetch";
import { env } from "../env";
interface FetchAnthropicResponseParams {
  prompt: string;
}

export async function fetchAnthropicResponse({
  prompt,
}: FetchAnthropicResponseParams): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/claude", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.ANTHROPIC_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      model: "claude-v1", // Specify the model version if needed
      max_tokens: 1000, // Adjust the max tokens as needed
      temperature: 0.7, // Adjust the temperature as needed
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from Anthropic Claude");
  }

  const data = await response.json() as {
    choices: { text: string }[];
  };
  return data.choices[0].text.trim(); // Return the generated text
}
