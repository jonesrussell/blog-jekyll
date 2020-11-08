---
title: PNPM vs. NPM
layout: post
categories: [nodejs]
tags: [javascript, package-manager]
---

Ahnii. I've just discovered (pnpm)[https://pnpm.js.org/] and thought I'd beat the drum about it.

So, what is PNPM? I'm glad you asked.

<blockquote><p>
    </p>pnpm uses a content-addressable filesystem to store all files from all module directories on a disk. When using npm or Yarn, if you have 100 projects using lodash, you will have 100 copies of lodash on disk. With pnpm, lodash will be stored in a content-addressable storage, so:<p>
<ul>
    <li>If you depend on different versions of lodash, only the files that differ are added to the store. If lodash has 100 files, and a new version has a change only in one of those files, pnpm update will only add 1 new file to the storage.</li>
    <li>All the files are saved in a single place on the disk. When packages are installed, their files are hard-linked from that single place consuming no additional disk space.</li>
</ul>    
</blockquote>

Lets put it to the test.

## Get Repos

First we'll need a couple repositories to work with. I've chosen two for no other reason that I've been working with them lately:

https://github.com/jonesrussell/sapper-typescript-graphql-template-

https://github.com/sveltejs/sapper-template

```bash
git clone https://github.com/jonesrussell/sapper-typescript-graphql-template- test-npm
cd test-npm
npm install
du -hs test-npm/node_modules 
220M	test-npm/node_modules

git clone https://github.com/jonesrussell/sapper-typescript-graphql-template- test-yarn
cd test-yarn
yarn install
du -hs test-yarn/node_modules
208M	test-yarn/node_modules

git clone https://github.com/jonesrussell/sapper-typescript-graphql-template- test-pnpm
cd test-pnpm
pnpm install
du -hs test-pnpm/node_modules 
195M	test-pnpm/node_modules

git clone https://github.com/sveltejs/sapper-template test2-npm
cd test2-npm
npm install
du -hs test2-npm/node_modules 
12M	test2-npm/node_modules

git clone https://github.com/sveltejs/sapper-template test2-yarn
cd test2-yarn
yarn install
du -hs test2-yarn/node_modules 
12M	test2-yarn/node_modules

git clone https://github.com/sveltejs/sapper-template test2-pnpm
cd test2-pnpm
pnpm install
du -hs test2-pnpm/node_modules
12M	test2-pnpm/node_modules

220M	/home/russell/.pnpm-store

```

## Caveats

Trying to use @vuetronix/cli didn't work at first go

