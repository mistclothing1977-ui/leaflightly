// Applies data/db/catalogue.sql to the database in .env.local. Safe to re-run.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../package.json', import.meta.url));
const postgres = require('postgres');
const env = readFileSync(new URL('../../.env.local', import.meta.url), 'utf8');
const url = env.match(/^DATABASE_URL="?([^"\r\n]+)/m)[1];
const ddl = readFileSync(new URL('./catalogue.sql', import.meta.url), 'utf8');
const sql = postgres(url, { ssl: 'require', max: 1 });
try {
  await sql.unsafe(ddl);
  const [{ n }] = await sql`select count(*)::int as n from catalogue_products`;
  console.log(`Catalogue tables ready. catalogue_products rows: ${n}`);
} finally {
  await sql.end();
}
