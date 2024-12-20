---
layout: post
title: "Understanding Context in Go: A Practical Guide"
date: 2024-10-01
categories: [golang]
tags: [golang, context, cancellation, timeout, best-practices]
description: "Master Go's context package with practical examples covering cancellation, timeouts, and value propagation across your application."
---

# Understanding Context in Go: A Practical Guide

Ahnii,

Context in Go can be confusing at first, but it's essential for building robust applications. Let me share what I've learned about using context effectively.

## Why Context? (2 minutes)

Context helps you:
- Cancel operations
- Set deadlines
- Pass request-scoped values
- Control goroutine lifecycles

## Basic Context Usage (5 minutes)

Here's a simple example:

```go
func fetchData(ctx context.Context) ([]byte, error) {
    req, err := http.NewRequestWithContext(ctx, "GET", "https://api.example.com/data", nil)
    if err != nil {
        return nil, fmt.Errorf("creating request: %w", err)
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, fmt.Errorf("making request: %w", err)
    }
    defer resp.Body.Close()

    return io.ReadAll(resp.Body)
}
```

## Context Patterns (10 minutes)

1. **Timeout Control**
```go
func processWithTimeout(data []byte) error {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    return processData(ctx, data)
}
```

2. **Value Propagation**
```go
type contextKey string

const userIDKey = contextKey("userID")

func addUserID(ctx context.Context, userID string) context.Context {
    return context.WithValue(ctx, userIDKey, userID)
}

func getUserID(ctx context.Context) (string, bool) {
    id, ok := ctx.Value(userIDKey).(string)
    return id, ok
}
```

## Best Practices

1. **Always Cancel**
```go
ctx, cancel := context.WithCancel(context.Background())
defer cancel() // Don't forget this!
```

2. **Context Chain**
```go
func handleRequest(ctx context.Context) error {
    // Add timeout to parent context
    timeoutCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
    defer cancel()

    return processRequest(timeoutCtx)
}
```

## Common Mistakes to Avoid

1. **Storing Mutable Data**
```go
// Bad
ctx = context.WithValue(ctx, "data", &mutableData)

// Good
ctx = context.WithValue(ctx, "data", immutableData)
```

2. **Not Checking Cancellation**
```go
// Bad
func longProcess(ctx context.Context) {
    time.Sleep(10 * time.Second)
}

// Good
func longProcess(ctx context.Context) error {
    select {
    case <-ctx.Done():
        return ctx.Err()
    case <-time.After(10 * time.Second):
        return nil
    }
}
```

## Testing with Context

Here's how to test context-aware code:

```go
func TestFetchWithTimeout(t *testing.T) {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    _, err := fetchData(ctx)
    if err == nil {
        t.Error("expected timeout error")
    }
    if !errors.Is(err, context.DeadlineExceeded) {
        t.Errorf("expected DeadlineExceeded, got %v", err)
    }
}
```

## Wrapping Up

Context is a powerful tool for managing operations across API boundaries. Use it wisely, and your applications will be more robust and maintainable.

How do you use context in your applications? Any interesting patterns you've discovered? Share below!

Baamaapii 👋 