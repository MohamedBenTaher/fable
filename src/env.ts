import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.string().optional(),
    DATABASE_URL: z.string().min(1),
    POSTGRES_DB: z.string().min(1),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    EMAIL_SERVER_PASSWORD: z.string().optional(),
    EMAIL_FROM: z.string().optional(),
    EMAIL_SERVER_USER: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    HOST_NAME: z.string().min(1),
    EMAIL_SERVER_HOST: z.string().min(1),
    EMAIL_SERVER_PORT: z.string().min(1),
    ANTHROPIC_API_KEY: z.string().min(1),
    GROQ_API_KEY: z.string().min(1),
    CHROMA_URL: z.string().optional(),
    UPLOADTHING_TOKEN: z.string().min(1),
    PADDLE_API_KEY: z.string().min(1),
    PADDLE_WEBHOOK_ENDPOINT_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_PADDLE_VENDOR_ID: z.string().min(1),
    NEXT_PUBLIC_PADDLE_ENVIRONMENT: z
      .enum(["sandbox", "production"])
      .default("sandbox"),
    NEXT_PUBLIC_PADDLE_PRO_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_PADDLE_ENTERPRISE_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_PADDLE_CLIENT_TOKEN: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    HOST_NAME: process.env.HOST_NAME,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    CHROMA_URL: process.env.CHROMA_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    PADDLE_API_KEY: process.env.PADDLE_API_KEY,
    PADDLE_WEBHOOK_ENDPOINT_SECRET: process.env.PADDLE_WEBHOOK_ENDPOINT_SECRET,
    NEXT_PUBLIC_PADDLE_VENDOR_ID: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID,
    NEXT_PUBLIC_PADDLE_ENVIRONMENT: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
    NEXT_PUBLIC_PADDLE_PRO_PRICE_ID:
      process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID,
    NEXT_PUBLIC_PADDLE_ENTERPRISE_PRICE_ID:
      process.env.NEXT_PUBLIC_PADDLE_ENTERPRISE_PRICE_ID,
    NEXT_PUBLIC_PADDLE_CLIENT_TOKEN:
      process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
  },
});
