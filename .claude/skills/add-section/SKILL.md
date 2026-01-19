---
name: add-section
description: Helps add new sections to the resume website (projects portfolio, testimonials, certifications, blog posts, etc.). Provides templates and maintains design consistency. Use when user wants to add new content sections.
---

# Add Section Skill

## Overview

Assists in adding new sections to the resume website while maintaining design consistency, accessibility, and code quality.

## When to Use This Skill

Use this skill when:
- User wants to add a new section (projects, testimonials, certifications, blog)
- User says "add a portfolio section" or similar
- User wants to expand the resume with additional content

## Workflow

### Step 1: Determine Section Type

Ask the user what type of section they want to add:

```
Question: "What type of section would you like to add?"
Options:
- Projects/Portfolio - Showcase work samples and projects
- Testimonials/Recommendations - Add quotes from colleagues/clients
- Certifications/Courses - List certifications and completed courses
- Blog/Articles - Link to published articles or blog posts
- Volunteer Work - Add volunteer experience
- Custom Section - Something else
```

### Step 2: Gather Content

Based on section type, gather necessary information using AskUserQuestion or direct conversation.

For **Projects/Portfolio**:
- Project name
- Description
- Technologies used
- Link to live site/repo
- Screenshots (optional)

For **Testimonials**:
- Quote text
- Person's name
- Person's title/company
- Photo (optional)

For **Certifications**:
- Certification name
- Issuing organization
- Date earned
- Credential ID/Link

### Step 3: Read Current Files

Read index.html and styles.css to understand:
- Current structure and patterns
- CSS naming conventions
- Color scheme and spacing
- Animation patterns

### Step 4: Generate Section Code

Create HTML, CSS, and JS (if needed) that matches the existing design.

#### Projects Section Template
```html
<!-- Projects Section -->
<section class="projects" id="projects">
    <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid">
            <div class="project-card">
                <div class="project-image">
                    <img src="project1.jpg" alt="Project 1 screenshot">
                </div>
                <div class="project-content">
                    <h3 class="project-title">Project Name</h3>
                    <p class="project-description">
                        Brief description of the project and what problem it solves.
                    </p>
                    <div class="project-tech">
                        <span class="tech-tag">Rails</span>
                        <span class="tech-tag">PostgreSQL</span>
                        <span class="tech-tag">React</span>
                    </div>
                    <div class="project-links">
                        <a href="#" class="btn btn-secondary" target="_blank">
                            View Live
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                        <a href="#" class="btn btn-secondary" target="_blank">
                            View Code
                        </a>
                    </div>
                </div>
            </div>
            <!-- More project cards -->
        </div>
    </div>
</section>
```

#### Testimonials Section Template
```html
<!-- Testimonials Section -->
<section class="testimonials" id="testimonials">
    <div class="container">
        <h2 class="section-title">Testimonials</h2>
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <div class="quote-icon">"</div>
                <p class="testimonial-text">
                    Quote text goes here. What the person said about working with you.
                </p>
                <div class="testimonial-author">
                    <div class="author-info">
                        <h4>Person Name</h4>
                        <p>Title at Company</p>
                    </div>
                </div>
            </div>
            <!-- More testimonials -->
        </div>
    </div>
</section>
```

#### Certifications Section Template
```html
<!-- Certifications Section -->
<section class="certifications" id="certifications">
    <div class="container">
        <h2 class="section-title">Certifications & Courses</h2>
        <div class="certifications-list">
            <div class="certification-item">
                <div class="cert-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                </div>
                <div class="cert-content">
                    <h3>Certification Name</h3>
                    <p class="cert-issuer">Issuing Organization</p>
                    <p class="cert-date">Earned: Month Year</p>
                    <a href="#" class="cert-link" target="_blank">View Credential</a>
                </div>
            </div>
            <!-- More certifications -->
        </div>
    </div>
</section>
```

### Step 5: Generate Matching CSS

Create CSS that matches the existing design patterns:

```css
/* Projects Section */
.projects {
    padding: 80px 0;
    background: var(--bg-secondary, #f8f9fa);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.project-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.project-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: #e9ecef;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.project-content {
    padding: 24px;
}

.project-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--text-primary, #1a1a1a);
}

.project-description {
    color: var(--text-secondary, #666);
    line-height: 1.6;
    margin-bottom: 16px;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.tech-tag {
    padding: 4px 12px;
    background: var(--accent-light, #e3f2fd);
    color: var(--accent, #1976d2);
    border-radius: 16px;
    font-size: 0.875rem;
    font-weight: 500;
}

.project-links {
    display: flex;
    gap: 12px;
}

/* Responsive */
@media (max-width: 768px) {
    .projects {
        padding: 60px 0;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }
}
```

### Step 6: Update Navigation

Add a link to the new section in the navigation:

```html
<li><a href="#projects">Projects</a></li>
```

### Step 7: Add Scroll Animation (Optional)

If the site uses scroll animations, add them for the new section:

```javascript
// In script.js
const observeSection = (selector) => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
};

// Add this line
observeSection('.project-card');
```

### Step 8: Show Preview and Ask for Approval

Present the code to the user:
1. Show the HTML structure
2. Show the CSS styling
3. Explain how it integrates with existing code
4. Highlight any customization options

Ask: "Would you like me to add this section to your resume website?"

### Step 9: Apply Changes

If approved:
1. Find the appropriate insertion point in index.html
2. Use Edit tool to add the HTML
3. Use Edit tool to add CSS to styles.css
4. If needed, add JavaScript to script.js
5. Update navigation menu

### Step 10: Verify Integration

After adding:
1. Check that section IDs are unique
2. Verify navigation links work
3. Ensure responsive behavior
4. Confirm it matches existing design patterns
5. Test accessibility (headings, ARIA if needed)

### Step 11: Provide Next Steps

Tell the user:
- Where the section was added
- How to customize the content
- How to add more items to the section
- Suggest testing in browser

## Section Templates Library

### Projects/Portfolio
- Grid layout with cards
- Project image, title, description
- Tech stack tags
- Links to live site and code

### Testimonials
- Quote cards with attribution
- Optional profile images
- Carousel or grid layout

### Certifications
- List or grid layout
- Certification badge/icon
- Issuer and date
- Link to verify credential

### Blog/Articles
- Card layout with featured image
- Title, excerpt, date
- Read more links
- Optional tags/categories

### Volunteer Work
- Timeline or list format
- Organization, role, dates
- Description of contributions

## Design Consistency Checklist

When creating new sections, ensure:
- [ ] Colors match existing palette
- [ ] Typography follows existing scale
- [ ] Spacing matches site patterns (multiples of 8px or 4px)
- [ ] Border radius consistent with other elements
- [ ] Box shadows match existing components
- [ ] Transitions/animations match site feel
- [ ] Hover states consistent with other interactive elements
- [ ] Mobile responsiveness matches site breakpoints
- [ ] Accessibility standards maintained (semantic HTML, ARIA if needed)
- [ ] Section follows existing layout patterns (container, padding, etc.)

## Tips for Quality Section Addition

1. **Match existing patterns:** Study how current sections are structured
2. **Use existing CSS variables:** Don't hardcode colors/fonts
3. **Maintain spacing rhythm:** Use consistent padding/margins
4. **Keep it responsive:** Test at multiple viewport sizes
5. **Consider load order:** Add sections in logical page flow
6. **Update navigation:** Don't forget to add nav links
7. **Test scroll behavior:** Ensure smooth scrolling works
8. **Check accessibility:** Proper heading hierarchy, alt text, ARIA
9. **Optimize images:** If adding images, ensure they're optimized
10. **Document changes:** Update README if significant addition
