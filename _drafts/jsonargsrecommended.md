---
layout: post
title: Why “ENTRYPOINT my-program start” is bad
image: assets/img/bad-dockerfile.jpeg
categories: [Docker, Linux, Best Practices]
tags: [Dockerfile, ENTRYPOINT, Signals, Linux, Best Practices]
---
When writing Dockerfiles, the way you run your app affects how your application handles OS signals.

Using the shell form, as shown below, is not recommended:

```Dockerfile
FROM alpine
ENTRYPOINT my-program start
# entrypoint becomes: /bin/sh -c my-program start 
```

This approach runs *my-program start* as a child process to a shell, which doesn't pass signals like SIGTERM and SIGKILL. As a result, your program won't respond correctly.

## What are signals in Linux?

A signal is an interrupt delivered to a process. It's a way for processes and the operating system to communicate.

But it's more like sending a raven rather than picking up a phone.

## Examples

Events like:

- A user pressing Ctrl+C in a terminal sends an interrupt signal (SIGINT) to the process.
- A process exceeding its allocated CPU or memory resources could trigger a signal.
- A process could set a timer that sends a signal (SIGALRM) when it expires.
- When a child process stops or terminates, it sends a SIGCHLD signal to its parent process.

They can indicate various events such as an error, a specific condition being met (it's 6am!), or a request for the process to terminate.

The process that receives the signal can handle it in several ways: ignore it, perform a default action, or catch it with a custom handler.

> "Excuse me, I'm going to have to ask you to stop what you're doing and, uh, die. kthx 💀"

- **SIGTERM**: This signal is used to request a process to terminate gracefully. It’s often referred to as a soft kill because the process that receives the SIGTERM signal can choose to ignore it. It’s the polite way of asking a process to stop.

- **SIGKILL**: Immediately terminate a process. Cannot be ignored or blocked, and the processes threads will also be terminated. It should only be used as a last resort, lest you wake the gremlins.

- **SIGINT**: Ctrl-C.

## What can happen without signals?

In summary, using shell form can lead to issues with signal handling, performance, and process management. It’s generally recommended to use exec form to avoid these potential problems.

Instead, use the exec form for ENTRYPOINT to run your executable as the main process in the container. This allows your program to receive OS signals properly.

```
FROM alpine
ENTRYPOINT ["my-program", "start"]
```

Running programs as PID 1 comes with special responsibilities in Linux, such as reaping child processes. If you need to use a shell, specify it explicitly with the SHELL instruction.
For more details, check out the source of this information here.

## Baamaapii

Share your thoughts, reach out to me on social:

    • youtube.com/@fullstackdev42
    • x.com/jonesrussell42
    • facebook.com/fullstackdev42/
    
## Further reading

https://docs.docker.com/reference/dockerfile/#exec-form-entrypoint-example