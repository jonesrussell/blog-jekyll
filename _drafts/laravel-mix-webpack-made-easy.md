---
title: "Laravel Mix: Webpack made easy"
layout: post
categories: [javascript]
tags: [webpack, nodejs, bundling]
typora-copy-images-to: ../assets/post

---

Ahnii! G'day.

Yesterday when I was adding the [LogRocket](https://logrocket.io) and [Sentry](https://sentry.io]) javascript libraries to my blog I was reminded of how un-enjoyable configuring [Webpack](https://webpack.js.org/) can be. 

Although my blog is produced with [Jekyll](https://jekyllrb.com), a static website generator written in Ruby, and [Laravel](https://laravel.com) is written in PHP, [Laravel Mix](https://laravel-mix.com) is good ol' fashioned javascript.

## Laravel Mix

> Laravel Mix provides a clean, fluent API for defining basic [webpack](http://github.com/webpack/webpack) build steps for your applications. Mix supports several common CSS and JavaScript pre-processors.
>
> If you've ever been confused about how to get started with module bundling and asset compilation, you will love Laravel Mix!

## Tutorial

First we need a simple HTML scaffolding. [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) is a great start.

### Prerequisites

* git
* node/npm

### Scaffold Project

* Clone the boilerplate:

  ```bash
  git clone https://github.com/h5bp/html5-boilerplate.git
  ```

* Remove existing package.json and package-lock.json:

  ```bash
  cd html5-boiderplate
  rm package*.json
  ```

* Initialise new package.json:

  ```bash
  npm init -y
  ```

### Install Laravel Mix

* Use --save-dev to make it a devDependency:

  ```bash
  npm install --save-dev laravel-mix
  ```

* Copy the config file to project root:

  ```bash
  cp node_modules/laravel-mix/setup/webpack.mix.js .
  ```

  

## Conclusion

...

Gaabenaka.