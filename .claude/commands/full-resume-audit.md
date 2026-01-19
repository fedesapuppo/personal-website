# Full Resume Audit Command

Performs a comprehensive audit of the resume website across content, SEO, design, and performance.

## What This Command Does

Spawns 4 specialized agents in parallel to audit different aspects:
1. **content-analyzer** - Reviews resume content quality
2. **seo-optimizer** - Checks SEO and metadata
3. **design-reviewer** - Reviews UX/UI and accessibility
4. **performance-auditor** - Audits loading speed and optimization

Each agent returns a detailed report, which is then merged into a comprehensive audit document.

## Instructions

### Step 1: Read Current Website Files

Read all website files to understand the current state:
```
- index.html
- styles.css
- script.js
- README.md (if exists)
```

### Step 2: Launch Four Parallel Agent Tasks

Make FOUR Task tool calls in parallel in a single message:

```
Task(
  subagent_type: "content-analyzer",
  description: "Analyze resume content in index.html. Review:
  - Work experience descriptions for impact and clarity
  - Technical skills organization
  - Professional tone and language
  - Grammar and consistency

  Return markdown analysis with strengths, issues, recommendations, and rewritten sections."
)

Task(
  subagent_type: "seo-optimizer",
  description: "Analyze SEO optimization in index.html. Check:
  - Meta tags (title, description, Open Graph)
  - Semantic HTML structure
  - Heading hierarchy
  - Missing alt text
  - Opportunities for structured data (Schema.org)

  Return JSON analysis with score, issues array, and recommendations."
)

Task(
  subagent_type: "design-reviewer",
  description: "Review design and accessibility in index.html and styles.css. Check:
  - Visual hierarchy and layout
  - Color contrast ratios (WCAG compliance)
  - Typography and readability
  - Responsive design
  - Interactive elements and focus states
  - Accessibility issues

  Return markdown analysis with design review, accessibility issues, and CSS improvements."
)

Task(
  subagent_type: "performance-auditor",
  description: "Audit performance of website files. Analyze:
  - File sizes (HTML, CSS, JS)
  - Render-blocking resources
  - Image optimization opportunities
  - Unused code
  - Loading speed factors

  Return JSON analysis with performance score, metrics, issues, and optimization suggestions."
)
```

### Step 3: Parse and Merge Results

After receiving all four responses:
1. Parse each agent's report
2. Identify critical issues that appear in multiple reports
3. Prioritize recommendations by impact

### Step 4: Generate Comprehensive Audit Report

Create a consolidated report in markdown format:

```markdown
# Resume Website Audit Report
Generated: [YYYY-MM-DD HH:MM:SS]

## Executive Summary
- Overall Score: X/100
- Critical Issues: N
- Important Issues: N
- Suggestions: N

## Content Analysis
[Content analyzer results]

## SEO & Metadata
[SEO optimizer results]

## Design & Accessibility
[Design reviewer results]

## Performance
[Performance auditor results]

## Priority Action Items

### Critical (Fix Immediately)
1. [Issue from any agent marked as high/critical]

### Important (Fix Soon)
1. [Issue marked as medium/important]

### Enhancements (Nice to Have)
1. [Issue marked as low/enhancement]

## Next Steps
[Recommended order of implementation]
```

### Step 5: Save Report

Write the report to: `/Users/fedesapuppo/resume-website/AUDIT_REPORT.md`

### Step 6: Provide Summary

Give the user a brief summary of:
- Most critical issues found
- Quick wins that can be implemented immediately
- Estimated effort for full implementation
- Path to the generated report

## Error Handling

- If any agent fails, continue with others and note the failure in the report
- If all agents fail, provide a basic manual review
- Always create the audit report file even with partial results

## Usage

```
/full-resume-audit
```

This will generate a comprehensive audit report saved to `AUDIT_REPORT.md` in the project root.
