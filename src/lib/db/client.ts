import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Use actual DATABASE_URL if available, otherwise use a placeholder for builds
const databaseUrl = process.env.DATABASE_URL || "postgres://localhost/placeholder";

// Create PostgreSQL client optimized for serverless
// - idle_timeout: 20s to ensure connections don't hang in serverless
// - max: 1 to avoid connection pool issues in serverless
// - ssl: require for remote databases (Supabase, etc)
// - onnotice: suppress notices to avoid excessive logging
const client = postgres(databaseUrl, {
  // Serverless-friendly options
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
  ssl: databaseUrl.includes("localhost") ? false : "require",
});

// Export Drizzle instance
export const db = drizzle(client, { schema });

// Helper to gracefully close connection
export async function closeDb() {
  await client.end();
}
