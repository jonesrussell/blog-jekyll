---
layout: post
title: "Error Handling in Go: Beyond the Basics"
date: 2024-09-01
categories: [golang]
tags: [golang, error-handling, best-practices, programming]
description: "Learn advanced error handling techniques in Go, from custom error types to error wrapping and proper error chain management."
---

# Error Handling in Go: Beyond the Basics

Ahnii,

If you've been writing Go for a while, you're familiar with `if err != nil`. But there's so much more to error handling! Let's dive into some advanced patterns I've found useful.

## Beyond Simple Error Checks (3 minutes)

Go's error handling philosophy:
- Errors are values
- Explicit is better than implicit
- Handle errors once, in one place
- Don't panic

## Custom Error Types (5 minutes)

Create meaningful error types:

```go
type ValidationError struct {
    Field string
    Issue string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Issue)
}

// Usage
if age < 0 {
    return &ValidationError{
        Field: "age",
        Issue: "must be positive",
    }
}
```

## Error Wrapping (5 minutes)

Using `fmt.Errorf` with `%w`:

```go
func processUser(id string) error {
    user, err := fetchUser(id)
    if err != nil {
        return fmt.Errorf("failed to fetch user %s: %w", id, err)
    }
    return nil
}
```

## Error Handling Patterns

1. **Sentinel Errors**
```go
var (
    ErrNotFound = errors.New("not found")
    ErrTimeout  = errors.New("operation timed out")
)
```

2. **Error Types**
```go
type NotFoundError struct {
    Resource string
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s not found", e.Resource)
}
```

## Best Practices

1. **Don't Ignore Errors**
```go
// Bad
_ = file.Close()

// Good
if err := file.Close(); err != nil {
    log.Printf("failed to close file: %v", err)
}
```

2. **Add Context**
```go
// Bad
return err

// Good
return fmt.Errorf("failed to process payment: %w", err)
```

## Testing Error Cases

Here's how to test error handling:

```go
func TestProcessUser(t *testing.T) {
    tests := []struct {
        name    string
        id      string
        wantErr bool
    }{
        {"valid user", "123", false},
        {"invalid user", "", true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := processUser(tt.id)
            if (err != nil) != tt.wantErr {
                t.Errorf("processUser() error = %v, wantErr %v", err, tt.wantErr)
            }
        })
    }
}
```

## Wrapping Up

Good error handling makes your code more maintainable and your life easier. Focus on providing context and making errors actionable.

How do you handle errors in your Go projects? Any interesting patterns you've discovered? Share below!

Baamaapii 👋 