@AGENTS.md

# Home page (locked — 2026-10-14)

Do not change the home page (`src/app/page.tsx` and the sections it renders: PremiumHero, VideoBlock,
ProblemStatement, ImpactCounter, OurApproach, TierSystemRedesigned, FeaturedProducts, CustomerStories,
NewsletterSection) unless the owner explicitly asks. Report issues found there instead of fixing them.

# Header rules (locked — change only when the owner explicitly overrides)

The header has regressed repeatedly. These rules stand until the owner says otherwise.

## Do not change without explicit owner approval
- Logo: `public/assets/logos/logo-mark.png` (transparent, background keyed out). Never swap to another
  logo file, never use WebP for the visible logo, never add a background/box behind it.
- Logo size: 48px desktop, 40px ≤768px, 32px ≤480px (`Header.module.css` `.logo`).
- Nav text size comes from ONE variable: `--nav-font-size` on `.header` in `Header.module.css`
  (1.05rem desktop, 0.95rem ≤1024px, 0.85rem ≤768px). `NavWithMegaMenu.module.css` `.link` reads it.
  Never set a font-size on `.navLink` or `.link` directly — that is what caused Home/Wishlist to
  render a different size from the category links.
- `.nav` is `flex: 0 0 auto` (never shrinks). The search box (`SearchBar.module.css` `.container`,
  `flex: 0 1 400px; min-width: 140px`) absorbs spare width. `.header` is `flex-wrap: wrap` so a
  too-narrow width wraps to a second row instead of overlapping.
- ≤768px layout: two rows (logo, theme toggle, auth, menu / full-width search); `.rightSection`
  is `display: contents`; nav dropdown is `position: absolute; top: 100%`.
- Root font size is `87.5%` in `globals.css`.
- Never put `overflow: hidden` on `.header` (desktop or mobile) — it clips the mega-menu dropdowns.
  Desktop dropdowns must open fully when hovering each category.

## Required check after ANY edit to Header, NavWithMegaMenu, SearchBar, ThemeToggle or globals.css
Run `scripts/header-check.js` in the browser at widths 1890, 1440, 1280, 1100, 1024, 900, 800,
769 and 375. Every width must print `PASS`. Do not report the header as fixed until it does,
and include the results in the reply.
