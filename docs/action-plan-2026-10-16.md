# Action plan, from the UX review and the competitor cross-reference (16 Oct 2026)

Sources: docs/ux-review-2026-10-16.md and docs/competitor-cross-reference-2026-10-16.md.
Owner key: **Owner** = you decide or approve. **Agent** = I build and check. The homepage is locked: only item 1 touches it, and only with your sign-off.

## Phase 1: ship now (no new data needed)

| # | Action | Owner | Done when | Source |
|---|---|---|---|---|
| 1 | Homepage: show prices and tier badge on the featured cards; fix hero text contrast (scrim behind headline) | Owner approves, Agent builds | Prices visible on all six cards; headline passes WCAG AA contrast on desktop and phone | UX 1, 2, 10 |
| 2 | Buy-link label on every outbound product link: "Buy on [brand] (leaves Leaf Lightly)" | Agent | Every outbound link carries the label; no link says only "Buy" | UX pass 2; NerdWallet; MoneySavingExpert |
| 3 | Show the checked date on prices and brand claims (for example "Price checked 16 Oct 2026") | Agent | Each price and claim shows its date from the database | Competitors: RTINGS, Good Housekeeping, Slickdeals |
| 4 | Explain evidence badges: hover or tap text plus a link to the method | Owner writes the method wording, Agent builds | Each badge has a one-line explanation and a method link | UX 11; The Good Trade |
| 5 | Remove the dev "N" badge on production; collapse the chat bubble to a small icon | Agent | Neither appears on the live site; chat no longer covers product cards | UX 7, 8 |
| 6 | One heading scale across the site (H2 sections, H3 sub-blocks) | Agent | Automated check: no section heading outside the scale | UX 9 |
| 7 | Brand page: move the best product and the shop action above the description | Agent | Shop action visible without scrolling on desktop and phone | UX 13 |
| 8 | Brand claims block: one verified line (register, date) and a plain list of claims | Agent | "Verified" and "claimed" look different and the wording matches our rule | UX 5, 6 |

## Phase 2: quick wins (small build, existing pages)

| # | Action | Owner | Done when | Source |
|---|---|---|---|---|
| 9 | Link the compare page from product cards | Agent | Compare link on each card; compare pre-fills with that product | The Spruce, RTINGS |
| 10 | Affiliate note moved out of the top of the all-products page | Owner approves placement, Agent builds | Note sits under the filters or in the grid footer | UX 4 |
| 11 | One search control on the all-products page (filter, not a second search box) | Agent | Only one search control on the page | UX 3 |
| 12 | "Best for / trade-off" line on product cards, from the product data | Owner writes lines for the first six products, Agent adds the field | Field exists; the six homepage products have one | OutdoorGearLab |
| 13 | Specifications block on product pages, with source and date | Agent builds; Owner supplies specs | Block shown on Truthbrush and the homepage six | Good Housekeeping |

## Phase 3: needs more products or brands first

| # | Action | Owner | Done when | Source |
|---|---|---|---|---|
| 14 | Values filters (plastic-free, vegan, B Corp, etc.) on the all-products page | Owner confirms filter list | Filters work and each shows only products with that verified or claimed attribute | Leif List |
| 15 | "Quick picks" row by use case (for example "gifts under £20") | Owner picks use cases | Row on the all-products page, fed by the catalogue | Tom's Guide |
| 16 | Brand index page | Agent (after five brands) | Index shows all live brands; links to each brand page | Sustainable Jungle; workflow doc section 12 |
| 17 | Beauty guide page | Owner (after beauty brands approved) | Guide uses approved beauty products only | Byrdie |
| 18 | Alternative retailers shown where a product has more than one feed | Agent (when a second feed exists) | Second retailer shown with its own tracked link | TechRadar |

## Phase 4: decide, then build

| # | Action | Owner | Done when | Source |
|---|---|---|---|---|
| 19 | Homepage: owner review of the full row (after five brands) | Owner decides scope | Decision recorded in the workflow doc | Workflow doc section 12 |
| 20 | Change log page for price and claim updates | Owner decides whether to publish | Page lists dated changes | RTINGS |
| 21 | Parent-company line on brand pages (when known) | Owner confirms source | Line on brand pages with a source | Ethical Consumer |
| 22 | Mobile review of the whole flow | Agent runs, Owner signs off | Walkthrough at phone width logged; each issue has a ticket | UX assumptions |

## Sequence and cadence

- **This week:** items 1–3 (highest impact, no new data). Item 1 needs your approval before I touch the homepage.
- **Next:** items 4–8, then 9–13.
- **After five brands are onboarded:** items 14–16 and the homepage decision (19).
- **Each release:** run the phone check (22) before shipping, and record it in this file.

## Measures (check after each phase)

- Share of visitors who click through from the homepage to a product or brand page.
- Share of product clicks that reach a brand's own site (tracked click, per Awin).
- Compare-page visits from product cards.
- Phone-width pass: no horizontal scroll, no content hidden by the chat bubble.

These need analytics on the site. Confirm which tool to use before we set them up.

## Open questions for you

1. Approve item 1 (homepage prices and contrast fix)?
2. Who writes the evidence-badge wording (item 4) and the "best for" lines (item 12)?
3. Which analytics tool should I wire up for the measures?
