---
layout: post
title: "Use DDEV to Locally Develop with Drupal"
date: 2020-04-24
categories: [drupal, docker]
tags: [drupal, docker, ddev, development]
description: "Learn how to use DDEV for local Drupal development, making setup and configuration easier with Docker containers."
---

# Use DDEV to Locally Develop with Drupal

Ahnii!

I've been developing with Drupal for over 10 years. While it's never been known for quick and easy installation, containers have changed that. Let me show you how DDEV makes local Drupal development a breeze.

## Why DDEV? (2 minutes)

DDEV provides:
- One-command setup
- Consistent environments
- Built-in tools
- Docker without complexity

## Getting Started (5 minutes)

Install DDEV:
```bash
curl -L https://raw.githubusercontent.com/drud/ddev/master/scripts/install_ddev.sh | bash
```

Create a new Drupal project:
```bash
mkdir my-drupal-site
cd my-drupal-site
ddev config --project-type=drupal8
ddev start
```

## Quick Setup (5 minutes)

Download Drupal:
```bash
ddev composer create drupal/recommended-project
ddev drush site:install --account-name=admin --account-pass=admin
```

Your site is now available at: https://my-drupal-site.ddev.site

## Common Commands

```bash
# Start containers
ddev start

# Stop containers
ddev stop

# SSH into web container
ddev ssh

# Run composer
ddev composer require drupal/admin_toolbar

# Run drush
ddev drush cr
```

## Custom Configuration

Add custom settings in .ddev/config.yaml:
```yaml
php_version: "7.4"
webserver_type: nginx-fpm
database_type: mysql
docroot: web
```

## Best Practices

1. Use composer for dependencies
```bash
ddev composer require drupal/token
```

2. Keep settings.local.php in version control
3. Use drush for site tasks
4. Share ddev config with team

## Wrapping Up

DDEV makes local Drupal development painless and consistent. How has containerization changed your development workflow? Share below!

Baamaapii 👋 