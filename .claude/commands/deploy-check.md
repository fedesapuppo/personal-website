# Deploy Check Command

Pre-deployment checklist to ensure the resume website is ready to go live.

## What This Command Does

Runs a series of checks before deploying to ensure nothing is broken and the site is production-ready.

## Instructions

### Step 1: Run Basic Checks

Check the following in parallel using Bash:
```bash
# Check if files exist
ls -la index.html styles.css script.js

# Check for TODO or FIXME comments
grep -r "TODO\|FIXME" *.html *.css *.js

# Check for console.log statements (should be removed in production)
grep -r "console.log" *.js

# Check git status
git status
```

### Step 2: Launch SEO and Performance Audits

Spawn two agents in parallel:

```
Task(
  subagent_type: "seo-optimizer",
  description: "Quick SEO check before deployment. Verify:
  - Meta tags are complete and correct
  - No broken links
  - Proper semantic HTML
  - Social media preview tags (Open Graph)

  Return JSON with any blocking issues."
)

Task(
  subagent_type: "performance-auditor",
  description: "Quick performance check before deployment. Verify:
  - No unnecessarily large files
  - No render-blocking resources
  - Reasonable load time estimation

  Return JSON with any blocking issues."
)
```

### Step 3: Create Deployment Checklist

Generate a checklist:

```markdown
# Pre-Deployment Checklist

## Files
- [ ] All required files present (index.html, styles.css, script.js)
- [ ] No TODO/FIXME comments in code
- [ ] No console.log statements
- [ ] README.md is up to date

## Content
- [ ] All personal information is correct
- [ ] Links work (GitHub, LinkedIn, Email)
- [ ] No placeholder text
- [ ] Contact information is accurate

## Technical
- [ ] SEO meta tags complete
- [ ] Open Graph tags for social sharing
- [ ] Responsive on mobile/tablet/desktop
- [ ] No browser console errors
- [ ] Fast loading time

## Git
- [ ] All changes committed
- [ ] On correct branch (main/master)
- [ ] Ready to push to GitHub Pages

## Deployment Target: [GitHub Pages / Netlify / Vercel / Other]

[If GitHub Pages]
Repository settings: https://github.com/[username]/resume-website/settings/pages
Live URL: https://[username].github.io/resume-website/
```

### Step 4: Git Status Check

Check if changes need to be committed:
```bash
git status --short
```

If there are uncommitted changes, ask user:
"You have uncommitted changes. Would you like to commit them before deployment?"

### Step 5: Deployment Instructions

Based on the deployment target, provide specific instructions:

**For GitHub Pages:**
```bash
# Push to GitHub
git push origin main

# GitHub Pages will auto-deploy
# Check status at: https://github.com/[username]/resume-website/actions
# Live site: https://[username].github.io/resume-website/
```

**For Netlify:**
```bash
# If Netlify CLI installed
netlify deploy --prod

# Or use Netlify web UI
# Drag and drop files to: https://app.netlify.com/drop
```

### Step 6: Post-Deployment Verification

After deployment, provide checklist:
```markdown
## Post-Deployment Checks

1. Visit live site and verify it loads
2. Test all navigation links
3. Test external links (GitHub, LinkedIn)
4. Check on mobile device
5. Verify social media preview with: https://www.opengraph.xyz/
6. Run Lighthouse audit: https://pagespeed.web.dev/
```

## Error Handling

- If blocking issues found, STOP and report them
- If git repository is dirty, warn user
- If meta tags are missing, list what needs to be added

## Usage

```
/deploy-check
```

Runs all pre-deployment checks and provides deployment instructions.
