source "https://rubygems.org"
gemspec
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
gem "jekyll", "~> 3.9.0", group: :jekyll_plugins
gem "dotenv"
gem 'jekyll-admin', group: :jekyll_plugins

group :jekyll_plugins do
  gem 'jekyll-paginate'
  gem 'kramdown-parser-gfm'
  gem 'jekyll-feed', '~> 0.13.0'
  gem 'jekyll-seo-tag', '~> 2.6', '>= 2.6.1'
  gem 'jekyll-json-feed'
  gem "sentry-ruby"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

gem "jekyll-test"
