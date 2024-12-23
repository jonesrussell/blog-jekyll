---
layout: post
title: "Quickly View Node.js Project Scripts on the CLI"
date: 2020-12-21
categories: [cli, nodejs]
tags: [cli, nodejs, npm, productivity]
summary: "Create a simple CLI tool to view your Node.js project's npm scripts directly from the terminal."
image: /assets/img/screenshot-scripts.png
---

Ahnii! I previously wrote a command line utility named '[packages]({{ site.baseurl }}{% link _posts/2020-11-21-quickly-view-project-dependencies-on-the-cli.md %})' which simply prints a list of project dependencies on the command line.

I found that I also often want to see a list of scripts in package.json, so I wrote another utility I've named 'scripts', observe:

<p class="center" markdown="1">
![scripts screenshot]({{ site.baseurl }}/assets/img/screenshot-scripts.png){:class="half center"}
</p>

You can accomplish the same with 'sed', but it's quite a command to remember, observe:

```bash
sed -n -e '/scripts/,/},/ p' package.json
```

<p class="center" markdown="1">
![scripts sed screenshot]({{ site.baseurl }}/assets/img/screenshot-scripts-sed.png)
</p>


Check it out at [https://github.com/jonesrussell/scripts](https://github.com/jonesrussell/scripts) or simply install it and try:

```sh
npm i -g @jonesrussell42/scripts
```

Meegwetch!

