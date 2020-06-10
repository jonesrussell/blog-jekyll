---
title: "Can't view saved passwords in Chrome"
layout: post
categories: [browsers]
tags: [chrome, passwords, troubleshooting]
typora-copy-images-to: ../assets/post
---

Ahnii! G'day.

I tried to export my saved passwords from within Chrome and found what appears
to be placeholder text where I expected to see passwords. Observe my
[chrome://settings/passwords]:

{% include image.html src="/assets/post/chrome-saved-passwords.png" alt="Screenshot of Chrome settings with 'Saved passwords will appear here' message" description="Saved passwords will appear here" %}

## Cause

"Login Data" has become corrupted.

## Solution

To fix we have to allow Chrome to regenerate "Login Data".

1. Locate "Login Data" file
2. Shut down all instances of Chrome
3. Backup and remove "Login Data"
4. Start Chrome
5. Verify you can now view passwords
6. Jump for Joy :)

### 1. Locate "Login Data" file

In Chrome, type "chrome://version" into the address bar:

![chrome-version-profile-path](/assets/post/chrome-version-profile-path-1591453390495.png)

### 2. Shut down all instances of Chrome

```bash
pkill chrome
```

### 3. Backup and remove "Login Data"

```bash
mkdir -p ~/.local/backups
mv
```

### 4. Start Chrome
