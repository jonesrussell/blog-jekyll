---
title: Quickly view nodejs project 'scripts' on the cli
layout: post
caegories: [nodejs]
tags: [cli, web-development]
slug: quickly-view-nodejs-project-scripts-on-the-cli
---

Ahnii! I previously wrote a command line utility named '[packages]({{ site.baseurl }}{% link _posts/2020-11-21-quickly-view-project-dependencies-on-the-cli.md %})' which simply prints a list of project dependencies on the command line.

I found that I also often want to see a list of scripts in package.json, so I wrote another utility I've named 'scripts', observe:

<p class="center" markdown="1">
![scripts screenshot](/assets/img/screenshot-scripts.png){:class="half center"}
</p>

You can accomplish the same with 'sed', but it's quite a command to remember, observe:

```bash
sed -n -e '/scripts/,/},/ p' package.json
```

<p class="center" markdown="1">
![scripts sed screenshot](/assets/img/screenshot-scripts-sed.png)
</p>

Check it out at [https://github.com/jonesrussell/scripts](https://github.com/jonesrussell/scripts) or simply install it and try:

```sh
npm i -g @jonesrussell42/scripts
```

Meegwetch!

