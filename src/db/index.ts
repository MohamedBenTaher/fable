import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { env } from "@/env";

const pool = new Pool({
  connectionString: env.DATABASE_URL!,
});

export const db = drizzle(pool, { schema });
