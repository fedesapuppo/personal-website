# Improve Content Command

Focuses specifically on improving resume content - work experience descriptions, skills presentation, and professional language.

## What This Command Does

Uses the content-analyzer agent to review and improve specific sections of the resume website.

## Instructions

### Step 1: Ask User What to Improve

Use AskUserQuestion to determine what content to focus on:

```
Question: "Which section would you like to improve?"
Options:
- Work Experience descriptions
- Skills organization and presentation
- Hero/About section
- All content (comprehensive review)
```

### Step 2: Read Current Content

Read index.html and extract the relevant section(s).

### Step 3: Launch Content Analyzer

```
Task(
  subagent_type: "content-analyzer",
  description: "Analyze and improve the [selected section] in index.html.

  Focus on:
  - Impact and clarity of descriptions
  - Use of strong action verbs
  - Quantifiable achievements
  - Professional tone
  - Grammar and consistency

  Provide:
  1. Analysis of current content
  2. Specific issues found
  3. Rewritten versions of weak sections
  4. Alternative phrasings for key achievements"
)
```

### Step 4: Present Improvements to User

Show the user:
1. Current version vs. improved version side-by-side
2. Explanation of why changes improve the content
3. Ask if they want to apply the changes

### Step 5: Apply Changes (If Approved)

If user approves:
1. Use Edit tool to update index.html with improved content
2. Confirm changes were applied
3. Suggest committing changes with git

## Usage

```
/improve-content
```

Follow prompts to select which section to improve.
