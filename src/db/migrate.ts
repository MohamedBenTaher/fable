import "dotenv/config";
import { db, client } from "./index"; // Ensure correct import path
import { migrate } from "drizzle-orm/node-postgres/migrator"; // Ensure correct import path

(async () => {
  try {
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("Migrations applied successfully");
  } catch (error) {
    console.error("Error applying migrations:", error);
  } finally {
    if (client) {
      client.end(); // Use pool.end() to close the PostgreSQL connection
    } else {
      console.error("Client is undefined");
    }
  }
})();
