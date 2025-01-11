---
layout: post
title: "PSR-16: Simple Cache in PHP"
date: 2024-03-16 12:00:00 -0600
categories: php standards
series: php-fig-standards
tags: [php, php-fig, psr-16, caching]
summary: "Learn about PSR-16's simple caching interface, understand when to use it over PSR-6, and implement straightforward caching solutions in PHP."
---

PSR-16 provides a simpler alternative to PSR-6 for basic caching needs. While PSR-6 offers a more robust object-oriented interface, PSR-16 provides a straightforward key-value interface that's easier to implement and use for simple caching scenarios.

## Core Interface

```php
<?php

namespace Psr\SimpleCache;

interface CacheInterface
{
    public function get($key, $default = null);
    public function set($key, $value, $ttl = null);
    public function delete($key);
    public function clear();
    public function getMultiple($keys, $default = null);
    public function setMultiple($values, $ttl = null);
    public function deleteMultiple($keys);
    public function has($key);
}
```

## Basic Implementation

```php
<?php

use Psr\SimpleCache\CacheInterface;

class FileCache implements CacheInterface
{
    private $directory;

    public function __construct(string $directory)
    {
        $this->directory = $directory;
    }

    public function get($key, $default = null)
    {
        $path = $this->getPath($key);
        
        if (!file_exists($path)) {
            return $default;
        }

        $data = unserialize(file_get_contents($path));
        if ($data['expires'] && $data['expires'] < time()) {
            unlink($path);
            return $default;
        }

        return $data['value'];
    }

    public function set($key, $value, $ttl = null)
    {
        $path = $this->getPath($key);
        $expires = $ttl ? time() + $ttl : null;

        $data = [
            'value' => $value,
            'expires' => $expires
        ];

        return file_put_contents($path, serialize($data)) !== false;
    }

    public function delete($key)
    {
        $path = $this->getPath($key);
        return !file_exists($path) || unlink($path);
    }

    public function clear()
    {
        $files = glob($this->directory . '/*.cache');
        foreach ($files as $file) {
            unlink($file);
        }
        return true;
    }

    public function getMultiple($keys, $default = null)
    {
        $result = [];
        foreach ($keys as $key) {
            $result[$key] = $this->get($key, $default);
        }
        return $result;
    }

    public function setMultiple($values, $ttl = null)
    {
        $success = true;
        foreach ($values as $key => $value) {
            $success = $this->set($key, $value, $ttl) && $success;
        }
        return $success;
    }

    public function deleteMultiple($keys)
    {
        $success = true;
        foreach ($keys as $key) {
            $success = $this->delete($key) && $success;
        }
        return $success;
    }

    public function has($key)
    {
        return $this->get($key, $this) !== $this;
    }

    private function getPath($key)
    {
        return $this->directory . '/' . sha1($key) . '.cache';
    }
}
```

## Usage Examples

### 1. Basic Operations

```php
<?php

$cache = new FileCache('/path/to/cache');

// Store a value
$cache->set('user.1', [
    'id' => 1,
    'name' => 'John Doe'
], 3600); // 1 hour TTL

// Retrieve a value
$user = $cache->get('user.1', ['guest' => true]);

// Check existence
if ($cache->has('user.1')) {
    // Cache hit
}

// Delete a value
$cache->delete('user.1');
```

### 2. Multiple Operations

```php
<?php

// Store multiple values
$cache->setMultiple([
    'user.1' => ['id' => 1, 'name' => 'John'],
    'user.2' => ['id' => 2, 'name' => 'Jane'],
    'user.3' => ['id' => 3, 'name' => 'Bob']
], 3600);

// Retrieve multiple values
$users = $cache->getMultiple(['user.1', 'user.2', 'user.3'], null);

// Delete multiple values
$cache->deleteMultiple(['user.1', 'user.2', 'user.3']);
```

## Framework Integration

### 1. Laravel Example

```php
<?php

use Illuminate\Cache\Repository;
use Psr\SimpleCache\CacheInterface;

class SimpleCacheAdapter implements CacheInterface
{
    private $cache;

    public function __construct(Repository $cache)
    {
        $this->cache = $cache;
    }

    public function get($key, $default = null)
    {
        return $this->cache->get($key, $default);
    }

    public function set($key, $value, $ttl = null)
    {
        return $this->cache->put($key, $value, $ttl);
    }

    // Implementation of other methods...
}
```

### 2. Symfony Example

```php
<?php

use Symfony\Component\Cache\Simple\FilesystemCache;

$cache = new FilesystemCache();

// PSR-16 operations
$cache->set('key', 'value', 3600);
$value = $cache->get('key', 'default');
```

## Best Practices

1. **Key Namespacing**

```php
// Bad - Flat keys
$cache->set('users', $users);

// Good - Namespaced keys
$cache->set('app:users:active', $users);
```

2. **TTL Management**

```php
// Bad - Hardcoded TTL
$cache->set('stats', $stats, 3600);

// Good - Configurable TTL
$cache->set('stats', $stats, $this->config->get('cache.stats_ttl'));
```

## Common Patterns

### 1. Cache Wrapper

```php
<?php

class CacheWrapper implements CacheInterface
{
    private $cache;
    private $prefix;

    public function __construct(CacheInterface $cache, string $prefix)
    {
        $this->cache = $cache;
        $this->prefix = $prefix;
    }

    public function get($key, $default = null)
    {
        return $this->cache->get($this->prefix . $key, $default);
    }

    public function set($key, $value, $ttl = null)
    {
        return $this->cache->set($this->prefix . $key, $value, $ttl);
    }

    // Implementation of other methods with prefix handling...
}
```

### 2. Fallback Cache

```php
<?php

class FallbackCache implements CacheInterface
{
    private $primary;
    private $fallback;

    public function __construct(
        CacheInterface $primary,
        CacheInterface $fallback
    ) {
        $this->primary = $primary;
        $this->fallback = $fallback;
    }

    public function get($key, $default = null)
    {
        try {
            return $this->primary->get($key, $default);
        } catch (CacheException $e) {
            return $this->fallback->get($key, $default);
        }
    }

    // Implementation of other methods with fallback logic...
}
```

## PSR-6 vs PSR-16

### When to Use PSR-16

1. Simple key-value storage needs
2. Small to medium-sized applications
3. Direct cache access without pooling
4. When simplicity is preferred over features

### When to Use PSR-6

1. Complex caching requirements
2. Need for cache item metadata
3. Deferred save operations
4. Fine-grained cache control

## Next Steps

In our next post, we'll explore PSR-13, which defines interfaces for hypermedia links. Check out our [example repository](https://github.com/yourusername/php-fig-guide/tree/psr-16) for the implementation of these standards.

## Resources

- [Official PSR-16 Specification](https://www.php-fig.org/psr/psr-16/)
- [Symfony Cache Component](https://symfony.com/doc/current/components/cache.html)
- [Laravel Cache](https://laravel.com/docs/cache)

Baamaapii 👋
