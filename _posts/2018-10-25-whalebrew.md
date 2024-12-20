---
layout: post
title: "Whalebrew: Docker Images as Native Commands"
date: 2018-10-25
categories: [docker, tools]
tags: [docker, containers, cli, devops]
description: "Learn how to use Whalebrew to run Docker containers as if they were native commands, simplifying your development workflow."
---

Ahnii!

If you're from the Mac world, you've probably used or heard of Homebrew. For the uninformed, Homebrew is the missing package manager for macOS. Whalebrew brings that same convenience to Docker containers.

## Why Whalebrew? (2 minutes)

Whalebrew lets you:
- Run containers as native commands
- Manage Docker images like packages
- Share complex tools easily
- Keep your system clean

## Getting Started (5 minutes)

Install Whalebrew:
```bash
sudo curl -L "https://github.com/bfirsh/whalebrew/releases/download/0.1.0/whalebrew-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/whalebrew
sudo chmod +x /usr/local/bin/whalebrew
```

## Basic Usage (5 minutes)

Install a package:
```bash
sudo whalebrew install whalebrew/figlet
```

Use it like a native command:
```bash
figlet "Hello Whale!"
```

## How It Works

When you install a package, Whalebrew:
1. Creates an alias in your $PATH
2. Mounts current directory in container
3. Passes through arguments
4. Handles permissions

## Under the Hood

The alias looks like:
```bash
docker run -it -v "$(pwd)":/workdir -w /workdir whalebrew/figlet "$@"
```

## Best Practices

1. Keep containers focused:
```dockerfile
FROM alpine:latest
RUN apk add --no-cache figlet
ENTRYPOINT ["figlet"]
```

2. Use appropriate base images
3. Document requirements
4. Handle permissions properly

## Wrapping Up

Whalebrew makes Docker containers feel native while keeping your system clean. What tools would you containerize? Share your ideas below!

Baamaapii 👋 