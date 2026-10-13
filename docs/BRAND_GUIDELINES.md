# Leaf Lightly Brand Guidelines

**Version**: 1.0  
**Last Updated**: 2026-10-12  
**Owner**: Design Agent

---

## Brand Identity

### Mission
To curate the world's most sustainably beautiful products—removing the guesswork, eliminating greenwashing, and making conscious consumption accessible, transparent, and affordable.

### Brand Values
- **Transparency** - We disclose our sources, methods, and affiliate relationships
- **Curation** - Every product is vetted; quality over quantity
- **Accessibility** - Premium sustainability for everyday people
- **Authenticity** - No eco-lite or performative sustainability

---

## Visual Identity System

### Logo System (current — locked, see `CLAUDE.md`)

There is **one** visible logo file: `public/assets/logos/logo-mark.png` — the green isometric leaf mark, no wordmark, on a genuinely transparent background (keyed out from pixels; see MRB LM-008). The "Leaf Lightly" wordmark beside it in the header is live text, not an image.

- **Colours**: Forest Green (#1a472a) tones
- **Format**: PNG with real alpha. No WebP for the visible logo (owner decision).
- **Before using any new logo file**: check the alpha channel isn't fully opaque, and composite it on magenta to confirm no box or halo.

The old five-variant WebP system (full, standard, orange accent, dark inverted) was retired on 2026-10-13. Its rollout docs are in `docs/archive/`.

### Logo Placement Rules

| Where | File | Size |
|---|---|---|
| Header (left, before nav) | `logo-mark.png` + "Leaf Lightly" text wordmark | 48px desktop / 40px ≤768px / 32px ≤480px; wordmark hidden 769–1024px and ≤768px |
| Footer (brand column) | `logo-mark.png` | 88px / 72px ≤768px / 56px ≤480px |
| SEO structured data | `https://leaflightly.com/assets/logos/logo-mark.png` | — |

**Favicon** (generated from `logo-mark.png`, declared in `src/app/layout.tsx`):
- `public/favicon.ico` — 16/32/48/64px, transparent, tight crop
- `public/apple-touch-icon.png` — 180px on cream (#F8F6F3); iOS renders transparency as black
- `public/icon-512.png` — Android / search results

---

## Color Palette

### Primary Colors
| Name | Hex | RGB | CSS Variable | Use Case |
|------|-----|-----|--------------|----------|
| Forest Green | #1a472a | 26, 71, 42 | `--color-primary` | Primary brand color, CTAs, headings |
| Orange | #FF6B35 | 255, 107, 53 | `--color-accent` | Accent elements, hover states, energy |
| Charcoal | #2A2A26 | 42, 42, 38 | `--color-neutral` | Body text, dark UI elements |

### Secondary Colors
| Name | Hex | RGB | CSS Variable | Use Case |
|------|-----|-----|--------------|----------|
| Beige | #C9B8A0 | 201, 184, 160 | `--color-secondary` | Secondary design element, accents |
| Off-White | #F8F6F3 | 248, 246, 243 | `--color-bg` | Page background, light surfaces |
| Light Gray | #f5f3f0 | 245, 243, 240 | `--color-bg-light` | Card backgrounds, subtle surfaces |

### Text Colors
| Purpose | Hex | CSS Variable | Contrast |
|---------|-----|--------------|----------|
| Primary Text | #2A2A26 | `--color-text-primary` | 13.5:1 (WCAG AAA) |
| Secondary Text | #8B8B7E | `--color-text-secondary` | 5.8:1 (WCAG AA) |

### Usage Guidelines
- **Never** use orange and forest green at equal visual weight
- **Orange** should accent, never dominate (max 15-20% of design)
- **Always** maintain WCAG AA minimum contrast (4.5:1 for text)
- **Beige** works best as a tertiary accent or subtle background variation

---

## Typography

### Font Families
- **Headings**: System fonts (Segoe UI, -apple-system, sans-serif)
- **Body**: System fonts (same as headings)
- **Font Size Hierarchy**: Responsive, scales with viewport

### Heading Styles

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|-------|---|---|--------|------------|
| h1 | 3.5rem | 1.5rem | 700 | 1.2 |
| h2 | 2rem | 1.5rem | 700 | 1.3 |
| h3 | 1.2rem | 1.1rem | 700 | 1.4 |
| Body | 1rem | 0.95rem | 400 | 1.6 |

### Color Assignments
- **Primary Headings (h1, h2)**: Forest Green (#1a472a)
- **Secondary Headings (h3)**: Charcoal (#2A2A26)
- **Body Text**: Charcoal (#2A2A26)
- **Meta/Supporting Text**: Secondary Gray (#8B8B7E)

---

## Component Styling

### Buttons

#### Primary Button (Forest Green)
```css
background: var(--color-primary);
color: white;
padding: 1rem 2.5rem;
border-radius: 8px;
font-weight: 600;
hover: background: var(--color-accent); /* Orange on hover */
```

#### Secondary Button
```css
background: transparent;
color: var(--color-primary);
border: 2px solid var(--color-primary);
padding: 0.875rem 2rem;
hover: background: rgba(26, 71, 42, 0.05);
```

### Cards
- **Background**: White (#ffffff)
- **Border**: 1px solid #e0e0e0
- **Border Radius**: 8px
- **Shadow**: `0 2px 8px rgba(0, 0, 0, 0.05)`
- **Hover Shadow**: `0 4px 12px rgba(26, 71, 42, 0.1)`

### Hero Sections
- **Background**: Gradient `linear-gradient(135deg, #F8F6F3 0%, #faf8f5 100%)`
- **Padding**: 4rem 2rem (desktop), 2rem 1.5rem (mobile)
- **Border Radius**: 12px

---

## Responsive Design Breakpoints

| Breakpoint | Width | Device | Grid Cols (Default) |
|-----------|-------|--------|---------------------|
| Mobile | 375px - 767px | iPhone, small tablets | 1 column |
| Tablet | 768px - 1023px | iPad, medium screens | 2-3 columns |
| Desktop | 1024px - 1439px | Laptop, desktop | 3-5 columns |
| Large Desktop | 1440px+ | Large screens | 5+ columns |

### Navigation Responsiveness
- **Mobile (<768px)**: Hamburger menu, full-width navigation
- **Tablet/Desktop (768px+)**: Horizontal navigation bar

### Logo Sizing (Responsive)
```
Header:  48px desktop  |  40px ≤768px  |  32px ≤480px
Footer:  88px desktop  |  72px ≤768px  |  56px ≤480px
```
Root font size is 87.5% (14px); see `BRAIN_AND_CLONING_DOCUMENT.md` §2 for header behaviour per width.

---

## Photography & Imagery

### Product Images
- **Resolution**: Minimum 1200px wide
- **Format**: JPG (products), WebP (modern browsers)
- **Background**: White or lifestyle context
- **Style**: Clean, well-lit, natural lighting preferred
- **Ratio**: 1:1 (square) or 4:3 preferred for consistency

### Hero Images
- **Resolution**: 1920x1080px minimum
- **Format**: JPG or WebP with AVIF fallback
- **Style**: Lifestyle/aspirational, sustainable context
- **Overlay**: Optional forest green tint (10-20% opacity)

### Color Grading
- Warm, natural tones preferred
- Avoid overly saturated or cool color grades
- Maintain brand color harmony

---

## Accessibility Standards

### Color Contrast
- **Text on Background**: Minimum WCAG AA (4.5:1)
- **UI Components**: Minimum 3:1 contrast ratio
- **Target**: WCAG AAA (7:1) for all primary text

### Interactive Elements
- **Focus States**: Visible outline, minimum 2px, forest green border
- **Button Size**: Minimum 44x44px touch target
- **Keyboard Navigation**: All interactive elements accessible via Tab

### Alt Text Guidelines
- **Logo Images**: `alt="Leaf Lightly Logo"` or `alt=""`(decorative)
- **Product Images**: `alt="[Brand] [Product Name]"` e.g., "Klean Kanteen Insulated Bottle"
- **Icons**: Descriptive alt text, not "icon" or "image"

---

## Implementation Checklist (For Agents)

### Design Agent
- [ ] All logo files saved to `/public/assets/logos/`
- [ ] Logo placement specs documented per page
- [ ] Color palette exported to Figma/design tool
- [ ] Typography hierarchy defined in design files
- [ ] Responsive breakpoints defined and tested

### Frontend Agent
- [ ] Logo mark added to header component
- [ ] CSS variables implemented in root stylesheet
- [ ] All color palette values set in `home.module.css`
- [ ] Favicon configured and deployed
- [ ] Logo responsive sizing tested (375px - 1920px)
- [ ] Contrast ratios verified (WCAG AA minimum)
- [ ] `scripts/header-check.js` passes at all 9 widths (see `CLAUDE.md`)

### QA Agent
- [ ] Logo displays correctly on all breakpoints, with no box or halo
- [ ] Favicon appears in browser tab
- [ ] Color contrast tested with WAVE tool
- [ ] Logo placement consistent across pages
- [ ] Logo visible in dark mode
- [ ] Logo files optimized and loading fast (<100ms)

### Copy Agent
- [ ] Alt text written for all logo variations
- [ ] Brand voice guidelines created
- [ ] Product naming conventions documented
- [ ] CTA messaging aligned with brand tone

---

## Stage Rollout

### Status (2026-10-14)
- ✅ Single transparent logo mark in header, footer and SEO data
- ✅ Favicon set deployed
- ✅ Header locked with automated check (`CLAUDE.md`, `scripts/header-check.js`)

### Possible later work
- Dark-background version of the mark (only if a dark section needs it)
- Social media asset pack

---

## Quick Reference

### Logo Assets Location
```
/public/assets/logos/
└── logo-mark.png               (header, footer, SEO — the only logo file)
/public/
├── favicon.ico                 (16–64px)
├── apple-touch-icon.png        (180px, cream background)
└── icon-512.png                (Android / search)
```

### CSS Variable Reference
```css
--color-primary: #1a472a;        /* Forest Green */
--color-secondary: #C9B8A0;      /* Beige */
--color-accent: #FF6B35;         /* Orange */
--color-neutral: #2A2A26;        /* Charcoal */
--color-bg: #F8F6F3;             /* Off-White */
--color-bg-light: #f5f3f0;       /* Light Gray */
--color-text-primary: #2A2A26;   /* Dark Text */
--color-text-secondary: #8B8B7E; /* Light Text */
```

### Key Brand Hex Codes (For Quick Reference)
- Primary: `#1a472a`
- Accent: `#FF6B35`
- Text: `#2A2A26`
- Background: `#F8F6F3`

---

## Agent Handoff Protocol

**From Design Agent to Frontend Agent**:
1. All logo files in `/public/assets/logos/`
2. Logo placement specs per page/component
3. Color palette defined and CSS variables ready
4. Responsive sizing rules documented

**From Frontend Agent to QA Agent**:
1. All logos integrated and responsive tested
2. Favicon deployed and visible
3. Color contrast verified
4. Accessibility checklist completed

**QA Sign-Off**:
- All brand elements tested across 3+ devices
- No visual regressions detected
- Contrast and accessibility standards met
- Ready for production deployment

---

## Questions & Clarifications

**Q: What's the minimum logo size?**  
A: 32px (header on small phones). The favicon is generated separately at 16px.

**Q: Can I change the logo colors?**  
A: No. The forest green and orange are locked brand colors. Any variations must be approved by Design Agent.

**Q: Dark mode support?**  
A: The mark is mid/dark green on transparent. No inverted version exists yet; create one (from `logo-mark.png`) only if a dark section needs it.

**Q: Favicon format?**  
A: Already generated from `logo-mark.png`: `favicon.ico` (multi-size), `apple-touch-icon.png`, `icon-512.png`. Regenerate from the PNG if the mark ever changes.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-10-12 | Initial brand guidelines with complete logo system |
| 1.1 | 2026-10-14 | Logo system replaced by single transparent `logo-mark.png`; favicon set; old WebP variants retired (docs in `docs/archive/`) |

---

**Document Owner**: Design Agent  
**Last Review**: 2026-10-12  
**Next Review**: Post-Stage 2 QA sign-off
