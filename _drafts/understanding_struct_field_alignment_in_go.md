# Understanding Struct Field Alignment in Go

## Introduction

When working with Go structs, the way fields are ordered can significantly impact memory usage. Let's explore how struct field alignment works and how to optimize it.

## The Basics of Memory Alignment

```go
// Bad alignment (72 bytes total)
type BadStruct struct {
    name    string      // 16 bytes (string header: ptr + len)
    enabled bool        // 1 byte + 7 bytes padding
    items   []int       // 24 bytes (slice header: ptr + len + cap)
    config  *Config     // 8 bytes (pointer)
    // Total: 16 + 8 + 24 + 8 = 56 bytes + padding = 72 bytes
}
```

### Memory Sizes in Go

- bool: 1 byte
- int/uint: 8 bytes on 64-bit systems
- pointer: 8 bytes on 64-bit systems
- string: 16 bytes (two 8-byte words)
- slice: 24 bytes (three 8-byte words)
- interface: 16 bytes (two 8-byte words)

## Optimizing Field Order

```go
// Good alignment (40 bytes total)
type GoodStruct struct {
    items   []int       // 24 bytes (largest first)
    name    string      // 16 bytes
    config  *Config     // 8 bytes
    enabled bool        // 1 byte (smallest last)
    // Total: 24 + 16 + 8 + 1 = 49 bytes, optimized to 40 bytes
}
```

### Rules for Optimal Alignment

1. Place larger fields first
2. Group similar-sized fields together
3. Put smaller fields last
4. Consider using embedded structs for better packing

## Real-World Example

Here's a practical example from a game engine's asset manager:

```go
// Before optimization (72 bytes)
type AssetManager struct {
    baseDir string              // 16 bytes
    mu      sync.RWMutex        // 8 bytes
    logger  *zap.Logger         // 8 bytes
    config  *Config             // 8 bytes
    cache   map[string][]byte   // 8 bytes
}

// After optimization (40 bytes)
type AssetManager struct {
    cache   map[string][]byte   // 8 bytes (map header)
    baseDir string              // 16 bytes
    mu      sync.RWMutex        // 8 bytes
    logger  *zap.Logger         // 8 bytes
    config  *Config             // 8 bytes
}
```

## Tools and Detection

Go provides tools to help identify suboptimal field alignment:

- `go vet`: Includes field alignment checks
- golangci-lint: Provides the `fieldalignment` linter
- Example command: `go vet -fieldalignment ./...`

## Impact on Performance

While memory savings might seem small for individual structs, the impact can be significant when:

- Creating many instances of the struct
- Working with memory-constrained environments
- Dealing with cache line optimization
- Managing large data structures

## Best Practices

1. Use the `fieldalignment` linter
2. Document field sizes with comments
3. Consider alignment when designing new structs
4. Test memory usage with benchmarks
5. Profile your application to identify memory bottlenecks

## Example Memory Layout Visualization

```
// Memory layout for optimized struct:
|-----------------------------------------------|
| slice ptr  | slice len | slice cap|string ptr |
|-----------------------------------------------|
| string len | ptr      | bool     |   padding |
|-----------------------------------------------|
```

## Conclusion

Proper field alignment is a subtle but important aspect of Go performance optimization. By understanding and applying these principles, you can write more memory-efficient code without sacrificing readability or maintainability.

Would you like me to expand on any particular aspect of this blog post?
