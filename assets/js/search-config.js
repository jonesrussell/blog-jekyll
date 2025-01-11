// Debug configuration
const DEBUG = {
  enabled: false,
  log: function(...args) {
    if (this.enabled) {
      console.log('[Search Debug]:', ...args);
    }
  },
  group: function(name) {
    if (this.enabled) {
      console.group('[Search Debug]: ' + name);
    }
  },
  groupEnd: function() {
    if (this.enabled) {
      console.groupEnd();
    }
  }
};

// Helper functions for search
const normalize = str => str ? str.toLowerCase().trim() : '';

const splitTags = tags => {
  const tagList = normalize(tags).split(',').map(tag => tag.trim());
  DEBUG.log('Split tags:', { input: tags, output: tagList });
  return tagList;
};

const matchesTag = (tags, term) => {
  const tagList = splitTags(tags);
  const matches = tagList.some(tag => tag === normalize(term));
  DEBUG.log('Tag match:', { tags, term, matches, tagList });
  return matches;
};

const containsTerm = (text, term) => {
  const contains = normalize(text).includes(normalize(term));
  DEBUG.log('Term contained:', { text: text?.substring(0, 50) + '...', term, contains });
  return contains;
};

// Search priority scoring
function matchPriority(fieldMatched) {
  const priority = (() => {
    switch (fieldMatched) {
      case 'tags':
        return 5;
      case 'title':
        return 4;
      case 'excerpt':
        return 3;
      default:
        return 0;
    }
  })();
  DEBUG.log('Match priority:', { field: fieldMatched, priority });
  return priority;
}

// Initialize search
function initSearch(baseUrl) {
  DEBUG.log('Initializing search with baseUrl:', baseUrl);
  
  const sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('searchresults'),
    json: `${baseUrl}/assets/js/posts.json`,
    fuzzy: false,
    limit: 50,
    noResultsText: 'No results found',
    search: function(query, data) {
      DEBUG.group('Search execution');
      DEBUG.log('Query:', query);
      DEBUG.log('Data items:', data.length);

      let results;
      if (query.includes(' OR ')) {
        // OR search - match any of the terms in tags
        DEBUG.log('Performing OR search');
        const terms = query.toLowerCase().split(/\s+OR\s+/).map(t => t.trim());
        DEBUG.log('OR terms:', terms);
        results = data.filter(item => {
          const tagList = splitTags(item.tags);
          DEBUG.log('Checking tags:', { tags: tagList, terms });
          return terms.some(term => tagList.includes(term));
        });
      } else {
        // Regular search - check all fields
        DEBUG.log('Performing regular search');
        const terms = query.toLowerCase().split(/\s+/).map(t => t.trim());
        DEBUG.log('Search terms:', terms);
        results = data.filter(item => terms.every(term => {
          const tagList = splitTags(item.tags);
          return tagList.includes(term) ||
                 containsTerm(item.title, term) ||
                 containsTerm(item.content, term);
        }));
      }

      DEBUG.log('Results found:', results.length);
      if (results.length > 0) {
        DEBUG.log('First result:', {
          title: results[0].title,
          tags: results[0].tags,
          url: results[0].url
        });
      }
      DEBUG.groupEnd();
      return results;
    },
    templateMiddleware: function(prop, value, template) {
      DEBUG.log('Template middleware:', { prop, valueLength: value?.length });
      if (prop === 'title' || prop === 'excerpt') {
        value = value.replace(/&amp;/g, '&');
      }
      return prop === 'url' ? value : value;
    },
    searchResultTemplate: '<li class="result-item">' +
      '<a class="post-link" href="{url}">{title}</a>' +
      '<span class="post-meta">{date} • {tags}</span>' +
      '<p class="post-excerpt">{excerpt}</p>' +
      '</li>'
  });

  DEBUG.log('Search initialized');
  return sjs;
}

// Handle topic pill clicks
function initTopicPills(sjs) {
  DEBUG.log('Initializing topic pills');
  document.querySelectorAll('.topic-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      const searchTerm = this.dataset.search;
      DEBUG.group('Topic pill clicked');
      DEBUG.log('Search term:', searchTerm);

      const searchInput = document.getElementById('search-input');
      searchInput.value = searchTerm;
      searchInput.focus();
      sjs.search(searchTerm);
      
      // Toggle active state
      document.querySelectorAll('.topic-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');

      // Update URL with search parameter
      const url = new URL(window.location);
      url.searchParams.set('q', searchTerm);
      window.history.pushState({}, '', url);
      DEBUG.log('URL updated:', url.toString());
      DEBUG.groupEnd();
    });
  });
}

// Handle URL search parameters
function handleUrlParams(sjs) {
  DEBUG.log('Setting up URL parameter handler');
  window.addEventListener('load', function() {
    const searchParam = new URLSearchParams(window.location.search).get('q');
    DEBUG.log('URL search parameter:', searchParam);
    
    if (searchParam != null) {
      document.getElementById('search-input').value = searchParam;
      setTimeout(() => {
        DEBUG.log('Executing search from URL parameter');
        sjs.search(searchParam);
      }, 100);
    }
  }, false);
} 