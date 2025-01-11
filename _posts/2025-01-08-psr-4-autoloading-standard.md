---
layout: post
title: "PSR-4: Autoloading Standard in PHP"
date: 2025-01-08
categories: [php, standards]
tags: [php, php-fig, psr-4, autoloading]
series: php-fig-standards
summary: "Master PHP's PSR-4 autoloading standard to organize your code efficiently. Learn how to structure your projects for automatic class loading and seamless package management with Composer."
---

Ahnii!

Remember the old days of PHP when we had to manually `require` every single file? 😅 Last week, I was helping a team modernize their legacy application that had 50+ require statements at the top of each file. Let me show you how PSR-4 autoloading makes this a problem of the past!

## Understanding PSR-4 (5 minutes)

Think of PSR-4 as your code's GPS system - it helps PHP find the right files automatically. Just like how a GPS uses addresses to find locations, PSR-4 uses namespaces to locate classes.

### Key Concepts (2 minutes)

1. 📍 **Fully Qualified Class Name (FQCN)**
   - Vendor namespace (like your brand)
   - Package namespace (like your project)
   - Class name (the actual file)

2. 📁 **Directory Structure**
   - Base directory (where everything starts)
   - Namespace mapping (your GPS coordinates)
   - File location rules (the actual addresses)

## Real-World Example (10 minutes)

Here's how I structure my projects:

```text
vendor/
└── jonesrussell/
    └── blog/
        ├── composer.json
        └── src/
            └── Post/
                ├── PostController.php
                └── PostRepository.php
```

### 1. Setting Up Composer (3 minutes)

```json
{
    "name": "jonesrussell/blog",
    "autoload": {
        "psr-4": {
            "JonesRussell\\Blog\\": "src/"
        }
    }
}
```

### 2. Creating Classes (2 minutes)

```php
<?php

namespace JonesRussell\Blog\Post;

class PostController
{
    public function index()
    {
        return ['status' => 'Ready to blog!'];
    }
}
```

## Common Patterns I Use (5 minutes)

### 1. 🎯 Multiple Namespace Roots

```json
{
    "autoload": {
        "psr-4": {
            "JonesRussell\\Blog\\": "src/",
            "JonesRussell\\Blog\\Tests\\": "tests/"
        }
    }
}
```

### 2. 🌳 Nested Namespaces

```php
<?php

namespace JonesRussell\Blog\Core\Database;

class Connection
{
    private $config;
    
    public function __construct(array $config)
    {
        $this->config = $config;
    }
}

// File location: src/Core/Database/Connection.php
```

## Framework Examples (5 minutes)

If you're using Laravel or Symfony (like I do), they follow PSR-4 out of the box:

### Laravel

```php
<?php

namespace App\Http\Controllers;

class BlogController extends Controller
{
    public function index()
    {
        return view('blog.index');
    }
}
```

### Symfony

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BlogController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('blog/index.html.twig');
    }
}
```

## Quick Fixes for Common Issues (3 minutes)

1. 🔍 **"Class Not Found" Errors**

```bash
# When things go wrong, this is your friend:
composer dump-autoload
```

2. 🎯 **Directory Structure Mistakes**

```text
# Don't do this
src/
└── controllers/  # lowercase = bad
    └── PostController.php

# Do this instead
src/
└── Controller/  # Matches namespace case
    └── PostController.php
```

## Testing Your Setup (2 minutes)

Drop this in `test-autoload.php`:

```php
<?php

require 'vendor/autoload.php';

// If this works, your autoloading is set up correctly!
$controller = new \JonesRussell\Blog\Post\PostController();
var_dump($controller->index()); // Should show "Ready to blog!"
```

## Next Steps

Tomorrow, we'll explore PSR-6 and see how it standardizes caching in PHP applications. This post is part of our [PSR Standards in PHP series](/blog/psr-standards-in-php-practical-guide-for-developers).

## Resources

- [Official PSR-4 Specification](https://www.php-fig.org/psr/psr-4/)
- [Composer Autoloading Documentation](https://getcomposer.org/doc/04-schema.md#autoload)
- [Series Example Repository](https://github.com/jonesrussell/php-fig-guide) (v0.3.0 - PSR-4 Implementation)

Baamaapii 👋
