import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Use actual DATABASE_URL if available, otherwise use a placeholder for builds
const databaseUrl = process.env.DATABASE_URL || "postgres://localhost/placeholder";

// Create PostgreSQL client with production-ready options
const client = postgres(databaseUrl, {
  // SSL configuration for remote databases
  ssl: process.env.NODE_ENV === "production" ? "require" : false,
  // Connection pooling suitable for serverless
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
  // Better error handling
  onnotice: () => {},
});

// Export Drizzle instance
export const db = drizzle(client, { schema });

// Helper to gracefully close connection
export async function closeDb() {
  await client.end();
}
