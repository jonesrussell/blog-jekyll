---
layout: post
title: "PSR-13: Hypermedia Links in PHP"
date: 2024-03-23 12:00:00 -0600
categories: php standards
series: php-fig-standards
tags: [php, php-fig, psr-13, hypermedia, rest]
summary: "Discover PSR-13's hypermedia link interfaces, understand HATEOAS principles, and implement discoverable APIs in PHP applications."
---

PSR-13 defines interfaces for creating and managing hypermedia links in PHP applications. This standard is particularly useful for building REST APIs that follow HATEOAS (Hypermedia as the Engine of Application State) principles, enabling self-documenting and discoverable APIs.

## Core Interfaces

### 1. LinkInterface

```php
<?php

namespace Psr\Link;

interface LinkInterface
{
    public function getHref();
    public function isTemplated();
    public function getRels();
    public function getAttributes();
}
```

### 2. EvolvableLinkInterface

```php
<?php

namespace Psr\Link;

interface EvolvableLinkInterface extends LinkInterface
{
    public function withHref($href);
    public function withRel($rel);
    public function withoutRel($rel);
    public function withAttribute($attribute, $value);
    public function withoutAttribute($attribute);
}
```

### 3. LinkProviderInterface

```php
<?php

namespace Psr\Link;

interface LinkProviderInterface
{
    public function getLinks();
    public function getLinksByRel($rel);
}
```

## Basic Implementation

### 1. Link Implementation

```php
<?php

use Psr\Link\EvolvableLinkInterface;

class Link implements EvolvableLinkInterface
{
    private $href;
    private $rels = [];
    private $attributes = [];
    private $templated = false;

    public function __construct(string $href)
    {
        $this->href = $href;
        $this->templated = strpos($href, '{') !== false;
    }

    public function getHref(): string
    {
        return $this->href;
    }

    public function isTemplated(): bool
    {
        return $this->templated;
    }

    public function getRels(): array
    {
        return $this->rels;
    }

    public function getAttributes(): array
    {
        return $this->attributes;
    }

    public function withHref($href): EvolvableLinkInterface
    {
        $new = clone $this;
        $new->href = $href;
        $new->templated = strpos($href, '{') !== false;
        return $new;
    }

    public function withRel($rel): EvolvableLinkInterface
    {
        $new = clone $this;
        $new->rels[$rel] = true;
        return $new;
    }

    public function withoutRel($rel): EvolvableLinkInterface
    {
        $new = clone $this;
        unset($new->rels[$rel]);
        return $new;
    }

    public function withAttribute($attribute, $value): EvolvableLinkInterface
    {
        $new = clone $this;
        $new->attributes[$attribute] = $value;
        return $new;
    }

    public function withoutAttribute($attribute): EvolvableLinkInterface
    {
        $new = clone $this;
        unset($new->attributes[$attribute]);
        return $new;
    }
}
```

### 2. Link Provider Implementation

```php
<?php

use Psr\Link\LinkProviderInterface;
use Psr\Link\LinkInterface;

class LinkProvider implements LinkProviderInterface
{
    private $links = [];

    public function addLink(LinkInterface $link)
    {
        $this->links[] = $link;
        return $this;
    }

    public function getLinks(): array
    {
        return array_values($this->links);
    }

    public function getLinksByRel($rel): array
    {
        return array_values(array_filter(
            $this->links,
            fn(LinkInterface $link) => in_array($rel, array_keys($link->getRels()))
        ));
    }
}
```

## Usage Examples

### 1. Basic Link Creation

```php
<?php

// Create a simple link
$link = new Link('/users/123')
    ->withRel('self')
    ->withAttribute('title', 'User Profile');

// Create a templated link
$link = new Link('/users/{id}')
    ->withRel('user')
    ->withAttribute('templated', true);

// Create a link collection
$provider = new LinkProvider();
$provider->addLink($link);
```

### 2. REST API Implementation

```php
<?php

class UserController
{
    public function show($id): array
    {
        $user = $this->repository->find($id);
        $links = new LinkProvider();
        
        // Add links
        $links->addLink(
            (new Link("/users/$id"))
                ->withRel('self')
        );
        
        $links->addLink(
            (new Link("/users/$id/posts"))
                ->withRel('posts')
        );
        
        return [
            'data' => $user,
            '_links' => $this->serializeLinks($links)
        ];
    }

    private function serializeLinks(LinkProviderInterface $provider): array
    {
        $result = [];
        foreach ($provider->getLinks() as $link) {
            foreach ($link->getRels() as $rel => $_) {
                $result[$rel] = [
                    'href' => $link->getHref(),
                    'templated' => $link->isTemplated(),
                    'attributes' => $link->getAttributes()
                ];
            }
        }
        return $result;
    }
}
```

## Framework Integration

### 1. Laravel Example

```php
<?php

use Illuminate\Http\Resources\Json\JsonResource;
use Psr\Link\LinkProviderInterface;

class UserResource extends JsonResource
{
    private $links;

    public function __construct($resource, LinkProviderInterface $links = null)
    {
        parent::__construct($resource);
        $this->links = $links;
    }

    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            '_links' => $this->serializeLinks()
        ];
    }

    private function serializeLinks(): array
    {
        if (!$this->links) {
            return [];
        }

        return array_reduce(
            $this->links->getLinks(),
            function ($carry, LinkInterface $link) {
                foreach ($link->getRels() as $rel => $_) {
                    $carry[$rel] = [
                        'href' => $link->getHref(),
                        'templated' => $link->isTemplated()
                    ];
                }
                return $carry;
            },
            []
        );
    }
}
```

### 2. Symfony Example

```php
<?php

use Symfony\Component\HttpFoundation\JsonResponse;
use Psr\Link\LinkProviderInterface;

class ApiController
{
    public function show(int $id): JsonResponse
    {
        $links = new LinkProvider();
        $links->addLink(
            (new Link("/api/users/$id"))
                ->withRel('self')
        );

        return new JsonResponse([
            'data' => $user,
            '_links' => $this->serializeLinks($links)
        ]);
    }
}
```

## Best Practices

1. **Link Relations**
   ```php
   // Bad - Using arbitrary relation names
   $link->withRel('get-user-stuff');
   
   // Good - Using standard IANA relations
   $link->withRel('self')
        ->withRel('next')
        ->withRel('prev');
   ```

2. **Template Parameters**
   ```php
   // Bad - Hardcoded IDs
   $link = new Link("/users/123/posts");
   
   // Good - Templated links
   $link = new Link("/users/{userId}/posts{?page,limit}")
       ->withRel('posts')
       ->withAttribute('templated', true);
   ```

## Common Patterns

### 1. Link Builder

```php
<?php

class LinkBuilder
{
    private $baseUrl;

    public function __construct(string $baseUrl)
    {
        $this->baseUrl = rtrim($baseUrl, '/');
    }

    public function resource(string $path): Link
    {
        return new Link($this->baseUrl . '/' . ltrim($path, '/'));
    }

    public function collection(string $path): Link
    {
        return $this->resource($path . '{?page,limit,sort}')
            ->withAttribute('templated', true);
    }
}
```

### 2. Resource Decorator

```php
<?php

class ResourceWithLinks
{
    private $resource;
    private $links;

    public function __construct($resource, LinkProviderInterface $links)
    {
        $this->resource = $resource;
        $this->links = $links;
    }

    public function toArray(): array
    {
        return [
            'data' => $this->resource,
            '_links' => $this->serializeLinks()
        ];
    }

    private function serializeLinks(): array
    {
        // Serialization logic...
    }
}
```

## HATEOAS Implementation

### 1. Resource State Machine

```php
<?php

class OrderState
{
    public function getLinks(Order $order): LinkProviderInterface
    {
        $links = new LinkProvider();
        $links->addLink(
            (new Link("/orders/{$order->id}"))
                ->withRel('self')
        );

        if ($order->status === 'pending') {
            $links->addLink(
                (new Link("/orders/{$order->id}/pay"))
                    ->withRel('payment')
            );
        }

        if ($order->status === 'paid') {
            $links->addLink(
                (new Link("/orders/{$order->id}/ship"))
                    ->withRel('shipment')
            );
        }

        return $links;
    }
}
```

### 2. Link Discovery

```php
<?php

class ApiDiscovery
{
    public function getRootLinks(): LinkProviderInterface
    {
        $links = new LinkProvider();
        
        // Add API entry points
        $links->addLink(
            (new Link('/users{?page,limit}'))
                ->withRel('users')
                ->withAttribute('templated', true)
        );
        
        $links->addLink(
            (new Link('/products{?category,sort}'))
                ->withRel('products')
                ->withAttribute('templated', true)
        );
        
        return $links;
    }
}
```

## Next Steps

This concludes our series on PHP-FIG standards. Each PSR we've covered contributes to better PHP code organization, interoperability, and maintainability. Check out our [example repository](https://github.com/yourusername/php-fig-guide/tree/psr-13) for the implementation of these standards.

## Resources

- [Official PSR-13 Specification](https://www.php-fig.org/psr/psr-13/)
- [IANA Link Relations](https://www.iana.org/assignments/link-relations/link-relations.xhtml)
- [HAL - Hypertext Application Language](https://stateless.group/hal_specification.html) 