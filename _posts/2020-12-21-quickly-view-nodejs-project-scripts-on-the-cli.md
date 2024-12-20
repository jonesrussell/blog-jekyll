---
layout: post
title: "Quickly View Node.js Project Scripts on the CLI"
date: 2020-12-21
categories: [cli, nodejs]
tags: [cli, nodejs, npm, productivity]
description: "Create a simple CLI tool to view your Node.js project's npm scripts directly from the terminal."
---

# Quickly View Node.js Project Scripts on the CLI

Ahnii!

Following up on my previous post about viewing dependencies, I've created another CLI utility that shows npm scripts from your package.json file. Let's dive in!

## The Problem (2 minutes)

When working on Node.js projects, you often need to:
- Check available npm scripts
- Verify script commands
- Remember custom script names
- Share scripts with team members

## The Solution (5 minutes)

Here's a simple CLI tool to display npm scripts:

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function readPackageJson() {
    const packagePath = path.join(process.cwd(), 'package.json');
    
    try {
        const data = fs.readFileSync(packagePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(chalk.red('Error: No package.json found in current directory'));
        process.exit(1);
    }
}

function displayScripts() {
    const pkg = readPackageJson();
    
    if (!pkg.scripts || Object.keys(pkg.scripts).length === 0) {
        console.log(chalk.yellow('\nNo scripts found in package.json'));
        return;
    }
    
    console.log(chalk.cyan('\nAvailable scripts:'));
    Object.entries(pkg.scripts).forEach(([name, command]) => {
        console.log(chalk.green(`\n${name}:`));
        console.log(`  ${command}`);
    });
}

displayScripts();
```

## Installation (2 minutes)

Create a global command:

```bash
# Install dependencies
npm install chalk

# Save as scripts-cli.js
chmod +x scripts-cli.js
npm link
```

## Usage

Run in any Node.js project:
```bash
scripts
```

Example output:
```
Available scripts:

start:
  node server.js

dev:
  nodemon server.js

test:
  jest --watch

build:
  webpack --mode production
```

## Enhanced Features

Add script execution:
```javascript
const { spawn } = require('child_process');

function runScript(scriptName) {
    const pkg = readPackageJson();
    if (!pkg.scripts[scriptName]) {
        console.error(chalk.red(`Script '${scriptName}' not found`));
        return;
    }
    
    spawn('npm', ['run', scriptName], { stdio: 'inherit' });
}
```

## Best Practices

1. Use descriptive script names
```json
{
  "scripts": {
    "start:dev": "nodemon server.js",
    "start:prod": "node server.js",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

2. Document complex scripts
3. Keep scripts focused and composable
4. Use cross-platform commands

## Wrapping Up

Simple utilities can make development more efficient. How do you manage your npm scripts? Share your approaches below!

Baamaapii 👋 