---
layout: post
title: "PSR-14: Event Dispatcher in PHP"
date: 2024-02-17 12:00:00 -0600
categories: php standards
series: php-fig-standards
tags: [php, php-fig, psr-14, events]
summary: "Explore PSR-14's event dispatcher interface, understand event-driven architecture in PHP, and learn best practices for implementing event systems."
---

PSR-14 defines a standard interface for event dispatching in PHP applications. This standardization enables libraries and applications to communicate through events in a framework-agnostic way, promoting loose coupling and better extensibility.

## Core Concepts

### 1. Event Objects

Events are simple objects that carry data about something that happened:

```php
<?php

class UserRegisteredEvent
{
    public function __construct(
        private User $user,
        private \DateTimeImmutable $registeredAt
    ) {}

    public function getUser(): User
    {
        return $this->user;
    }

    public function getRegisteredAt(): \DateTimeImmutable
    {
        return $this->registeredAt;
    }
}
```

### 2. Event Listeners

Listeners are callables that receive and process events:

```php
<?php

class SendWelcomeEmailListener
{
    public function __construct(
        private EmailService $emailService
    ) {}

    public function __invoke(UserRegisteredEvent $event): void
    {
        $user = $event->getUser();
        $this->emailService->sendWelcomeEmail($user);
    }
}
```

## The PSR-14 Interfaces

### 1. EventDispatcherInterface

```php
<?php

namespace Psr\EventDispatcher;

interface EventDispatcherInterface
{
    /**
     * Provide all relevant listeners with an event to process.
     *
     * @param object $event
     *   The object to process.
     * @return object
     *   The Event that was passed, now modified by listeners.
     */
    public function dispatch(object $event): object;
}
```

### 2. ListenerProviderInterface

```php
<?php

namespace Psr\EventDispatcher;

interface ListenerProviderInterface
{
    /**
     * @param object $event
     *   An event for which to return the relevant listeners.
     * @return iterable[callable]
     *   An iterable (array, iterator, or generator) of callables.
     */
    public function getListenersForEvent(object $event): iterable;
}
```

## Basic Implementation

```php
<?php

namespace Acme\Events;

use Psr\EventDispatcher\EventDispatcherInterface;
use Psr\EventDispatcher\ListenerProviderInterface;

class EventDispatcher implements EventDispatcherInterface
{
    public function __construct(
        private ListenerProviderInterface $listenerProvider
    ) {}

    public function dispatch(object $event): object
    {
        foreach ($this->listenerProvider->getListenersForEvent($event) as $listener) {
            $listener($event);
        }
        
        return $event;
    }
}

class ListenerProvider implements ListenerProviderInterface
{
    private array $listeners = [];

    public function addListener(string $eventClass, callable $listener): void
    {
        $this->listeners[$eventClass][] = $listener;
    }

    public function getListenersForEvent(object $event): iterable
    {
        $eventClass = get_class($event);
        return $this->listeners[$eventClass] ?? [];
    }
}
```

## Real-World Usage

### 1. Basic Event Dispatch

```php
<?php

// Set up the event system
$provider = new ListenerProvider();
$dispatcher = new EventDispatcher($provider);

// Register listeners
$provider->addListener(
    UserRegisteredEvent::class,
    new SendWelcomeEmailListener($emailService)
);

$provider->addListener(
    UserRegisteredEvent::class,
    new NotifyAdminListener($notificationService)
);

// Dispatch an event
$event = new UserRegisteredEvent(
    $user,
    new \DateTimeImmutable()
);

$dispatcher->dispatch($event);
```

### 2. Stoppable Events

```php
<?php

use Psr\EventDispatcher\StoppableEventInterface;

class ValidationEvent implements StoppableEventInterface
{
    private bool $isPropagationStopped = false;
    private array $errors = [];

    public function addError(string $error): void
    {
        $this->errors[] = $error;
        $this->isPropagationStopped = true;
    }

    public function isPropagationStopped(): bool
    {
        return $this->isPropagationStopped;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
```

## Framework Integration

### 1. Laravel Example

```php
<?php

use Illuminate\Support\Facades\Event;
use Psr\EventDispatcher\EventDispatcherInterface;

class PsrEventDispatcher implements EventDispatcherInterface
{
    public function dispatch(object $event): object
    {
        Event::dispatch($event);
        return $event;
    }
}

// Usage in service provider
$this->app->singleton(EventDispatcherInterface::class, PsrEventDispatcher::class);
```

### 2. Symfony Example

```php
<?php

use Symfony\Component\EventDispatcher\EventDispatcher;
use Psr\EventDispatcher\EventDispatcherInterface;

// Symfony's EventDispatcher already implements PSR-14
$dispatcher = new EventDispatcher();
assert($dispatcher instanceof EventDispatcherInterface);
```

## Best Practices

1. **Event Naming and Structure**
   ```php
   // Bad - Generic event with mixed responsibilities
   class GenericEvent
   {
       private $data;
       public function setData($data) { /* ... */ }
   }
   
   // Good - Specific event with clear purpose
   class UserEmailChangedEvent
   {
       public function __construct(
           private User $user,
           private string $oldEmail,
           private string $newEmail
       ) {}
   }
   ```

2. **Listener Organization**
   ```php
   // Bad - Monolithic listener
   class UserListener
   {
       public function onUserChange($event) {
           // Handle registration
           // Handle profile updates
           // Handle deletions
           // Too many responsibilities!
       }
   }
   
   // Good - Single responsibility listeners
   class UserRegistrationListener
   {
       public function __invoke(UserRegisteredEvent $event) {
           // Handle only registration
       }
   }
   ```

## Common Patterns

### 1. Event Subscribers

```php
<?php

interface EventSubscriberInterface
{
    public static function getSubscribedEvents(): array;
}

class UserSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            UserRegisteredEvent::class => 'onUserRegistered',
            UserDeletedEvent::class => 'onUserDeleted',
        ];
    }
    
    public function onUserRegistered(UserRegisteredEvent $event): void
    {
        // Handle registration
    }
    
    public function onUserDeleted(UserDeletedEvent $event): void
    {
        // Handle deletion
    }
}
```

### 2. Event Middleware

```php
<?php

class EventMiddleware
{
    public function __invoke(object $event, callable $next)
    {
        // Do something before
        $result = $next($event);
        // Do something after
        return $result;
    }
}
```

## Next Steps

In our next post, we'll explore PSR-7, which defines interfaces for HTTP messages. Check out our [example repository](https://github.com/yourusername/php-fig-guide/tree/psr-14) for the implementation of these standards.

## Resources

- [Official PSR-14 Specification](https://www.php-fig.org/psr/psr-14/)
- [Symfony EventDispatcher Component](https://symfony.com/doc/current/components/event_dispatcher.html)
- [Laravel Events](https://laravel.com/docs/events) 