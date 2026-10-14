@AGENTS.md

# Home page (locked — 2026-10-14)

Do not change the home page (`src/app/page.tsx` and the sections it renders: PremiumHero, VideoBlock,
ProblemStatement, ImpactCounter, OurApproach, TierSystemRedesigned, FeaturedProducts, CustomerStories,
NewsletterSection) unless the owner explicitly asks. Report issues found there instead of fixing them.

Never use `100vw` for full-width sections — it includes the scrollbar on Windows and makes the page
scroll sideways. Break out of `main.mainContent` with `margin: 0 calc(-1 * var(--main-pad))`.

# Header rules (locked — change only when the owner explicitly overrides)

The header has regressed repeatedly. These rules stand until the owner says otherwise.

## Do not change without explicit owner approval
- Logo: `public/assets/logos/logo-mark.png` (transparent, background keyed out). Never swap to another
  logo file, never use WebP for the visible logo, never add a background/box behind it.
- Breakpoints (2026-10-14): **compact** layout ≤1100px; **narrow desktop** 1101–1259px (wordmark
  hidden, tighter gaps); **full desktop** ≥1260px. The 1100px value appears in `Header.module.css`,
  `SearchBar.module.css`, `NavWithMegaMenu.module.css` and `scripts/header-check.js` — change all four together.
- Logo size: 48px desktop, 40px ≤1100px, 32px ≤480px (`Header.module.css` `.logo`).
- Nav text size comes from ONE variable: `--nav-font-size` on `.header` in `Header.module.css`
  (1.05rem desktop, 0.95rem ≤1259px, 0.85rem ≤1100px). `NavWithMegaMenu.module.css` `.link` reads it.
  Never set a font-size on `.navLink` or `.link` directly — that is what caused Home/Wishlist to
  render a different size from the category links.
- `.nav` is `flex: 0 0 auto` (never shrinks). The search box (`SearchBar.module.css` `.container`,
  `flex: 0 1 400px; min-width: 140px`) absorbs spare width. `.header` is `flex-wrap: wrap` so a
  too-narrow width wraps to a second row instead of overlapping.
- ≤1100px (compact) layout: two rows (logo, theme toggle, auth, menu / full-width search); `.rightSection`
  is `display: contents`; nav dropdown is `position: absolute; top: 100%`.
- Root font size is `87.5%` in `globals.css`.
- Never put `overflow: hidden` on `.header` (desktop or mobile) — it clips the mega-menu dropdowns.
  Desktop dropdowns must open fully when hovering each category.

## Required check after ANY edit to Header, NavWithMegaMenu, SearchBar, ThemeToggle or globals.css
Run `scripts/header-check.js` in the browser at widths 1890, 1440, 1260, 1259, 1200, 1101, 1100,
1024, 900, 769, 414, 375, 360 and 320 (desktop must be a single 74px row at every width ≥1101) (test signed-out: Login + Sign Up is the widest top row). At ≤480px the
top row (logo, theme toggle, auth, menu) must stay on one line — toggle 40px, header gap 0.5rem,
auth links have no min-width. Every width must print `PASS`. Do not report the header as fixed until it does,
and include the results in the reply.
