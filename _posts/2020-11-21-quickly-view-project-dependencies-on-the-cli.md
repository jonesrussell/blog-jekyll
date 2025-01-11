---
layout: post
title: "Quickly View Project Dependencies on the CLI"
date: 2020-11-21
categories: [cli, nodejs]
tags: [cli, nodejs, npm, productivity]
summary: "Learn how to view your project's package.json dependencies directly from the terminal using built-in npm commands."
---

> **Update (2025)**: This article has been revised to reflect modern npm capabilities. The original custom tool is no longer necessary as npm now provides these features out of the box.

Ahnii!

I frequently find myself wanting to check package.json dependencies while working in the terminal. Here are the modern ways to do this using npm's built-in commands.

## Built-in NPM Commands (2 minutes)

### List All Dependencies

```bash
npm list
# or shorter
npm ls
```

### List Only Direct Dependencies

```bash
npm ls --depth=0
```

### List Production Dependencies Only

```bash
npm ls --prod --depth=0
```

### List Development Dependencies Only

```bash
npm ls --dev --depth=0
```

### Search for Specific Package

```bash
npm ls package-name
```

### View Outdated Packages

```bash
npm outdated
```

## Enhanced Features with npm@7+ (2 minutes)

Newer versions of npm include additional helpful commands:

```bash
# View package details
npm view package-name

# View all package versions
npm view package-name versions

# Check for security vulnerabilities
npm audit
```

## Legacy Custom Tool

> Note: The custom CLI tool from the original post is no longer necessary with modern npm versions, but you can still find it in the [GitHub repository](https://github.com/jonesrussell/scripts) if interested.

## Wrapping Up

npm's built-in commands now provide robust dependency management features right out of the box. What's your favorite npm command for managing dependencies? Share below!

Baamaapii 👋
