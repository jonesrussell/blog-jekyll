---
layout: post
title: "Start Developing with Laravel in Ubuntu 20.04"
date: 2021-04-03
categories: [laravel, ubuntu]
tags: [laravel, php, ubuntu, development]
description: "A comprehensive guide to setting up a Laravel development environment in Ubuntu 20.04, with best practices and troubleshooting tips."
---

# Start Developing with Laravel in Ubuntu 20.04

Ahnii!

Ubuntu makes an excellent platform for Laravel development. Let me show you how to set up a proper development environment from scratch.

## Prerequisites (2 minutes)

First, update your system:
```bash
sudo apt update
sudo apt upgrade -y
```

## Install PHP and Extensions (5 minutes)

```bash
# Install PHP and common extensions
sudo apt install php8.0 php8.0-cli php8.0-common php8.0-curl \
    php8.0-mbstring php8.0-mysql php8.0-xml php8.0-zip \
    php8.0-bcmath php8.0-gd
```

## Install Composer (3 minutes)

```bash
# Download installer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

# Verify installer
php -r "if (hash_file('sha384', 'composer-setup.php') === file_get_contents('https://composer.github.io/installer.sig')) { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

# Install globally
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Clean up
php -r "unlink('composer-setup.php');"
```

## Create New Laravel Project (5 minutes)

```bash
# Create new project
composer create-project laravel/laravel my-app

# Enter project directory
cd my-app

# Start development server
php artisan serve
```

## Configure Database (5 minutes)

```bash
# Install MySQL
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Create database
mysql -u root -p
```

```sql
CREATE DATABASE laravel;
CREATE USER 'laravel'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL ON laravel.* TO 'laravel'@'localhost';
FLUSH PRIVILEGES;
```

Update `.env`:
```env
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=your_password
```

## Development Tools (5 minutes)

Install Node.js and npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs

# Install dependencies
npm install
```

## Best Practices

1. Use version control:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Configure IDE:
```json
{
    "editor.formatOnSave": true,
    "php.suggest.basic": false,
    "php.validate.executablePath": "/usr/bin/php"
}
```

3. Set up testing:
```bash
php artisan test
```

## Wrapping Up

You now have a complete Laravel development environment. What will you build first? Share your project ideas below!

Baamaapii 👋 