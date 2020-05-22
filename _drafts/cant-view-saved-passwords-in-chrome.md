---
title: "Can't view saved passwords in Chrome"
layout: post
categories: [browsers]
tags: [chrome, passwords, troubleshooting]
---

Ahnii! G'day, g'day g'day.

Earlier today, I tried to export my saved passwords in Chrome settings and found the relevant
section to be nothing more than a fancy promise left unfulfilled. Observe:

![Screenshot of Chrome settings with "Saved passwords will appear here" message](/home/russell/Development/Portfolio/blog-jekyll/assets/img/chrome-saved-passwords.png)

Screenshot; "Saved passwords will appear here".

## Cause

"Login Data" has become corrupted.

## Solution

To fix we have to allow Chrome to regenerate "Login Data".

1. Locate "Login Data" file
2. Shut down all instances of Chrome
3. Backup and remove "Login Data"
4. Start Chrome and profit

### Locate "Login Data" file

In Chrome, type "chrome://version" into the address bar:



### Shut down all instances of Chrome

```bash
pkill chrome
```

### Backup and remove "Login Data"

```bash
mkdir -p ~/.local/backups
mv
```

### Start Chrome and profit
