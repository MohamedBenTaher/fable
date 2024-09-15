import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { env } from "@/env";

export const client = new Client({
  connectionString: env.DATABASE_URL,
});
export const db = drizzle(client, { schema });
