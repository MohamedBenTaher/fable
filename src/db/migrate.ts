import "dotenv/config";
import { db, pool } from "./index";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as fs from "fs";
import * as path from "path";

(async () => {
  try {
    const migrationsPath = "./migrations";

    // Check if migrations folder exists
    if (!fs.existsSync(migrationsPath)) {
      console.log("Migrations folder does not exist. Creating it...");
      fs.mkdirSync(migrationsPath, { recursive: true });
    }

    // List available migration files
    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith(".sql"));
    console.log("Available migration files:", migrationFiles);

    await migrate(db, { migrationsFolder: migrationsPath });
    console.log("Migrations applied successfully");
  } catch (error) {
    console.error("Error applying migrations:", error);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.end();
      console.log("Database connection closed");
    } else {
      console.error("Pool is undefined");
    }
  }
})();
