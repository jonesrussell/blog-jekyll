---
layout: post
title: "Cursor AI Tools Reference"
date: 2025-01-10
categories: [tools, documentation]
tags: [cursor-ai, tools, reference]
summary: "A comprehensive reference of tools available to Cursor AI for code manipulation and file operations."
---

Ahnii!

Here's a reference guide to all tools available in Cursor AI. This helps both users and AI instances understand what's possible and how to use each tool effectively.

## Search Tools (5 minutes)

### Semantic Search

```bash
codebase_search
```

- Purpose: Find relevant code snippets based on semantic meaning
- Best for: Understanding code context and finding related functionality
- Note: Reuses user's exact query when possible for better results

### Text Search

```bash
grep_search
```

- Purpose: Find exact text matches using regex
- Best for: Finding specific strings, function names, or patterns
- More precise than semantic search for known text

### File Search

```bash
file_search
```

- Purpose: Fuzzy search for files by name
- Best for: Finding files when you know part of the name
- Limited to 10 results per query

## File Operations (5 minutes)

### Read Files

```bash
read_file
```

- Purpose: View file contents
- Can read up to 250 lines at a time
- Provides summary of lines not shown
- Important: Always verify complete context is gathered

### List Directory

```bash
list_dir
```

- Purpose: Quick directory exploration
- Best for: Understanding project structure
- Use before deeper operations

### Delete Files

```bash
delete_file
```

- Purpose: Remove files from workspace
- Fails gracefully if:
  - File doesn't exist
  - Operation rejected for security
  - File cannot be deleted

## Code Editing (10 minutes)

### Edit Files

```bash
edit_file
```

- Purpose: Modify existing files
- Key features:
  - Uses `// ... existing code ...` for unchanged sections
  - Requires minimal context for changes
  - Can block concurrent edits
- Best practices:
  - Always read file before editing
  - Provide clear edit instructions
  - Include necessary context

### Reapply Edits

```bash
reapply
```

- Purpose: Retry failed edits with smarter model
- Use immediately after `edit_file` if results aren't as expected
- Only works on most recent edit

### Parallel Edits

```bash
parallel_apply
```

- Purpose: Make similar edits across multiple files
- Best for: Consistent changes needed in many locations
- Limitations:
  - Maximum 50 files at once
  - Needs clear edit plan
  - Requires sufficient context for each file

## Terminal Operations (5 minutes)

### Run Commands

```bash
run_terminal_cmd
```

- Purpose: Execute shell commands
- Key features:
  - Can run in background
  - Maintains shell context between calls
  - Can require user approval
- Best practices:
  - Add `| cat` for pager commands
  - Use background flag for long-running processes
  - Always explain command purpose

## Usage Tips (5 minutes)

1. **Tool Selection**
   - Start with `list_dir` for exploration
   - Use `codebase_search` for understanding
   - Use `grep_search` for specific text
   - Combine tools for complex tasks

2. **Error Handling**
   - Verify file contents before editing
   - Use `reapply` for failed edits
   - Check command output when possible

3. **Best Practices**
   - Explain actions before using tools
   - Gather sufficient context
   - Use most specific tool for the task
   - Consider user approval needs

## Common Workflows (5 minutes)

1. **Finding and Editing**

```bash
list_dir → codebase_search → read_file → edit_file
```

2. **Bulk Changes**

```bash
grep_search → parallel_apply
```

3. **File Operations**

```bash
file_search → read_file → delete_file
```

Remember: These tools are powerful but require careful use. Always verify changes and consider the impact of operations.

Baamaapii 👋 