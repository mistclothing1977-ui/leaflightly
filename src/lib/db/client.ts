import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Use actual DATABASE_URL if available, otherwise use a placeholder for builds
const databaseUrl = process.env.DATABASE_URL || "postgres://localhost/placeholder";

// Create PostgreSQL client
// For Vercel (production), use ssl: require for remote database connections
// For local development, ssl defaults to false
const client = postgres(databaseUrl);

// Export Drizzle instance
export const db = drizzle(client, { schema });

// Helper to gracefully close connection
export async function closeDb() {
  await client.end();
}
