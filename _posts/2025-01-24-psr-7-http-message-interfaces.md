---
layout: post
title: "PSR-7: HTTP Message Interfaces in PHP"
date: 2025-01-24
categories: [php, standards]
tags: [php, php-fig, psr-7, http]
series: php-fig-standards
summary: "Deep dive into PSR-7's HTTP message interfaces, understanding HTTP message abstraction, and implementing HTTP clients and servers in PHP."
---

PSR-7 defines common interfaces for representing HTTP messages in PHP. These interfaces enable framework-agnostic HTTP message handling, making it easier to create interoperable HTTP clients, servers, and middleware.

## Core Interfaces

### 1. Message Interface

```php
<?php

namespace Psr\Http\Message;

interface MessageInterface
{
    public function getProtocolVersion();
    public function withProtocolVersion($version);
    public function getHeaders();
    public function hasHeader($name);
    public function getHeader($name);
    public function getHeaderLine($name);
    public function withHeader($name, $value);
    public function withAddedHeader($name, $value);
    public function withoutHeader($name);
    public function getBody();
    public function withBody(StreamInterface $body);
}
```

### 2. Request Interface

```php
<?php

namespace Psr\Http\Message;

interface RequestInterface extends MessageInterface
{
    public function getRequestTarget();
    public function withRequestTarget($requestTarget);
    public function getMethod();
    public function withMethod($method);
    public function getUri();
    public function withUri(UriInterface $uri, $preserveHost = false);
}
```

### 3. Response Interface

```php
<?php

namespace Psr\Http\Message;

interface ResponseInterface extends MessageInterface
{
    public function getStatusCode();
    public function withStatus($code, $reasonPhrase = '');
    public function getReasonPhrase();
}
```

## Basic Implementation

### 1. Creating Requests

```php
<?php

use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Uri;

// Simple GET request
$request = new Request(
    'GET',
    'https://api.example.com/users'
);

// POST request with JSON body
$request = new Request(
    'POST',
    'https://api.example.com/users',
    [
        'Content-Type' => 'application/json'
    ],
    json_encode(['name' => 'John Doe'])
);
```

### 2. Handling Responses

```php
<?php

use GuzzleHttp\Psr7\Response;

$response = new Response(
    200,
    ['Content-Type' => 'application/json'],
    json_encode(['status' => 'success'])
);

// Working with responses
$status = $response->getStatusCode();
$body = $response->getBody()->getContents();
$contentType = $response->getHeaderLine('Content-Type');
```

## HTTP Client Implementation

```php
<?php

class HttpClient
{
    public function sendRequest(RequestInterface $request): ResponseInterface
    {
        $context = stream_context_create([
            'http' => [
                'method' => $request->getMethod(),
                'header' => $this->formatHeaders($request->getHeaders()),
                'content' => (string) $request->getBody(),
                'protocol_version' => $request->getProtocolVersion(),
                'ignore_errors' => true,
            ],
        ]);

        $body = file_get_contents($request->getUri(), false, $context);
        $response = new Response(
            $this->getStatusCode($http_response_header),
            $this->parseHeaders($http_response_header),
            $body
        );

        return $response;
    }

    private function formatHeaders(array $headers): string
    {
        $lines = [];
        foreach ($headers as $name => $values) {
            $lines[] = $name . ': ' . implode(', ', $values);
        }
        return implode("\r\n", $lines);
    }

    // Additional helper methods...
}
```

## Middleware Pattern

```php
<?php

interface MiddlewareInterface
{
    public function process(
        RequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface;
}

class LoggingMiddleware implements MiddlewareInterface
{
    public function process(
        RequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        // Log request
        $response = $handler->handle($request);
        // Log response
        return $response;
    }
}
```

## Framework Integration

### 1. Laravel Example

```php
<?php

use Illuminate\Http\Request;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Bridge\PsrHttpMessage\Factory\PsrHttpFactory;

class PsrBridge
{
    public function toServerRequest(Request $request): ServerRequestInterface
    {
        $psr17Factory = new Psr17Factory();
        $psrHttpFactory = new PsrHttpFactory($psr17Factory, $psr17Factory, $psr17Factory, $psr17Factory);
        
        return $psrHttpFactory->createRequest($request);
    }
}
```

### 2. Symfony Example

```php
<?php

use Symfony\Bridge\PsrHttpMessage\Factory\HttpFoundationFactory;
use Symfony\Bridge\PsrHttpMessage\Factory\PsrHttpFactory;

// Convert PSR-7 to Symfony
$httpFoundationFactory = new HttpFoundationFactory();
$symfonyRequest = $httpFoundationFactory->createRequest($psrRequest);

// Convert Symfony to PSR-7
$psr17Factory = new Psr17Factory();
$psrHttpFactory = new PsrHttpFactory($psr17Factory, $psr17Factory, $psr17Factory, $psr17Factory);
$psrRequest = $psrHttpFactory->createRequest($symfonyRequest);
```

## Best Practices

1. **Immutability**

```php
// Bad - Modifying message directly
$request->method = 'POST';

// Good - Using withers
$newRequest = $request->withMethod('POST');
```

2. **Stream Handling**

```php
// Bad - Loading entire body into memory
$content = $request->getBody()->getContents();

// Good - Streaming large responses
$body = $response->getBody();
while (!$body->eof()) {
    echo $body->read(8192);
}
```

## Common Patterns

### 1. Request Builder

```php
<?php

class RequestBuilder
{
    private $method = 'GET';
    private $uri;
    private $headers = [];
    private $body;

    public function method(string $method): self
    {
        $this->method = $method;
        return $this;
    }

    public function uri(string $uri): self
    {
        $this->uri = new Uri($uri);
        return $this;
    }

    public function build(): RequestInterface
    {
        return new Request(
            $this->method,
            $this->uri,
            $this->headers,
            $this->body
        );
    }
}
```

### 2. Response Factory

```php
<?php

class ResponseFactory
{
    public static function json(
        $data,
        int $status = 200,
        array $headers = []
    ): ResponseInterface {
        return new Response(
            $status,
            array_merge(
                ['Content-Type' => 'application/json'],
                $headers
            ),
            json_encode($data)
        );
    }
}
```

## Next Steps

In our next post, we'll explore PSR-15, which builds upon PSR-7 to define HTTP server request handlers and middleware. Check out our [example repository](https://github.com/jonesrussell/php-fig-guide/tree/psr-7) for the implementation of these standards.

## Resources

- [Official PSR-7 Specification](https://www.php-fig.org/psr/psr-7/)
- [Guzzle HTTP Client](https://docs.guzzlephp.org/)
- [Laminas Diactoros](https://docs.laminas.dev/laminas-diactoros/)

Baamaapii 👋
