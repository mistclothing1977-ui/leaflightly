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

### Logo System

#### 1. **Logo Mark** (`logo-mark.webp`)
- **Use**: Favicon, app icons, social avatars, small spaces (32px+)
- **Dimensions**: 256x256px minimum (responsive scaling)
- **Background**: Transparent background
- **Colors**: Forest Green (#1a472a)
- **Spacing**: Minimum 8px clear space on all sides

#### 2. **Full Logo - Standard** (`logo-full.webp` / `logo-standard.webp`)
- **Use**: Primary website header, print materials, standard applications
- **Dimensions**: 1200x400px (3:1 ratio)
- **Background**: Light backgrounds (off-white #F8F6F3, white)
- **Colors**: Forest Green (#1a472a) with white wordmark negative space
- **Minimum Size**: 120px wide on web

#### 3. **Full Logo - Orange Accent** (`logo-accent-orange.webp`)
- **Use**: CTAs, promotional materials, energy moments, seasonal campaigns
- **Dimensions**: 1200x400px (3:1 ratio)
- **Background**: Light backgrounds preferred
- **Colors**: Forest Green (#1a472a) + Orange accent (#FF6B35)
- **When to Use**: 
  - Primary CTA sections
  - Product launch banners
  - Newsletter/promotional emails
  - Social media campaign posts
- **Frequency**: Use sparingly (1-2x per page max)

#### 4. **Dark Theme** (`logo-dark-inverted.webp`)
- **Use**: Dark backgrounds, dark mode layouts, dark headers with imagery
- **Dimensions**: 1200x400px (3:1 ratio)
- **Background**: Charcoal (#2A2A26), dark navy, or dark photography
- **Colors**: White wordmark and mark
- **Contrast Ratio**: WCAG AAA compliant (minimum 7:1)

### Logo Placement Rules

**Header Navigation**
- Position: Left side, before navigation items
- Size: 40-50px height (responsive)
- Logo: `logo-mark.webp` (icon-only) or `logo-full.webp` (if space)
- Spacing: 1rem left margin, 2rem right margin

**Homepage Hero**
- Position: Top-center or top-left integrated into hero section
- Size: 80-120px mark size
- Logo: `logo-full.webp` or `logo-accent-orange.webp`
- Background: Light hero background (#F8F6F3 gradient)

**Footer**
- Position: Left corner or center
- Size: 40-60px mark, or 120px full logo
- Logo: `logo-standard.webp`
- Spacing: 2rem padding from edges

**Dark Sections/Headers**
- Logo: `logo-dark-inverted.webp` (white)
- Minimum contrast ratio: 7:1 against background

**Favicon**
- Asset: `logo-mark.webp` (256x256px)
- Format: SVG or 32x32px PNG for best quality
- Placement: `<head>` as `favicon.ico`

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
Mobile (<768px):     32px height
Tablet (768-1024px): 40px height
Desktop (1024px+):   50px height
```

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
- [ ] Dark mode logo variants tested

### QA Agent
- [ ] Logo displays correctly on all breakpoints
- [ ] Favicon appears in browser tab
- [ ] Color contrast tested with WAVE tool
- [ ] Logo placement consistent across pages
- [ ] Orange accent variant renders correctly
- [ ] Dark theme logos visible on dark backgrounds
- [ ] Logo files optimized and loading fast (<100ms)

### Copy Agent
- [ ] Alt text written for all logo variations
- [ ] Brand voice guidelines created
- [ ] Product naming conventions documented
- [ ] CTA messaging aligned with brand tone

---

## Stage Rollout

### Stage 2 (Current)
- ✅ Logo system finalized
- ✅ Brand guidelines documented
- [ ] Integration into header (In Progress)
- [ ] Favicon deployment
- [ ] Homepage hero with logo

### Stage 3 (Planned)
- Logo animation variants (optional)
- Secondary mark variations
- Social media asset pack

---

## Quick Reference

### Logo Assets Location
```
/public/assets/logos/
├── logo-mark.webp              (Favicon, small spaces)
├── logo-full.webp              (Primary, light backgrounds)
├── logo-standard.webp          (Standard variant)
├── logo-accent-orange.webp     (CTAs, promotional)
└── logo-dark-inverted.webp     (Dark backgrounds)
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

**Q: When should I use the orange accent logo?**  
A: Use it sparingly for CTAs, promotions, and key moments (max 1-2x per page). Never as the primary header logo.

**Q: What's the minimum logo size?**  
A: Mark: 32px. Full logo: 120px wide on web, 40px height in header.

**Q: Can I change the logo colors?**  
A: No. The forest green and orange are locked brand colors. Any variations must be approved by Design Agent.

**Q: Dark mode support?**  
A: Use `logo-dark-inverted.webp` (white version) on dark backgrounds. Ensure 7:1 contrast ratio.

**Q: Favicon format?**  
A: Preferred: SVG or 32x32px PNG. Copy `logo-mark.webp` and convert to ICO/PNG for deployment.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-10-12 | Initial brand guidelines with complete logo system |

---

**Document Owner**: Design Agent  
**Last Review**: 2026-10-12  
**Next Review**: Post-Stage 2 QA sign-off
