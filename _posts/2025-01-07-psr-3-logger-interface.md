---
layout: post
title: "PSR-3: Logger Interface in PHP"
date: 2025-01-07
categories: [php, standards]
tags: [php, php-fig, psr-3, logging]
series: php-fig-standards
summary: "Learn how to implement and use PSR-3's standardized logging interface in PHP applications, with practical examples of logging implementations and best practices for error handling."
---

Ahnii! 

Recently, I was helping a team migrate from Monolog to a custom logging solution, and guess what? They had to change code in dozens of files because their logging wasn't standardized. That's exactly the problem PSR-3 solves. Let me show you how!

## Understanding PSR-3 (5 minutes)

Think of PSR-3 as a contract for logging in PHP. Just like how every car has a steering wheel and pedals in roughly the same place (making it easy to switch between cars), PSR-3 ensures all logging libraries work in a similar way.

### 1. The Logger Interface

Here's what this contract looks like:

```php
<?php

namespace Psr\Log;

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

1. **Emergency**: 🔥 The house is burning down (system is completely broken)
2. **Alert**: 🚨 Wake up, we need to fix this now!
3. **Critical**: ⚠️ Major component is broken
4. **Error**: ❌ Something failed, but the app is still running
5. **Warning**: ⚡ Heads up, something's not right
6. **Notice**: 📢 Something normal but noteworthy happened
7. **Info**: ℹ️ Just keeping you in the loop
8. **Debug**: 🔍 For the curious developers

## Real-World Implementation (10 minutes)

Let's build something practical - a logger that writes to files and sends critical errors to Slack:

```php
<?php

namespace App\Logging;

use Psr\Log\AbstractLogger;
use Psr\Log\LogLevel;

class SmartLogger extends AbstractLogger
{
    private $logFile;
    private $slackWebhook;

    public function __construct(string $logFile, string $slackWebhook)
    {
        $this->logFile = $logFile;
        $this->slackWebhook = $slackWebhook;
    }

    public function log($level, $message, array $context = array())
    {
        // Format the message
        $timestamp = date('Y-m-d H:i:s');
        $message = $this->interpolate($message, $context);
        $logLine = "[$timestamp] [$level] $message" . PHP_EOL;
        
        // Always write to file
        file_put_contents($this->logFile, $logLine, FILE_APPEND);
        
        // Send critical and emergency messages to Slack
        if (in_array($level, [LogLevel::CRITICAL, LogLevel::EMERGENCY])) {
            $this->notifySlack($level, $message);
        }
    }

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

    private function interpolate($message, array $context = array())
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

1. 🎯 **Be Specific**: Include relevant context in your logs
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

2. 🎨 **Use the Right Level**: Don't cry wolf!
   ```php
   // Don't do this
   $logger->emergency('User not found');
   
   // Do this
   $logger->notice('User not found', ['username' => $username]);
   ```

## Next Steps

Tomorrow, we'll dive into PSR-4 and see how it makes autoloading a breeze. This post is part of our [PSR Standards in PHP series](/blog/psr-standards-in-php-practical-guide-for-developers).

## Resources

- [Official PSR-3 Specification](https://www.php-fig.org/psr/psr-3/)
- [Monolog Documentation](https://github.com/Seldaek/monolog)
- [Series Example Repository](https://github.com/jonesrussell/php-fig-guide) (v0.2.0 - PSR-3 Implementation) 