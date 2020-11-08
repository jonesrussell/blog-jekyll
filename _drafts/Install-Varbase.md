---
title: "Install ~~Drupal~~ Varbase, an Enhanced Drupal Distribution"
layout: post
categories: [devops]
tags: [cms, drupal-distribution, drupal]
---

```bash
#!/bin/bash

export MY_PROJECT=poporoundhurr.gq

composer create-project Vardot/varbase-project ${MY_PROJECT} --no-dev --no-interaction

cd ${MY_PROJECT}

git init -q cp .ddev/commands/web/drush.example .ddev/commands/web/drush

ddev config --docroot=docroot --project-type=drupal8 

ddev start

cp .ddev/commands/web/drush.example .ddev/commands/web/drush 

ddev drush site-install varbase --yes --site-name="${MY_PROJECT}" \
    --account-name=webmaster \
    --account-pass=ch4ngem3#! \
    --account-mail=webmaster@foo.bar \
    varbase_multilingual_configuration.enable_multilingual=false \
    varbase_extra_components.vmi=true \
    varbase_extra_components.varbase_heroslider_media=true \
    varbase_extra_components.varbase_carousels=true \
    varbase_extra_components.varbase_search=false \
    varbase_development_tools.varbase_development=true
```

## Output of: ddev start


```bash
russell@finalizer: ~/Development/CloudNorth/popoupdates.gq
➜  ddev start                                                              
Starting popoupdates.gq... 
Running   Command=ip address show dev docker0
Internet connection not detected, see https://ddev.readthedocs.io/en/stable/users/faq/ for info. 
ddev needs to add an entry to your hostfile.
It will require administrative privileges via the sudo command, so you may be required
to enter your password for sudo. ddev is about to issue the command: 
    sudo /home/linuxbrew/.linuxbrew/Cellar/ddev/1.15.3/bin/ddev hostname popoupdates.gq.ddev.site 127.0.0.1 
Please enter your password if prompted. 
Running   Command=sudo /home/linuxbrew/.linuxbrew/Cellar/ddev/1.15.3/bin/ddev hostname popoupdates.gq.ddev.site 127.0.0.1
```

