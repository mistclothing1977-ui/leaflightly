// Syncs one Awin product feed into catalogue_products.
//
// Usage:
//   node scripts/intake/feed-sync.mjs <advertiserId> [file.csv] [--brand "Name"] [--dry-run]
//
// The feed source is either the CSV file given, or the URL in the environment
// variable FEED_URL_<advertiserId> (set in .env.local or Vercel). Keep feed URLs,
// which contain a key, out of the repo and out of chat.
//
// Safety rules:
// - New rows are inserted with approved = false. Nothing shows on the site until approved.
// - Rows already approved keep their category, tier and slug; only price, stock and link update.
// - Products missing from the feed are marked removed = true (never deleted).
// - If the feed has no rows, or under half the currently live rows, the run aborts and changes nothing.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const brandIdx = args.indexOf('--brand');
const brandArg = brandIdx >= 0 ? args[brandIdx + 1] : null;
const positional = args.filter((a, i) => !a.startsWith('--') && (brandIdx < 0 || (i !== brandIdx && i !== brandIdx + 1)));
const [advertiserId, file] = positional;
if (!advertiserId) {
  console.error('Usage: node scripts/intake/feed-sync.mjs <advertiserId> [file.csv] [--brand "Name"] [--dry-run]');
  process.exit(1);
}

const require = createRequire(new URL('../../package.json', import.meta.url));
const postgres = require('postgres');
const env = readFileSync(new URL('../../.env.local', import.meta.url), 'utf8');
const dbUrl = env.match(/^DATABASE_URL="?([^"\r\n]+)/m)[1];

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

async function loadFeedText() {
  if (file) return readFileSync(file, 'utf8');
  const url = process.env[`FEED_URL_${advertiserId}`];
  if (!url) throw new Error(`No file given and FEED_URL_${advertiserId} is not set`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Feed download failed: HTTP ${res.status}`);
  return res.text();
}

const sourceLabel = file ? file.split(/[\\/]/).pop() : `feed for advertiser ${advertiserId}`;
const text = (await loadFeedText()).replace(/^﻿/, '');
const table = parseCsv(text);
const header = table.shift().map((h) => h.trim().toLowerCase());
const col = (name) => header.indexOf(name);
const pick = (r, names) => { for (const n of names) { const i = col(n); if (i >= 0 && r[i] !== undefined && r[i] !== '') return r[i]; } return null; };
const toNum = (v) => { const n = Number(v); return Number.isFinite(n) && v !== null ? n : null; };
const toBool = (v) => (v === null ? null : ['1', 'true', 'yes', 'in stock', 'instock'].includes(String(v).toLowerCase()));

const feed = [];
for (const r of table) {
  const productId = pick(r, ['aw_product_id', 'merchant_product_id', 'product_id', 'id']);
  if (!productId) continue;
  feed.push({
    product_id: String(productId),
    brand: pick(r, ['brand_name', 'brand']) || brandArg,
    name: pick(r, ['product_name', 'name', 'title']),
    price: toNum(pick(r, ['search_price', 'price', 'display_price'])),
    currency: pick(r, ['currency']),
    product_url: pick(r, ['aw_deep_link', 'merchant_deep_link', 'product_url', 'link']),
    image_url: pick(r, ['merchant_image_url', 'aw_image_url', 'image_url', 'image']), // merchant URL first: the Awin proxy URL carries a key
    in_stock: toBool(pick(r, ['in_stock', 'stock_status'])),
  });
}

const sql = postgres(dbUrl, { ssl: 'require', max: 1 });
const now = new Date();
try {
  const [{ count }] = await sql`select count(*)::int as count from catalogue_products
    where network = 'awin' and advertiser_id = ${Number(advertiserId)} and removed = false`;
  const live = count;

  if (feed.length === 0) throw new Error('Feed has no product rows. Aborting; nothing changed.');
  if (live >= 10 && feed.length < live / 2) {
    throw new Error(`Feed has ${feed.length} rows but ${live} are live. Under half, so likely truncated. Aborting; nothing changed.`);
  }
  const missingBrand = feed.filter((f) => !f.brand).length;
  if (missingBrand > 0) console.warn(`${missingBrand} rows have no brand name. Pass --brand to set one.`);

  const feedIds = new Set(feed.map((f) => f.product_id));
  const existing = await sql`select product_id, removed from catalogue_products
    where network = 'awin' and advertiser_id = ${Number(advertiserId)}`;
  const known = new Map(existing.map((e) => [e.product_id, e.removed]));
  const inserted = feed.filter((f) => !known.has(f.product_id)).length;
  const updated = feed.filter((f) => known.has(f.product_id)).length;
  const removedNow = existing.filter((e) => !e.removed && !feedIds.has(e.product_id)).length;
  const relisted = existing.filter((e) => e.removed && feedIds.has(e.product_id)).length;

  console.log(`Feed ${sourceLabel}: ${feed.length} rows. New ${inserted}, updated ${updated}, removed ${removedNow}, relisted ${relisted}.`);
  if (dryRun) { console.log('Dry run: nothing written.'); process.exit(0); }

  await sql.begin(async (tx) => {
    for (const f of feed) {
      await tx`insert into catalogue_products (network, advertiser_id, product_id, brand, name, price, currency, product_url, image_url, in_stock, price_checked_at, removed)
        values ('awin', ${Number(advertiserId)}, ${f.product_id}, ${f.brand || 'Unknown'}, ${f.name || 'Unnamed product'}, ${f.price}, ${f.currency},
        ${f.product_url}, ${f.image_url}, ${f.in_stock}, ${now}, false)
        on conflict (network, advertiser_id, product_id) do update set
          brand = excluded.brand, name = excluded.name, price = excluded.price, currency = excluded.currency,
          product_url = excluded.product_url, image_url = excluded.image_url, in_stock = excluded.in_stock,
          price_checked_at = excluded.price_checked_at, removed = false, loaded_at = now()`;
    }
    await tx`update catalogue_products set removed = true, loaded_at = now()
      where network = 'awin' and advertiser_id = ${Number(advertiserId)} and removed = false
      and not (product_id = any(${[...feedIds]}::text[]))`;
    await tx`insert into catalogue_sync_runs (network, advertiser_id, source, rows_in_feed, rows_inserted, rows_updated, rows_removed, status, message)
      values ('awin', ${Number(advertiserId)}, ${sourceLabel}, ${feed.length}, ${inserted}, ${updated}, ${removedNow}, 'ok', null)`;
  });
  console.log('Sync written.');
} catch (err) {
  console.error(err.message);
  try {
    await sql`insert into catalogue_sync_runs (network, advertiser_id, source, rows_in_feed, rows_inserted, rows_updated, rows_removed, status, message)
      values ('awin', ${Number(advertiserId)}, ${sourceLabel}, 0, 0, 0, 0, 'aborted', ${err.message})`;
  } catch {}
  process.exitCode = 1;
} finally {
  await sql.end();
}
