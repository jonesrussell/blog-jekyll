---
layout: post
title: "Nextcloud snap Nginx proxy"
categories: [productivity]
tags: [snap, nginx]
---

Nextcloud lauches his own Apache server when installed through snap. By default, it listens on port 80.

(source) You can activate ssl with:

sudo nextcloud.enable-https lets-encrypt

and add your domain to trusted domains in:

/var/snap/nextcloud/current/nextcloud/config/config.php

(source) You can also change the port:

sudo snap set nextcloud ports.https=444

And serve it behind a proxy.
