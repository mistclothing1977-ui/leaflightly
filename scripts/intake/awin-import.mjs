// Loads an Awin product feed file (CSV) into awin.feed_products.
// Usage: node scripts/intake/awin-import.mjs <advertiserId> <feed.csv>
// Removed items are kept with removed=true and are never shown on the site.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const [advertiserId, file] = process.argv.slice(2);
if (!advertiserId || !file) {
  console.error('Usage: node scripts/intake/awin-import.mjs <advertiserId> <feed.csv>');
  process.exit(1);
}
const require = createRequire(new URL('../../package.json', import.meta.url));
const postgres = require('postgres');
const env = readFileSync(new URL('../../.env.local', import.meta.url), 'utf8');
const url = env.match(/^DATABASE_URL="?([^"\r\n]+)/m)[1];

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const rows = parseCsv(readFileSync(file, 'utf8').replace(/^﻿/, ''));
const header = rows.shift().map((h) => h.trim().toLowerCase());
const col = (name) => header.indexOf(name);
const pick = (r, names) => { for (const n of names) { const i = col(n); if (i >= 0 && r[i]) return r[i]; } return null; };

const sql = postgres(url, { ssl: 'require', max: 1 });
const now = new Date();
let loaded = 0;
try {
  await sql.begin(async (tx) => {
    for (const r of rows) {
      const id = pick(r, ['aw_product_id', 'product_id', 'id']);
      if (!id) continue;
      const price = Number(pick(r, ['search_price', 'price', 'display_price'])) || null;
      await tx`insert into awin.feed_products (advertiser_id, product_id, name, brand, category, price, currency, product_url, image_url, price_checked_at)
        values (${Number(advertiserId)}, ${id}, ${pick(r, ['product_name', 'name', 'title'])}, ${pick(r, ['brand_name', 'brand'])},
        ${pick(r, ['merchant_category', 'category'])}, ${price}, ${pick(r, ['currency'])}, ${pick(r, ['merchant_deep_link', 'product_url', 'link'])},
        ${pick(r, ['merchant_image_url', 'image_url', 'image'])}, ${now})
        on conflict (advertiser_id, product_id) do update set name = excluded.name, brand = excluded.brand, category = excluded.category,
        price = excluded.price, currency = excluded.currency, product_url = excluded.product_url, image_url = excluded.image_url,
        price_checked_at = excluded.price_checked_at, loaded_at = now()
        where awin.feed_products.removed = false`;
      loaded++;
    }
  });
  const [c] = await sql`select count(*)::int n from awin.feed_products where advertiser_id = ${Number(advertiserId)} and removed = false`;
  console.log(`loaded ${loaded} rows for advertiser ${advertiserId}; active rows now ${c.n}`);
} finally { await sql.end(); }
