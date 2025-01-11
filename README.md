# Web Developer Blog

## Description

A resource for web developers, offering insights into modern technologies, development practices, and personal experiences. Features a complete PHP-FIG standards guide with practical implementations and detailed explanations of each PSR standard.

## Table of Contents

- [Web Developer Blog](#web-developer-blog)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Development Environment](#development-environment)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Ensure you have one of the following:

- Docker Desktop (recommended)
- OR the following installed locally:
  - Ruby (Jekyll requires Ruby >= 2.5.0)
  - Bundler (Ruby package manager)
  - PHP 8.2+
  - Composer
  - Git

### Installation

1. Clone the repo with submodules

```sh
git clone --recurse-submodules https://github.com/jonesrussell/blog.git
cd blog
```

2. Choose your development environment:

#### Using Dev Container (Recommended)

```sh
code .
# When prompted, click "Reopen in Container"
# The container will automatically install all dependencies
```

#### Local Installation

```sh
# Install Ruby dependencies
bundle install

# Install PHP dependencies (for PHP-FIG guide)
cd code/php-fig-guide
composer install
cd ../..

# Serve the site locally
bundle exec jekyll serve
```

## Development Environment

This project includes a dev container configuration that provides:
- Jekyll development environment
- PHP 8.2 with Xdebug
- Composer
- All necessary VS Code extensions
- Git and GitHub CLI

## Usage

- Blog: Navigate to `http://localhost:4000/blog/` in your browser
- PHP-FIG Guide: Located in `code/php-fig-guide/`
  - Run tests: `cd code/php-fig-guide && composer test`
  - Check coding standards: `composer check-style`
  - Fix coding standards: `composer fix-style`

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure you follow:
- WRITING_STYLE.md for blog posts
- PSR coding standards for PHP code
- Include tests for new code

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Russell Jones - [@jonesrussell42](twitter.com/jonesrussell42) - <jonesrussell42@gmail.com>

Project Links:
- Blog: [https://github.com/jonesrussell/blog](https://github.com/jonesrussell/blog)
- PHP-FIG Guide: [https://github.com/jonesrussell/php-fig-guide](https://github.com/jonesrussell/php-fig-guide)
