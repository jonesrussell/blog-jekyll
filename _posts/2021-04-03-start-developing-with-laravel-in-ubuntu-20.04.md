---
title: Start Developing with Laravel in Ubuntu 20.04
image: /blog/assets/img/laravel.png
layout: post
categories: laravel
tags: [web-development, install]
slug: start-developing-with-laravel-in-ubuntu-20.04
---

First and foremost, I find [Ubuntu](https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview) the Linux distribution easiest to install and best supported when learning Web Development. I'm sure that's open for debate, but that's what the comments are for.

## OK, I'm running Ubuntu, what next?

I suggest that your [install Homebrew](https://blog.aamnah.com/sysadmin/install-homebrew-ubuntu-linux), "The Missing Package Manager for macOS (or Linux)". It's great but if you choose another path, I hope you can still follow along.

## I have Homebrew, now what?

### Install DDEV

<blockquote>[DDEV](https://github.com/drud/ddev) is an open  source tool that makes it dead simple to get local PHP development  environments up and running within minutes. It's powerful and flexible  as a result of its per-project environment configurations, which can be  extended, version controlled, and shared. In short, DDEV aims to allow  development teams to use Docker in their workflow without the  complexities of bespoke configuration.</blockquote>

Follow the directions at https://ddev.readthedocs.io/en/stable/#installation which will ensure you have everything needed to install DDEV and then Laravel.

### Install Laravel

Copy and paste from below, replace MY_SITE="" with the name you wish to choose for you site:

```bash
MY_SITE=my-laravel-app
mkdir $MY_SITE
cd $MY_SITE
ddev config --project-type=laravel --docroot=public --create-docroot
ddev start
ddev composer create --prefer-dist laravel/laravel
ddev exec "cat .env.example | sed  -E 's/DB_(HOST|DATABASE|USERNAME|PASSWORD)=(.*)/DB_\1=db/g' > .env"
ddev exec "php artisan key:generate"
ddev launch
```

## Bing, bang, boom. I have some Laravel

The *ddev launch* command should have opened your default browser to this screen:

![](/blog/assets/img/laravel.png)
