FROM ruby:2.7.2-buster AS build

COPY . /app

WORKDIR /app

RUN apt-get update \
  && apt-get install npm -y \
  && npm install -g npm \
  && npm install -g uncss \
  && apt-get clean \
  && rm -fr /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN NODE_ENV=production npm install \
  && JEKYLL_ENV=production jekyll build --future

FROM nginx:1.19.6-alpine

COPY --from=build /app/_site /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/default.conf

LABEL name blog
LABEL version 1.0.9

EXPOSE 80
