---
layout: post
title: "Scaffold and Deploy a Jekyll GitHub Pages Blog in 5 Minutes"
date: 2018-09-29
categories: [jekyll, github-pages]
tags: [jekyll, github, static-sites, web-development]
description: "Learn how to quickly set up and deploy a Jekyll blog to GitHub Pages, with step-by-step instructions for beginners."
---

Ahnii!

Static websites have made a comeback. Innovations in content generation, the adoption of Markdown in workflows, deployment technology, and free hosting have made static websites an attractive option for those who don't need the capabilities of a framework or content management system.

## Why Static Sites?

1. No server-side programming required
2. Lightning-fast page loads
3. Better SEO performance
4. Simple deployment
5. Free hosting options

## Prerequisites

- Terminal (command-line interface)
- RubyGems
- Git
- GitHub account

## Quick Start

Install Jekyll:
```bash
gem install bundler jekyll
```

Create your site:
```bash
jekyll new my-awesome-site
cd my-awesome-site
bundle exec jekyll serve
```

Visit http://localhost:4000 to preview your site.

## Deploy to GitHub Pages

1. Create a new repository:
   - Go to https://github.com/new
   - Name it "my-awesome-site"
   - Leave it public
   - Click "Create repository"

2. Configure for GitHub Pages:
   - Go to repository Settings
   - Scroll to "GitHub Pages" section
   - Select "master branch" as Source
   - Save changes

3. Update your Gemfile:
```ruby
# Comment out this line
# gem "jekyll", "~> 3.8.4"

# Uncomment this line
gem "github-pages", group: :jekyll_plugins
```

4. Configure _config.yml:
```yaml
baseurl: "/my-awesome-site" # the subpath of your site
```

5. Push to GitHub:
```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/username/my-awesome-site.git
git push -u origin master
```

Visit https://username.github.io/my-awesome-site/ to see your live site!

## Wrapping Up

You now have a working Jekyll blog hosted on GitHub Pages. To create new posts, simply add markdown files to the "_posts" directory following the naming convention: `YYYY-MM-DD-title.md`.

How are you planning to use your new Jekyll blog? Share your ideas below!

Baamaapii 👋 