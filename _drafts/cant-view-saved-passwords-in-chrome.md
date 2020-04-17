---
layout: post
title: "Can't view saved passwords in Chrome"
categories: [browsers]
tags: [google-chrome, passwords]
---

I tried to export my saved passwords in Chrome today and found the relevant
section in settings to be empty. Observe:

![Screenshot of Chrome settings with "Saved passwords will appear here" message]({{ site.baseurl }}/assets/img/chrome-saved-passwords.png)

To fix it I had to:

- Shut down all instances of Chrome
- Backup and remove "Login Data"
- Start Chrome and profit

## Shut down all instances of Chrome

```bash
pkill chrome
```

## Backup and remove "Login Data"

```bash
mkdir -p ~/.local/backups
mv
```

## Start Chrome and profit
