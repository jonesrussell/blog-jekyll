FROM ruby:2.7.1-buster AS build

COPY . /app

WORKDIR /app

RUN apt-get update \
  && apt-get install npm -y \
  && npm install -g uncss \
  && bundle install \
  && JEKYLL_ENV=production jekyll build \
  && apt-get clean \
  && rm -fr /var/lib/apt/lists/* /tmp/* /var/tmp/*

FROM nginx:1.19.2-alpine

COPY --from=build /app/_site /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/default.conf

LABEL name blog
LABEL version 1.0.7

EXPOSE 80
