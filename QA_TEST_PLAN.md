# Stage 1 QA Test Plan - Leaf Lightly

## Testing Timeline
- **Status**: Ready for testing
- **Waiting for**: Staging URL from Frontend Agent
- **Test Environment**: Chrome, Firefox, Safari, Edge browsers
- **Device Testing**: Mobile (320px, 375px), Tablet (768px), Desktop (1024px, 1920px)

---

## Test Categories & Procedures

### 1. VISUAL VERIFICATION

#### Hero Background Image
- [ ] Image displays correctly without distortion
- [ ] Image fills background properly (no gaps or overflow)
- [ ] Image loads in < 2 seconds
- [ ] No "blurriness" or pixelation at any resolution
- [ ] Overlay text is readable over image

**Test at**: 320px, 375px, 768px, 1024px, 1920px viewports

#### Image Optimization
- [ ] Hero image file size < 500KB (check DevTools Network tab)
- [ ] Image format is optimized (WebP with fallback)
- [ ] Lighthouse performance score >= 85
- [ ] No console warnings about image size

**Tools**: DevTools Network tab, Lighthouse audit

---

### 2. TRUST SIGNAL PANEL

#### Display & Layout
- [ ] All 4 trust signals are visible
- [ ] Icons/text display correctly on all devices
- [ ] Layout responds appropriately:
  - **Desktop (1024px+)**: 4-column grid
  - **Tablet (768px)**: 2x2 grid
  - **Mobile (375px)**: Single column, stacked vertically

#### Content Verification
Check exact copy from STAGE1_COPY.md:
- [ ] "Shipping & Delivery" - "Free delivery on orders over £50..."
- [ ] "Returns & Exchanges" - "Not right? Send it back within 30 days..."
- [ ] "Transparency Commitment" - "We curate every brand. No greenwashing..."
- [ ] "Affiliate Honesty" - "Some links help us keep the lights on..."

#### Styling
- [ ] Icons align with text
- [ ] Proper spacing between signals
- [ ] Text color contrasts meet WCAG AA (4.5:1)
- [ ] Font sizes match design spec
- [ ] No text truncation at any resolution

**Test at**: 320px, 375px, 768px, 1024px, 1920px viewports

---

### 3. NEWSLETTER MODAL

#### Trigger Behavior
- [ ] Modal triggers on exit intent (when mouse leaves window)
- [ ] Modal only shows once per session
- [ ] Modal can be dismissed by clicking X button
- [ ] Modal can be closed by pressing Escape key

#### Form Validation
- [ ] Email field is required
- [ ] Invalid email shows error message
- [ ] Valid email passes validation
- [ ] Form cannot be submitted without valid email

**Test with**:
- Empty field (should show error)
- Invalid format: "notanemail" (should show error)
- Valid format: "test@example.com" (should pass)

#### Visual Design
- [ ] Modal is centered on screen
- [ ] Modal has proper z-index (appears above page content)
- [ ] Backdrop/overlay present with proper opacity
- [ ] Modal is responsive at all viewport sizes

#### Content Verification
Check exact copy from STAGE1_COPY.md:
- [ ] Headline: "Get insider tips on sustainable style."
- [ ] Subheading: "Weekly recommendations, brand spotlights, and seasonal finds—direct to your inbox."
- [ ] Button: "Get 10% Off"
- [ ] Fine print: "We respect your privacy. Unsubscribe anytime. See our privacy policy."

#### Submit & Success
- [ ] Submit button triggers API call to /api/newsletter/subscribe
- [ ] Success message displays after submission
- [ ] Modal closes after successful submission (or shows success state)
- [ ] API response properly handled

**Test at**: 320px, 375px, 768px, 1024px, 1920px viewports

#### Accessibility
- [ ] Focus trapped inside modal (Tab loops within modal)
- [ ] Focus returns to trigger element when closed
- [ ] Screen reader announces modal heading
- [ ] Form labels announced correctly

---

### 4. CATEGORY CARDS

#### Badge Display
- [ ] "NEW" badge visible on category cards
- [ ] Badge text options rotate (NEW, Top Rated, Just Launched, Customer Favorite, Trending, Newly Stocked)
- [ ] Badge positioning doesn't overlap main card content
- [ ] Badge styling matches design

#### Content
- [ ] All 5 categories display: Kitchen, Fashion, Home, Beauty, Wellness
- [ ] All categories marked as "Live" (or similar status)
- [ ] Category names are clear and readable
- [ ] Link targets are correct (e.g., /products/kitchen)

#### Styling & Responsiveness
- [ ] Desktop (1024px+): 5-column grid
- [ ] Tablet (768px): 3-column grid (approximately)
- [ ] Mobile (375px): Single column, stacked
- [ ] Proper spacing and padding
- [ ] Hover states work (color change, shadow, etc.)
- [ ] No text overflow or truncation

#### Urgency Messaging
- [ ] Badge copy is relevant and compelling
- [ ] Messages rotate appropriately
- [ ] No placeholder text visible

**Test at**: 320px, 375px, 768px, 1024px, 1920px viewports

---

### 5. BUTTON VARIANTS

#### CTA Button Variants (from STAGE1_COPY.md)
Test all 3 hero CTA options:
1. **"Discover Sustainable Products"** - Action-oriented
2. **"Browse Now"** - Curiosity-driven
3. **"Find Your Perfect Fit"** - Benefit-driven

*(Check which is implemented)*

#### Button Functionality
- [ ] Button is clickable
- [ ] Button links to correct page
- [ ] Link target loads correctly

#### Visual States
- [ ] **Default**: Clear, readable text and background
- [ ] **Hover**: Color change, shadow effect, subtle animation
- [ ] **Active/Focus**: Visible focus indicator (outline or underline)
- [ ] **Disabled** (if applicable): Greyed out, not clickable

#### Touch Targets
- [ ] Button has minimum 48px height on mobile
- [ ] Button has adequate padding for touch
- [ ] No button overlap with other interactive elements

#### Contrast & Accessibility
- [ ] Text color contrast >= 4.5:1 (WCAG AA)
- [ ] Focus indicator is visible (at least 2px)
- [ ] Keyboard navigation works (Tab to button, Space/Enter to activate)

**Test at**: 320px, 375px, 768px, 1024px, 1920px viewports

---

### 6. RESPONSIVE DESIGN TESTING

Test at all breakpoints:
- [ ] **320px** (iPhone SE)
- [ ] **375px** (iPhone 12)
- [ ] **768px** (iPad)
- [ ] **1024px** (Desktop)
- [ ] **1920px** (Large desktop)

#### At Each Breakpoint
- [ ] No horizontal scrolling
- [ ] Text is readable (no tiny fonts)
- [ ] Images scale proportionally
- [ ] Navigation/menus accessible
- [ ] Forms usable and tappable
- [ ] No element cutoff or overflow
- [ ] Proper spacing maintained

#### Key Elements to Check
- [ ] Hero section layouts correctly
- [ ] Trust signals stack/grid appropriately
- [ ] Category cards grid adjusts
- [ ] Modal centers and fits viewport
- [ ] Buttons are tappable (48px+ min height)

---

### 7. CROSS-BROWSER TESTING

Test in all modern browsers:
- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)

#### In Each Browser
- [ ] Layout renders correctly
- [ ] No console errors
- [ ] Images load and display
- [ ] Animations/transitions work smoothly
- [ ] Modal functions properly
- [ ] Form validation works
- [ ] Links navigate correctly
- [ ] No vendor-specific CSS issues

---

### 8. MOBILE DEVICE TESTING

If real devices available:
- [ ] **iOS Safari** (latest iOS)
- [ ] **Android Chrome** (latest Android)

#### On Real Devices
- [ ] Touch interactions responsive
- [ ] No lag or jank in animations
- [ ] Modal works and is dismissible
- [ ] Text readable without pinch-zoom
- [ ] Keyboard appears on form focus
- [ ] No horizontal scrolling
- [ ] Images load correctly

---

### 9. ANALYTICS SETUP VERIFICATION

#### Check These Analytics Events Are Implemented
- [ ] **Homepage time-on-page**
- [ ] **Hero CTA click-through rate**
- [ ] **Category click-through rate**
- [ ] **Newsletter modal conversion rate**
- [ ] **Newsletter signup completion**

#### Verification Method
1. Open DevTools Network tab
2. Look for analytics requests (Google Analytics, custom endpoint, etc.)
3. Check for errors or failed requests
4. Trigger each event and verify:
   - [ ] Event fires immediately
   - [ ] Event data is correct
   - [ ] Event reaches analytics service
   - [ ] No 404 or 5xx errors

#### Console Check
- [ ] No JavaScript errors in console
- [ ] No tracking-related warnings
- [ ] Analytics library loads successfully

---

### 10. PERFORMANCE TESTING

#### Page Load Performance
- [ ] Full page load time < 3 seconds (including images)
- [ ] Time to First Contentful Paint (FCP) < 1.8s
- [ ] Time to Largest Contentful Paint (LCP) < 2.5s

#### Resource Sizes
- [ ] Hero image < 500KB
- [ ] Total page size < 2MB
- [ ] No unused CSS/JavaScript loaded

#### Lighthouse Audit
- [ ] Run Lighthouse (DevTools)
- [ ] Overall score >= 85
- [ ] Performance score >= 85
- [ ] Accessibility score >= 85
- [ ] Best Practices score >= 85

**Tools**: DevTools Lighthouse tab, Chrome DevTools Network tab

---

### 11. ACCESSIBILITY TESTING

#### Keyboard Navigation
- [ ] Can Tab through all interactive elements
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators are visible (at least 2px)
- [ ] Enter key activates buttons
- [ ] Space key activates buttons
- [ ] Escape closes modal

#### Color Contrast (WCAG AA)
- [ ] All text >= 4.5:1 contrast ratio
- [ ] All UI components >= 3:1 contrast ratio
- [ ] Use WebAIM Contrast Checker to verify

#### Images & Alt Text
- [ ] Hero image has meaningful alt text (if decorative, can be empty with role="presentation")
- [ ] All icons have accessible labels or aria-labels
- [ ] Badges have visible or screen-reader text

#### Form Accessibility
- [ ] Email input has associated label
- [ ] Error messages linked to input (aria-describedby)
- [ ] Submit button clearly labeled

#### Modal Accessibility
- [ ] Modal has role="dialog"
- [ ] Modal has aria-labelledby pointing to heading
- [ ] Focus trapped inside modal
- [ ] Backdrop makes background inert (aria-hidden="true")
- [ ] Close button accessible via keyboard

**Tools**: 
- Browser DevTools Accessibility Inspector
- WebAIM Contrast Checker (webaim.org)
- WAVE Accessibility Extension

---

### 12. CONTENT VERIFICATION

#### Copy Accuracy
Compare all text to STAGE1_COPY.md:
- [ ] Trust signals copy exact and error-free
- [ ] Newsletter modal copy exact and error-free
- [ ] All button labels clear and action-oriented
- [ ] No placeholder text (lorem ipsum, etc.)
- [ ] No typos or grammatical errors
- [ ] Tone matches brand voice (friendly, transparent, no greenwashing)

#### Content Display
- [ ] All copy visible (not cut off or hidden)
- [ ] Appropriate font sizes
- [ ] Line breaks look intentional
- [ ] Numbers and punctuation correct
- [ ] Consistency across pages

---

### 13. REGRESSION TESTING

Verify existing functionality still works:

#### Product Pages
- [ ] /products/kitchen page loads and displays products
- [ ] /products/fashion page loads and displays products
- [ ] /products/home page loads and displays products
- [ ] /products/beauty page loads and displays products
- [ ] /products/wellness page loads and displays products

#### Navigation
- [ ] Header/navigation menu works
- [ ] Footer links work
- [ ] All category links navigate correctly
- [ ] Back button works

#### Product Functionality
- [ ] Products display with images
- [ ] Product cards render correctly
- [ ] Product links work (click through)
- [ ] Affiliate links format correctly

#### Search (if applicable)
- [ ] Search field accessible
- [ ] Search functionality works
- [ ] Results display correctly

---

## Testing Execution Checklist

### Pre-Testing Setup
- [ ] Staging URL received from Frontend Agent
- [ ] Browser DevTools open for console/network monitoring
- [ ] Lighthouse extension installed
- [ ] WebAIM Contrast Checker ready
- [ ] Note-taking tool ready for bug logging
- [ ] Screenshot tool ready for evidence

### Testing Process
1. [ ] Test Visual Verification (all resolutions)
2. [ ] Test Trust Signal Panel
3. [ ] Test Newsletter Modal (all states)
4. [ ] Test Category Cards
5. [ ] Test Button Variants
6. [ ] Responsive Design Testing (all breakpoints)
7. [ ] Cross-Browser Testing (all browsers)
8. [ ] Mobile Device Testing (if available)
9. [ ] Analytics Verification
10. [ ] Performance Testing
11. [ ] Accessibility Testing
12. [ ] Content Verification
13. [ ] Regression Testing

### Post-Testing
- [ ] Compile all bugs found
- [ ] Categorize severity levels
- [ ] Create detailed bug reports
- [ ] Generate STAGE1_QA_REPORT.md
- [ ] Provide sign-off decision

---

## Bug Report Template

```
## Bug #[NUMBER]: [TITLE]

**Severity**: [Critical/High/Medium/Low]
**Component**: [Section/Element]
**Affected Browsers**: [Chrome/Firefox/Safari/Edge]
**Affected Devices**: [Mobile/Tablet/Desktop]

### Description
[Clear description of the issue]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Result
[What should happen]

### Actual Result
[What actually happens]

### Screenshots/Video
[Attach evidence]

### Impact
[Business impact of this bug]

### Regression Test
[Has this worked before? Is it a new regression?]
```

---

## Sign-Off Criteria

### APPROVED (All Passes)
- [ ] All 13 test categories pass
- [ ] No Critical or High severity bugs
- [ ] All Medium bugs have workarounds or low impact
- [ ] Performance targets met
- [ ] Accessibility standards met
- [ ] Analytics implemented and firing
- [ ] No regressions in existing functionality
- [ ] Content accurate and complete
- [ ] Works on all tested browsers/devices

### BLOCKED (Blocker Found)
- [ ] Modal doesn't work/can't be triggered
- [ ] Critical accessibility issue (keyboard nav broken, contrast fails)
- [ ] Hero image doesn't load
- [ ] Primary CTA button doesn't work
- [ ] Form submission fails
- [ ] Analytics not tracking key events
- [ ] Page crashes or has console errors

### CONDITIONAL (Approved with Fixes)
- [ ] Minor issues found with fixes provided
- [ ] Issues resolved before production
- [ ] Re-tested and verified

---

## Notes
- All tests conducted at standard browser zoom (100%)
- Network throttling not applied (test on good connection)
- Do not test with cache disabled (unless specifically checking cache behavior)
- Use real user testing accounts where possible
- Document any environment-specific issues

---

**Prepared by**: QA Agent
**Date**: 2026-10-12
**Status**: Ready for testing - Awaiting staging URL
