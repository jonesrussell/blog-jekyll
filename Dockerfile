FROM ruby:3.2.4-bookworm AS build

COPY . /app

WORKDIR /app

RUN gem install bundler \
    && bundle install \
    && JEKYLL_ENV=production jekyll build --future \
    && gem cleanup all

FROM node:20-bookworm AS nodeBuild

COPY --from=build /app/_site /app/_site

COPY . /app

RUN tail -n 10 /app/_site/jekyll/index.html

WORKDIR /app

RUN node --version && npm --version

RUN npm ci

RUN npm run vite:build

RUN npm run postbuild

FROM nginx:1.27.0-alpine

COPY --from=nodeBuild /app/_site/jekyll /usr/share/nginx/html

COPY --from=nodeBuild /app/assets /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/default.conf

LABEL name blog
LABEL version 2.0.0

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
