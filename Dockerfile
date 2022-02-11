FROM ruby:2.7.2-buster AS build

COPY . /app

WORKDIR /app

RUN gem install bundler \
  && bundle install \
  && JEKYLL_ENV=production jekyll build --future \
  && gem cleanup all

FROM node:14-buster AS nodeBuild

COPY . /app

WORKDIR /app

COPY .devcontainer/library-scripts/*.sh /tmp/library-scripts/

RUN bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" \
    # Install nvm
    && rm -rf /opt/yarn-* /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    && bash /tmp/library-scripts/node-debian.sh "${NVM_DIR}" "${NODE_VERSION}" "${USERNAME}" "${UPDATE_RC}"

RUN npm install && npm run prod

FROM nginx:1.19.6-alpine

COPY --from=build /app/_site /usr/share/nginx/html

COPY --from=nodeBuild /app/assets /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/default.conf

LABEL name blog
LABEL version 1.1.3

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

