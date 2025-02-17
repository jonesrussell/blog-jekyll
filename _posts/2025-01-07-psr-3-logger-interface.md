---
layout: post
title: "PSR-3: Logger Interface in PHP"
date: 2025-01-07
categories: [php, standards]
tags: [php, php-fig, psr-3, logging]
series: php-fig-standards
summary: "Learn how to implement and use PSR-3's standardized logging interface in PHP applications, with practical examples of logging implementations and best practices for error handling."
---

> Updated on Jan 10, 2025: Fixed markdown formatting and removed emojis for consistency.  
> Updated on Feb 16, 2025: Added additional comments and clarifications.

Ahnii!

Recently, I was helping a team migrate from Monolog to a custom logging solution, and guess what? They had to change code in dozens of files because their logging wasn't standardized. That's exactly the problem PSR-3 solves. Let me show you how!

## Understanding PSR-3 (5 minutes)

Think of PSR-3 as a contract for logging in PHP. Just like how every car has a steering wheel and pedals in roughly the same place (making it easy to switch between cars), PSR-3 ensures all logging libraries work in a similar way.

### 1. The Logger Interface

Here's what this contract looks like:

```php
<?php

namespace Psr\Log;

/**
 * LoggerInterface defines the contract for logging implementations.
 *
 * This interface provides methods for logging messages at different levels
 * of severity, allowing for a consistent logging approach across applications.
 */
interface LoggerInterface
{
    public function emergency($message, array $context = array());
    public function alert($message, array $context = array());
    public function critical($message, array $context = array());
    public function error($message, array $context = array());
    public function warning($message, array $context = array());
    public function notice($message, array $context = array());
    public function info($message, array $context = array());
    public function debug($message, array $context = array());
    public function log($level, $message, array $context = array());
}
```

### 2. Log Levels (3 minutes)

Think of these levels as a severity scale, from "everything's on fire" to "just FYI":

1. **Emergency**: 🔥 The house is burning down (system is completely broken).
2. **Alert**: 🚨 Wake up, we need to fix this now!
3. **Critical**: ⚠️ Major component is broken.
4. **Error**: ❌ Something failed, but the app is still running.
5. **Warning**: ⚡ Heads up, something's not right.
6. **Notice**: 📢 Something normal but noteworthy happened.
7. **Info**: ℹ️ Just keeping you in the loop.
8. **Debug**: 🔍 For the curious developers.

## Real-World Implementation (10 minutes)

Let's build something practical - a logger that writes to files and sends critical errors to Slack:

```php
<?php

namespace App\Logging;

use Psr\Log\AbstractLogger;
use Psr\Log\LogLevel;

/**
 * SmartLogger is an implementation of the PSR-3 Logger Interface.
 *
 * This logger writes log messages to a file and sends critical messages
 * to a Slack channel for immediate attention.
 */
class SmartLogger extends AbstractLogger
{
    private string $logFile;
    private string $slackWebhook;

    /**
     * Initialize the logger with file and Slack configuration.
     *
     * @param string $logFile      Path to the log file
     * @param string $slackWebhook Slack webhook URL
     */
    public function __construct(string $logFile, string $slackWebhook)
    {
        $this->logFile = $logFile;
        $this->slackWebhook = $slackWebhook;
    }

    /**
     * Logs with an arbitrary level.
     *
     * This method formats the log message and writes it to the log file.
     * It also sends critical and emergency messages to Slack.
     *
     * @param  mixed              $level   Log level
     * @param  string|\Stringable $message Message to log
     * @param  array              $context Context data for interpolation
     * @return void
     */
    public function log($level, string|\Stringable $message, array $context = []): void
    {
        // Format the message
        $timestamp = date('Y-m-d H:i:s');
        $message = $this->interpolate((string)$message, $context);
        $logLine = "[$timestamp] [$level] $message" . PHP_EOL;
        
        // Always write to file
        file_put_contents($this->logFile, $logLine, FILE_APPEND);
        
        // Send critical and emergency messages to Slack
        if (in_array($level, [LogLevel::CRITICAL, LogLevel::EMERGENCY])) {
            $this->notifySlack($level, $message);
        }
    }

    /**
     * Send a notification to Slack.
     *
     * This method sends a formatted message to the specified Slack webhook
     * for critical and emergency log levels.
     *
     * @param string $level   Log level
     * @param string $message Message to send
     *
     * @return void
     */
    private function notifySlack($level, $message)
    {
        $emoji = $level === LogLevel::EMERGENCY ? '🔥' : '⚠️';
        $payload = json_encode([
            'text' => "$emoji *$level*: $message"
        ]);

        // Send to Slack (simplified for example)
        $ch = curl_init($this->slackWebhook);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        curl_close($ch);
    }

    /**
     * Interpolates context values into message placeholders.
     *
     * This method replaces placeholders in the message with actual values
     * from the context array.
     *
     * @param  string $message Message with placeholders
     * @param  array  $context Values to replace placeholders
     * @return string Interpolated message
     */
    private function interpolate($message, array $context = array()): string
    {
        $replace = array();
        foreach ($context as $key => $val) {
            $replace['{' . $key . '}'] = $val;
        }
        return strtr($message, $replace);
    }
}
```

## Using It In Your Project (5 minutes)

Here's how I use this in my projects:

```php
$logger = new SmartLogger(
    '/var/log/app.log',
    'https://hooks.slack.com/services/YOUR/WEBHOOK/HERE'
);

// Regular info logging
$logger->info('User {user} logged in from {ip}', [
    'user' => 'jonesrussell',
    'ip' => '192.168.1.1'
]);

// Critical error - this will go to both file and Slack
$logger->critical('Payment gateway {gateway} is down!', [
    'gateway' => 'Stripe',
    'error_code' => 500
]);
```

## Framework Integration (5 minutes)

If you're using Laravel or Symfony, they've already done the heavy lifting:

### Laravel

```php
// In a service
public function processOrder($orderId)
{
    try {
        // Process order
        Log::info('Order processed', ['order_id' => $orderId]);
    } catch (\Exception $e) {
        Log::error('Order failed', [
            'order_id' => $orderId,
            'error' => $e->getMessage()
        ]);
        throw $e;
    }
}
```

### Symfony

```php
class OrderController extends AbstractController
{
    public function process(LoggerInterface $logger, string $orderId)
    {
        $logger->info('Starting order process', ['order_id' => $orderId]);
        // Your code here
    }
}
```

## Quick Tips (2 minutes)

1. Be Specific: Include relevant context in your logs

```php
// Instead of this
$logger->error('Database error');

// Do this
$logger->error('Database connection failed', [
    'host' => $dbHost,
    'error' => $e->getMessage(),
    'retry_attempt' => $attempt
]);
```

2. Use the Right Level: Don't cry wolf!

```php
// Don't do this
$logger->emergency('User not found');

// Do this
$logger->notice('User not found', ['username' => $username]);
```

## Next Steps

Tomorrow, we'll dive into PSR-4 and see how it makes autoloading a breeze. This post is part of our [PSR Standards in PHP series](/blog/psr-standards-in-php-practical-guide-for-developers).

## Examples

```php
<?php

namespace Vendor\Package;

use Psr\Log\LoggerInterface;

class Example
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
}
```

## Usage

```php
<?php

namespace Vendor\Package;

use Psr\Log\LoggerInterface;
use Psr\Log\LogLevel;

class Example
{
    private $logger;

    public function process($data)
    {
        try {
            $this->logger->info('Processing data', ['data' => $data]);
            // Process data
        } catch (Exception $e) {
            $this->logger->error('Failed to process data', [
                'error' => $e->getMessage(),
                'data' => $data
            ]);
        }
    }
}
```

## Resources

For more information:

- [Official PSR-3 Specification](https://www.php-fig.org/psr/psr-3/)
- [PHP-FIG Website](https://www.php-fig.org)

Baamaapii 👋
