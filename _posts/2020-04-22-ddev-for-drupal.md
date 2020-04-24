---
layout: post
title: "Use DDEV to locally develop with Drupals"
categories: [web-development]
tags: [drupal, docker, devops, php]
---

I've been developing with Drupal for over 10 years. It's never been known to be quick and easy to install, but with the rise of containers it's now as easy as executing a few commands in a terminal.

## Prerequisites

- composer
- docker
- ddev

## Install Drupal

1. _composer_ has become the de-facto standard package manager of PHP projects and the Drupal recommended way to manage a Drupal installation:

   ```bash
   # use composer to download Drupal
   composer create-project drupal/recommended-project my-drupal-site \
       && cd $_ # $_ will contain 'my-drupal-site'
   ```

2. _DDEV_ is a wrapper for Docker that spins up containers configured to serve PHP projects with an SQL database:

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

4. Before Drupal is useable it must be installed. You can click through the install wizard or use _drush_, a command-line utility for Drupal, that comes installed with _DDEV_:

   ```bash
   ddev exec drush site-install -y --account-name=admin --account-pass=my-password
   ```

That's it, Drupal is installed and running at http://my-drupal-site.ddev.site. You can [login](http://my-drupal-site.ddev.site/user/login) with the following credentials:

```bash
username: admin
password: my-password
```

Gaabeneka.
