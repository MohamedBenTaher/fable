import { z } from "zod";

export const SendMessageValidator = z.object({
  fileId: z.string(),
  message: z.string().min(1, "Message cannot be empty"),
  conversationId: z.number().nullable().optional(),
});

export type SendMessageRequest = z.infer<typeof SendMessageValidator>;
