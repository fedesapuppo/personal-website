# Quick Improve Command

Fast iteration command for making quick improvements to the resume website. Perfect for rapid prototyping and testing changes.

## What This Command Does

Provides an interactive way to quickly improve specific aspects of the resume without running a full audit.

## Instructions

### Step 1: Ask What to Improve

Use AskUserQuestion to determine focus area:

```
Question: "What would you like to improve?"
Options:
- Content - Improve work descriptions and copy
- Design - Visual improvements and styling
- SEO - Meta tags and search optimization
- Performance - Loading speed and optimization
- Accessibility - WCAG compliance and a11y
- Add Content - Add a new section (projects, testimonials, etc.)
```

### Step 2: Route to Appropriate Agent/Skill

Based on the user's choice:

**Content:**
```
Task(
  subagent_type: "content-analyzer",
  description: "Analyze resume content and suggest specific improvements"
)
```

**Design:**
```
Task(
  subagent_type: "design-reviewer",
  description: "Quick design review focusing on quick wins and visual improvements"
)
```

**SEO:**
```
Task(
  subagent_type: "seo-optimizer",
  description: "Analyze SEO and provide actionable improvements for meta tags and structure"
)
```

**Performance:**
```
Task(
  subagent_type: "performance-auditor",
  description: "Quick performance audit identifying easy optimizations"
)
```

**Accessibility:**
Use the accessibility-audit skill

**Add Content:**
Use the add-section skill

### Step 3: Present Results

Show the user:
1. What was analyzed
2. Top 3 quick wins
3. Estimated effort for each improvement
4. Recommended order of implementation

### Step 4: Offer to Apply Changes

Ask: "Would you like me to implement any of these improvements?"

If yes, ask which specific improvements to apply.

### Step 5: Implement Approved Changes

Use Edit tool to apply changes:
1. Make changes one at a time
2. Explain each change
3. Show before/after if significant
4. Verify the change worked

### Step 6: Suggest Next Steps

After improvements:
- Suggest testing in browser
- Offer to run another quick improvement on different area
- Suggest running full audit if many changes were made

## Error Handling

- If agent fails, provide manual review of the selected area
- If user is unsure what to improve, suggest running /full-resume-audit first

## Usage

```
/quick-improve
```

Presents options and routes to appropriate improvement workflow.

## Tips

This command is perfect for:
- Quick iterations during development
- Focused improvements on specific areas
- Learning how different aspects of the site can be improved
- Building up improvements incrementally vs. overwhelming full audit
