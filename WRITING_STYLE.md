> Note: This document and its contents were automatically generated based on patterns found in the `_posts` directory. The "Ahnii" greeting and "Baamaapii" farewell appear to be consistent patterns across blog posts.

# Writing Style Guide

## Post Types and Templates

### 1. Standard Posts

Use: `_templates/post-template.md`

- General blog posts
- Opinion pieces
- News updates

### 2. Tutorials

Use: `_templates/tutorials/step-by-step.md`

- Step-by-step guides
- How-to articles
- Practical walkthroughs

### 3. Concept Explanations

Use: `_templates/concepts/explanation.md`

- Technical concepts
- Theory discussions
- Deep dives

### 4. Reviews

Use: `_templates/reviews/review.md`

- Tool reviews
- Technology comparisons
- Framework evaluations

## Style Guidelines

1. **Opening**

   - Start with "Ahnii!"
   - End with "Baamaapii 👋"

2. **Time Estimates**

   - Add (X minutes) to section headers
   - Keep sections focused

3. **Code Blocks**

   - Always specify language
   - Include comments
   - Use meaningful examples

4. **DEV.to Compatibility**

   - Maximum 4 tags
   - Clear descriptions
   - Proper markdown formatting

## Front Matter Requirements

```yaml
---
layout: post
title: "Title: Subtitle"
date: YYYY-MM-DD
categories: [cat1, cat2]
tags: [tag1, tag2, tag3, tag4]
description: "Compelling description"
---
```

## Language and Style

### Writing Concisely
- Avoid unnecessary adjectives like "comprehensive", "complete", "full", "robust", etc.
- Remove words that don't add value (very, really, basically, actually)
- Use active voice instead of passive
- Get to the point quickly
- If a word doesn't change the meaning when removed, remove it

### Examples
❌ Don't:
- "A comprehensive guide to PHP-FIG standards"
- "A complete tutorial that fully explains..."
- "A really useful tool that actually helps..."

✅ Do:
- "A guide to PHP-FIG standards"
- "A tutorial explaining..."
- "A tool that helps..."
