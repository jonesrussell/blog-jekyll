---
layout: post
title: "Quickly View Project Dependencies on the CLI"
date: 2020-11-21
categories: [cli, nodejs]
tags: [cli, nodejs, npm, productivity]
description: "Learn how to create a simple CLI tool to view your project's package.json dependencies directly from the terminal."
---

Ahnii!

I frequently find myself wanting to check package.json dependencies while working in the terminal. Let me share a simple tool I created to make this easier.

## The Problem (2 minutes)

Common scenarios:
- Checking installed packages
- Verifying versions
- Comparing dev vs production deps
- Quick dependency audits

## The Solution (5 minutes)

Create a simple CLI tool:

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function readPackageJson() {
    const packagePath = path.join(process.cwd(), 'package.json');
    
    try {
        const data = fs.readFileSync(packagePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error: No package.json found in current directory');
        process.exit(1);
    }
}

function displayDependencies() {
    const pkg = readPackageJson();
    
    console.log('\nDependencies:');
    if (pkg.dependencies) {
        Object.entries(pkg.dependencies).forEach(([name, version]) => {
            console.log(`  ${name}: ${version}`);
        });
    }
    
    console.log('\nDevDependencies:');
    if (pkg.devDependencies) {
        Object.entries(pkg.devDependencies).forEach(([name, version]) => {
            console.log(`  ${name}: ${version}`);
        });
    }
}

displayDependencies();
```

## Installation (2 minutes)

Make it globally available:

```bash
# Save as packages-cli.js
chmod +x packages-cli.js
npm link
```

## Usage

Simply run in any Node.js project:
```bash
packages
```

Example output:
```
Dependencies:
  express: ^4.17.1
  lodash: ^4.17.20

DevDependencies:
  jest: ^26.6.3
  nodemon: ^2.0.6
```

## Enhanced Features

Add filtering options:
```javascript
function filterDependencies(deps, search) {
    if (!search) return deps;
    return Object.entries(deps)
        .filter(([name]) => name.includes(search))
        .reduce((acc, [name, version]) => ({
            ...acc,
            [name]: version
        }), {});
}
```

## Wrapping Up

Simple CLI tools can significantly improve your workflow. What command-line utilities have you created? Share your tools below!

Baamaapii 👋

