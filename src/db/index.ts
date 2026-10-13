import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// postgres() connects lazily, so a missing DATABASE_URL fails at query time, not at build time.
// prepare: false is required for pooled/serverless Postgres (e.g. Neon pooler).
const client = postgres(process.env.DATABASE_URL ?? '', { prepare: false, max: 1 });

export const db = drizzle(client, { schema });
