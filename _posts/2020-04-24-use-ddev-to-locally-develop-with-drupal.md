---
layout: post
title: "Use DDEV to Locally Develop with Drupal"
description: "Learn how to set up a local Drupal development environment using DDEV, a Docker-based development tool"
date: 2020-04-24
categories: [web-development]
tags: [drupal, docker, devops, php]
published: true
---

I've been developing with Drupal for over 10 years. It's never been known to be quick and easy to install, but with the rise of containers it's now as easy as executing a few commands in a terminal.

## Prerequisites

Installing the prerequisites is beyond the scope of this post but here is a linked list of what you need installed on your system:

- [Composer](https://getcomposer.org/download/)
- [Docker](https://docs.docker.com/get-docker/) version 18.06 or higher
- [Docker Compose](https://docs.docker.com/compose/install/)
- [DDEV](https://ddev.readthedocs.io/en/latest/#installation)

## Download & Install Drupal

1. _composer_ has become the de-facto standard package manager of PHP projects and the Drupal recommended way to manage a Drupal installation:

   ```bash
   # use composer to download Drupal
   composer create-project drupal/recommended-project my-drupal-site \
       && cd $_ # $_ will contain 'my-drupal-site'
   ```

2. _DDEV_ is a wrapper for _Docker Compose_ that spins up containers configured to serve PHP projects with an SQL database:

   ```bash
   # create a ddev config and settings.php for Drupal
   ddev config --docroot web --project-name $_ --project-type drupal8
   ```

3. Start the containers:

   ```bash
   ddev start
   ```

   Once the containers successfully start a link will be displayed to visit your site:

   ```bash
   Successfully started my-drupal-site
   Project can be reached at http://my-drupal-site.ddev.site http://127.0.0.1:32780
   ```

4. Before Drupal is usable it must be installed. You can click through the install wizard or use _drush_, a command-line utility for Drupal, that comes installed with _DDEV_:

   ```bash
   ddev exec drush site-install -y --account-name=admin --account-pass=my-password
   ```

That's it! Drupal is installed and running at <http://my-drupal-site.ddev.site.>

## Login

You can [login](http://my-drupal-site.ddev.site/user/login) with the following credentials:

```bash
username: admin
password: my-password
```

## Further Reading

Documentation: <https://ddev.readthedocs.io/en/latest/>

DDEV includes some handy functionality, like running composer and [drush](https://www.drush.org/) within the web container to download and install new modules.

You can easily import/export your database, or tap into [ngrok](https://ngrok.com/) to share a browse-able link to your project accessible from the internet.

Happy developing! Gabekana.
