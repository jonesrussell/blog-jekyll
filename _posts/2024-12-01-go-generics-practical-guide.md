---
layout: post
title: "Practical Go Generics: Beyond the Basics"
date: 2024-12-01
categories: [golang]
tags: [golang, generics, type-parameters, programming]
description: "Master Go generics with practical examples and patterns, from basic type parameters to advanced techniques and common use cases."
---

# Practical Go Generics: Beyond the Basics

Ahnii,

Since Go 1.18 introduced generics, I've been exploring their practical applications. Let me share what I've learned about using them effectively!

## Why Use Generics? (2 minutes)

Key benefits:
- Type-safe code reuse
- Reduced boilerplate
- Better abstraction
- Clearer intent

## Basic Generic Functions (5 minutes)

Start with a simple example:

```go
func Min[T constraints.Ordered](a, b T) T {
    if a < b {
        return a
    }
    return b
}

// Usage
minInt := Min[int](5, 10)
minFloat := Min[float64](3.14, 2.71)
```

## Type Constraints (5 minutes)

Define custom constraints:

```go
type Number interface {
    ~int | ~int32 | ~int64 | ~float32 | ~float64
}

func Sum[T Number](values []T) T {
    var sum T
    for _, v := range values {
        sum += v
    }
    return sum
}
```

## Generic Data Structures

Create flexible containers:

```go
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, error) {
    var zero T
    if len(s.items) == 0 {
        return zero, errors.New("stack is empty")
    }
    
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, nil
}
```

## Common Patterns

1. **Generic Maps**
```go
func Keys[K comparable, V any](m map[K]V) []K {
    keys := make([]K, 0, len(m))
    for k := range m {
        keys = append(keys, k)
    }
    return keys
}
```

2. **Generic Filters**
```go
func Filter[T any](items []T, predicate func(T) bool) []T {
    filtered := make([]T, 0)
    for _, item := range items {
        if predicate(item) {
            filtered = append(filtered, item)
        }
    }
    return filtered
}
```

## Advanced Techniques

1. **Type Sets**
```go
type Numeric interface {
    ~int | ~int32 | ~int64 | ~float32 | ~float64
}

type Stringable interface {
    String() string
}

func Convert[T Numeric, U Stringable](value T) U {
    // Implementation
}
```

2. **Generic Methods**
```go
type Container[T any] struct {
    value T
}

func (c *Container[T]) Map[U any](f func(T) U) *Container[U] {
    return &Container[U]{
        value: f(c.value),
    }
}
```

## Testing Generic Code

Write type-safe tests:

```go
func TestStack(t *testing.T) {
    t.Run("int stack", func(t *testing.T) {
        stack := &Stack[int]{}
        stack.Push(1)
        stack.Push(2)
        
        val, err := stack.Pop()
        if err != nil {
            t.Fatal(err)
        }
        if val != 2 {
            t.Errorf("expected 2, got %d", val)
        }
    })
    
    t.Run("string stack", func(t *testing.T) {
        stack := &Stack[string]{}
        stack.Push("hello")
        stack.Push("world")
        
        val, err := stack.Pop()
        if err != nil {
            t.Fatal(err)
        }
        if val != "world" {
            t.Errorf("expected 'world', got %s", val)
        }
    })
}
```

## Best Practices

1. **Keep It Simple**
```go
// Good
func Map[T, U any](items []T, f func(T) U) []U

// Too complex
func ProcessItems[T, U, V any](items []T, f func(T) U, g func(U) V) []V
```

2. **Use Meaningful Constraints**
```go
// Good
type Numeric interface {
    ~int | ~float64
}

// Too permissive
type AnyType interface {
    any
}
```

## Wrapping Up

Generics are a powerful tool, but they're not always the right solution. Use them when they make your code clearer and more maintainable.

How are you using generics in your Go projects? Any interesting patterns you've discovered? Share below!

Baamaapii 👋 