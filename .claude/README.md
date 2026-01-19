# Claude Code Extensions for Resume Website

This directory contains custom agents, skills, and commands specifically designed for building and improving resume websites.

## 📁 Directory Structure

```
.claude/
├── agents/           # Specialized agents for specific tasks
├── commands/         # Slash commands for workflows
├── skills/           # Reusable capabilities
├── settings.json     # Configuration
└── README.md         # This file
```

## 🤖 Agents

Specialized agents with focused capabilities and specific models:

### `content-analyzer`
- **Model:** Sonnet (high quality for nuanced content)
- **Purpose:** Analyzes resume content for impact, clarity, and professional tone
- **Use for:** Improving work descriptions, checking grammar, strengthening language

### `seo-optimizer`
- **Model:** Haiku (fast for technical checks)
- **Purpose:** Optimizes for search engines and metadata
- **Use for:** Meta tags, semantic HTML, structured data

### `design-reviewer`
- **Model:** Sonnet (detailed visual analysis)
- **Purpose:** Reviews UX/UI, accessibility, and visual design
- **Use for:** Layout issues, color contrast, responsive design

### `performance-auditor`
- **Model:** Haiku (fast for performance metrics)
- **Purpose:** Audits loading speed and optimization
- **Use for:** File sizes, render-blocking, Core Web Vitals

## 🎯 Skills

Reusable capabilities that can be invoked during conversations:

### `accessibility-audit`
Comprehensive WCAG 2.1 AA compliance audit
- Semantic HTML analysis
- Color contrast calculations
- Keyboard navigation testing
- Screen reader compatibility
- Generates detailed audit report

### `responsive-check`
Tests responsive design across viewport sizes
- Breakpoint analysis
- Touch target sizing
- Mobile usability
- Layout testing at common device widths
- Generates responsive test report

### `add-section`
Helps add new sections to resume
- Projects/Portfolio
- Testimonials/Recommendations
- Certifications/Courses
- Blog/Articles
- Custom sections
- Maintains design consistency

## ⚡ Commands

Slash commands for complete workflows:

### `/full-resume-audit`
Comprehensive audit spawning 4 agents in parallel:
- Content analysis
- SEO optimization
- Design & accessibility review
- Performance audit
- Generates consolidated AUDIT_REPORT.md

### `/quick-improve`
Interactive command for rapid improvements:
- Choose focus area (content, design, SEO, performance, accessibility)
- Get top 3 quick wins
- Apply improvements interactively

### `/improve-content`
Focused content improvement workflow:
- Choose specific section to improve
- Get rewritten versions
- Apply changes with approval

### `/deploy-check`
Pre-deployment checklist and validation:
- File checks (no TODOs, console.logs)
- SEO/performance quick audit
- Git status verification
- Deployment instructions
- Post-deployment checklist

## 🚀 Quick Start

### Run a Full Audit
```
/full-resume-audit
```
This spawns 4 agents in parallel and creates a comprehensive report.

### Make Quick Improvements
```
/quick-improve
```
Choose an area to focus on and get actionable improvements.

### Add a New Section
When chatting, mention wanting to add a section:
```
"I want to add a projects portfolio section"
```
The `add-section` skill will activate automatically.

### Check Accessibility
```
"Run an accessibility audit"
```
The `accessibility-audit` skill will activate.

### Test Responsiveness
```
"Check mobile responsiveness"
```
The `responsive-check` skill will activate.

## 🔧 How It Works

### Agents
Agents are spawned using the Task tool:
```
Task(
  subagent_type: "content-analyzer",
  description: "Analyze resume content for improvements"
)
```

Each agent has its own context window and uses a specified model (sonnet/haiku).

### Skills
Skills activate automatically when relevant or can be explicitly invoked:
- Trigger by mentioning keywords ("check accessibility", "test mobile")
- Or explicitly: "Use the accessibility-audit skill"

### Commands
Commands are invoked with slash syntax:
```
/full-resume-audit
/quick-improve
/improve-content
/deploy-check
```

## 📝 Customization

### Adding New Agents
Create a new `.md` file in `agents/`:

```markdown
---
name: my-agent
description: What this agent does
model: sonnet  # or haiku
---

Instructions for the agent...
```

### Adding New Skills
Create a directory in `skills/` with a `SKILL.md` file:

```markdown
---
name: my-skill
description: When to use this skill
---

# Skill Name

## Overview
[...]

## Workflow
[...]
```

### Adding New Commands
Create a new `.md` file in `commands/`:

```markdown
# Command Name

What this command does...

## Instructions
Step-by-step workflow...
```

## 💡 Tips

1. **Use /full-resume-audit** before major deployments
2. **Use /quick-improve** during active development for rapid iteration
3. **Skills activate automatically** - just mention what you want to do
4. **Agents run in parallel** - the full audit spawns 4 agents at once for speed
5. **All reports are saved** to the project root for reference

## 🔗 Integration

These extensions work with:
- GitHub Pages deployment
- Vanilla HTML/CSS/JS sites
- Any resume/portfolio website structure

## 📊 Reports Generated

Commands generate these reports in the project root:
- `AUDIT_REPORT.md` - From /full-resume-audit
- `ACCESSIBILITY_AUDIT.md` - From accessibility-audit skill
- `RESPONSIVE_TEST.md` - From responsive-check skill

## 🎓 Learning

This setup demonstrates:
- **Agent orchestration** - Multiple agents working in parallel
- **Skill composition** - Reusable capabilities
- **Command workflows** - Complete end-to-end processes
- **Model selection** - Using sonnet for complex tasks, haiku for speed
- **Context optimization** - Agents return summaries, not full data

## 📖 Example Workflows

### First-time Audit
```
/full-resume-audit
```
Review AUDIT_REPORT.md, prioritize critical issues.

### Iterative Improvement
```
/quick-improve
→ Choose "Content"
→ Review suggestions
→ Apply approved changes
```

### Add Portfolio
```
"Add a projects section showcasing my Rails apps"
→ add-section skill activates
→ Provide project details
→ Review generated code
→ Apply to website
```

### Pre-Deployment
```
/deploy-check
→ Review checklist
→ Fix any issues
→ Follow deployment instructions
```

## 🤝 Contributing

To improve these extensions:
1. Add new agents for specific domains (e.g., `rails-portfolio-builder`)
2. Create skills for common resume tasks (e.g., `generate-pdf`)
3. Build commands for your workflow (e.g., `/linkedin-sync`)

## 📚 Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Performance Best Practices](https://web.dev/fast/)
