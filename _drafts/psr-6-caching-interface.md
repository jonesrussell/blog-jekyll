---
layout: post
title: "PSR-6: Caching Interface in PHP"
date: 2024-03-09 12:00:00 -0600
categories: php standards
series: php-fig-standards
tags: [php, php-fig, psr-6, caching]
summary: "Explore PSR-6's caching interface standard, understand cache pools and items, and implement robust caching solutions in PHP applications."
---

PSR-6 defines a standard interface for caching libraries in PHP. This standardization enables applications to switch between different caching implementations without changing application code, promoting better interoperability and flexibility in caching solutions.

## Core Interfaces

### 1. CacheItemPoolInterface

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

## Basic Implementation

### 1. Cache Item Implementation

```php
<?php

use Psr\Cache\CacheItemInterface;

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

    public function set($value)
    {
        $this->value = $value;
        return $this;
    }

    public function expiresAt($expiration)
    {
        $this->expiration = $expiration;
        return $this;
    }

    public function expiresAfter($time)
    {
        if ($time instanceof \DateInterval) {
            $this->expiration = (new \DateTime())->add($time);
        } elseif (is_int($time)) {
            $this->expiration = (new \DateTime())->add(new \DateInterval("PT{$time}S"));
        } else {
            $this->expiration = null;
        }
        return $this;
    }
}
```

### 2. Cache Pool Implementation

```php
<?php

use Psr\Cache\CacheItemPoolInterface;
use Psr\Cache\CacheItemInterface;

class FileCachePool implements CacheItemPoolInterface
{
    private $directory;
    private $deferred = [];

    public function __construct(string $directory)
    {
        $this->directory = $directory;
    }

    public function getItem($key): CacheItemInterface
    {
        $item = new CacheItem($key);
        $path = $this->getPath($key);

        if (file_exists($path)) {
            $data = unserialize(file_get_contents($path));
            if (!$data['expiration'] || $data['expiration'] > time()) {
                $item->set($data['value']);
                return $item;
            }
            unlink($path);
        }

        return $item;
    }

    public function save(CacheItemInterface $item): bool
    {
        $path = $this->getPath($item->getKey());
        $data = [
            'value' => $item->get(),
            'expiration' => $item->getExpiration()
        ];

        return file_put_contents($path, serialize($data)) !== false;
    }

    private function getPath(string $key): string
    {
        return $this->directory . '/' . sha1($key) . '.cache';
    }

    // Implementation of other interface methods...
}
```

## Usage Examples

### 1. Basic Caching

```php
<?php

$pool = new FileCachePool('/path/to/cache');

// Store a value
$item = $pool->getItem('user.1');
$item->set(['id' => 1, 'name' => 'John'])
     ->expiresAfter(3600); // 1 hour
$pool->save($item);

// Retrieve a value
$item = $pool->getItem('user.1');
if ($item->isHit()) {
    $user = $item->get();
} else {
    // Fetch from database
}
```

### 2. Multiple Items

```php
<?php

// Get multiple items
$keys = ['user.1', 'user.2', 'user.3'];
$items = $pool->getItems($keys);

foreach ($items as $item) {
    if (!$item->isHit()) {
        $value = // fetch from database
        $item->set($value)
             ->expiresAfter(new \DateInterval('PT1H'));
        $pool->saveDeferred($item);
    }
}

$pool->commit(); // Save all deferred items
```

## Framework Integration

### 1. Laravel Example

```php
<?php

use Illuminate\Cache\Repository;
use Psr\Cache\CacheItemPoolInterface;

class PsrCacheAdapter implements CacheItemPoolInterface
{
    private $cache;

    public function __construct(Repository $cache)
    {
        $this->cache = $cache;
    }

    public function getItem($key): CacheItemInterface
    {
        $item = new CacheItem($key);
        if ($this->cache->has($key)) {
            $item->set($this->cache->get($key));
        }
        return $item;
    }

    public function save(CacheItemInterface $item): bool
    {
        return $this->cache->put(
            $item->getKey(),
            $item->get(),
            $item->getExpiration()
        );
    }

    // Implementation of other methods...
}
```

### 2. Symfony Example

```php
<?php

use Symfony\Component\Cache\Adapter\FilesystemAdapter;

$cache = new FilesystemAdapter();

// PSR-6 compatible operations
$item = $cache->getItem('stats.user_count');
if (!$item->isHit()) {
    $item->set($userCount);
    $item->expiresAfter(3600);
    $cache->save($item);
}
```

## Best Practices

1. **Key Naming**
   ```php
   // Bad - Using unpredictable keys
   $key = md5($userId . time());
   
   // Good - Using structured, readable keys
   $key = sprintf('user.%d.profile', $userId);
   ```

2. **Error Handling**
   ```php
   // Bad - Ignoring cache errors
   $pool->save($item);
   
   // Good - Handling cache failures gracefully
   try {
       if (!$pool->save($item)) {
           // Log failure and use fallback
       }
   } catch (CacheException $e) {
       // Handle exception
   }
   ```

## Common Patterns

### 1. Cache Decorator

```php
<?php

class CacheDecorator implements CacheItemPoolInterface
{
    private $pool;
    private $logger;

    public function __construct(
        CacheItemPoolInterface $pool,
        LoggerInterface $logger
    ) {
        $this->pool = $pool;
        $this->logger = $logger;
    }

    public function getItem($key): CacheItemInterface
    {
        $item = $this->pool->getItem($key);
        $this->logger->debug('Cache {hit} for key {key}', [
            'hit' => $item->isHit() ? 'hit' : 'miss',
            'key' => $key
        ]);
        return $item;
    }

    // Delegate other methods...
}
```

### 2. Chain Cache

```php
<?php

class ChainCache implements CacheItemPoolInterface
{
    private $pools;

    public function __construct(array $pools)
    {
        $this->pools = $pools;
    }

    public function getItem($key): CacheItemInterface
    {
        foreach ($this->pools as $pool) {
            $item = $pool->getItem($key);
            if ($item->isHit()) {
                return $item;
            }
        }
        return end($this->pools)->getItem($key);
    }

    public function save(CacheItemInterface $item): bool
    {
        $success = true;
        foreach ($this->pools as $pool) {
            $success = $pool->save($item) && $success;
        }
        return $success;
    }
}
```

## Next Steps

In our next post, we'll explore PSR-16, which provides a simpler alternative to PSR-6 for basic caching needs. Check out our [example repository](https://github.com/yourusername/php-fig-guide/tree/psr-6) for the implementation of these standards.

## Resources

- [Official PSR-6 Specification](https://www.php-fig.org/psr/psr-6/)
- [Symfony Cache Component](https://symfony.com/doc/current/components/cache.html)
- [PHP Cache](http://www.php-cache.com/) 