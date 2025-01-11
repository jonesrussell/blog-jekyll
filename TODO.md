---
title: TODO
menu_order: 999
show_in_nav: true
---

## Migration to Hugo (Priority)

- [ ] Set up new Hugo project structure
  - [ ] Install Hugo
  - [ ] Create new Hugo site scaffold
  - [ ] Choose and configure Hugo theme
- [ ] Content Migration
  - [ ] Convert Jekyll frontmatter to Hugo format
  - [ ] Update markdown files for Hugo compatibility
  - [ ] Migrate _posts/ content to Hugo content/ directory
  - [ ] Update internal links and references
  - [ ] Convert any Jekyll-specific liquid templates to Hugo shortcodes
- [ ] Configuration
  - [ ] Create new config.toml/yaml/json
  - [ ] Migrate Jekyll _config.yml settings to Hugo
  - [ ] Set up Hugo taxonomies (tags, categories)
  - [ ] Configure Hugo permalinks to match existing URLs
- [ ] Theme & Layout
  - [ ] Port custom Jekyll layouts to Hugo
  - [ ] Update templates for PHP-FIG guide integration
  - [ ] Recreate any custom shortcodes needed
  - [ ] Ensure WRITING_STYLE.md guidelines are maintained in new templates
- [ ] Build & Deploy
  - [ ] Update GitHub Actions for Hugo builds
  - [ ] Test build performance
  - [ ] Set up Hugo-specific caching
  - [ ] Update deployment scripts
- [ ] Testing & Validation
  - [ ] Verify all content renders correctly
  - [ ] Check all internal links
  - [ ] Test RSS feeds
  - [ ] Validate SEO meta tags
  - [ ] Ensure PHP-FIG guide submodule integration works
- [ ] Post-Migration
  - [ ] Update documentation for Hugo
  - [ ] Set up redirects for any changed URLs
  - [ ] Update README.md with new Hugo setup instructions
  - [ ] Remove Jekyll-specific dependencies and files

## PHP Dependencies

- [ ] Update PHP dependencies in php-fig-guide
- [ ] Add Composer version constraints
- [ ] Set up Composer audit for security checks
- [ ] Consider adding PHP CS Fixer

## PHP-FIG Guide

- [ ] Complete implementation of remaining PSR standards
- [ ] Add comprehensive test coverage
- [ ] Document each PSR implementation
- [ ] Add usage examples
- [ ] Consider adding benchmarks
- [ ] Set up PHP CodeSniffer
- [ ] Add PHPStan for static analysis
- [ ] Implement CI/CD pipeline for PHP tests

## Security Updates

- [ ] Add security.txt file
- [ ] Add CORS headers
- [ ] Implement Content Security Policy
- [ ] Review and update SSL/TLS configuration
- [ ] Add security disclosure policy

## Documentation

- [ ] Update README with new features and configuration
- [ ] Add CONTRIBUTING.md guidelines
- [ ] Add SECURITY.md for security policy
- [ ] Document local development setup
- [ ] Add PHP-FIG guide documentation
- [ ] Document testing procedures for PHP code

## Performance

- [ ] Optimize image assets
- [ ] Implement lazy loading for images
- [ ] Add caching headers
- [ ] Consider implementing service worker for offline support

## Accessibility

- [ ] Add ARIA labels where needed
- [ ] Ensure proper heading hierarchy
- [ ] Add alt text to all images
- [ ] Test with screen readers

## Testing

- [ ] Add automated tests
- [ ] Set up CI/CD pipeline
- [ ] Add lighthouse testing
- [ ] Implement cross-browser testing
- [ ] Add PHPUnit tests for PHP-FIG implementations
- [ ] Set up PHP test coverage reporting

## Future Considerations

- [ ] Consider implementing dark mode
- [ ] Add search functionality
- [ ] Implement commenting system
- [ ] Add RSS feed improvements

## Blog Content

- [ ] Complete PSR standards article series
- [ ] Add code examples for each PSR
- [ ] Create index page for PHP-FIG series
- [ ] Add cross-references between articles
- [ ] Consider adding video tutorials

## ~~Ruby Dependencies~~ (Deprecated - Migrating to Hugo)

- [ ] ~~Update minima theme from "~> 2.5" to latest version~~
- [ ] ~~Update jekyll-feed from "~> 0.12" to latest version~~
- [ ] ~~Add explicit version constraints for csv and webrick gems~~
- [ ] ~~Run `bundle update` to update all dependencies~~

## ~~Jekyll Configuration~~ (Deprecated - Migrating to Hugo)

- [ ] ~~Add explicit timezone setting~~
- [ ] ~~Update remote theme version~~
- [ ] ~~Add SEO optimization settings:~~
  - [ ] ~~Meta descriptions~~
  - [ ] ~~Open Graph tags~~
  - [ ] ~~Twitter card tags~~
- [ ] ~~Enable additional Jekyll plugins:~~
  - [ ] ~~jekyll-sitemap~~
  - [ ] ~~jekyll-seo-tag~~
  - [ ] ~~jekyll-archives~~

## ~~GitHub Actions~~ (Will be replaced with Hugo-specific actions)

- [ ] ~~Update Ruby setup action version~~
- [ ] ~~Add caching for faster builds~~
- [ ] ~~Add status checks/tests before deployment~~
- [ ] ~~Consider adding automated testing workflow~~

## Dependabot Configuration

Update `.github/dependabot.yml` to include:

- [ ] ~~Bundler ecosystem monitoring~~
- [ ] GitHub Actions monitoring
- [ ] Composer ecosystem monitoring
- [ ] Weekly update schedule for all ecosystems

## Analytics

- [ ] Update Google Analytics implementation to GA4
- [ ] Review and update privacy policy accordingly
- [ ] Consider adding cookie consent banner
