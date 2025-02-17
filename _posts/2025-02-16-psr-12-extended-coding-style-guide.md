---
layout: post
title: "PSR-12: Extended Coding Style Guide in PHP"
date: 2024-01-20 12:00:00 -0600
categories: php standards
series: php-fig-standards
tags: [php, php-fig, psr-12, coding-style]
---

PSR-12 extends PSR-1 and PSR-2 (now deprecated) to provide a comprehensive coding style guide for modern PHP. This standard ensures consistency across PHP code by defining specific formatting rules.

## Key Style Rules

### 1. General Code Layout

- Files MUST use Unix LF line endings
- Files MUST end with a single blank line
- The closing `?>` tag MUST be omitted from files containing only PHP
- Lines SHOULD be 80 characters or less
- There MUST be one blank line after namespace declarations
- Opening braces MUST be on the same line as the statement

### 2. Class Structure

```php
<?php

declare(strict_types=1);

namespace Vendor\Package;

use Vendor\Package\SomeClass;
use Vendor\Package\AnotherClass as AClass;

class ClassName extends ParentClass implements \ArrayAccess, \Countable
{
    private const VERSION = '1.0';
    
    public function methodName(int $arg1, ?string $arg2): string
    {
        // method body
    }
}
```

### 3. Control Structures

```php
<?php

if ($expr1) {
    // if body
} elseif ($expr2) {
    // elseif body
} else {
    // else body
}

switch ($expr) {
    case 0:
        echo 'First case';
        break;
    default:
        echo 'Default case';
        break;
}

try {
    // try body
} catch (FirstThrowableType $e) {
    // catch body
} finally {
    // finally body
}
```

## Modern PHP Features

### 1. Type Declarations

```php
<?php

public function processUser(
    User $user,
    ?array $options = null
): ?Response {
    // Implementation
}
```

### 2. Attribute Syntax

```php
<?php

#[Route("/api/posts/{id}", methods: ["GET"])]
public function show(#[EntityId] int $id): Response
{
    // Implementation
}
```

## Tools for PSR-12 Compliance

1. PHP_CodeSniffer Configuration
2. PHP-CS-Fixer Setup
3. IDE Integration
   - PhpStorm
   - VS Code with PHP Intelephense

## Common Issues and Solutions

1. **Mixed Line Endings**

```php
// Check for mixed line endings
$ find . -name "*.php" -exec file {} \;

// Fix with dos2unix
$ find . -name "*.php" -exec dos2unix {} \;
```

2. **Incorrect Indentation**

```php
// Bad
class Foo {
    function bar() {
return true;
    }
}

// Good
class Foo
{
    public function bar(): bool
    {
        return true;
    }
}
```

## Next Steps

In our next post, we'll explore PSR-4, which defines autoloading standards for PHP classes. Check out our [example repository](https://github.com/yourusername/php-fig-guide/tree/psr-12) for the implementation of these standards.

## Resources

- [Official PSR-12 Specification](https://www.php-fig.org/psr/psr-12/)
- [PHP_CodeSniffer PSR-12 Ruleset](https://github.com/squizlabs/PHP_CodeSniffer/blob/master/src/Standards/PSR12/ruleset.xml)
- [PHP-CS-Fixer Documentation](https://github.com/FriendsOfPHP/PHP-CS-Fixer)

### Example: Declare Statements

```php
<?php

declare(strict_types=1);

namespace Vendor\Package;

use Vendor\Package\{ClassA as A, ClassB, ClassC as C};
use Vendor\Package\SomeNamespace\ClassD as D;
```

### Example: Class Structure

```php
<?php

namespace Vendor\Package;

class ClassName extends ParentClass implements \ArrayAccess, \Countable
{
    private $property;
    
    public function __construct()
    {
        // constructor body
    }
}
```

Baamaapii 👋
