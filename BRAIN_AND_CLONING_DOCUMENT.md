# LEAF LIGHTLY: BRAIN AND CLONING DOCUMENT
## Master Project DNA & New Project Bootstrap Guide

**Version:** 1.4  
**Last Updated:** 2026-10-14 (v1.4: measured breakpoints, testing, dependencies, capacity; v1.3: layout (no 100vw, 320px phones), production resilience, growth features; v1.2: media performance, shipping, email/newsletter and placeholder standards; v1.1: asset & header guardrails, root scale)  
**Purpose:** Preserve and replicate Leaf Lightly's design standards, processes, and premium positioning across new projects  
**For:** New designers, new projects, post-rollout quality gates, architecture decisions

---

## SECTION 1: PROJECT IDENTITY

### Brand Promise
Leaf Lightly is **the premium curator of sustainable products**. We position ourselves **above commodity resellers** through:
- **Cinematic storytelling** over static product documentation
- **Intentional delight** in every micro-interaction
- **Premium visual hierarchy** that guides users through narrative
- **World-class accessibility** (WCAG 2.1 AA, aspiring 2.2 AAA)

### Market Positioning
We compete with:
- **Stripe** (B2B SaaS polish standard)
- **Apple** (premium positioning & visual hierarchy)
- **Airbnb** (consumer storytelling & media integration)
- **Linear** (interaction design delight)

**Not with:** Generic e-commerce templates (Shopify defaults, WooCommerce stock designs)

### Design Philosophy
> "Accessible, premium, intentional. Every pixel earns its place. Every interaction should delight, not confuse."

---

## SECTION 2: TECH STACK & CONSTRAINTS

### Core Technologies
- **Framework:** Next.js 16.4.0 with Turbopack
- **React:** 19.0
- **Styling:** CSS Modules (strict scoping, no globals)
- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring-like, premium feel)
- **Font Scaling:** `clamp()` functions (responsive without breakpoint jumps)
- **Auth:** NextAuth.js v4.24.0 (OAuth implementation)
- **Data:** localStorage for wishlist persistence, Next.js API routes

### Responsive Breakpoints
```
Desktop:   >1024px
Tablet:    768px-1024px
Mobile:    <768px
```

**Header behaviour by width (locked — see `CLAUDE.md`):**
- **≥1260px:** one row — logo + wordmark, nav, search (shrinks 400px → 140px), theme toggle, auth.
- **1101–1259px:** one row, wordmark hidden, tighter spacing.
- **≤1100px (compact):** two rows — logo, theme toggle, auth, menu / full-width search. Nav opens as a scrollable row below. Top row stays on one line down to 320px.

**Verify every header change** with `scripts/header-check.js` at 1890, 1440, 1280, 1100, 1024, 900, 800, 769, 414, 375, 360 and 320px, signed out (Login + Sign Up is the widest top row). All must print `PASS`; at ≤480px the top row must stay on one line.

### Color Palette
```
Primary:     #1a472a (earthy green, sustainability signal)
Accent:      #FF6B35 (warm orange, call-to-action)
Text Primary: #2A2A26 (near-black, readable on light)
Text Secondary: #8B7355 (darkened brown, WCAG AA compliant on light bg)
Background:  #F8F6F3 (warm cream, premium feel)
```

### CSS Custom Properties (Variables)
Always define in `:root` and respect dark mode:
```css
:root {
  --color-primary: #1a472a;
  --color-accent: #FF6B35;
  --color-text-primary: #2A2A26;
  --color-text-secondary: #8B7355;
  --color-bg: #F8F6F3;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-primary: #2d6d42;
    --color-bg: #1a1a18;
    /* ... etc ... */
  }
}
```

---

## SECTION 3: DESIGN SYSTEM & COMPONENTS

### Premium Component Tiers

#### Tier 1: Core Components (Must exist)
These are the foundation — every project needs them, and they set the tone:

| Component | Location | Purpose | Key Feature |
|-----------|----------|---------|-------------|
| **PremiumHero** | `src/components/PremiumHero.tsx` | Page hero with cinematic background | Parallax scroll, glassmorphism badge, magnetic CTA, staggered fade-ins |
| **PremiumProductCard** | `src/components/PremiumProductCard.tsx` | Product showcase in grid | Glassmorphism, cursor-following spotlight, image zoom on hover |
| **Header** | `src/components/Header.tsx` | Navigation & brand anchor | Refined typography, keyboard accessibility (Escape key), consistent underlines |
| **NavWithMegaMenu** | `src/components/NavWithMegaMenu.tsx` | Category navigation | Aria-expanded, Escape key close, focus management |

#### Tier 2: Enhancement Components (Upgrade to these)
Once core components are solid, elevate with:

| Component | Purpose | Timing |
|-----------|---------|--------|
| **BentoGrid** | Asymmetric layouts for featured content | Phase 2 |
| **StickyScrollSection** | Narrative-driven scroll interactions | Phase 2 |
| **ScrollTriggeredAnimation** | Intersection Observer wrapper for fade/scale/parallax | Phase 3 |
| **MagneticButton** | Button with cursor-pull & spring easing | Phase 3 |

#### Tier 3: Specialty Components (As needed)
Context-specific enhancements:

| Component | Use Case |
|-----------|----------|
| **VideoBackground** | Hero sections, featured sections |
| **SkeletonLoader** | Loading states with shimmer animation |
| **DarkModeToggle** | Theme switching (CSS custom properties) |

### Component Pattern: Glassmorphism

Glassmorphism appears on:
- Premium badges (tier indicators, discount badges)
- Card overlays
- Hero tier badges

**CSS Pattern:**
```css
.glassElement {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}

.glassElement.dark {
  background: rgba(26, 71, 42, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
}
```

---

## SECTION 4: INTERACTION DESIGN STANDARDS

### Easing & Animation

**Gold Standard Easing:**
```
cubic-bezier(0.34, 1.56, 0.64, 1) 
```
This easing creates a spring-like, slightly overshoot effect = **premium feel**.

**Use for:**
- Hover state transitions (buttons, cards)
- Scroll-triggered reveals
- Any interaction that should feel delightful

**Avoid:**
- Linear easing (feels robotic)
- ease-in-out (feels generic)
- ease (default, too slow)

### Micro-interaction Patterns

#### 1. Magnetic Buttons
```css
.magneticButton:hover {
  transform: translateY(-8px);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
}

.magneticButton:hover .icon {
  transform: translateX(4px);
}
```

**Timing:** 0.4s with spring-like easing  
**Effect:** Button "lifts" toward cursor, icon moves right  
**Where:** CTAs, primary actions

#### 2. Spotlight Effects
```css
.spotlight {
  position: absolute;
  background: radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%);
  width: 300px;
  height: 300px;
  top: var(--y, 0px);
  left: var(--x, 0px);
  pointer-events: none;
}
```

**Update on mousemove:** Set CSS custom properties `--x` and `--y`  
**Effect:** Glowing circle follows cursor  
**Where:** Premium product cards, featured sections  
**Disable on:** Mobile (pointer events make it disruptive)

#### 3. Scroll-Triggered Animations
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

observer.observe(element);
```

**Apply animations:**
```css
.fadeInOnScroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(...), transform 0.6s cubic-bezier(...);
}

.fadeInOnScroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Stagger pattern:** Each child element animates with `animation-delay: calc(var(--index) * 0.1s)`

#### 4. Loading States
Never use generic spinners. Use:
- Custom SVG animation
- Skeleton loaders with shimmer
- Pulsing opacity on existing content

**Pattern:**
```css
.shimmer {
  background: linear-gradient(
    90deg,
    var(--color-bg) 0%,
    rgba(255,255,255,0.3) 50%,
    var(--color-bg) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Accessibility in Interactions

**Always:** Respect `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Always:** Ensure focus states are visible
```css
button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Aria attributes on interactive elements:**
```jsx
<button
  aria-label="Add to cart"
  aria-pressed={isActive}
  aria-expanded={isOpen}
/>
```

---

## SECTION 5: TYPOGRAPHY STANDARDS

### Font Stack

**Recommended:**
```css
font-family: "Inter", "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
```

**Loading (if custom font):**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
```

### Hierarchy

| Level | Size | Weight | Line-Height | Letter-Spacing |
|-------|------|--------|-------------|-----------------|
| H1 | clamp(2.5rem, 6vw, 4.5rem) | 800 | 1.15 | -0.02em |
| H2 | clamp(2rem, 4vw, 3rem) | 800 | 1.2 | -0.01em |
| H3 | clamp(1.25rem, 2vw, 1.75rem) | 700 | 1.25 | 0 |
| Body | 1rem | 400 | 1.6 | 0 |
| Small | 0.875rem | 500 | 1.5 | 0 |

**Root scale:** `html { font-size: 87.5%; }` (14px at browser default). All `rem` sizes above scale from this. Change site-wide density here, never per component. Use `%`, not `px`, so users' browser font settings still apply. Fixed `px` items (logo heights, header min-height, icon sizes) don't follow the root — adjust them deliberately.

**Nav text:** one variable, `--nav-font-size` on `.header` (1.05rem desktop / 0.95rem ≤1024px / 0.85rem ≤768px), read by every nav link. Never hard-code nav font sizes in individual components.

### Why This Stack Matters

- **Custom font** signals premium positioning (vs. system defaults)
- **Letter-spacing on headings** refines luxury feel
- **Line-height refinement** (1.15-1.25 on headings) prevents cramped feel
- **clamp() scaling** = responsive without breakpoint jumps
- **Distinct weights** (400/600/700/800) creates clear hierarchy

---

## SECTION 6: LAYOUT & SPACING STANDARDS

### Visual Hierarchy Through Spacing

**Radical Asymmetry Rule:**
Avoid identical padding across all sections. Instead, vary to guide attention:

```
Hero:        8rem vertical padding
Featured:    6rem vertical padding
Catalog:     3rem vertical padding
Newsletter:  8rem vertical padding (CTA emphasis)
```

This variation creates **rhythm and narrative flow**.

### Bento Grid Pattern

Replace standard `repeat(auto-fill, minmax(...))` grids with asymmetric layouts:

```css
.bentoGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.bentoItem {
  &:nth-child(1) { grid-column: 1 / -1; } /* Full width */
  &:nth-child(2) { grid-column: 1 / 2; }
  &:nth-child(3) { grid-column: 2 / 3; }
  &:nth-child(4) { grid-column: 3 / -1; } /* 2-column span */
}
```

**Effect:** Creates visual interest; breaks template monotony; guides eye

### Padding & Margin Conventions

```
Container padding:     3rem (desktop), 1.5rem (mobile)
Card padding:          1.5rem-2rem
Section gap:           0.8rem-1rem
Heading margin-bottom: 1-1.5rem
```

---

## SECTION 7: DESIGN AUDIT PROTOCOL (Critical)

### The 6-Dimension Framework

Every major rollout must be audited against:

1. **Visual Hierarchy & White Space** — Is spacing intentional? Do CTAs pop?
2. **Typography** — Custom fonts? Refined line-height? Distinctive?
3. **Media Integration** — Video? Parallax? Storytelling or documentation?
4. **Micro-interactions** — Magnetic buttons? Spring easing? Delightful?
5. **Layout Architecture** — Bento patterns? Asymmetric? Innovative?
6. **Color & Theme** — Layered with gradients? Dark mode? Glassmorphism?

### When to Audit

- ✅ Post-Phase 1 rollout (within 1 week)
- ✅ Pre-Phase 2 shipping (before code freeze)
- ✅ Major feature additions (within 2 weeks)
- ✅ Quarterly brand reviews (every 3 months)

### Audit Scoring

| Score | Interpretation | Action |
|-------|---|---|
| ✅ Excellent | Meets premium standard; competitive | Keep as-is |
| 🟡 Good | Acceptable; could be elevated | Log as optimization |
| 🔴 Fair | Below standard; noticeable gap | Flag for remediation |
| ❌ Poor | Significant gap; impacts brand | Blocker; fix before ship |

**See:** [DESIGN_AUDIT_PROTOCOL.md](DESIGN_AUDIT_PROTOCOL.md) for full process, templates, and benchmarks.

---

## SECTION 8: ACCESSIBILITY REQUIREMENTS

### Compliance Baseline
- **WCAG 2.1 Level AA** (mandatory for shipping)
- **WCAG 2.2 Level AAA** (aspirational target)

### Critical Checks

#### Color Contrast
```
Text on background: ≥4.5:1 ratio
Large text (18pt+): ≥3:1 ratio
UI components: ≥3:1 ratio
```

**Leaf Lightly palette audit result:**
- ✅ #2A2A26 on #F8F6F3 = 13:1 (excellent)
- ✅ #FF6B35 on #F8F6F3 = 5.2:1 (AA compliant)
- ✅ #8B7355 on #F8F6F3 = 4.5:1 (AA compliant) *[updated from #C9B8A0]*

#### Keyboard Navigation
Every interactive element must:
- Be focusable (tabindex if not native button/link)
- Have visible focus state
- Be operable via keyboard (Enter, Space, Escape, Arrow keys)

**Pattern:**
```jsx
<button
  onClick={action}
  onKeyDown={(e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowDown') openMenu();
  }}
>
  Action
</button>
```

#### Screen Reader Announcements
```jsx
{/* Loading state */}
<div role="status" aria-live="polite">
  Loading products...
</div>

{/* Filter state */}
<a aria-current="page">Kitchen</a>

{/* Required field */}
<input aria-required="true" />
<span aria-label="required">*</span>

{/* Decorative emoji */}
<span aria-hidden="true">🌱</span>
```

#### Form Accessibility
```jsx
<label htmlFor="email">Email *</label>
<input
  id="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "error-message" : undefined}
/>
{hasError && <p id="error-message" role="alert">Invalid email</p>}
```

---

## SECTION 9: PERFORMANCE & CORE WEB VITALS

### Targets
- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

### Key Optimizations

#### Image Optimization
```jsx
<Image
  src={image}
  alt="Product"
  width={400}
  height={400}
  loading="lazy"
  priority={isAboveFold}
/>
```

#### Video Loading Strategy
```jsx
<video
  src={video}
  poster={posterImage}
  loading="lazy"
  muted
  autoPlay
  loop
>
  <source src={video} type="video/mp4" />
</video>
```

**Use:** Lazy-load with poster frame; autoplay only if above fold

#### CSS Performance
- Use CSS Modules (no global style creep)
- Avoid `* { transition: all }` (use specific properties)
- Use `will-change: transform, opacity` on animated elements
- Minimize backdrop-filter (expensive on mobile)

---

## SECTION 10: NEW PROJECT BOOTSTRAP CHECKLIST

When starting a new project with Leaf Lightly's DNA:

### Phase 0: Foundation Setup (1-2 days)

- [ ] Clone this document into the new project
- [ ] Copy tech stack from Section 2 (Next.js 16+, CSS Modules, etc.)
- [ ] Define color palette (use Leaf Lightly's palette or adapt)
- [ ] Set up CSS custom properties in globals.css
- [ ] Install Fonts (Inter, Outfit, etc.)
- [ ] Create dark mode CSS variables

### Phase 1: Core Components (1 week)

- [ ] Build PremiumHero (parallax, glassmorphism, magnetic CTA)
- [ ] Build PremiumProductCard (spotlight, zoom, tier badge)
- [ ] Build Header with keyboard accessibility
- [ ] Build NavWithMegaMenu with Escape key handler
- [ ] Audit against 6 dimensions (Section 7)
- [ ] Fix accessibility issues

**Effort:** ~13 hours

### Phase 2: Architecture & Media (2-3 weeks)

- [ ] Implement video loading strategy
- [ ] Build BentoGrid component
- [ ] Build StickyScrollSection component
- [ ] Redesign featured sections with asymmetric layouts
- [ ] Implement dark mode toggle
- [ ] Audit Phase 2 design

**Effort:** ~58 hours

### Phase 3: Polish & Interactions (1-2 weeks)

- [ ] Add scroll-triggered animations
- [ ] Implement magnetic button animations
- [ ] Add spring-eased micro-interactions
- [ ] Create custom loading states
- [ ] Final accessibility audit (WCAG 2.2 AAA)
- [ ] Optimize images & videos
- [ ] Final design audit before shipping

**Effort:** ~50 hours

### Post-Launch Quality Gate

- [ ] Run full design audit (see Section 7)
- [ ] File audit report in `/docs/audits/audit_phase1_[date].md`
- [ ] Log P0/P1 issues as backlog items
- [ ] Schedule next audit (quarterly or next phase)

---

## SECTION 11: DECISION FRAMEWORK

### Micro-interactions: When & When Not

**DO add micro-interactions when:**
- The interaction rewards user attention (delight)
- It clarifies state change (feedback)
- It guides narrative (intentional)

**DON'T when:**
- Animation is purely decorative
- It delays user action
- It repeats endlessly and becomes annoying

**Example good pattern:**
```css
button:hover {
  /* Subtle lift = feedback that hover was registered */
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(...);
}

button:active {
  /* Click feedback = confirm state change */
  transform: translateY(0px);
}
```

### Component Reusability

**Build reusable if:**
- Used in 3+ places
- Likely to be copied to new projects

**Build one-off if:**
- Specific to single use case
- High customization needed
- Context-dependent

### Color Decisions

Always ask:
1. Does this contrast meet WCAG AA (4.5:1 for text)?
2. Does it convey hierarchy (primary/secondary/accent)?
3. Does it work in dark mode?

**If any answer is "no," iterate.**

---

## SECTION 12: DOCUMENTATION STANDARDS

### For New Projects Inheriting This DNA

1. **Copy DESIGN_AUDIT_PROTOCOL.md**
   - Customize competitor references if industry differs
   - Adjust dimension standards if brand differs

2. **Copy DESIGN_AUDIT_PREMIUM_OVERHAUL.md**
   - Reference for Phase 1/2/3 component specs

3. **Copy BRAIN_AND_CLONING_DOCUMENT.md** (this file)
   - Serves as the master DNA guide

4. **Maintain `/docs/audits/` folder**
   - File each completed audit: `audit_[phase]_[date].md`
   - Reference DESIGN_AUDIT_PROTOCOL.md template

### For Ongoing Teams

- Run audits on schedule (Section 7, "When to Audit")
- File reports in version control
- Reference audit findings in retrospectives
- Update this document when standards evolve

---

## SECTION 13: VERSION CONTROL & EVOLUTION

### Document Ownership
- **Owner:** Design Lead
- **Reviewers:** Product Manager, Tech Lead
- **Update Frequency:** Quarterly or after major phase rollout

### When to Update This Document
- New component patterns discovered/validated
- Design standards evolve
- Audit process improved
- New technology adoption (font library, animation framework)

### Keep in Git
These files belong in version control:
- BRAIN_AND_CLONING_DOCUMENT.md
- CLAUDE.md (locked rules every AI session reads) and scripts/header-check.js
- MRB.md (replication blueprint — landmines LM-001–LM-016, lessons, next steps §7.4)
- WORKFLOW.md (Change → Verify → Ship steps, env vars, database, newsletter)
- DESIGN_AUDIT_PROTOCOL.md
- DESIGN_AUDIT_PREMIUM_OVERHAUL.md (reference)
- `/docs/audits/audit_*.md` (completed audit reports)

---

## SECTION 14: QUICK REFERENCE

### Gold Standards
- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring-like)
- **Font:** Inter, Outfit, +system fallback
- **Color contrast:** ≥4.5:1 on text
- **Animation duration:** 0.3-0.6s for most interactions
- **Spacing:** Radical asymmetry (3rem-8rem varies by section)
- **Components:** PremiumHero, PremiumProductCard, Header, NavWithMegaMenu
- **Audit:** Every major rollout, within 1 week

### Common Pitfalls to Avoid
- ❌ Uniform spacing across all sections (feels template-like)
- ❌ Only system fonts (looks generic)
- ❌ Linear easing on hover (feels robotic)
- ❌ No dark mode (incomplete)
- ❌ Skipping accessibility (fails WCAG, blocks users)
- ❌ Over-animating (annoying, affects performance)
- ❌ Spotlight effects on mobile (pointer events are disruptive)
- ❌ Trusting a file named "transparent" — check its alpha channel first
- ❌ Fixing image problems with CSS (blend modes, background colours) when the problem is in the pixels
- ❌ Overwriting an asset in place and judging the fix from a cached page — use a new filename
- ❌ The same visual value (e.g. nav font size) hard-coded in two components
- ❌ Judging layout from a small screenshot — measure overlap and clipping at every breakpoint
- ❌ `overflow: hidden` on a container that holds dropdowns/menus (it clips them)
- ❌ Rewriting source files with Windows PowerShell 5.1 `Get-Content`/`Set-Content` (corrupts `£`, adds BOM)

### Asset & Layout Guardrails (learned 2026-10-13)

**Logo assets**
- One visible logo file: `public/assets/logos/logo-mark.png` — the leaf mark with a genuinely transparent background (keyed out from pixels). Used by header, footer and SEO structured data.
- Before using any logo, verify it: alpha extrema must not be `(255, 255)`; composite it on magenta and confirm no box or halo.
- Logo sizes: 48px desktop, 40px ≤768px, 32px ≤480px; footer 88 / 72 / 56px.
- No WebP for the visible logo (owner decision).

**Process for any visual bug**
1. Diagnose first: inspect the asset data or measure the layout; state the root cause.
2. Fix at the source of truth (the image pixels, the shared variable), not with overrides.
3. Verify with measurements at all breakpoints, then show the results.
4. If an area breaks repeatedly, lock it in `CLAUDE.md` with an automated check.

**Media performance (learned 2026-10-14)**
- Hero/background video: 1080p H.264, CRF 26–27, no audio, `+faststart`; target ≤10 MB. Never ship 4K (the 47 MB hero → 8.4 MB with no visible loss).
- Give the hero video a poster frame; lazy-mount below-the-fold videos (IntersectionObserver, ~600px margin) so first load fetches only the hero.
- Keep section heights fixed so lazy media doesn't shift the layout.

**Shipping (learned 2026-10-13/14)**
- "Works locally" ≠ "deployed". After every push, confirm the hosting provider's deploy status is success, then check the live URL. Hours of pushes once silently failed.
- "It builds" ≠ "it works". When unblocking a build, trace the feature end-to-end (write path → read path → schema → database) before calling it done.
- Third-party services must not crash the build: create API clients (email, payments) lazily, on first use.
- Production needs its secrets set explicitly (auth secret, cron secret, token secrets). A missing auth secret took down every sign-in route.

**Email & newsletter standards**
- Double opt-in with signed confirm links; signed one-click unsubscribe links plus `List-Unsubscribe` headers (legal requirement under UK/EU rules; required by Gmail/Yahoo for bulk mail).
- Build each email per recipient — never share one rendered email (with one person's links/address) across a batch.
- Scheduled jobs authenticate with a bearer secret and fail closed if it's unset.
- One database, one schema. Never let a feature read from tables nothing writes to.

**Layout (learned 2026-10-14)**
- Never use `100vw` for full-width sections: it includes the scrollbar on Windows and makes every page scroll sideways. Break out of the content padding with negative margins tied to one variable (`--main-pad`).
- Support 320px phones. Test the widest state (e.g. signed-out header with Login + Sign Up); keep tap targets ≥40–44px while tightening gaps.
- Rules written for one element (e.g. a min-width for menu links) must not leak onto others that share a class — scope them.

**Production resilience (learned 2026-10-14)**
- Test one real write on the **live** site after any database-backed change and confirm it lands in the expected database. Production config (database host, secrets, third-party URLs) can be broken while local works.
- Optional infrastructure (rate limiter, cache, analytics) must fail open with a warning — never take a core feature down.
- Libraries that need a browser DOM on the server (e.g. `isomorphic-dompurify` → `jsdom`) can crash serverless functions at load; keep them out of shared modules used by public routes.
- Never log or return raw database errors: they contain the query and its parameters (emails, password hashes). Log only the error type and code.

**Responsive breakpoints (learned 2026-10-14)**
- Choose breakpoints by measuring where the content actually fits, not by device labels. Find the widest state (signed out), step the width down until it wraps, and set the breakpoint there (here: compact ≤1100px, wordmark hidden ≤1259px).
- When several files share a breakpoint, list every file in the locked rules and change them together (header, search, mega-menu, check script).

**Testing (learned 2026-10-14)**
- A test file that never runs is worse than none: it looks like coverage. Install the runner (`vitest`) and make `npm test` a required step before every push.
- Tests can be wrong: before "fixing" code to match a failing test, check the test's expectation is still correct (e.g. a weekly email cap means not everyone is sent).
- Test against real config files (`vercel.json`) rather than hard-coded copies.
- Security-critical helpers (signed links, cron auth, sanitising, error redaction) each need tests that prove the attack fails, not just that the happy path works.

**Dependencies**
- On the server, prefer pure-JS libraries over ones that emulate a browser (`sanitize-html`, not `isomorphic-dompurify`/`jsdom`).
- Respect peer dependencies instead of forcing installs; pick the compatible major version (e.g. Vitest 3 with `@types/node` 20).

**Capacity**
- Know your sending limits (Resend free: 100/day → 700/week). Report overflow and warn at ~90% rather than silently dropping recipients.

**Growth features**
- Shareable links should carry only what's needed (e.g. product ids), never account data; mark shared pages `noindex`; give visitors a next step (browse, start their own list).
- Never promise a feature in copy that doesn't exist (e.g. "we'll notify you of price drops").

**Placeholders & third parties**
- Use local placeholders (e.g. a branded "image coming soon" SVG), not free placeholder services that can disappear.
- Product images only from sources that grant usage rights (affiliate programmes, brand media kits, own photos).
- Social icons: official brand marks via `simple-icons`, not letters.

---

## SECTION 15: GETTING HELP

### Questions About...

**Design standards?**  
→ See Section 3 (Components), Section 4 (Interactions), Section 5 (Typography)

**Auditing this project?**  
→ See Section 7 (Design Audit Protocol) and DESIGN_AUDIT_PROTOCOL.md

**Building a new project with this DNA?**  
→ See Section 10 (Bootstrap Checklist)

**Accessibility requirements?**  
→ See Section 8 (Accessibility) and WCAG 2.1 Level AA docs

**Performance targets?**  
→ See Section 9 (Core Web Vitals)

**Interaction patterns?**  
→ See Section 4 (Micro-interactions)

---

## FINAL NOTE: The DNA

This document captures **Leaf Lightly's design DNA** — not just what we build, but *how* and *why*. When you copy it to a new project, you're not copy-pasting code; you're inheriting a philosophy:

> **Premium through intention. Accessible by default. Delightful in every interaction.**

Everything in this document serves that principle. Before adding a feature, changing a color, or tweaking an animation — ask: *Does this serve the principle?*

If yes, build it. If no, iterate.

---

**Document prepared for:** Product, Engineering, Design teams  
**Version control:** Yes, keep in git  
**Update frequency:** Quarterly  
**Last updated:** 2026-10-13  
**Next review:** 2026-12-13

**To bootstrap a new project:**
1. Copy this file (BRAIN_AND_CLONING_DOCUMENT.md)
2. Copy DESIGN_AUDIT_PROTOCOL.md
3. Follow Section 10 (Bootstrap Checklist)
4. Run design audits at each phase gate
5. Keep audit reports in `/docs/audits/`

---

**Questions? Feedback?**  
Open an issue or create a discussion thread. This document is living and evolves with the project.
