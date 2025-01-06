---
layout: post
title: "PSR-15: HTTP Handlers in PHP"
date: 2024-03-02 12:00:00 -0600
categories: php standards
series: php-fig-standards
tags: [php, php-fig, psr-15, http, middleware]
summary: "Learn about PSR-15's HTTP server request handlers and middleware interfaces, and how they enable modular HTTP application development."
---

PSR-15 builds upon PSR-7 by defining standard interfaces for server-side HTTP request handling and middleware. This standardization allows for interoperable middleware that can be shared between frameworks and applications.

## Core Interfaces

### 1. Request Handler Interface

```php
<?php

namespace Psr\Http\Server;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

interface RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface;
}
```

### 2. Middleware Interface

```php
<?php

namespace Psr\Http\Server;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

interface MiddlewareInterface
{
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface;
}
```

## Basic Implementation

### 1. Simple Request Handler

```php
<?php

use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ApiHandler implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $data = ['message' => 'Hello, World!'];
        return new Response(
            200,
            ['Content-Type' => 'application/json'],
            json_encode($data)
        );
    }
}
```

### 2. Middleware Implementation

```php
<?php

use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class AuthMiddleware implements MiddlewareInterface
{
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        $token = $request->getHeaderLine('Authorization');
        
        if (!$this->validateToken($token)) {
            return new Response(
                401,
                ['Content-Type' => 'application/json'],
                json_encode(['error' => 'Unauthorized'])
            );
        }
        
        return $handler->handle($request);
    }
}
```

## Middleware Pipeline

```php
<?php

class MiddlewarePipeline implements RequestHandlerInterface
{
    private array $middleware = [];
    private RequestHandlerInterface $fallbackHandler;

    public function __construct(RequestHandlerInterface $fallbackHandler)
    {
        $this->fallbackHandler = $fallbackHandler;
    }

    public function pipe(MiddlewareInterface $middleware): self
    {
        $this->middleware[] = $middleware;
        return $this;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        return $this->process($request, 0);
    }

    private function process(
        ServerRequestInterface $request,
        int $index
    ): ResponseInterface {
        if (isset($this->middleware[$index])) {
            $middleware = $this->middleware[$index];
            return $middleware->process($request, new class($this, $index + 1) implements RequestHandlerInterface {
                public function __construct(
                    private MiddlewarePipeline $pipeline,
                    private int $index
                ) {}

                public function handle(ServerRequestInterface $request): ResponseInterface
                {
                    return $this->pipeline->process($request, $this->index);
                }
            });
        }

        return $this->fallbackHandler->handle($request);
    }
}
```

## Common Middleware Examples

### 1. CORS Middleware

```php
<?php

class CorsMiddleware implements MiddlewareInterface
{
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        $response = $handler->handle($request);
        
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
}
```

### 2. Error Handler Middleware

```php
<?php

class ErrorHandlerMiddleware implements MiddlewareInterface
{
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        try {
            return $handler->handle($request);
        } catch (Exception $e) {
            return new Response(
                500,
                ['Content-Type' => 'application/json'],
                json_encode([
                    'error' => 'Internal Server Error',
                    'message' => $e->getMessage()
                ])
            );
        }
    }
}
```

## Framework Integration

### 1. Laravel Example

```php
<?php

use Illuminate\Support\ServiceProvider;
use Psr\Http\Server\RequestHandlerInterface;

class PsrHandlerServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(RequestHandlerInterface::class, function ($app) {
            $pipeline = new MiddlewarePipeline(new FinalHandler());
            
            // Add middleware
            $pipeline->pipe(new AuthMiddleware());
            $pipeline->pipe(new CorsMiddleware());
            $pipeline->pipe(new ErrorHandlerMiddleware());
            
            return $pipeline;
        });
    }
}
```

### 2. Slim Example

```php
<?php

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app = new App();

// Add PSR-15 middleware
$app->add(new AuthMiddleware());
$app->add(new CorsMiddleware());

$app->get('/api/users', function (Request $request, Response $response) {
    $response->getBody()->write(json_encode(['users' => []]));
    return $response->withHeader('Content-Type', 'application/json');
});
```

## Best Practices

1. **Middleware Composition**
   ```php
   // Bad - Monolithic middleware
   class BigMiddleware implements MiddlewareInterface
   {
       public function process(
           ServerRequestInterface $request,
           RequestHandlerInterface $handler
       ): ResponseInterface {
           // Authentication
           // Rate limiting
           // Logging
           // Too many responsibilities!
           return $handler->handle($request);
       }
   }
   
   // Good - Single responsibility
   $pipeline
       ->pipe(new AuthenticationMiddleware())
       ->pipe(new RateLimitMiddleware())
       ->pipe(new LoggingMiddleware());
   ```

2. **Request Attribute Handling**
   ```php
   // Bad - Using headers for middleware communication
   $request = $request->withHeader('user_id', $userId);
   
   // Good - Using request attributes
   $request = $request->withAttribute('user_id', $userId);
   ```

## Common Patterns

### 1. Conditional Middleware

```php
<?php

class ConditionalMiddleware implements MiddlewareInterface
{
    public function __construct(
        private MiddlewareInterface $middleware,
        private callable $condition
    ) {}

    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        if (($this->condition)($request)) {
            return $this->middleware->process($request, $handler);
        }
        
        return $handler->handle($request);
    }
}
```

### 2. Middleware Factory

```php
<?php

class MiddlewareFactory
{
    private array $definitions = [];

    public function add(string $name, callable $factory): void
    {
        $this->definitions[$name] = $factory;
    }

    public function create(string $name): MiddlewareInterface
    {
        if (!isset($this->definitions[$name])) {
            throw new RuntimeException("Middleware '$name' not found");
        }

        return ($this->definitions[$name])();
    }
}
```

## Next Steps

In our next post, we'll explore PSR-6, which defines a standard interface for caching libraries. Check out our [example repository](https://github.com/yourusername/php-fig-guide/tree/psr-15) for the implementation of these standards.

## Resources

- [Official PSR-15 Specification](https://www.php-fig.org/psr/psr-15/)
- [Middleware in PHP](https://www.php-fig.org/psr/psr-15/meta/)
- [Slim Framework Documentation](https://www.slimframework.com/docs/v4/) 