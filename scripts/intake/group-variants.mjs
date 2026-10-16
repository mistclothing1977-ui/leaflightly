// Applies a variant grouping file to catalogue_products.
// Usage: node scripts/intake/group-variants.mjs <advertiserId> <groups.json>
// The file lists each group, its primary product_id, and each item's variant label.
// Items not listed keep their current grouping. Nothing is deleted.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const [advertiserId, file] = process.argv.slice(2);
if (!advertiserId || !file) {
  console.error('Usage: node scripts/intake/group-variants.mjs <advertiserId> <groups.json>');
  process.exit(1);
}
const require = createRequire(new URL('../../package.json', import.meta.url));
const postgres = require('postgres');
const env = readFileSync(new URL('../../.env.local', import.meta.url), 'utf8');
const dbUrl = env.match(/^DATABASE_URL="?([^"\r\n]+)/m)[1];
const { groups } = JSON.parse(readFileSync(file, 'utf8'));

const sql = postgres(dbUrl, { ssl: 'require', max: 1 });
try {
  let items = 0;
  await sql.begin(async (tx) => {
    for (const g of groups) {
      for (const item of g.items) {
        const res = await tx`update catalogue_products set group_key = ${g.group}, variant_label = ${item.variant || null},
          is_primary = ${item.product_id === g.primary}
          where advertiser_id = ${Number(advertiserId)} and product_id = ${item.product_id} returning id`;
        items += res.length;
      }
    }
  });
  console.log(`Grouped ${items} rows into ${groups.length} products.`);
} catch (err) {
  console.error(err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
