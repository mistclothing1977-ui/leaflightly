# LEAF LIGHTLY: IMPLEMENTATION TRACKER
## 6 Dimensions of Premium Elevation — Task-by-Task Execution

**Start Date:** 2026-10-13  
**Target Completion:** Phase 1 (13 hrs) + Phase 2 (58 hrs) + Phase 3 (50 hrs) = 121 hours

---

## DIMENSION 1: VISUAL HIERARCHY — Radical Asymmetry in Spacing

**Status:** 🔴 NOT STARTED

### Current Problem
- Padding uniform across all sections (2rem/1.5rem everywhere)
- Every section receives equal visual weight
- No breathing room hierarchy; eye scans checklist, not narrative

### Target State
- Hero: 8rem top padding
- Featured sections: 6rem spacing
- Category sections: 3rem spacing
- Variation creates rhythm and guides attention

### Tasks

#### Task 1.1: Hero Section Padding Audit
- [ ] Read `src/app/page.tsx` and `src/styles/globals.css`
- [ ] Find current hero padding values
- [ ] Update hero top padding from 2rem → 8rem
- [ ] Update hero bottom padding to 6rem
- [ ] Test on desktop/tablet/mobile

**Files to touch:**
- `src/app/page.tsx` (hero container)
- `src/styles/globals.css` or `src/app/page.module.css`

**Effort:** 1 hour  
**Owner:** [To assign]

#### Task 1.2: Section Spacing Standardization
- [ ] Audit all section containers (CuratedByCategory, ReviewsSection, etc.)
- [ ] Apply spacing hierarchy:
  - Featured spotlight sections: 6rem vertical
  - Catalog sections (categories, carousel): 3rem vertical
  - Newsletter/CTA sections: 8rem vertical
- [ ] Document spacing decisions in CSS comments

**Files to touch:**
- `src/components/CuratedByCategory.tsx` & `.module.css`
- `src/components/ReviewsSection.tsx` & `.module.css`
- `src/components/TierShowcase.tsx` & `.module.css`
- Any other major sections

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 1.3: Card & Component Padding
- [ ] Update card padding from 1rem → 1.5-2rem (breathing room)
- [ ] Increase gap between card elements (0.75rem → 0.8-1rem)
- [ ] Ensure consistent padding across ProductCard, CuratedCard, etc.

**Files to touch:**
- `src/components/ProductCard.module.css`
- `src/components/PremiumProductCard.module.css`
- Any card-based components

**Effort:** 1 hour  
**Owner:** [To assign]

#### Task 1.4: Verify on All Breakpoints
- [ ] Test spacing on desktop (>1024px)
- [ ] Test spacing on tablet (768-1024px) — reduce padding proportionally
- [ ] Test spacing on mobile (<768px) — compress to 1.5rem/1rem
- [ ] Screenshot each breakpoint
- [ ] Confirm spacing hierarchy is maintained across all sizes

**Effort:** 1 hour  
**Owner:** [To assign]

---

## DIMENSION 2: TYPOGRAPHY — Custom Fonts with Personality

**Status:** 🔴 NOT STARTED

### Current Problem
- Only system fonts (Segoe UI, BlinkMacSystemFont)
- No font personality or distinctiveness
- Line-height and letter-spacing not refined for premium feel

### Target State
- Custom font (Inter, Outfit, or Poppins)
- Refined line-height (1.15-1.25 on headings)
- Sophisticated letter-spacing (-0.01 to -0.02em on headings)
- Clear weight hierarchy (400/600/700/800)

### Tasks

#### Task 2.1: Add Custom Font
- [ ] Choose font: Inter or Outfit (both premium, clean)
- [ ] Add to `src/styles/globals.css` via Google Fonts
- [ ] Update font-family in root CSS variables
- [ ] Fallback: Inter, Outfit, system fonts

**Files to touch:**
- `src/styles/globals.css`

**Effort:** 1 hour  
**Owner:** [To assign]

```css
/* Add to globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

body {
  font-family: var(--font-primary);
}
```

#### Task 2.2: Refine Heading Line-Height & Letter-Spacing
- [ ] Update H1: line-height 1.15, letter-spacing -0.02em
- [ ] Update H2: line-height 1.2, letter-spacing -0.01em
- [ ] Update H3: line-height 1.25, letter-spacing 0
- [ ] Update body: line-height 1.6, letter-spacing 0
- [ ] Apply to all heading components

**Files to touch:**
- `src/styles/globals.css`
- Component-specific h1/h2/h3 definitions

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 2.3: Font Weight Hierarchy
- [ ] H1/H2: 800 weight (bold, premium)
- [ ] H3/labels: 700 weight (prominent)
- [ ] Body: 400 weight (readable)
- [ ] Accent text: 600 weight (emphasis without boldness)
- [ ] Ensure no weights beyond 800 (readability)

**Files to touch:**
- Component CSS files
- `src/styles/globals.css`

**Effort:** 1 hour  
**Owner:** [To assign]

#### Task 2.4: Test & Document
- [ ] Take screenshots of each heading level
- [ ] Verify custom font loads (check Network tab)
- [ ] Confirm readability on mobile (especially headings)
- [ ] Document font stack decision

**Effort:** 1 hour  
**Owner:** [To assign]

---

## DIMENSION 3: MEDIA STRATEGY — Video & Cinematography

**Status:** 🔴 NOT STARTED

### Current Problem
- Only product JPEGs on white backgrounds
- Zero video, zero dynamic content
- No storytelling; just documentation

### Target State
- Hero video background (4-6 sec loop)
- Product cinematography in featured sections
- Lazy-loading with poster frames
- Parallax scrolling on backgrounds

### Tasks

#### Task 3.1: Video Assets & Poster Frames
- [ ] Source or create 1-2 hero videos (4-6 sec, landscape, sustainable theme)
- [ ] Create poster frames for each video (JPG, fallback image)
- [ ] Store in `public/videos/` directory
- [ ] Document video specs: codec, size, duration, poster

**Files to create:**
- `public/videos/hero-background.mp4`
- `public/videos/hero-poster.jpg`

**Effort:** 3 hours (sourcing/creating assets)  
**Owner:** [To assign]

#### Task 3.2: Update PremiumHero Component
- [ ] Verify PremiumHero.tsx already has video support
- [ ] Connect to actual video file (currently uses placeholder)
- [ ] Set up lazy-loading and poster frame
- [ ] Test video autoplaying, muted, looping

**Files to touch:**
- `src/components/PremiumHero.tsx`
- `src/components/PremiumHero.module.css`

**Effort:** 1 hour  
**Owner:** [To assign]

#### Task 3.3: Add Video to Featured Sections
- [ ] Create `VideoBackground.tsx` component (reusable)
- [ ] Add to 1-2 major sections (FeaturedProductHero, etc.)
- [ ] Implement lazy-loading (Intersection Observer)
- [ ] Add poster frame fallback

**Files to touch:**
- `src/components/VideoBackground.tsx` (new)
- Sections using video

**Effort:** 4 hours  
**Owner:** [To assign]

#### Task 3.4: Parallax Scrolling on Hero Background
- [ ] Implement parallax effect in PremiumHero
- [ ] Background moves at 0.5x scroll speed
- [ ] Test on all breakpoints
- [ ] Ensure smooth performance (60fps)

**Files to touch:**
- `src/components/PremiumHero.module.css`
- `src/components/PremiumHero.tsx` (if React parallax needed)

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 3.5: Media Loading Optimization
- [ ] Implement `loading="lazy"` on all images
- [ ] Add blur-up placeholders for images
- [ ] Video: Set muted attribute, autoplay on desktop only
- [ ] Measure LCP improvement

**Files to touch:**
- All components with images/video

**Effort:** 2 hours  
**Owner:** [To assign]

---

## DIMENSION 4: INTERACTION DESIGN — Magnetic & Delightful

**Status:** ✅ PARTIALLY DONE (PremiumHero, PremiumProductCard components exist)

### Current Problem
- Basic hover transitions (color shifts, underlines)
- No magnetic buttons, no parallax, no state personality
- Interface feels responsive but not alive

### Target State
- Magnetic buttons (lift on hover, arrow moves right)
- Scroll-triggered animations (fade, scale, parallax)
- Spring easing on all interactions (cubic-bezier(0.34, 1.56, 0.64, 1))
- Loading states with personality (not generic spinners)

### Tasks

#### Task 4.1: Apply Magnetic Button Pattern Everywhere
- [ ] Update all CTA buttons to use magnetic effect
- [ ] Pattern: `transform: translateY(-8px)` + `box-shadow: 0 40px 80px`
- [ ] Apply to: Header CTA, Product "Explore" buttons, Newsletter button, etc.
- [ ] Update easing to spring-like cubic-bezier

**Files to touch:**
- Component CSS files with buttons
- `src/styles/globals.css` (button base styles)

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 4.2: Scroll-Triggered Animations
- [ ] Create `useScrollAnimation.tsx` hook (Intersection Observer)
- [ ] Add fade-in on scroll for section headings
- [ ] Add scale-in for cards
- [ ] Stagger animations by element (calc(var(--index) * 0.1s))
- [ ] Respect `prefers-reduced-motion`

**Files to touch:**
- `src/hooks/useScrollAnimation.ts` (new)
- Components using scroll animations

**Effort:** 3 hours  
**Owner:** [To assign]

#### Task 4.3: Loading States with Personality
- [ ] Replace generic spinners with custom skeleton loaders
- [ ] Implement shimmer animation on loading skeletons
- [ ] Add loading messages with aria-live announcements
- [ ] Test on product carousel, search results

**Files to touch:**
- Component loading states
- `src/components/SkeletonLoader.tsx` (new)

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 4.4: Hover State Refinement
- [ ] Audit all hover states (buttons, links, cards)
- [ ] Ensure spring easing (not linear)
- [ ] Add shadow expansion on hover (depth illusion)
- [ ] Test focus states for keyboard navigation
- [ ] Document hover patterns

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 4.5: Verify prefers-reduced-motion
- [ ] Add global CSS:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- [ ] Test with OS accessibility settings
- [ ] Confirm no animations for users with motion sensitivity

**Effort:** 1 hour  
**Owner:** [To assign]

---

## DIMENSION 5: LAYOUT ARCHITECTURE — Bento & Narrative

**Status:** 🔴 NOT STARTED

### Current Problem
- Linear, predictable layout (hero → categories → carousel → tier → newsletter)
- Standard grids (repeat(auto-fill, minmax(...)))
- No editorial storytelling, no unexpected moments

### Target State
- Bento grid layouts (asymmetric 1/3, 1/2, full-width mixes)
- Sticky scroll sections (narrative unfolds as user scrolls)
- Featured product spotlights (break out of catalog grid)
- Parallax depth effects

### Tasks

#### Task 5.1: Create BentoGrid Component
- [ ] Build reusable `BentoGrid.tsx` component
- [ ] Support grid items: full-width, 2-column, 3-column spans
- [ ] Add gap customization
- [ ] Create CSS patterns for asymmetric layouts

**Files to touch:**
- `src/components/BentoGrid.tsx` (new)
- `src/components/BentoGrid.module.css` (new)

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 5.2: Redesign "Curated From Every Category" Section
- [ ] Replace current grid with bento layout
- [ ] Pattern: [Featured full-width] [1/3] [1/3] [1/3] [Stacked pair]
- [ ] Make featured card larger, more prominent
- [ ] Apply glassmorphism to featured card

**Files to touch:**
- `src/components/CuratedByCategory.tsx`
- `src/components/CuratedByCategory.module.css`

**Effort:** 3 hours  
**Owner:** [To assign]

#### Task 5.3: Create StickyScrollSection Component
- [ ] Build `StickyScrollSection.tsx` (reusable)
- [ ] Left side sticks; right side scrolls
- [ ] Text content on left, images/video on right (or vice versa)
- [ ] Implement with CSS or react-scroll-reveal

**Files to touch:**
- `src/components/StickyScrollSection.tsx` (new)
- `src/components/StickyScrollSection.module.css` (new)

**Effort:** 3 hours  
**Owner:** [To assign]

#### Task 5.4: Add Sticky Scroll to "How It Works"
- [ ] Update "How It Works" section to use StickyScrollSection
- [ ] Left: Steps (sticks as user scrolls)
- [ ] Right: Images/video (scrolls into view)
- [ ] 3-4 steps with narrative flow

**Files to touch:**
- `src/components/HowItWorks.tsx` (if exists, or create)

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 5.5: Parallax Depth on Section Backgrounds
- [ ] Add background parallax to 2-3 major sections
- [ ] Background moves at different speed than content
- [ ] Create depth illusion
- [ ] Test on mobile (reduce effect or disable)

**Files to touch:**
- Major section CSS files

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 5.6: Featured Product Spotlight
- [ ] Create `FeaturedProductSpotlight.tsx` component
- [ ] Larger card (2x normal size) with more details
- [ ] Showcase in bento grid prominently
- [ ] Add CTA/call-to-action

**Files to touch:**
- `src/components/FeaturedProductSpotlight.tsx` (new)

**Effort:** 2 hours  
**Owner:** [To assign]

---

## DIMENSION 6: COLOR & THEME — Gradients, Dark Mode & Glassmorphism

**Status:** 🟡 PARTIALLY DONE (Base palette exists, PremiumHero/ProductCard have glassmorphism)

### Current Problem
- Uniform color application (no gradients, no depth)
- No dark mode
- Limited use of glassmorphism and translucency

### Target State
- Subtle gradients on backgrounds and UI elements
- Dark mode toggle (CSS custom properties theme switching)
- Glassmorphism on badges, cards, overlays
- Layered shadows for depth hierarchy

### Tasks

#### Task 6.1: Define Dark Mode Color Variables
- [ ] Create dark theme CSS custom properties
- [ ] Define dark backgrounds, text colors, accents
- [ ] Test contrast ratios (must meet WCAG AA)
- [ ] Update globals.css with dark mode media query

**Files to touch:**
- `src/styles/globals.css`

**Effort:** 1 hour  
**Owner:** [To assign]

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-primary: #2d6d42;
    --color-accent: #FFB74A;
    --color-text-primary: #E8E6E3;
    --color-bg: #1a1a18;
    /* ... more variables ... */
  }
}
```

#### Task 6.2: Create Dark Mode Toggle
- [ ] Add theme toggle button to Header
- [ ] Toggle updates `data-theme` attribute on document root
- [ ] Persist preference in localStorage
- [ ] Respect system preference if no user selection

**Files to touch:**
- `src/components/Header.tsx`
- `src/components/ThemeToggle.tsx` (new)
- localStorage logic

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 6.3: Add Subtle Gradients
- [ ] Hero background: Subtle gradient overlay
- [ ] Featured section backgrounds: Gradient from primary to transparent
- [ ] Card backgrounds: Optional gradient (light to lighter)
- [ ] Accent elements: Gradient hover states

**Files to touch:**
- Component CSS files

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 6.4: Enhance Glassmorphism Usage
- [ ] Verify glassmorphism on PremiumHero tier badge
- [ ] Verify glassmorphism on PremiumProductCard
- [ ] Add glassmorphism to: Newsletter signup, tier badges, discount badges
- [ ] Test backdrop-filter performance on mobile

**Files to touch:**
- Component CSS files
- `src/components/PremiumHero.module.css`
- `src/components/PremiumProductCard.module.css`

**Effort:** 2 hours  
**Owner:** [To assign]

#### Task 6.5: Shadow Hierarchy
- [ ] Soft shadows on subtle elements (0 4px 12px rgba(..., 0.08))
- [ ] Medium shadows on elevated elements (0 8px 32px rgba(..., 0.15))
- [ ] Pronounced shadows on prominent elements (0 20px 60px rgba(..., 0.3))
- [ ] Create CSS utility classes for shadow levels

**Files to touch:**
- `src/styles/globals.css` (shadow utilities)
- Component CSS files

**Effort:** 1 hour  
**Owner:** [To assign]

#### Task 6.6: Dark Mode Testing
- [ ] Enable dark mode in OS settings (macOS/Windows)
- [ ] Test all pages in dark mode
- [ ] Verify contrast ratios (WCAG AA)
- [ ] Screenshot light & dark side-by-side
- [ ] Check glassmorphism appearance in dark mode

**Effort:** 1 hour  
**Owner:** [To assign]

---

## SUMMARY TABLE

| Dimension | Status | Tasks | Effort | Priority |
|-----------|--------|-------|--------|----------|
| 1. Visual Hierarchy | 🔴 | 4 tasks | 5 hrs | P0 |
| 2. Typography | 🔴 | 4 tasks | 5 hrs | P0 |
| 3. Media Strategy | 🔴 | 5 tasks | 12 hrs | P1 |
| 4. Interaction Design | 🟡 | 5 tasks | 10 hrs | P0 |
| 5. Layout Architecture | 🔴 | 6 tasks | 14 hrs | P1 |
| 6. Color & Theme | 🟡 | 6 tasks | 9 hrs | P1 |
| **TOTAL** | | **30 tasks** | **55 hrs** | |

---

## NEXT STEP

**Start with Dimension 1 (Visual Hierarchy)** — Quick wins that immediately elevate perceived quality:
1. Read current padding values
2. Update hero to 8rem top padding
3. Apply spacing hierarchy to all sections
4. Test on mobile/tablet/desktop

Estimated time: **5 hours**  
Impact: **Immediate visual elevation**

Ready to begin Task 1.1?

---

**Tracking format:**
- 🔴 = Not started
- 🟡 = Partially done
- ✅ = Complete

Update this tracker as tasks complete. File completion screenshots in `/docs/implementation/`.
