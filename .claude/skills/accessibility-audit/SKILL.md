---
name: accessibility-audit
description: Comprehensive accessibility audit for resume website. Checks WCAG compliance, keyboard navigation, screen reader compatibility, and more. Use when user asks to check accessibility or improve WCAG compliance.
---

# Accessibility Audit Skill

## Overview

Performs a detailed accessibility audit of the resume website, checking for WCAG 2.1 Level AA compliance and providing actionable recommendations.

## When to Use This Skill

Use this skill when:
- User asks to "check accessibility" or "audit accessibility"
- User mentions WCAG, screen readers, or keyboard navigation
- User wants to ensure site works for all users
- Before deploying to production

## Workflow

### Step 1: Read All Website Files

Read the current HTML, CSS, and JavaScript files to understand the structure.

### Step 2: Automated Checks

Perform the following checks:

#### Semantic HTML
- Proper use of semantic elements (header, nav, main, section, article, footer)
- Heading hierarchy (h1 -> h2 -> h3, no skipping levels)
- Landmark regions properly identified

#### Images and Media
- All images have alt text
- Decorative images have empty alt=""
- SVGs have appropriate titles/descriptions

#### Forms and Inputs
- All form inputs have associated labels
- Required fields are marked
- Error messages are accessible
- Placeholder text is not used as labels

#### Color and Contrast
- Text has sufficient contrast ratio (4.5:1 for normal, 3:1 for large)
- Links are distinguishable from surrounding text
- Color is not the only means of conveying information

#### Keyboard Navigation
- All interactive elements are keyboard accessible
- Visible focus indicators
- Logical tab order
- No keyboard traps

#### ARIA
- ARIA labels used appropriately
- Roles are correct
- Live regions for dynamic content
- aria-hidden used correctly

### Step 3: Calculate Contrast Ratios

For all text/background combinations, calculate contrast ratios using the formula:
```
Contrast = (L1 + 0.05) / (L2 + 0.05)
Where L1 is lighter color, L2 is darker color
```

Extract RGB values from CSS and convert to relative luminance.

### Step 4: Test Keyboard Navigation Flow

Map out the tab order:
1. List all focusable elements in DOM order
2. Identify any tabindex modifications
3. Verify skip links (if present)
4. Check for focus traps

### Step 5: Generate Audit Report

Create a detailed report:

```markdown
# Accessibility Audit Report
Generated: [Date]

## Summary
- WCAG Level: [A / AA / AAA]
- Issues Found: [Critical: N, Important: N, Minor: N]
- Compliance Score: [0-100]

## Critical Issues (Must Fix)
[Issues that prevent access]

### Issue 1: [Title]
- **WCAG Criterion:** [e.g., 1.4.3 Contrast (Minimum)]
- **Location:** [file:line or selector]
- **Current State:** [What's wrong]
- **Fix:**
```html
[Code to fix the issue]
```

## Important Issues (Should Fix)
[Issues that significantly impact usability]

## Minor Issues (Nice to Fix)
[Issues that improve experience]

## Keyboard Navigation Map
```
Tab Order:
1. Skip to content link
2. Navigation links
3. Hero CTA buttons
4. ...
```

## Color Contrast Analysis
| Element | Foreground | Background | Ratio | WCAG AA | WCAG AAA |
|---------|-----------|------------|-------|---------|----------|
| Body text | #333 | #fff | 12.6:1 | ✓ Pass | ✓ Pass |
| ... | ... | ... | ... | ... | ... |

## Screen Reader Testing Notes
[How content will be announced]

## Recommendations
1. [Prioritized list of improvements]

## WCAG 2.1 Checklist
- [x] 1.1.1 Non-text Content
- [ ] 1.3.1 Info and Relationships
- ...
```

### Step 6: Offer to Apply Fixes

For issues that can be automatically fixed:
1. Show proposed changes
2. Ask user if they want to apply them
3. Use Edit tool to apply approved fixes

### Step 7: Save Report

Write the audit report to:
`/Users/fedesapuppo/resume-website/ACCESSIBILITY_AUDIT.md`

## Common Issues to Check

### Missing Alt Text
```html
<!-- Bad -->
<img src="logo.png">

<!-- Good -->
<img src="logo.png" alt="Company Logo">
```

### Poor Color Contrast
```css
/* Bad - 2.5:1 ratio */
color: #777;
background: #fff;

/* Good - 7:1 ratio */
color: #333;
background: #fff;
```

### No Focus Indicators
```css
/* Bad */
*:focus {
  outline: none;
}

/* Good */
*:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

### Heading Hierarchy Issues
```html
<!-- Bad - skips from h1 to h3 -->
<h1>Page Title</h1>
<h3>Subsection</h3>

<!-- Good -->
<h1>Page Title</h1>
<h2>Main Section</h2>
<h3>Subsection</h3>
```

## Tips for Quality Audit

1. **Be specific:** Reference exact line numbers and selectors
2. **Provide context:** Explain why each issue matters
3. **Show examples:** Include before/after code snippets
4. **Prioritize:** Critical issues that prevent access come first
5. **Test thoroughly:** Don't just check syntax, consider actual usage
6. **Think about users:** Consider blind users, motor impairments, cognitive disabilities

## Resources

- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Contrast Checker: https://webaim.org/resources/contrastchecker/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
