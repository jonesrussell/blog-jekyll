---
title: Search
permalink: /search/
layout: page
show_in_nav: true
menu_order: 20
---

{% include custom/search.html %}

## Recent Posts

{% assign posts = site.posts | slice: 0, 5 %}
<ul class="post-list">
{% for post in posts %}
  <li>
    <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
    <h3><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    {% if post.summary %}{{ post.summary }}{% endif %}
  </li>
{% endfor %}
</ul>

## Popular Topics

- [Development Environment Setup](/tags#setup)
- [Docker & Containerization](/tags#docker)
- [Go Development](/tags#go)
- [Tips & Tricks](/tags#tips)
