---
layout: post
title: "PSR-11: Container Interface in PHP"
date: 2025-02-03
categories: php standards
series: php-fig-standards
tags: [php, php-fig, psr-11, dependency-injection]
summary: "Learn about PSR-11's container interface standard, how it enables framework-agnostic dependency injection, and best practices for implementation."
---

PSR-11 defines a common interface for dependency injection containers in PHP. This standardization allows libraries to retrieve services from any container implementation, promoting better interoperability between different frameworks and libraries.

## Understanding Dependency Injection Containers

A dependency injection container (DIC) is responsible for:

1. Managing service definitions
2. Creating service instances
3. Resolving dependencies
4. Managing object lifecycle

## The Container Interface

```php
<?php

namespace Psr\Container;

interface ContainerInterface
{
    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @param string $id
     * @return mixed
     * @throws NotFoundExceptionInterface
     * @throws ContainerExceptionInterface
     */
    public function get($id);

    /**
     * Returns true if the container can return an entry for the given identifier.
     *
     * @param string $id
     * @return bool
     */
    public function has($id);
}
```

## Basic Implementation

```php
<?php

namespace Acme\Container;

use Psr\Container\ContainerInterface;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Container\ContainerExceptionInterface;

class Container implements ContainerInterface
{
    private array $services = [];
    private array $factories = [];

    public function get($id)
    {
        if (!$this->has($id)) {
            throw new class extends \Exception implements NotFoundExceptionInterface {};
        }

        if (isset($this->services[$id])) {
            return $this->services[$id];
        }

        try {
            $service = $this->factories[$id]($this);
            $this->services[$id] = $service;
            return $service;
        } catch (\Exception $e) {
            throw new class($e->getMessage(), 0, $e) extends \Exception implements ContainerExceptionInterface {};
        }
    }

    public function has($id): bool
    {
        return isset($this->services[$id]) || isset($this->factories[$id]);
    }

    public function set(string $id, $concrete): void
    {
        if (is_callable($concrete)) {
            $this->factories[$id] = $concrete;
        } else {
            $this->services[$id] = $concrete;
        }
    }
}
```

## Real-World Usage

### 1. Service Registration

```php
<?php

// Define services
$container = new Container();

// Simple value
$container->set('api.key', 'secret-key-123');

// Factory function
$container->set('database', function (ContainerInterface $container) {
    return new PDO(
        $container->get('db.dsn'),
        $container->get('db.user'),
        $container->get('db.pass')
    );
});

// Service with dependencies
$container->set('userRepository', function (ContainerInterface $container) {
    return new UserRepository($container->get('database'));
});
```

### 2. Service Retrieval

```php
<?php

class UserController
{
    private UserRepository $users;
    
    public function __construct(ContainerInterface $container)
    {
        $this->users = $container->get('userRepository');
    }
}
```

## Framework Integration

### 1. Laravel Example

```php
<?php

use Illuminate\Container\Container;
use Psr\Container\ContainerInterface;

class ServiceProvider extends \Illuminate\Support\ServiceProvider
{
    public function register()
    {
        $this->app->bind(ContainerInterface::class, function ($app) {
            return new class($app) implements ContainerInterface {
                private $app;
                
                public function __construct($app)
                {
                    $this->app = $app;
                }
                
                public function get($id)
                {
                    return $this->app->make($id);
                }
                
                public function has($id): bool
                {
                    return $this->app->bound($id);
                }
            };
        });
    }
}
```

### 2. Symfony Example

```php
<?php

use Symfony\Component\DependencyInjection\ContainerBuilder;

$container = new ContainerBuilder();
$container->register('mailer', 'Mailer')
    ->addArgument('%mailer.transport%');

// Symfony's container already implements PSR-11
assert($container instanceof \Psr\Container\ContainerInterface);
```

## Best Practices

1. **Service Resolution**

```php
// Bad - Service locator pattern
class UserService
{
    public function __construct(private ContainerInterface $container) {}
    
    public function doSomething()
    {
        $dep = $this->container->get('some.service');
    }
}

// Good - Explicit dependency injection
class UserService
{
    public function __construct(
        private SomeServiceInterface $someService
    ) {}
}
```

2. **Container Configuration**

```php
// Bad - Runtime service definition
if ($condition) {
    $container->set('service', new ServiceA());
} else {
    $container->set('service', new ServiceB());
}

// Good - Configuration-driven definition
$container->set('service', function (ContainerInterface $c) {
    return $c->get('config')->get('use_service_a')
        ? new ServiceA()
        : new ServiceB();
});
```

## Next Steps

In our next post, we'll explore PSR-14, which defines a standard event dispatcher interface. Check out our [example repository](https://github.com/yourusername/php-fig-guide/tree/psr-11) for the implementation of these standards.

## Resources

- [Official PSR-11 Specification](https://www.php-fig.org/psr/psr-11/)
- [PHP-DI Documentation](http://php-di.org/)
- [Symfony DependencyInjection Component](https://symfony.com/doc/current/components/dependency_injection.html)

Baamaapii 👋 