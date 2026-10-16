// Approves a synced product so it appears on the site.
//
// Usage:
//   node scripts/intake/approve-product.mjs <advertiserId> <productId> --category beauty --tier B [--slug custom-slug] [--cert vegan,cosmos]
//   node scripts/intake/approve-product.mjs <advertiserId> --list      (shows unapproved, live products)
//   node scripts/intake/approve-product.mjs <advertiserId> <productId> --unapprove
//
// Certifications are recorded only when confirmed for this product (see docs/AUTOMATION_WORKFLOW.md).
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const CATEGORIES = ['kitchen', 'fashion', 'lifestyle', 'beauty', 'wellness'];
const TIERS = ['A', 'B', 'C'];
const CERTS = ['b-corp', 'fsc', 'pefc', 'organic', 'compostable', 'plastic-free', 'fair-trade', 'vegan', 'cosmos', 'leaping-bunny'];

const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const [advertiserId, productId] = args.filter((a, i) => !a.startsWith('--') && !['--category', '--tier', '--slug', '--cert'].includes(args[i - 1]));
const list = args.includes('--list');
const unapprove = args.includes('--unapprove');

if (!advertiserId || (!list && !productId)) {
  console.error('Usage: node scripts/intake/approve-product.mjs <advertiserId> <productId> --category <c> --tier <A|B|C> [--slug s] [--cert a,b]');
  console.error('       node scripts/intake/approve-product.mjs <advertiserId> --list');
  process.exit(1);
}

const require = createRequire(new URL('../../package.json', import.meta.url));
const postgres = require('postgres');
const env = readFileSync(new URL('../../.env.local', import.meta.url), 'utf8');
const dbUrl = env.match(/^DATABASE_URL="?([^"\r\n]+)/m)[1];
const sql = postgres(dbUrl, { ssl: 'require', max: 1 });

const slugify = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 180);

try {
  if (list) {
    const rows = await sql`select product_id, brand, name, price, currency from catalogue_products
      where advertiser_id = ${Number(advertiserId)} and approved = false and removed = false order by brand, name limit 200`;
    for (const r of rows) console.log(`${r.product_id}\t${r.brand}\t${r.name}\t${r.price ?? ''} ${r.currency ?? ''}`);
    console.log(`${rows.length} unapproved live products shown (max 200).`);
  } else if (unapprove) {
    const r = await sql`update catalogue_products set approved = false, approved_at = null
      where advertiser_id = ${Number(advertiserId)} and product_id = ${productId} returning name`;
    console.log(r.length ? `Unapproved: ${r[0].name}` : 'No matching product.');
  } else {
    const category = flag('--category');
    const tier = flag('--tier');
    if (!CATEGORIES.includes(category)) throw new Error(`--category must be one of: ${CATEGORIES.join(', ')}`);
    if (!TIERS.includes(tier)) throw new Error(`--tier must be one of: ${TIERS.join(', ')}`);
    const certs = (flag('--cert') || '').split(',').map((c) => c.trim()).filter(Boolean);
    const badCert = certs.find((c) => !CERTS.includes(c));
    if (badCert) throw new Error(`Unknown certification "${badCert}". Allowed: ${CERTS.join(', ')}`);

    const [row] = await sql`select * from catalogue_products where advertiser_id = ${Number(advertiserId)} and product_id = ${productId}`;
    if (!row) throw new Error('No such product in the catalogue. Run feed-sync first.');
    if (row.removed) throw new Error('This product is no longer in the feed. Not approving.');
    const slug = flag('--slug') || row.slug || slugify(`${row.brand}-${row.name}`);
    await sql`update catalogue_products set approved = true, approved_at = now(), category = ${category}, tier = ${tier},
      slug = ${slug}, certifications = ${JSON.stringify(certs)}::jsonb
      where advertiser_id = ${Number(advertiserId)} and product_id = ${productId}`;
    console.log(`Approved: ${row.name} -> /products/${slug} (${category}, tier ${tier}, certs: ${certs.join(', ') || 'none'})`);
  }
} catch (err) {
  console.error(err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
