---
layout: post
title: "PSR-4: Autoloading Standard in PHP"
date: 2024-01-27 12:00:00 -0600
categories: php standards
series: php-fig-standards
tags: [php, php-fig, psr-4, autoloading]
---

PSR-4 defines how PHP classes, interfaces, and traits should be organized in the filesystem to enable automatic loading. This standard has become the backbone of modern PHP development, especially with Composer.

## Understanding PSR-4

### Key Concepts

1. **Fully Qualified Class Name (FQCN)**
   - Vendor namespace
   - Package namespace
   - Class name

2. **Directory Structure**
   - Base directory
   - Namespace mapping
   - File location rules

## Practical Implementation

### 1. Basic Structure

```
vendor/
└── acme/
    └── blog/
        ├── composer.json
        └── src/
            └── Post/
                ├── PostController.php
                └── PostRepository.php
```

### 2. Composer Configuration

```json
{
    "name": "acme/blog",
    "autoload": {
        "psr-4": {
            "Acme\\Blog\\": "src/"
        }
    }
}
```

### 3. Class Definition

```php
<?php

namespace Acme\Blog\Post;

class PostController
{
    public function index()
    {
        // Implementation
    }
}
```

## Common Patterns and Best Practices

### 1. Multiple Namespace Roots

```json
{
    "autoload": {
        "psr-4": {
            "Acme\\Blog\\": "src/",
            "Acme\\Blog\\Tests\\": "tests/"
        }
    }
}
```

### 2. Nested Namespaces

```php
<?php

namespace Acme\Blog\Core\Database;

class Connection
{
    // Implementation
}

// File location: src/Core/Database/Connection.php
```

## Real-World Examples

### 1. Laravel Service Provider

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Implementation
    }
}
```

### 2. Symfony Controller

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BlogController extends AbstractController
{
    // Implementation
}
```

## Common Issues and Solutions

1. **Class Not Found**
   ```bash
   # Regenerate autoloader
   composer dump-autoload
   ```

2. **Incorrect Directory Structure**
   ```
   # Bad
   src/
   └── controllers/
       └── PostController.php  # Namespace doesn't match

   # Good
   src/
   └── Controller/
       └── PostController.php  # Matches namespace
   ```

## Testing Your Autoloader

```php
<?php

// test-autoload.php
require 'vendor/autoload.php';

// Should work without additional requires
$controller = new \Acme\Blog\Post\PostController();
```

## Next Steps

In our next post, we'll explore PSR-3, which defines a common interface for logging libraries. Check out our [example repository](https://github.com/yourusername/php-fig-guide/tree/psr-4) for the implementation of these standards.

## Resources

- [Official PSR-4 Specification](https://www.php-fig.org/psr/psr-4/)
- [Composer Autoloading Documentation](https://getcomposer.org/doc/04-schema.md#autoload)
- [PHP Manual: Autoloading Classes](https://www.php.net/manual/en/language.oop5.autoload.php) 