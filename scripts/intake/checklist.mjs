// Prints a manual Amazon checklist for candidates that still need a listing check.
// The owner opens each search link by hand; nothing here contacts Amazon.
import { readFileSync } from 'node:fs';

const file = new URL('../../data/queue/candidates.json', import.meta.url);
const items = JSON.parse(readFileSync(file, 'utf8'));
const todo = items.filter((c) => c.status === 'needs-amazon-check');

if (todo.length === 0) {
  console.log('Nothing to check. All candidates have an Amazon decision.');
  process.exit(0);
}

console.log(`# Amazon check list (${todo.length})\n`);
for (const c of todo) {
  const q = encodeURIComponent(c.amazonSearch || `${c.company} ${c.product}`);
  console.log(`- [ ] **${c.company} — ${c.product}** (${c.id})`);
  console.log(`  - Search: https://www.amazon.co.uk/s?k=${q}`);
  console.log(`  - If listed: open the product page, use Get Link (tracking ID leaflightly-21), paste the link, add the image if offered.`);
  console.log(`  - Then set status to \`cleared\` in data/queue/candidates.json, or \`not-listed\` if it isn't sold on Amazon UK.\n`);
}
