# Leaf Lightly Development Workflow

## Data Integration Checklist

### Review Integration (CRITICAL - Add when importing real products)

**Current state:** All product reviews and ratings are placeholder/mock data
- `src/data/products.ts` — Contains auto-generated products with mocked ratings
- `src/data/reviews.ts` — Contains sample reviews (marked "In production, this would come from a database")
- Product images use via.placeholder.com

**When importing real products, implement:**

1. **Amazon Product Advertising API**
   - Real product ratings and review counts
   - Product images
   - Affiliate link generation
   - API docs: https://advertising.amazon.com/API

2. **Trustpilot API**
   - Community validation data
   - Review aggregation
   - Rating integration
   - Documentation: https://developers.trustpilot.com/

3. **Reviews.io API**
   - Verified review data
   - Review text and ratings
   - Customer verification
   - Documentation: https://www.reviews.io/

4. **Direct Database**
   - Replace `src/data/reviews.ts` with real review data
   - Implement review caching strategy
   - Set up review refresh schedule

### Implementation Priority
- [ ] Select primary review data source (Amazon/Trustpilot recommended)
- [ ] Obtain API credentials
- [ ] Create service layer in `src/lib/review-service.ts`
- [ ] Update `src/data/products.ts` to fetch real data
- [ ] Replace mock reviews in `src/data/reviews.ts`
- [ ] Add error handling and fallbacks
- [ ] Test with 10-20 real products first

### Hero & Element Videos (DONE 2026-10-14 — home page locked, see `CLAUDE.md`)

| Section | File | Size |
|---|---|---|
| Top hero (PremiumHero) | `public/assets/videos/water-hero.mp4` + poster `public/assets/images/water-hero-poster.jpg` | 8.4 MB |
| Earth block | `earth-hero.mp4` | 6.2 MB |
| Air block | `air-hero.mp4` | 4.0 MB |
| Fire block | `fire-hero.mp4` | 3.6 MB |

- Only the hero downloads on page load; `VideoBlock` mounts its video within 600px of the viewport.
- New videos: re-encode before adding — 1080p H.264, CRF 26–27, no audio, faststart:
  `ffmpeg -i in.mp4 -vf "scale='min(1920,iw)':-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -an -movflags +faststart out.mp4`
  (ffmpeg is available via `python -m pip install imageio-ffmpeg`). Compare a frame before/after.

### Product Images
- Every product uses `PRODUCT_IMAGE_PLACEHOLDER` until it has an approved image.
- Paste the affiliate-supplied image URL (Amazon SiteStripe/PA-API, Awin feed) into that product's `imageUrl` in `src/data/products.ts`. Never copy brand-site images without usage rights.
- Home "Featured" grid = products with `featured: true` (+ `story`) in `products.ts`.

## Change → Verify → Ship (follow every time)

1. **Read the locks first:** `CLAUDE.md` (home page and header are locked).
2. **Diagnose before fixing:** inspect the asset/data or measure the layout; state the root cause.
3. **Edit** with the editor tool, one file at a time. Never rewrite source with PowerShell `Get-Content`/`Set-Content` (corrupts `£`, adds BOM).
4. **Verify locally:**
   - Header touched → `scripts/header-check.js` at 1890/1440/1280/1100/1024/900/800/769/414/375/360/320, signed out, all `PASS`.
   - Layout touched → no sideways scroll (`scrollWidth === clientWidth`) on home, wishlist, a product page, a category page and about, at desktop and phone widths. Never use `100vw` for full-width sections (use `--main-pad` negative margins).
   - UI changed → check in the browser (measure, don't eyeball thumbnails).
   - Always → `npm test` (Vitest, `tests/*.test.ts`) must pass, and `$env:NODE_OPTIONS='--max-old-space-size=4096'; npm run build` must succeed.
   - Changed newsletter/security/validation code → add or update a test in `tests/`.
5. **Commit:** stage explicit paths (never already-deleted ones), write the message to a file, `git commit -F <file>`, then `git show --stat HEAD` to confirm every file is in.
6. **Push, then confirm the deploy:** poll `https://api.github.com/repos/mistclothing1977-ui/leaflightly/commits/<sha>/status` until `success`. On `failure`: `npx vercel inspect <deployment-id> --logs`.
7. **Check the live site** (`https://leaflightly.vercel.app`, cache-busting `?v=<sha>`) for the change. For anything that writes data, do one real write live (labelled test account `claude-e2e-test+…@example.com`), confirm it in Neon, then delete the test rows. Read live errors with `npx vercel logs --deployment leaflightly.vercel.app`.
8. **Record** new lessons in `MRB.md` (§5.2 landmines / §7.4 next steps) and, if it's a design standard, `BRAIN_AND_CLONING_DOCUMENT.md`.

## Environment Variables (Vercel production)

- Set with Node, not PowerShell pipes (PowerShell adds a BOM): `spawnSync('npx', ['vercel','env','add',NAME,'production'], { input: value, shell: true })`.
- Secret-type values can't be read back (`vercel env pull` shows `[encrypted]`) — verify behaviour instead.
- New values only apply after a redeploy: `npx vercel redeploy <latest-prod-url> --target production`.
- Required in production: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `CRON_SECRET`, `NEWSLETTER_TOKEN_SECRET`, `NEXT_PUBLIC_BASE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`. Missing `NEXTAUTH_SECRET` made every auth route 500.
- `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` = `https://leaflightly.vercel.app` until `leaflightly.com` DNS is live; then switch both and redeploy.
- `vercel link` appends `VERCEL_OIDC_TOKEN` to `.env.local` (harmless).

## Database

- One database client and schema: `src/lib/db/client.ts` / `src/lib/db/schema.ts` (Neon). Don't add a second.
- Don't use `npm run db:push` until `tablesFilter` in `drizzle.config.ts` is fixed — it tries to recreate every table. Apply changes with explicit SQL inside a transaction and check table counts before/after.
- `src/lib/db/migrations/` is git-ignored.
- Accounts: `users` table via `src/lib/users.ts` (emails lower-cased; `pgErrorCode()` unwraps Drizzle errors). Wishlists: `wishlist_items` via `src/lib/wishlist-store.ts`. Never reintroduce in-memory stores — Vercel runs multiple instances.
- Production `DATABASE_URL` = Neon (since 2026-10-14). The Supabase direct host is IPv6-only and unreachable from Vercel — don't switch back without its IPv4 pooler URL.
- After any DB-backed change, test one real write **on the live site** and confirm the row lands in Neon; read live errors with `npx vercel logs --deployment leaflightly.vercel.app`.
- The local dev server and local builds use the **same Neon database as production**. Test with clearly-labelled accounts (e.g. `claude-e2e-test+…@example.com`) and delete them afterwards.
- If the dev server serves stale server code after a production build, test on `npx next start -p 3005` instead of restarting the owner's dev server.

## Accounts, Wishlist & Sharing

- Sign-in: email/password (NextAuth credentials) against the `users` table; Google/GitHub need their keys in Vercel first.
- Wishlist: heart button → `/api/wishlist/*` → `wishlist_items`. The Wishlist page loads from the API (not localStorage).
- Share: "Share wishlist" button → `/wishlist/shared?items=<product ids>` (native share sheet on mobile, copy link on desktop). The link holds only product ids; the page is `noindex` and ends with Browse / Start Your Wishlist CTAs.
- Never log or return raw DB errors — use `DbError` (`src/lib/users.ts`) / `safeError()` (`src/lib/safe-error.ts`).
- Public routes must not import `src/lib/validate.ts` (pulls in `isomorphic-dompurify` → `jsdom`, which crashes on Vercel); use `src/lib/validate-email.ts`.
- Rate limiter (`src/lib/rateLimit.ts`) fails open if Upstash is unreachable.

## Newsletter

- Flow: subscribe → signed confirm link → `active` → Monday 08:00 UTC schedule (snapshots recipients into `newsletter_batches`) → daily 09:00 UTC send (one email per recipient, own signed unsubscribe link, `List-Unsubscribe` headers).
- Cron routes accept GET with `Authorization: Bearer CRON_SECRET`; fail closed without it. `vercel.json` cron entries: only `path` + `schedule`.
- Changing `NEWSLETTER_TOKEN_SECRET` invalidates all existing confirm/unsubscribe links.
- Blocked on: `leaflightly.com` DNS + Resend domain verification.

### References
- Mock data location: `src/data/`
- Verified platforms: Amazon, Trustpilot, Reviews.io, Independent
- Review interface: `src/data/reviews.ts` (Review interface)
- Video components: `src/components/PremiumHero.tsx`, `src/components/VideoBlock.tsx`
- Locks & checks: `CLAUDE.md`, `scripts/header-check.js`
- Landmines & next steps: `MRB.md` §5.2, §7.4
