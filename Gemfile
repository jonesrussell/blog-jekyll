source "https://rubygems.org"

# Use Jekyll version 4.3.3
gem "jekyll", "~> 4.3.3", group: :production
gem "minima", "~> 2.5"

# Use dotenv for environment variables
gem "dotenv"

gem "jekyll-vite"

# Jekyll plugins
group :jekyll_plugins do
  gem 'jekyll-paginate'
  gem 'kramdown-parser-gfm'
  gem 'jekyll-seo-tag'
end

# Production group
group :production do
  gem 'jekyll-feed'
end

# Platform-specific gems (commented out for now)
# install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
#   gem "tzinfo", "~> 1.2"
#   gem "tzinfo-data"
# end

# Performance-booster for watching directories on Windows
# gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

# Jekyll test (commented out for now)
# gem "jekyll-test"
