---
layout: post
title: "Dependency Injection in Go: A Practical Approach"
date: 2024-11-15
categories: [golang, design-patterns]
tags: [golang, dependency-injection, design-patterns, testing]
description: "Learn how to implement clean and testable dependency injection in Go, from basic patterns to advanced techniques using popular DI containers."
---

# Dependency Injection in Go: A Practical Approach

Ahnii,

Ever struggled with tightly coupled code that's hard to test? Dependency injection (DI) can help! Let me show you how I use DI in Go to write more maintainable code.

## Why Use DI? (2 minutes)

Key benefits:
- Easier testing
- Loose coupling
- Flexible configuration
- Clear dependencies

## Basic DI Pattern (5 minutes)

Start with a simple example:

```go
type UserService struct {
    db     Database
    logger Logger
    cache  Cache
}

func NewUserService(db Database, logger Logger, cache Cache) *UserService {
    return &UserService{
        db:     db,
        logger: logger,
        cache:  cache,
    }
}
```

## Interface Design (5 minutes)

Define clear interfaces:

```go
type Database interface {
    Get(id string) ([]byte, error)
    Set(id string, data []byte) error
}

type Logger interface {
    Info(msg string, args ...interface{})
    Error(msg string, args ...interface{})
}

type Cache interface {
    Get(key string) (interface{}, bool)
    Set(key string, value interface{}) error
}
```

## Constructor Injection

The most common pattern:

```go
type Handler struct {
    service *UserService
    logger  Logger
}

func NewHandler(service *UserService, logger Logger) *Handler {
    return &Handler{
        service: service,
        logger:  logger,
    }
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    // Use injected dependencies
    h.logger.Info("handling request")
    // ...
}
```

## Testing with DI

DI makes testing much easier:

```go
type MockLogger struct {
    messages []string
}

func (m *MockLogger) Info(msg string, args ...interface{}) {
    m.messages = append(m.messages, fmt.Sprintf(msg, args...))
}

func TestHandler(t *testing.T) {
    mockLogger := &MockLogger{}
    mockService := &MockUserService{}
    
    handler := NewHandler(mockService, mockLogger)
    
    // Test handler...
    req := httptest.NewRequest("GET", "/user/123", nil)
    w := httptest.NewRecorder()
    
    handler.ServeHTTP(w, req)
    
    // Assert logger was called
    if len(mockLogger.messages) == 0 {
        t.Error("expected logging, got none")
    }
}
```

## Using DI Containers

For larger applications, consider a DI container:

```go
type Container struct {
    db     Database
    logger Logger
    cache  Cache
}

func NewContainer() *Container {
    return &Container{
        db:     NewDatabase(),
        logger: NewLogger(),
        cache:  NewCache(),
    }
}

func (c *Container) UserService() *UserService {
    return NewUserService(c.db, c.logger, c.cache)
}
```

## Best Practices

1. **Keep Dependencies Explicit**
```go
// Good
func NewService(deps *Dependencies) *Service

// Bad
func NewService() *Service {
    return &Service{
        db: globalDB, // Don't use globals!
    }
}
```

2. **Use Interfaces**
```go
// Good
type Service struct {
    store DataStore
}

// Bad
type Service struct {
    db *sql.DB // Concrete type makes testing harder
}
```

## Common Patterns

1. **Options Pattern**
```go
type ServiceOption func(*Service)

func WithLogger(logger Logger) ServiceOption {
    return func(s *Service) {
        s.logger = logger
    }
}

func NewService(opts ...ServiceOption) *Service {
    s := &Service{
        logger: DefaultLogger{},
    }
    for _, opt := range opts {
        opt(s)
    }
    return s
}
```

## Wrapping Up

Dependency injection might seem like extra work at first, but it pays off in maintainability and testability. Start with constructor injection and evolve your DI strategy as your application grows.

How do you handle dependencies in your Go projects? Any interesting DI patterns you've discovered? Share below!

Baamaapii 👋 