---
name: responsive-check
description: Tests responsive design across different viewport sizes. Identifies layout issues, breakpoints, and mobile usability problems. Use when user asks to test mobile responsiveness or check different screen sizes.
---

# Responsive Check Skill

## Overview

Analyzes the resume website's responsive behavior across various device sizes and identifies layout issues, breakpoint problems, and mobile usability concerns.

## When to Use This Skill

Use this skill when:
- User asks to "check mobile responsiveness"
- User mentions testing on different devices or screen sizes
- User wants to verify breakpoints
- Before deploying or after layout changes

## Workflow

### Step 1: Read Website Files

Read HTML and CSS to understand layout structure and breakpoints.

### Step 2: Identify Breakpoints

Parse the CSS for media queries and document all breakpoints:
```css
/* Example breakpoints to find */
@media (max-width: 768px) { ... }
@media (min-width: 1024px) { ... }
```

Create a breakpoint map:
- Mobile: < 480px
- Mobile Large: 480px - 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1440px

### Step 3: Analyze Layout at Each Breakpoint

For each breakpoint, check:

#### Content Layout
- Does content stack properly?
- Are columns responsive (grid/flexbox)?
- Is text readable at all sizes?
- Are images responsive?

#### Navigation
- Is navigation accessible on mobile?
- Does it transform (hamburger menu)?
- Are touch targets large enough (44x44px minimum)?

#### Typography
- Font sizes appropriate for viewport
- Line lengths readable (45-75 characters)
- Proper scaling with viewport units

#### Spacing
- Padding/margins scale appropriately
- No horizontal scrolling
- No overflow issues

#### Interactive Elements
- Buttons large enough for touch (44x44px)
- Forms usable on mobile
- Hover states have touch alternatives

### Step 4: Check Common Responsive Issues

Look for these problems:

#### Fixed Widths
```css
/* Bad - breaks on small screens */
.container {
  width: 1200px;
}

/* Good */
.container {
  max-width: 1200px;
  width: 100%;
}
```

#### Horizontal Scrolling
```css
/* Bad - causes overflow */
.content {
  width: 120%;
}

/* Good */
.content {
  max-width: 100%;
}
```

#### Tiny Touch Targets
```css
/* Bad - too small for fingers */
button {
  width: 20px;
  height: 20px;
}

/* Good */
button {
  min-width: 44px;
  min-height: 44px;
}
```

#### Unreadable Text
```css
/* Bad - too small on mobile */
body {
  font-size: 12px;
}

/* Good */
body {
  font-size: 16px;
}
```

### Step 5: Test Viewport Meta Tag

Verify the viewport meta tag exists and is correct:
```html
<!-- Required for responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Step 6: Generate Test Report

Create a detailed responsive design report:

```markdown
# Responsive Design Test Report
Generated: [Date]

## Viewport Configuration
- Viewport meta tag: [Present/Missing]
- Initial scale: [Value]

## Breakpoints Detected
| Breakpoint | Min Width | Max Width | Purpose |
|------------|-----------|-----------|---------|
| Mobile | - | 768px | Stack layout, larger touch targets |
| Tablet | 768px | 1024px | 2-column layout |
| Desktop | 1024px | - | Full layout |

## Testing Results by Device Size

### Mobile (320px - 767px)
#### ✅ Passes
- Navigation is accessible
- Text is readable
- Content stacks properly

#### ❌ Fails
- Touch targets too small in header (line 45 in styles.css)
- Horizontal scrolling on contact form (line 123)

#### 💡 Recommendations
- Increase button size to 44x44px minimum
- Add max-width: 100% to form inputs

### Tablet (768px - 1023px)
[Same structure]

### Desktop (1024px+)
[Same structure]

## Common Responsive Issues Found

### Issue 1: Fixed Width Container
**Location:** styles.css:45
**Problem:** Container has fixed width that breaks on small screens
**Fix:**
```css
/* Before */
.container {
  width: 1200px;
}

/* After */
.container {
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
}
```

### Issue 2: Small Touch Targets
**Location:** index.html:67, styles.css:123
**Problem:** Navigation links too small for touch (32x32px)
**Fix:**
```css
.nav-links a {
  padding: 12px 16px; /* Makes it 44px+ */
  display: block;
}
```

## Breakpoint Recommendations

### Missing Breakpoints
Consider adding:
- 480px: Better mobile large phone support
- 1440px: Optimize for large desktop displays

### Suggested Media Query Structure
```css
/* Mobile first approach */
/* Base styles: 320px+ */

@media (min-width: 480px) {
  /* Mobile large */
}

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1440px) {
  /* Large desktop */
}
```

## Mobile Usability Checklist
- [ ] No horizontal scrolling
- [ ] Text readable without zooming (16px minimum)
- [ ] Touch targets at least 44x44px
- [ ] Sufficient spacing between interactive elements (8px+)
- [ ] Forms are easy to fill on mobile
- [ ] Images scale properly
- [ ] Navigation accessible without desktop hover
- [ ] Content hierarchy clear on small screens

## Recommendations Priority

### Critical (Fix Now)
1. [Issues that break the site on mobile]

### Important (Fix Soon)
1. [Issues that hurt mobile UX]

### Enhancement (Nice to Have)
1. [Improvements for better experience]

## Testing Instructions

To manually test:
1. Chrome DevTools: F12 > Toggle device toolbar (Ctrl+Shift+M)
2. Test these devices:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - Desktop (1920px)
3. Check both portrait and landscape orientations
4. Test with network throttling (Slow 3G)

## CSS Improvements
```css
/* Suggested responsive CSS additions/changes */
```
```

### Step 7: Offer to Apply Fixes

Show proposed CSS changes and ask if user wants to apply them.

### Step 8: Save Report

Write the report to:
`/Users/fedesapuppo/resume-website/RESPONSIVE_TEST.md`

## Key Metrics to Check

- **Touch target size:** Minimum 44x44px
- **Font size:** Minimum 16px for body text on mobile
- **Line length:** 45-75 characters optimal
- **Viewport width:** No content wider than viewport
- **Tap spacing:** Minimum 8px between interactive elements

## Testing Viewport Sizes

Test at these common device widths:
- 320px: iPhone SE, small Android
- 375px: iPhone 12/13 mini
- 390px: iPhone 12/13/14
- 414px: iPhone Plus models
- 768px: iPad portrait
- 1024px: iPad landscape, small laptops
- 1366px: Common laptop
- 1920px: Desktop monitors

## Tips for Quality Review

1. **Test real devices when possible:** Simulators don't catch everything
2. **Check both orientations:** Portrait and landscape
3. **Test interactions:** Not just layout but touch/tap behavior
4. **Verify zoom behavior:** Text should reflow, not break layout
5. **Check scroll behavior:** Smooth scrolling, no jank
6. **Test forms thoroughly:** Keyboard behavior, autocomplete, validation
