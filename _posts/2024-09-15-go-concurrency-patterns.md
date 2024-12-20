---
layout: post
title: "Practical Go Concurrency Patterns"
date: 2024-09-15
categories: [golang]
tags: [golang, concurrency, goroutines, channels, patterns]
description: "Explore practical concurrency patterns in Go, from worker pools to rate limiting, with real-world examples and best practices."
---

# Practical Go Concurrency Patterns

Ahnii,

Concurrency in Go is powerful, but it can be tricky to get right. After working with goroutines and channels for years, here are the patterns I've found most useful.

## Why Go Concurrency? (2 minutes)

Go makes concurrent programming easier with:
- Lightweight goroutines
- Channel-based communication
- Built-in race detection
- Simple synchronization primitives

## Worker Pool Pattern (5 minutes)

Here's a basic worker pool implementation:

```go
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("worker %d processing job %d\n", id, j)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // Start workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Send jobs
    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)

    // Collect results
    for a := 1; a <= 9; a++ {
        <-results
    }
}
```

## Rate Limiting (5 minutes)

Control API requests with rate limiting:

```go
type RateLimiter struct {
    ticker *time.Ticker
    stop   chan struct{}
}

func NewRateLimiter(rate time.Duration) *RateLimiter {
    return &RateLimiter{
        ticker: time.NewTicker(rate),
        stop:   make(chan struct{}),
    }
}

func (r *RateLimiter) Wait() {
    <-r.ticker.C
}
```

## Common Patterns

1. **Fan-Out, Fan-In**
```go
func fanOut(input <-chan int, workers int) []<-chan int {
    channels := make([]<-chan int, workers)
    for i := 0; i < workers; i++ {
        channels[i] = worker(input)
    }
    return channels
}
```

2. **Pipeline**
```go
func pipeline(input <-chan int) <-chan int {
    output := make(chan int)
    go func() {
        defer close(output)
        for v := range input {
            output <- process(v)
        }
    }()
    return output
}
```

## Best Practices

1. **Always Clean Up**
```go
defer close(ch)
defer wg.Done()
defer ticker.Stop()
```

2. **Handle Cancellation**
```go
select {
case <-ctx.Done():
    return ctx.Err()
case result := <-resultCh:
    return process(result)
}
```

## Common Pitfalls

Watch out for:
- Goroutine leaks
- Channel deadlocks
- Race conditions
- Memory leaks

## Testing Concurrent Code

Here's a safe way to test concurrent code:

```go
func TestWorkerPool(t *testing.T) {
    jobs := make(chan int, 5)
    results := make(chan int, 5)
    
    // Start workers
    var wg sync.WaitGroup
    for i := 0; i < 2; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            worker(i, jobs, results)
        }()
    }

    // Send test jobs
    go func() {
        jobs <- 1
        jobs <- 2
        close(jobs)
    }()

    // Wait and verify
    go func() {
        wg.Wait()
        close(results)
    }()

    // Collect results
    count := 0
    for range results {
        count++
    }
    
    if count != 2 {
        t.Errorf("expected 2 results, got %d", count)
    }
}
```

## Wrapping Up

Concurrency in Go is powerful but requires careful thought. Start simple and add complexity only when needed.

What concurrency patterns have you found most useful? Any interesting challenges you've solved? Share your experiences below!

Baamaapii 👋 