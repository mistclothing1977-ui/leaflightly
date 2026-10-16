// Checks candidates before they can reach the site. Exits non-zero if any approved item is invalid.
import { readFileSync } from 'node:fs';

const TIERS = ['A', 'B', 'C'];
const STATUSES = ['needs-amazon-check', 'cleared', 'not-listed', 'approved', 'published'];
const CERTS = ['b-corp','fsc','pefc','organic','compostable','plastic-free','fair-trade','carbon-neutral','vegan','cosmos','leaping-bunny'];
const TAG = 'tag=leaflightly-21';

export function validate(c) {
  const errors = [];
  for (const f of ['id', 'company', 'product', 'category', 'tier', 'status', 'dateChecked']) {
    if (!c[f]) errors.push(`missing ${f}`);
  }
  if (!STATUSES.includes(c.status)) errors.push(`unknown status "${c.status}"`);
  if (c.tier && !TIERS.includes(c.tier)) errors.push(`tier must be A, B or C`);
  for (const cert of c.certifications || []) {
    if (!CERTS.includes(cert)) errors.push(`unknown certification "${cert}"`);
  }
  if ((c.certifications || []).length && !(c.certificationSources || []).length) {
    errors.push('certifications listed without a source');
  }
  if (!(c.evidence || []).length) errors.push('no evidence URL');
  if (['cleared', 'approved', 'published'].includes(c.status)) {
    if (!c.trackedLink) errors.push('no tracked Amazon link');
    else {
      if (!c.trackedLink.includes(TAG)) errors.push(`link is missing ${TAG}`);
      if (/amazon\.co\.uk\/s[?/]/.test(c.trackedLink)) errors.push('link is a search page, not a product');
    }
  }
  return errors;
}

const file = new URL('../../data/queue/candidates.json', import.meta.url);
const items = JSON.parse(readFileSync(file, 'utf8'));
let failed = false;
for (const c of items) {
  const errors = validate(c);
  if (errors.length) {
    failed = c.status === 'approved' || failed;
    console.log(`${c.id}: ${errors.join('; ')}`);
  }
}
console.log(failed ? 'Validation failed for approved items.' : 'Validation passed for approved items.');
process.exit(failed ? 1 : 0);
