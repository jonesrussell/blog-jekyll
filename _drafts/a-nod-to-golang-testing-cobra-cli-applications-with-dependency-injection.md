---
layout: post
title: "A Nod to 'Golang: Testing Cobra CLI Applications with Dependency Injection'"
date: 2024-07-06
---

# A Nod to "Golang: Testing Cobra CLI Applications with Dependency Injection"

Ahnii, fellow Gophers! Today, I want to bring your attention to a blog post that I stumbled upon while flailing about, trying to figure out how to test my Dependency Injected Cobra CLI app.

[Golang: Testing Cobra CLI applications with dependency injection](https://web.archive.org/web/20240706150641/https://jackwrfuller.au/posts/testing-cobra-cli/) helped me the utmost. So thanks and credit to the author, Jack W R Fuller.

## Assumptions

Assumes experience with Cobra.

## Why This Post is Useful

- **Practical Examples**: The post provides practical examples of CLI application development using Go and Cobra CLI.
- **Testing Guidance**: It offers guidance on how to test Cobra CLI applications while avoiding the trial and error.
- **Dependency Injection**: It touches on the concept of dependency injection.
- **Command Factories**: It introduces the command factories design pattern to avoid singleton subcommands.
- 
## New Cobra project

SHOW DEFAULT main.go and root.go.

## GoCreate

To illustrate, here's my Cobra CLI projects main.go.

https://github.com/jonesrussell/gocreate/blob/nod-to-dependency-injection/main.go

https://github.com/jonesrussell/gocreate/blob/nod-to-dependency-injection/cmd/root.go

https://github.com/jonesrussell/gocreate/blob/nod-to-dependency-injection/cmd/website.go

