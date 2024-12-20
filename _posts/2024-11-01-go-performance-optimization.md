---
layout: post
title: "Go Performance Optimization: A Practical Guide"
date: 2024-11-01
categories: [golang, performance]
tags: [golang, optimization, profiling, benchmarking, performance-tuning]
description: "Learn practical techniques for optimizing Go applications, from profiling and benchmarking to memory management and concurrency optimization."
---

# Go Performance Optimization: A Practical Guide

Ahnii,

Want to make your Go code faster? After spending countless hours profiling and optimizing Go applications, I've collected some practical techniques that actually work.

## Why Optimize? (2 minutes)

Before diving in, remember:
- Profile first, optimize later
- Measure everything
- Keep code readable
- Don't optimize prematurely

## Profiling Tools (5 minutes)

Essential tools in your toolkit:

```go
import (
    "runtime/pprof"
    "net/http"
    _ "net/http/pprof"
)

// CPU profiling
func startCPUProfile() {
    f, err := os.Create("cpu.prof")
    if err != nil {
        log.Fatal(err)
    }
    pprof.StartCPUProfile(f)
    defer pprof.StopCPUProfile()
}

// Memory profiling
func writeMemProfile() {
    f, err := os.Create("mem.prof")
    if err != nil {
        log.Fatal(err)
    }
    defer f.Close()
    pprof.WriteHeapProfile(f)
}
```

## Common Optimizations (10 minutes)

1. **String Concatenation**
```go
// Bad
str := ""
for i := 0; i < 1000; i++ {
    str += "x"
}

// Good
var builder strings.Builder
for i := 0; i < 1000; i++ {
    builder.WriteString("x")
}
str := builder.String()
```

2. **Slice Preallocation**
```go
// Bad
var s []int
for i := 0; i < size; i++ {
    s = append(s, i)
}

// Good
s := make([]int, 0, size)
for i := 0; i < size; i++ {
    s = append(s, i)
}
```

## Memory Management

1. **Pool Usage**
```go
var bufferPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

func processData(data []byte) error {
    buf := bufferPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()
        bufferPool.Put(buf)
    }()
    
    // Use buffer...
    return nil
}
```

2. **Struct Field Alignment**
```go
// Bad
type Data struct {
    b bool    // 1 byte
    s string  // 16 bytes
    i int32   // 4 bytes
}

// Good
type Data struct {
    s string  // 16 bytes
    i int32   // 4 bytes
    b bool    // 1 byte
}
```

## Concurrency Optimization

1. **Worker Pools**
```go
func processItems(items []Item) {
    numWorkers := runtime.GOMAXPROCS(0)
    jobs := make(chan Item, len(items))
    var wg sync.WaitGroup

    // Start workers
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go worker(&wg, jobs)
    }

    // Send jobs
    for _, item := range items {
        jobs <- item
    }
    close(jobs)

    wg.Wait()
}
```

## Benchmarking

Always benchmark your optimizations:

```go
func BenchmarkProcess(b *testing.B) {
    data := generateTestData()
    b.ResetTimer()
    
    for i := 0; i < b.N; i++ {
        process(data)
    }
}
```

## Common Mistakes

Avoid these performance pitfalls:
- Unnecessary memory allocations
- Inefficient JSON marshaling
- Unbound goroutines
- Lock contention
- Network roundtrips

## Monitoring in Production

Add these metrics:
- Goroutine count
- Memory usage
- GC frequency
- Response times
- Error rates

## Wrapping Up

Remember: profile first, then optimize. Make sure your optimizations actually improve performance in your specific use case.

What performance challenges have you faced in Go? Share your optimization stories below!

Baamaapii 👋 