import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Use actual DATABASE_URL if available, otherwise use a placeholder for builds
const databaseUrl = process.env.DATABASE_URL || "postgres://localhost/placeholder";

// Create PostgreSQL client with SSL for production
const isProduction = process.env.VERCEL_ENV === "production";
const client = postgres(databaseUrl, {
  ssl: isProduction ? "require" : false,
});

// Export Drizzle instance
export const db = drizzle(client, { schema });

// Helper to gracefully close connection
export async function closeDb() {
  await client.end();
}
