---
layout: post
title: "Docker for Legacy Drupal Development"
date: 2018-10-14
categories: [docker, drupal]
tags: [docker, drupal, containers, devops]
description: "Learn how to leverage Linux containers for migrating Drupal 6 to Drupal 8, with practical examples and best practices."
---

# Docker for Legacy Drupal Development: Migrating Drupal 6 to 8

Ahnii,

Let me start by saying this guide could be titled "Docker for Development" and be applied to virtually any stack. I'm using Drupal because I recently began a Drupal 6 (D6) to Drupal 8 (D8) website migration.

## Why Docker for Legacy Development?

The challenge: D6 requires PHP 5.6 or lower, while D8 needs PHP 7.1+. How do you run both PHP versions simultaneously? Instead of managing multiple VMs or complex PHP-FPM setups, Docker provides an elegant solution.

## Understanding Containers vs VMs (5 minutes)

### Virtual Machines
- Full OS and kernel
- Resource heavy
- Slow to start/stop
- Complete isolation

### Containers
- Share host kernel
- Lightweight
- Start/stop in milliseconds
- Resource efficient

## Setting Up the Environment (10 minutes)

First, let's create our MySQL container:

```bash
sudo docker run -d \
--name="drupal-mysql" \
-e MYSQL_ROOT_PASSWORD=drupalroot \
-e MYSQL_DATABASE=drupal6 \
-e MYSQL_USER=drupal \
-e MYSQL_PASSWORD=drupal6pass \
mysql:5.6
```

Download Drupal 6:
```bash
cd ~
wget https://ftp.drupal.org/files/projects/drupal-6.38.tar.gz
tar -xzf drupal-6.38.tar.gz
```

Create the web container:
```bash
sudo docker run -d  \
-p 10080:80 \
-v ~/drupal-6.38:/var/www/html \
--name="drupal-app" \
--link="drupal-mysql" \
nimmis/apache-php5
```

## Data Persistence (5 minutes)

Docker offers two options for data persistence:
- Volumes (Docker-managed)
- Bind Mounts (host-managed)

For development, bind mounts work well:
```bash
-v ~/drupal-6.38:/var/www/html
```

## Cleanup

When finished, clean up your containers:
```bash
sudo docker container stop drupal-app drupal-mysql
sudo docker container rm drupal-app drupal-mysql
```

## Best Practices

1. Use Docker Compose for multi-container setups
2. Never store sensitive data in images
3. Use .dockerignore files
4. Keep images small and focused

## Wrapping Up

Docker makes it easy to maintain legacy development environments without compromising your host system. What legacy systems are you maintaining? Share your containerization stories below!

Baamaapii 👋 