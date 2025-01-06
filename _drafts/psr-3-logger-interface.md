---
layout: post
title: "PSR-3: Logger Interface in PHP"
date: 2024-02-03 12:00:00 -0600
categories: php standards
series: php-fig-standards
tags: [php, php-fig, psr-3, logging]
---

PSR-3 defines a common interface for logging libraries in PHP. This standardization allows applications to depend on a logging interface rather than a specific implementation, promoting better interoperability between different logging solutions.

## Understanding PSR-3

### 1. The Logger Interface

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

### 2. Log Levels

PSR-3 defines eight log levels, in order of decreasing severity:

1. **Emergency**: System is unusable
2. **Alert**: Action must be taken immediately
3. **Critical**: Critical conditions
4. **Error**: Error conditions
5. **Warning**: Warning conditions
6. **Notice**: Normal but significant events
7. **Info**: Informational messages
8. **Debug**: Debug-level messages

## Implementing PSR-3

### 1. Basic Logger Implementation

```php
<?php

namespace Acme\Blog\Logging;

use Psr\Log\AbstractLogger;

class FileLogger extends AbstractLogger
{
    private $logFile;

    public function __construct(string $logFile)
    {
        $this->logFile = $logFile;
    }

    public function log($level, $message, array $context = array())
    {
        $timestamp = date('Y-m-d H:i:s');
        $message = $this->interpolate($message, $context);
        $logLine = "[$timestamp] [$level] $message" . PHP_EOL;
        
        file_put_contents($this->logFile, $logLine, FILE_APPEND);
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

### 2. Using Context

```php
<?php

$logger = new FileLogger('/path/to/app.log');

// Using context for variable interpolation
$logger->error('User {username} not found', ['username' => 'john_doe']);

// Multiple context variables
$logger->info('Order {order_id} created for {amount}', [
    'order_id' => '12345',
    'amount' => '$99.99'
]);
```

## Integration with Popular Frameworks

### 1. Laravel Example

```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class OrderService
{
    public function processOrder($orderId)
    {
        try {
            // Process order
            Log::info('Order processed successfully', ['order_id' => $orderId]);
        } catch (\Exception $e) {
            Log::error('Order processing failed', [
                'order_id' => $orderId,
                'error' => $e->getMessage()
            ]);
        }
    }
}
```

### 2. Symfony Example

```php
<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class OrderController extends AbstractController
{
    public function process(LoggerInterface $logger, string $orderId)
    {
        $logger->info('Processing order', ['order_id' => $orderId]);
        // Process order
    }
}
```

## Best Practices

1. **Consistent Level Usage**
   ```php
   // Bad
   $logger->error('Unable to connect to database');
   
   // Good
   $logger->emergency('System down: Unable to connect to primary and backup databases', [
       'primary_host' => $primaryHost,
       'backup_host' => $backupHost
   ]);
   ```

2. **Structured Context**
   ```php
   // Bad
   $logger->info("User john_doe logged in from 192.168.1.1");
   
   // Good
   $logger->info("User {user} logged in from {ip}", [
       'user' => 'john_doe',
       'ip' => '192.168.1.1'
   ]);
   ```

## Common Logging Libraries

1. **Monolog**
   ```php
   use Monolog\Logger;
   use Monolog\Handler\StreamHandler;

   $log = new Logger('name');
   $log->pushHandler(new StreamHandler('path/to/your.log', Logger::WARNING));
   ```

2. **Custom Handler**
   ```php
   class SlackHandler extends AbstractLogger
   {
       public function log($level, $message, array $context = array())
       {
           if ($level === LogLevel::CRITICAL) {
               // Send to Slack
           }
       }
   }
   ```

## Next Steps

In our next post, we'll explore PSR-11, which defines a standard interface for dependency injection containers. Check out our [example repository](https://github.com/yourusername/php-fig-guide/tree/psr-3) for the implementation of these standards.

## Resources

- [Official PSR-3 Specification](https://www.php-fig.org/psr/psr-3/)
- [Monolog Documentation](https://github.com/Seldaek/monolog)
- [PHP Manual: Error Handling](https://www.php.net/manual/en/book.errorfunc.php) 