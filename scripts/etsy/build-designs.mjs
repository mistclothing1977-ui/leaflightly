// Builds the Etsy printable designs as HTML, then PDFs via headless Chrome.
// Usage: node scripts/etsy/build-designs.mjs
// Brand tokens come from docs/etsy/five-per-category-design-2026-10-17.md and the launch plan.
import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const out = join(root, 'docs', 'etsy', 'designs');
const htmlDir = join(out, 'html');
const pdfDir = join(out, 'pdf');
mkdirSync(htmlDir, { recursive: true });
mkdirSync(pdfDir, { recursive: true });
copyFileSync(join(root, 'public', 'assets', 'logos', 'logo-mark.png'), join(htmlDir, 'logo-mark.png'));

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// ---------- building blocks ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const box = (label, lines = 3) =>
  `<div class="field"><div class="flabel">${esc(label)}</div>${'<div class="rule"></div>'.repeat(lines)}</div>`;
const table = (cols, rows = 8) =>
  `<table class="grid"><thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${'<tr>' + cols.map(() => '<td></td>').join('') + '</tr>'.repeat(0)}${Array.from({ length: rows }, () => '<tr>' + cols.map(() => '<td></td>').join('') + '</tr>').join('')}</tbody></table>`;
const checks = (items) => `<ul class="checks">${items.map((i) => `<li><span class="cb"></span>${esc(i)}</li>`).join('')}</ul>`;
const steps = (items) => `<ol class="steps">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>`;
const example = (title, body) => `<div class="example"><div class="ex-tag">Completed example</div><h4>${esc(title)}</h4>${body}</div>`;
const note = (t) => `<p class="note">${esc(t)}</p>`;
const p = (t) => `<p>${esc(t)}</p>`;

// ---------- page + theme ----------
function page({ title, body, kicker = '', footer = '' }) {
  return `<section class="page">
  <header class="ph"><div class="kick">${esc(kicker)}</div><h2>${esc(title)}</h2></header>
  <div class="pb">${body}</div>
  <footer class="pf"><span>${esc(footer)}</span><span class="mark"><img src="logo-mark.png" alt=""> Leaf Lightly</span></footer>
</section>`;
}

function cover({ title, subtitle, collection, product, pages, fileNote }) {
  return `<section class="page cover">
  <div class="cover-in">
    <img class="cover-mark" src="logo-mark.png" alt="Leaf Lightly">
    <div class="kick">${esc(collection)}</div>
    <h1>${esc(title)}</h1>
    <p class="sub">${esc(subtitle)}</p>
    <div class="cover-meta">${esc(product)}</div>
    <div class="cover-foot">${esc(pages)}<br>${esc(fileNote)}</div>
  </div>
</section>`;
}

function document({ size, title, pages }) {
  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8">
<title>${esc(title)} (${size})</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
:root{--paper:#FAF8F2;--white:#FFFFFF;--ink:#24352C;--forest:#355C46;--sage:#DDE7D8;--clay:#A7543F;--sand:#E9DDC9;--line:#87958A}
@page{size:${size === 'Letter' ? '8.5in 11in' : 'A4'};margin:0}
*{box-sizing:border-box}
html,body{margin:0;background:#ddd;font-family:"Source Sans 3",Arial,Helvetica,sans-serif;color:var(--ink)}
.page{width:${size === 'Letter' ? '8.5in' : '210mm'};height:${size === 'Letter' ? '11in' : '297mm'};background:var(--white);padding:15mm;margin:0 auto 6mm;display:flex;flex-direction:column;position:relative;overflow:hidden;page-break-after:always}
@media print{html,body{background:#fff}.page{margin:0}}
h1,h2,h3,h4{font-family:Lora,Georgia,serif;color:var(--forest);margin:0}
h1{font-size:30pt;line-height:1.1;font-weight:600}
h2{font-size:21pt;font-weight:600}
h4{font-size:12pt;margin:4mm 0 2mm}
p,li,td,th{font-size:11pt;line-height:1.45}
.kick{font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;color:var(--clay);font-weight:600}
.ph{border-bottom:1.5px solid var(--forest);padding-bottom:3mm;margin-bottom:5mm}
.pb{flex:1;display:flex;flex-direction:column;gap:4mm}
.pf{display:flex;justify-content:space-between;align-items:center;font-size:8pt;color:var(--line);border-top:0.5px solid var(--line);padding-top:2mm}
.mark{display:flex;align-items:center;gap:1.5mm;color:var(--forest);font-weight:600}
.mark img{height:4.5mm}
.field{border:1px solid var(--line);border-radius:2mm;padding:3mm 3.5mm;background:var(--white)}
.flabel{font-size:9pt;font-weight:600;color:var(--forest);margin-bottom:1mm}
.rule{border-bottom:0.6px dotted var(--line);height:7mm}
table.grid{width:100%;border-collapse:collapse;font-size:9.5pt}
table.grid th{background:var(--sage);color:var(--forest);text-align:left;padding:2mm;border:0.6px solid var(--line);font-weight:600}
table.grid td{border:0.6px solid var(--line);height:7.5mm;padding:1mm}
ul.checks,ol.steps{list-style:none;margin:0;padding:0}
ul.checks li{display:flex;gap:3mm;align-items:flex-start;padding:1.6mm 0;border-bottom:0.5px dotted var(--line)}
.cb{width:4mm;height:4mm;border:1.2px solid var(--forest);border-radius:1mm;flex:0 0 4mm;margin-top:.6mm}
ol.steps{counter-reset:s}
ol.steps li{counter-increment:s;padding:2mm 0 2mm 9mm;position:relative;border-bottom:0.5px dotted var(--line)}
ol.steps li:before{content:counter(s);position:absolute;left:0;top:1.8mm;width:6mm;height:6mm;border-radius:50%;background:var(--forest);color:#fff;font-size:9pt;text-align:center;line-height:6mm;font-weight:700}
.example{background:var(--paper);border:1px solid var(--sage);border-radius:2mm;padding:3mm 4mm}
.ex-tag{display:inline-block;background:var(--clay);color:#fff;font-size:7.5pt;padding:.8mm 2mm;border-radius:1mm;letter-spacing:.08em;text-transform:uppercase}
.note{font-size:9pt;color:#4a5a50;background:var(--sand);border-radius:2mm;padding:2.5mm 3.5mm;margin:0}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.cover{background:var(--paper);justify-content:center;align-items:flex-start;padding:22mm}
.cover-in{display:flex;flex-direction:column;gap:6mm;width:100%}
.cover-mark{width:24mm}
.cover h1{font-size:36pt}
.cover .sub{font-size:14pt;color:var(--forest);margin:0;max-width:150mm}
.cover-meta{margin-top:10mm;font-size:11pt;color:var(--ink);border-top:1.5px solid var(--clay);padding-top:3mm;max-width:150mm}
.cover-foot{position:absolute;bottom:20mm;left:22mm;font-size:9pt;color:var(--line)}
.band{background:var(--sage);border-radius:2mm;padding:3mm 4mm}
</style></head>
<body>
${pages.join('\n')}
</body></html>`;
}

// ---------- products ----------
// Each product: slug, collection, title, subtitle, product (short label), fileNote, pages[]
// Pages are returned as { title, kicker, body } and rendered with the shared page() layout.
const products = [
  {
    slug: 'pantry-first-meal-planner',
    collection: 'Low-Waste Home',
    title: 'Pantry-First Meal Planner',
    subtitle: 'Plan the week from the food you already have, then shop for the gaps only.',
    product: 'Printable PDF · A4 and US Letter · low-ink edition',
    fileNote: 'Digital download. Printable PDF. Not editable.',
    pages: [
      { kicker: 'Start here', title: 'How this planner works', body: [steps(['Fill in your fridge, freezer and pantry (5 minutes).', 'Build meals from what you have first.', 'Plan the week and note leftover destinations.', 'Write a top-up list for only the gaps.', 'Review the week and adjust next time.']), note('Use what you have first. Buying less is the goal; a full plan is not required.')].join('') },
      { kicker: 'Stock check', title: 'Fridge', body: table(['Item', 'Quantity', 'Use by (if known)', 'Use first?', 'Notes'], 12) },
      { kicker: 'Stock check', title: 'Freezer and pantry', body: `<div class="cols"><div>${table(['Item', 'Quantity', 'Date frozen'], 8)}</div><div>${table(['Item', 'Quantity', 'Running low?'], 8)}</div></div>` },
      { kicker: 'Use-first queue', title: 'Ingredients to use this week', body: [table(['Ingredient', 'Meal idea', 'What else do I need?', 'Done?'], 9), checks(['Start with anything fresh.', 'Check the freezer for batch-cooked meals.', 'Use up pantry items that are close to their date.'])].join('') },
      { kicker: 'Seven-day plan', title: 'This week', body: table(['Day', 'Meal', 'Uses which stock?', 'Leftovers go to'], 7) },
      { kicker: 'Leftovers', title: 'Leftover destinations', body: [checks(['Lunch the next day', 'Freeze in a labelled portion', 'Soup or stock', 'Sandwich or wrap', 'Compost or food share']), box('Leftovers I expect this week', 4)].join('') },
      { kicker: 'Top-up list', title: 'Shop for the gaps only', body: [table(['Item', 'Why needed', 'Already have?', 'Pack size', 'Done?'], 12), note('Compare pack sizes by unit price before buying.')].join('') },
      { kicker: 'Example', title: 'Completed example: one week', body: example('Pantry-first week', [table(['Day', 'Meal', 'Uses which stock?', 'Leftovers go to'], 3).replace('<tbody>', '<tbody>'), p('Example: lentils and a half onion from the pantry became Monday\u2019s dhal. Tuesday used the leftover dhal in a wrap.')].join('')) },
      { kicker: 'Review', title: 'Weekly review', body: [box('What worked?', 3), box('What got wasted, and why?', 3), box('What will I change next week?', 3)].join('') },
      { kicker: 'Reference', title: 'Storage and labels', body: [p('Check your own food-storage guidance for safe storage times. This planner does not set storage periods.'), box('Notes', 6)].join('') },
      { kicker: 'Repeat', title: 'Monthly reset', body: [checks(['Clear the fridge of anything past its date', 'Check the freezer inventory', 'Update the pantry list', 'Choose one habit to keep for next month']), box('Next month\u2019s focus', 4)].join('') },
      { kicker: 'Notes', title: 'Notes', body: box('Notes', 14) },
    ],
  },
  {
    slug: 'room-by-room-home-audit',
    collection: 'Low-Waste Home',
    title: 'Room-by-Room Home Audit',
    subtitle: 'Find three practical actions across kitchen, bathroom and laundry.',
    product: 'Printable PDF · A4 and US Letter · low-ink edition',
    fileNote: 'Digital download. Printable PDF. Not editable.',
    pages: [
      { kicker: 'Start here', title: '15-minute setup', body: [steps(['Pick one room to start.', 'List what you have (no buying).', 'Note what gets used up or replaced most often.', 'Choose three actions from the decision page.', 'Follow up in four weeks.']), note('Use what you have first. The audit should end with three actions, not a full overhaul.')].join('') },
      { kicker: 'Household', title: 'Household baseline', body: [box('Household size', 1), box('How often we shop', 1), checks(['Kitchen', 'Bathroom', 'Laundry']), box('What matters most to us this month', 3)].join('') },
      { kicker: 'Kitchen', title: 'Kitchen inventory', body: table(['Item', 'Quantity', 'Packaging', 'Refill option?', 'Use or replace?'], 12) },
      { kicker: 'Kitchen', title: 'Seven-day observation log', body: table(['Day', 'What was thrown away', 'Reason (spoiled, too much, unused)', 'Count'], 7) },
      { kicker: 'Bathroom', title: 'Bathroom inventory', body: table(['Product', 'Purpose', 'Quantity', 'Refill option?', 'Finish before replacing?'], 10) },
      { kicker: 'Laundry', title: 'Laundry inventory', body: table(['Product', 'Dose used', 'Packaging', 'Refill option?'], 8) },
      { kicker: 'Decide', title: 'Decision page', body: table(['Item', 'Decision', 'Cost', 'Effort', 'Information needed?'], 8) },
      { kicker: 'Actions', title: 'Choose three actions', body: [box('Action 1', 2), box('Action 2', 2), box('Action 3', 2), note('At least one of these should need no purchase.')].join('') },
      { kicker: 'Follow-up', title: 'Four-week plan', body: table(['Action', 'Owner', 'Start date', 'Budget', 'Done?'], 3) },
      { kicker: 'Example', title: 'Completed example', body: example('Kitchen, week one', [table(['Item', 'Decision', 'Cost', 'Effort', 'Information needed?'], 3), p('Example: two half-used sauces moved to the front of the shelf. One bread bag swapped for a reusable one. Dishwashing tablets to be bought in larger packs.')].join('')) },
      { kicker: 'Re-audit', title: 'Re-audit at four weeks', body: [box('What changed?', 3), box('What got in the way?', 3), box('My next three actions', 3)].join('') },
      { kicker: 'Notes', title: 'Notes', body: box('Notes', 14) },
    ],
  },
  {
    slug: 'buy-repair-borrow-or-wait',
    collection: 'Low-Waste Home',
    title: 'Buy, Repair, Borrow or Wait',
    subtitle: 'A one-page decision planner for purchases you are unsure about.',
    product: 'Printable PDF · A4 and US Letter · low-ink edition',
    fileNote: 'Digital download. Printable PDF. Not editable.',
    pages: [
      { kicker: 'Start here', title: 'Before you decide', body: [p('Ask first: do I already own something that does this job?'), steps(['Describe the need.', 'Choose your options.', 'Note the total cost and expected use.', 'Wait, then decide.']), note('"Unknown" is a valid answer. If you do not know something, write it down rather than guessing.')].join('') },
      { kicker: 'Decision tree', title: 'Which route?', body: [checks(['I already own something that works: use it', 'It just needs fixing: repair', 'I need it only once: borrow or hire', 'A used version is fine: buy used', 'A new one is needed: buy new, after the wait']), box('My route', 2)].join('') },
      { kicker: 'Compare', title: 'Comparison worksheet', body: table(['Option', 'Purchase or repair cost', 'Running cost', 'Expected uses', 'Cost per use', 'What I do not know yet'], 5) },
      { kicker: 'Wait', title: '7-day and 30-day review', body: table(['Item', 'Date added', 'Review on (7 days)', 'Still want it? (Y/N)', 'Review on (30 days)', 'Still want it? (Y/N)'], 4) },
      { kicker: 'Examples', title: 'Worked examples', body: [example('Small recurring purchase: a kitchen cleaner', p('Total cost over a year: £18 across 12 bottles. Use: weekly. Cost per use: about 35p. Refill option: available. Decision: buy a concentrate and refill.')), example('Durable item: a cast iron pan', p('Cost: £40. Expected use: several times a week for many years. Cost per use: low over time. Decision: buy, after checking that the pan you already own does not do the job.'))].join('') },
      { kicker: 'Notes', title: 'My decision', body: [box('Decision and reason', 4), box('What I am still unsure about', 3), note('This planner helps you decide. It does not score products for environmental impact.')].join('') },
    ],
  },
  {
    slug: '30-day-low-waste-challenge',
    collection: 'Low-Waste Home',
    title: '30-Day Low-Waste Challenge',
    subtitle: 'One small action a day, sequenced to use up first, repair and decide later.',
    product: 'Printable PDF · A4 and US Letter · low-ink edition',
    fileNote: 'Digital download. Printable PDF. Not editable.',
    pages: [
      { kicker: 'Start here', title: 'What this challenge is', body: [p('Thirty small actions. Each one takes a few minutes. Missing a day is fine. Adapting an action is fine. Skipping one that does not suit your home is fine.'), note('There is no perfect version of this challenge. The aim is to notice patterns and change a few of them.')].join('') },
      { kicker: 'Set up', title: 'My starting point', body: [box('What we throw away most', 3), box('Budget and access (shops nearby, bulk options, etc.)', 3), box('Three priorities for this month', 3)].join('') },
      { kicker: 'Days 1 to 7', title: 'Observe and use up', body: [table(['Day', 'Action', 'Time', 'Done / adapted / not relevant'], 7)].join('') },
      { kicker: 'Days 8 to 14', title: 'Kitchen routines', body: [table(['Day', 'Action', 'Time', 'Done / adapted / not relevant'], 7)].join('') },
      { kicker: 'Days 15 to 21', title: 'Bathroom and laundry', body: [table(['Day', 'Action', 'Time', 'Done / adapted / not relevant'], 7)].join('') },
      { kicker: 'Days 22 to 28', title: 'Repair, borrow and wait', body: [table(['Day', 'Action', 'Time', 'Done / adapted / not relevant'], 7)].join('') },
      { kicker: 'Days 29 and 30', title: 'Compare and choose', body: [table(['Day', 'Action', 'Time', 'Done / adapted / not relevant'], 2), box('Three habits I will keep', 3)].join('') },
      { kicker: 'Weekly', title: 'Weekly reflection', body: [checks(['Easy', 'Difficult', 'Skipped', 'Adapted', 'Money spent']), box('What got in the way?', 3), box('What helped?', 3)].join('') },
      { kicker: 'Example', title: 'Completed example: week one', body: example('Days 1 to 7', [table(['Day', 'Action', 'Time', 'Done / adapted / not relevant'], 3), p('Example: Day 2 checked the cupboard and found three open packets of rice. Day 4 used them up in four meals.')].join('')) },
      { kicker: 'Monthly', title: 'Keep going', body: [checks(['Repeat the weekly check', 'Refill one product from a larger pack', 'Choose one repair to keep up']), box('Next month\u2019s actions', 4)].join('') },
    ],
  },
  {
    slug: 'household-budget-refill-tracker',
    collection: 'Low-Waste Home',
    title: 'Household Budget & Refill Tracker',
    subtitle: 'Track refill unit prices, utility bills and repair decisions in one simple workbook.',
    product: 'Printable quick-start guide and worked example (the spreadsheet is built separately in Google Sheets)',
    fileNote: 'Digital download. Quick-start PDF; spreadsheet link follows in the listing.',
    pages: [
      { kicker: 'Quick start', title: 'Set up your tracker', body: [steps(['Open the Sheets copy from your link (make your own copy).', 'Enter your currency and the month.', 'Add your categories on the Settings tab.', 'Log five transactions to test it.', 'Review the Dashboard.']), note('Estimated savings are shown as assumptions. Recorded spending is shown separately.')].join('') },
      { kicker: 'Tabs', title: 'What each tab does', body: table(['Tab', 'What you enter', 'What it tells you'], 8) },
      { kicker: 'Refill maths', title: 'Unit price', body: [p('Unit price = pack price \u00f7 quantity in a comparable unit (e.g. price per 100 ml).'), example('Worked example', p('Concentrate: £6.00 for 1 litre = 0.6p per ml. Ready-to-use: £3.50 for 750 ml = 0.47p per ml. The ready-to-use is cheaper per ml here.'))].join('') },
      { kicker: 'Repairs', title: 'Repair or replace?', body: table(['Item', 'Repair cost', 'Replacement cost', 'Expected extra use', 'Decision'], 5) },
      { kicker: 'Reusables', title: 'Break-even check', body: [p('Break-even uses = upfront reusable cost \u00f7 (disposable cost per use \u2212 reusable running cost per use).'), example('Worked example', p('Reusable bottle £12. Disposable £1.20 per use. Reusable running cost 10p per use. Break-even = 12 \u00f7 (1.20 \u2212 0.10) = 11 uses.')), note('If the disposable cost per use is lower than the reusable running cost, the result is "no break-even under these assumptions".')].join('') },
      { kicker: 'Monthly review', title: 'Monthly review', body: [box('What changed this month?', 3), box('What surprised me?', 3), box('My next action', 2)].join('') },
    ],
  },
  {
    slug: 'social-post-kit',
    collection: 'Eco Creator Studio',
    title: 'Eco Social Post Kit',
    subtitle: 'Evidence-led post structures for sustainable brands and creators.',
    product: 'Printable post planner and layout guide · A4 and US Letter · Canva template link in the listing',
    fileNote: 'Digital download. Canva template link is supplied separately.',
    pages: [
      { kicker: 'Start here', title: 'How to use this kit', body: [steps(['Pick a post type from the list.', 'Write the claim, the evidence and the source.', 'Build the post in Canva from the matching template.', 'Check the source and date before publishing.']), note('Templates give you a structure. They do not supply facts. Every claim needs its own evidence.')].join('') },
      { kicker: 'Post types', title: 'The 18 templates', body: table(['No.', 'Post type', 'Use it for'], 18) },
      { kicker: 'Carousel', title: 'Six-slide carousel plan', body: table(['Slide', 'Job', 'Your content'], 6) },
      { kicker: 'Evidence', title: 'Impact slide: claim, evidence, date', body: [box('What we did', 2), box('Result (measured)', 2), box('How it was measured', 2), box('Source', 1), box('Date measured', 1), note('If you cannot fill in the measured result and source, use a different post type.')].join('') },
      { kicker: 'FAQ', title: 'FAQ post plan', body: table(['Question customers ask', 'Answer', 'Source (if any)'], 6) },
      { kicker: 'Offer', title: 'Offer and launch posts', body: [box('What is on offer?', 2), box('Price and terms', 2), box('Start and end dates', 1), box('Call to action', 1)].join('') },
      { kicker: 'Example', title: 'Completed example: myth and evidence', body: example('Is this material compostable?', [p('Myth: "Anything labelled eco is compostable."'), p('Answer: Compostability depends on the material and the facility. Check the product\u2019s own instructions.'), p('Source: product label, dated [date]. Check your local council\u2019s guidance.')].join('')) },
      { kicker: 'Review', title: 'Post checklist', body: checks(['Claim has a source', 'Source is dated', 'No before-and-after without proof', 'Brand logo and colours used correctly', 'Alt text written', 'Call to action is clear']) },
    ],
  },
  {
    slug: 'eco-media-kit',
    collection: 'Eco Creator Studio',
    title: 'Eco Media Kit',
    subtitle: 'A two-page kit and a one-page version for brand partnerships.',
    product: 'Printable layout and instruction sheet · A4 and US Letter · Canva template link in the listing',
    fileNote: 'Digital download. Canva template link is supplied separately.',
    pages: [
      { kicker: 'Start here', title: 'How to use this kit', body: [steps(['Fill in page 1 (profile and audience).', 'Choose three pieces of your work for page 2.', 'Use the one-page version for quick pitches.', 'Check every metric has a definition, a period and a source.']), note('Replace every example figure before sending. Mark anything you cannot measure as "not measured".')].join('') },
      { kicker: 'Page 1', title: 'Profile and audience', body: [box('Name and niche', 1), box('Positioning (one sentence)', 2), box('Channels and handles', 2), box('Audience location and age range (if known)', 2), box('Reporting period', 1), table(['Metric', 'Value', 'Definition', 'Source'], 4)].join('') },
      { kicker: 'Page 2', title: 'Work and partnerships', body: [table(['Sample of work', 'Deliverables', 'Measured result (or "not measured")'], 3), box('Partnership options', 3), box('Enquiry: email and response time', 1)].join('') },
      { kicker: 'One page', title: 'Quick pitch version', body: [box('Who I reach', 2), table(['Key metric', 'Value', 'Period'], 3), box('Three work examples (thumbnails)', 3), box('Contact', 1)].join('') },
      { kicker: 'Example', title: 'Metric definitions', body: example('Example: engagement rate', [p('Engagement rate = (likes + comments + saves) \u00f7 reach, for posts published 1 to 30 September. Source: platform analytics export. Replace with your own figures.')].join('')) },
    ],
  },
  {
    slug: 'sustainable-product-guide-layout',
    collection: 'Eco Creator Studio',
    title: 'Sustainable Product Guide Layout',
    subtitle: 'Layout for product care, repair and sourcing guides that keep evidence and limits visible.',
    product: 'Printable layout and sample pages · A4 and US Letter · Canva template link in the listing',
    fileNote: 'Digital download. Canva template link is supplied separately.',
    pages: [
      { kicker: 'Start here', title: 'About this layout', body: [p('Sections are built for care, repair, materials, sourcing, evidence and limitations. Every evidence callout needs a source and a date.'), note('Do not write a claim you cannot support. Use "not established" where you do not know.')].join('') },
      { kicker: 'Section', title: 'Care instructions', body: [table(['Care step', 'Why it matters', 'Source'], 4)].join('') },
      { kicker: 'Section', title: 'Repair', body: [table(['Fault', 'Repair steps', 'Tools needed', 'Difficulty'], 4)].join('') },
      { kicker: 'Section', title: 'Materials and sourcing', body: [table(['Material', 'Where it comes from', 'Certification (if any)', 'Source and date'], 4)].join('') },
      { kicker: 'Evidence', title: 'Evidence callout', body: [box('Claim', 2), box('Evidence', 2), box('Source', 1), box('Date checked', 1)].join('') },
      { kicker: 'Limits', title: 'What this guide does not show', body: [box('Limitations', 4), box('Not established', 3)].join('') },
      { kicker: 'References', title: 'References', body: box('Sources in the order used', 10) },
    ],
  },
  {
    slug: 'partnership-pitch-pack',
    collection: 'Eco Creator Studio',
    title: 'Partnership Pitch Pack',
    subtitle: 'A one-page brief and a case-study layout for collaborations.',
    product: 'Printable brief and case-study layout · A4 and US Letter',
    fileNote: 'Digital download. Editable pitch email template included as text.',
    pages: [
      { kicker: 'Start here', title: 'Use this for each pitch', body: [steps(['Fill in the brief for one brand.', 'Choose one case study that matches their goal.', 'Send the pitch email.', 'Record the response.']), note('Only state results you measured. Mark estimates as estimates.')].join('') },
      { kicker: 'Brief', title: 'Partnership brief', body: [box('Brand and goal', 2), box('Deliverables and timeline', 3), box('Usage rights and permissions', 2), box('Fee or exchange', 2), box('Next step', 1)].join('') },
      { kicker: 'Case study', title: 'Case-study layout', body: [box('Campaign or project', 1), box('What I did', 3), table(['Measure', 'Result', 'Period', 'Source'], 4), box('Lesson learned', 2)].join('') },
      { kicker: 'Email', title: 'Pitch email (fill in)', body: [p('Subject: Collaboration idea for [brand]'), p('Hi [name], I create [type of content] for [audience]. I\u2019d like to propose [deliverable] for [timeline]. My last project reached [measured result, source, period]. Could we talk?'), note('Keep the email short. Attach the one-page brief, not the full kit.')].join('') },
      { kicker: 'Record', title: 'Pitch tracker', body: table(['Brand', 'Date sent', 'Response', 'Next step'], 8) },
    ],
  },
  {
    slug: 'pinterest-pin-kit',
    collection: 'Eco Creator Studio',
    title: 'Pinterest Pin and Carousel Kit',
    subtitle: 'Pin structures for guides, tutorials, product pages and lists.',
    product: 'Printable pin plan and layout guide · Canva template link in the listing',
    fileNote: 'Digital download. Canva template link is supplied separately.',
    pages: [
      { kicker: 'Start here', title: 'How to use this kit', body: [steps(['Pick a pin format.', 'Write the title with the search phrase.', 'Build the pin in Canva (1000 \u00d7 1500 px).', 'Check the crop in Pinterest before publishing.'])].join('') },
      { kicker: 'Formats', title: 'Twelve pin layouts', body: table(['No.', 'Format', 'Use for'], 12) },
      { kicker: 'Covers', title: 'Six video cover layouts (1080 \u00d7 1920 px)', body: table(['No.', 'Cover type', 'Headline', 'Text zone'], 6) },
      { kicker: 'Plan', title: 'Pin plan', body: table(['Search phrase', 'Pin title', 'Board', 'Link', 'Date'], 10) },
    ],
  },
  {
    slug: 'family-nature-journal',
    collection: 'Nature & Learning',
    title: 'Family Nature Journal',
    subtitle: 'Seasonal prompts for observations, sketches and questions.',
    product: 'Printable PDF · A4 and US Letter · low-ink edition',
    fileNote: 'Digital download. Printable PDF. Not editable.',
    pages: [
      { kicker: 'Start here', title: 'How to use this journal', body: [steps(['Go outside for 15 minutes.', 'Pick one thing to observe.', 'Sketch it, write a sentence, ask a question.', 'Record the weather and place.']), note('Identification: check with a field guide or an expert before naming a plant or animal.')].join('') },
      { kicker: 'Log', title: 'Outing log', body: [box('Date and time', 1), box('Place', 1), box('Weather', 1), box('Who came', 1)].join('') },
      { kicker: 'Observe', title: 'Sketch page', body: box('Sketch', 14) },
      { kicker: 'Observe', title: 'What I noticed', body: [box('I noticed', 4), box('I wonder', 3), box('I want to find out', 2)].join('') },
      { kicker: 'Season', title: 'Seasonal prompts', body: checks(['Something that is changing', 'A sound you heard', 'Something that smells good', 'A seed, leaf or cone', 'Something that moved', 'A shape you saw twice']) },
      { kicker: 'Season', title: 'Species and weather record', body: table(['What', 'Where', 'How many', 'Notes'], 8) },
      { kicker: 'Teacher note', title: 'For educators and families', body: [p('Ask each child for one question before the outing. Return to it at the end.'), note('Adjust prompts for age. Keep outings within local access rules.')].join('') },
      { kicker: 'Example', title: 'Completed example', body: example('Autumn walk, Saturday', [p('Noticed: a leaf with holes, probably insects. Wondered: which insect? Sketch: oak leaf, bottom edge chewed.')].join('')) },
      { kicker: 'Reflection', title: 'Reflection', body: [box('What I learned this season', 4), box('My next outing', 2)].join('') },
      { kicker: 'Notes', title: 'Notes', body: box('Notes', 14) },
    ],
  },
  {
    slug: 'composting-guide-poster',
    collection: 'Nature & Learning',
    title: 'Composting Guide Poster',
    subtitle: 'One named composting method: what goes in, what stays out, and how to fix common problems.',
    product: 'Printable poster · A3 and A4 PDF',
    fileNote: 'Digital download. Printable poster. Not editable.',
    pages: [
      { kicker: 'Named method', title: 'Hot composting (large bin)', body: [note('Check the method against your local council or the composting guidance you are using. Local rules and collection services vary.'), table(['Suitable inputs', 'Unsuitable inputs'], 8)].join('') },
      { kicker: 'Set up', title: 'Preparation', body: steps(['Shred or break up large pieces.', 'Layer greens and browns.', 'Keep it as damp as a wrung-out sponge.', 'Turn every week or two.']) },
      { kicker: 'Troubleshooting', title: 'Problem and fix', body: table(['Problem', 'Likely cause', 'Fix'], 6) },
      { kicker: 'Sources', title: 'Sources and scope', body: [p('Sources: [name of guidance, date checked]. Scope: home compost bin, large-bin method. Local exceptions apply.')].join('') },
    ],
  },
  {
    slug: 'seasonal-produce-guide',
    collection: 'Nature & Learning',
    title: 'Seasonal Produce Guide (UK)',
    subtitle: 'What is typically in season in the UK, by month.',
    product: 'Printable poster · A3 and A4 PDF',
    fileNote: 'Digital download. Printable poster. Not editable.',
    pages: [
      { kicker: 'Month grid', title: 'Typical UK seasons', body: [table(['Month', 'Veg', 'Fruit', 'Herbs'], 12), note('Legend: fresh (in season) / stored (available from store). Seasons vary by region and year.')].join('') },
      { kicker: 'Sources', title: 'Sources and checks', body: [p('Sources: [name], date checked [date]. Regional and year-to-year variation applies. Check local growers for exact timing.')].join('') },
    ],
  },
  {
    slug: 'recycling-symbols-guide',
    collection: 'Nature & Learning',
    title: 'Recycling Symbols Guide',
    subtitle: 'What packaging symbols mean, and how to check your local council.',
    product: 'Printable A4 guide',
    fileNote: 'Digital download. Printable PDF. Not editable.',
    pages: [
      { kicker: 'Symbols', title: 'What the symbols identify', body: [table(['Symbol', 'What it identifies', 'What it does not establish'], 6), note('A symbol shows material or a scheme. It does not say your council collects it.')].join('') },
      { kicker: 'Check', title: 'Check your local collection', body: [checks(['Find your council\u2019s recycling page', 'Check the item type (plastic, paper, card, glass, metal)', 'Check whether it is clean enough', 'Check whether lids should go on or off']), box('My council and collection notes', 3)].join('') },
      { kicker: 'Sources', title: 'Sources and date', body: [p('Sources: [name], date checked [date]. Symbols can differ between countries.')].join('') },
    ],
  },
  {
    slug: 'botanical-wall-art-trio',
    collection: 'Nature & Learning',
    title: 'Botanical Wall Art Trio',
    subtitle: 'Three coordinated prints in common frame sizes.',
    product: 'Print sheet and size guide · A4 and US Letter',
    fileNote: 'Digital download. Artwork files (JPEG) are produced separately; this sheet is the size guide and printing instructions.',
    pages: [
      { kicker: 'Size guide', title: 'Frame sizes', body: table(['Ratio', 'Frame size', 'Pixel size at 300 ppi'], 5) },
      { kicker: 'Printing', title: 'Printing instructions', body: steps(['Choose your size from the guide.', 'Print at 100% or fit to the paper size.', 'Check the print crop before framing.', 'Use matte paper for the best finish.']) },
      { kicker: 'Licence', title: 'Personal use', body: [p('For personal, non-commercial use. Files may not be resold, shared or redistributed.'), box('Notes', 4)].join('') },
    ],
  },
];

// ---------- build ----------
const sizes = ['A4', 'Letter'];
const built = [];
for (const prod of products) {
  for (const size of sizes) {
    const pages = [
      cover({ title: prod.title, subtitle: prod.subtitle, collection: prod.collection, product: prod.product, pages: `${prod.pages.length + 1} pages including cover`, fileNote: prod.fileNote }),
      ...prod.pages.map((pg) => page({ title: pg.title, kicker: pg.kicker, body: pg.body, footer: `${prod.title} \u00b7 ${size}` })),
      page({
        kicker: 'Your download',
        title: 'What is in your download',
        footer: `${prod.title} \u00b7 ${size} \u00b7 Version 1.0`,
        body: [
          checks([`${prod.slug}-${size === 'Letter' ? 'letter' : 'a4'}.pdf: ${prod.title}, ${size === 'Letter' ? 'US Letter' : 'A4'} print edition`, `${prod.slug}-low-ink.pdf: low-ink edition (same layout, lighter panels)`, 'START_HERE.pdf: this page and the instructions']),
          `<div class="cols"><div class="band"><h4>Licence</h4><p>For personal household use. Files may not be resold, shared or redistributed.</p></div><div class="band"><h4>Support</h4><p>Questions about access or printing: contact the shop through Etsy Messages.</p></div></div>`,
          `<p>Download in a web browser on a computer. Choose ${size === 'Letter' ? 'US Letter' : 'A4'} and print the pages you need. Print at 100% to keep sizes correct.</p>`,
          note('Version 1.0. Check the shop for the latest version number before printing new copies.'),
        ].join(''),
      }),
    ];
    const html = document({ size, title: `${prod.title}`, pages });
    const name = `${prod.slug}-${size.toLowerCase()}`;
    writeFileSync(join(htmlDir, `${name}.html`), html, 'utf8');
    built.push({ name, size, product: prod.title, collection: prod.collection, pages: prod.pages.length + 1 });
  }
}

// Render PDFs with headless Chrome.
const failures = [];
for (const b of built) {
  const htmlPath = join(htmlDir, `${b.name}.html`);
  const pdfPath = join(pdfDir, `${b.name}.pdf`);
  try {
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdfPath}`, `file:///${htmlPath.replace(/\\/g, '/')}`], { stdio: 'ignore', timeout: 120000 });
  } catch (err) {
    failures.push(`${b.name}: ${err.message.split('\n')[0]}`);
  }
}
writeFileSync(join(out, 'manifest.json'), JSON.stringify({ built, failures }, null, 2), 'utf8');
console.log(`built ${built.length} files; failures: ${failures.length}`);
if (failures.length) console.log(failures.join('\n'));
