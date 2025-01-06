---
layout: post
title: "PSR-1: Basic Coding Standard in PHP"
date: 2025-01-06
categories: [php, standards]
tags: [php, php-fig, psr-1, coding-standards]
series: php-fig-standards
summary: "A comprehensive guide to PSR-1, the foundational coding standard for PHP that establishes basic rules for files, namespaces, classes, and methods to improve code consistency and maintainability."
---

Ever wondered why some PHP codebases are a joy to work with while others feel like a maze? A lot of it comes down to following consistent coding standards. Let's explore PSR-1, the foundation of modern PHP development that helps teams write cleaner, more maintainable code!

## Overview of PSR-1 Rules

### 1. Files and Namespaces

- Files MUST use only `<?php` and `<?=` tags
- Files MUST use only UTF-8 without BOM for PHP code
- Files SHOULD either declare symbols (classes, functions, constants) OR cause side-effects (generate output, modify settings, etc.) but SHOULD NOT do both

### 2. Namespace and Class Names

- Classes MUST be declared in `StudlyCaps`
- Class constants MUST be declared in all upper case with underscore separators

### 3. Class Methods

- Method names MUST be declared in `camelCase`

## Practical Implementation

Let's look at a correct PSR-1 implementation from our [example repository](https://github.com/jonesrussell/php-fig-guide/blob/main/src/PSR1/UserManager.php):

```php
<?php

namespace JonesRussell\PhpFigGuide\PSR1;

class UserManager
{
    const VERSION = '1.0.0';
    const ERROR_TYPE_NOT_FOUND = 'not_found';

    public function getUserById($id)
    {
        // Implementation
        return ['id' => $id, 'name' => 'John Doe'];
    }
}
```

This example demonstrates:
- Proper namespace declaration using `StudlyCaps`
- Class name in `StudlyCaps`
- Constants in uppercase with underscores
- Method name in `camelCase`

## Common Violations and Fixes

1. **Mixed Responsibilities**

   ```php
   <?php
   // Bad - mixing declarations and side effects
   echo "Hello World";
   class Foo {}

   // Good - separate into different files
   // config.php
   echo "Hello World";
   
   // Foo.php
   class Foo {}
   ```

2. **Incorrect Naming**

   ```php
   <?php
   // Bad
   class user_manager {}
   
   // Good
   class UserManager {}
   ```

## Integration with Modern PHP Tools

Our example repository includes setup for:

- PHP_CodeSniffer for PSR-1 validation (`composer check-style`)
- Automated style fixing (`composer fix-style`)
- PHPUnit for testing implementations
- Composer autoloading following PSR-4

## Next Steps

In our next post, we'll explore PSR-12, which extends these basic coding standards with more comprehensive style guidelines. This post is part of our [PSR Standards in PHP series](/php-fig-standards).

## Resources

- [Official PSR-1 Specification](https://www.php-fig.org/psr/psr-1/)
- [PHP_CodeSniffer PSR-1 Ruleset](https://github.com/squizlabs/PHP_CodeSniffer/blob/master/src/Standards/PSR1/ruleset.xml)
- [Series Example Repository](https://github.com/jonesrussell/php-fig-guide) (v0.1.0 - PSR-1 Implementation) 