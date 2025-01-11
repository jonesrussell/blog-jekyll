---
layout: post
title: "PSR-6: Caching Interface in PHP"
date: 2025-01-10
categories: [php, standards]
tags: [php, php-fig, psr-6, caching]
series: php-fig-standards
summary: "Explore PSR-6's caching interface standard, understand cache pools and items, and implement robust caching solutions in PHP applications."
---

Ahnii!

Ever had your application slow to a crawl because of repeated database queries? Or struggled to switch between different caching libraries? Let's dive into PSR-6, the standard that makes caching in PHP predictable and swappable!

This post is part of our [PSR Standards in PHP series](/blog/psr-standards-in-php-practical-guide-for-developers). If you're new here, you might want to start with [PSR-1](/blog/psr-1-basic-coding-standard) for the basics.

## What Problem Does PSR-6 Solve? (2 minutes)

Before PSR-6, every caching library had its own way of doing things. Want to switch from Memcached to Redis? Rewrite your code. Moving from one framework to another? Learn a new caching API. PSR-6 fixes this by providing a common interface that all caching libraries can implement.

## Core Interfaces (5 minutes)

Let's look at the two main players:

### 1. CacheItemPoolInterface

This is your cache manager. Think of it as a warehouse where you store and retrieve items:

```php
<?php

namespace Psr\Cache;

interface CacheItemPoolInterface
{
    public function getItem($key);
    public function getItems(array $keys = array());
    public function hasItem($key);
    public function clear();
    public function deleteItem($key);
    public function deleteItems(array $keys);
    public function save(CacheItemInterface $item);
    public function saveDeferred(CacheItemInterface $item);
    public function commit();
}
```

### 2. CacheItemInterface

This represents a single item in your cache:

```php
<?php

namespace Psr\Cache;

interface CacheItemInterface
{
    public function getKey();
    public function get();
    public function isHit();
    public function set($value);
    public function expiresAt($expiration);
    public function expiresAfter($time);
}
```

## Real-World Implementation (10 minutes)

Here's a practical example from our [repository](https://github.com/jonesrussell/php-fig-guide/blob/main/src/PSR6/FileCachePool.php):

### 1. Cache Item Implementation

```php
<?php

namespace JonesRussell\PhpFigGuide\PSR6;

use Psr\Cache\CacheItemInterface;
use DateTimeInterface;
use DateInterval;
use DateTime;

class CacheItem implements CacheItemInterface
{
    private $key;
    private $value;
    private $isHit;
    private $expiration;

    public function __construct(string $key)
    {
        $this->key = $key;
        $this->isHit = false;
    }

    public function getKey(): string
    {
        return $this->key;
    }

    public function get()
    {
        return $this->value;
    }

    public function isHit(): bool
    {
        return $this->isHit;
    }

    public function set($value): self
    {
        $this->value = $value;
        return $this;
    }

    public function expiresAt(?DateTimeInterface $expiration): self
    {
        $this->expiration = $expiration;
        return $this;
    }

    public function expiresAfter($time): self
    {
        if ($time instanceof DateInterval) {
            $this->expiration = (new DateTime())->add($time);
        } elseif (is_int($time)) {
            $this->expiration = (new DateTime())->add(new DateInterval("PT{$time}S"));
        } else {
            $this->expiration = null;
        }
        return $this;
    }

    // Helper method for our implementation
    public function getExpiration(): ?DateTimeInterface
    {
        return $this->expiration;
    }

    // Helper method for our implementation
    public function setIsHit(bool $hit): void
    {
        $this->isHit = $hit;
    }
}
```

### 2. Cache Pool Implementation

```php
<?php

namespace JonesRussell\PhpFigGuide\PSR6;

use Psr\Cache\CacheItemPoolInterface;
use Psr\Cache\CacheItemInterface;
use RuntimeException;

class FileCachePool implements CacheItemPoolInterface
{
    private $directory;
    private $deferred = [];

    public function __construct(string $directory)
    {
        if (!is_dir($directory) && !mkdir($directory, 0777, true)) {
            throw new RuntimeException("Cannot create cache directory: {$directory}");
        }
        $this->directory = $directory;
    }

    public function getItem($key): CacheItemInterface
    {
        $this->validateKey($key);
        
        if (isset($this->deferred[$key])) {
            return $this->deferred[$key];
        }

        $item = new CacheItem($key);
        $path = $this->getPath($key);

        if (file_exists($path)) {
            try {
                $data = unserialize(file_get_contents($path));
                if (!$data['expiration'] || $data['expiration'] > new DateTime()) {
                    $item->set($data['value']);
                    $item->setIsHit(true);
                    return $item;
                }
                unlink($path);
            } catch (\Exception $e) {
                // Log error and continue with cache miss
            }
        }

        return $item;
    }

    public function getItems(array $keys = []): iterable
    {
        $items = [];
        foreach ($keys as $key) {
            $items[$key] = $this->getItem($key);
        }
        return $items;
    }

    public function hasItem($key): bool
    {
        return $this->getItem($key)->isHit();
    }

    public function clear(): bool
    {
        $this->deferred = [];
        $files = glob($this->directory . '/*.cache');
        
        if ($files === false) {
            return false;
        }

        $success = true;
        foreach ($files as $file) {
            if (!unlink($file)) {
                $success = false;
            }
        }
        return $success;
    }

    public function deleteItem($key): bool
    {
        $this->validateKey($key);
        unset($this->deferred[$key]);
        
        $path = $this->getPath($key);
        if (file_exists($path)) {
            return unlink($path);
        }
        return true;
    }

    public function deleteItems(array $keys): bool
    {
        $success = true;
        foreach ($keys as $key) {
            if (!$this->deleteItem($key)) {
                $success = false;
            }
        }
        return $success;
    }

    public function save(CacheItemInterface $item): bool
    {
        $path = $this->getPath($item->getKey());
        $data = [
            'value' => $item->get(),
            'expiration' => $item->getExpiration()
        ];

        try {
            if (file_put_contents($path, serialize($data)) === false) {
                return false;
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function saveDeferred(CacheItemInterface $item): bool
    {
        $this->deferred[$item->getKey()] = $item;
        return true;
    }

    public function commit(): bool
    {
        $success = true;
        foreach ($this->deferred as $item) {
            if (!$this->save($item)) {
                $success = false;
            }
        }
        $this->deferred = [];
        return $success;
    }

    private function getPath(string $key): string
    {
        return $this->directory . '/' . sha1($key) . '.cache';
    }

    private function validateKey(string $key): void
    {
        if (!is_string($key) || preg_match('#[{}()/@:\\\\]#', $key)) {
            throw new InvalidArgumentException(
                'Invalid key: ' . var_export($key, true)
            );
        }
    }
}
```

## Practical Usage (5 minutes)

Let's see how to use this in real code:

```php
<?php

// Basic usage
$pool = new FileCachePool('/path/to/cache');

try {
    // Store a value
    $item = $pool->getItem('user.1');
    if (!$item->isHit()) {
        $userData = $database->fetchUser(1); // Your database call
        $item->set($userData)
             ->expiresAfter(3600); // 1 hour
        $pool->save($item);
    }
    $user = $item->get();
} catch (\Exception $e) {
    // Handle errors gracefully
    log_error('Cache operation failed: ' . $e->getMessage());
    $user = $database->fetchUser(1); // Fallback to database
}
```

## Common Pitfalls (3 minutes)

1. **Key Validation**

   ```php
   // Don't do this - using invalid characters
   $key = 'user@email.com';
   
   // Do this instead
   $key = 'user.' . md5('user@email.com');
   ```

2. **Error Handling**

   ```php
   // Always handle cache failures gracefully
   try {
       $pool->save($item);
   } catch (CacheException $e) {
       // Log and continue with a cache miss
   }
   ```

## What's Next?

Tomorrow, we'll look at PSR-7 (HTTP Message Interfaces). If you're interested in simpler caching, stay tuned for our upcoming PSR-16 (Simple Cache) article, which offers a more straightforward alternative to PSR-6.

## Resources

- [Official PSR-6 Specification](https://www.php-fig.org/psr/psr-6/)
- [Our Example Repository](https://github.com/jonesrussell/php-fig-guide/tree/psr-6) (v0.6.0 - PSR-6 Implementation)
- [Symfony Cache Component](https://symfony.com/doc/current/components/cache.html)
- [PHP Cache](http://www.php-cache.com/) 