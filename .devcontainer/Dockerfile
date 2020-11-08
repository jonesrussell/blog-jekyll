ARG VARIANT=14-buster
FROM node:${VARIANT}

LABEL maintainer="jonesrussell42@gmail.com"
LABEL name="Blog of R.E. Jones"
LABEL version="1.0.0"

ARG INSTALL_ZSH="true"
ARG UPGRADE_PACKAGES="true"
ARG ENABLE_NONROOT_DOCKER="true"
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ENV NVM_DIR=/usr/local/share/nvm
ENV NVM_SYMLINK_CURRENT=true \
    PATH=${NVM_DIR}/current/bin:${PATH}

#RUN apt-get update \
#    && apt-get -y upgrade \
#    && apt-get -y install --no-install-recommends apt-utils dialog \
#    ca-certificates \
#    wget \
#    zsh \
#    sudo \
#    git \
#    openssh-client \
#    less \
#    curl \
#    zlib1g-dev \
#    make \
#    build-essential \
#    ruby \
#    ruby-dev \
#    2>&1 \
#    && gem update --system \
#    && gem install \
#    bundler \
#    jekyll \
#    && gem cleanup all \
#    && apt-get autoremove -y \
#    && apt-get clean -y \
#    && rm -rf /var/lib/apt/lists/*

#RUN groupadd --gid $USER_GID $USERNAME \
#    && useradd -s /bin/zsh --uid $USER_UID --gid $USER_GID -m $USERNAME \
#    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
#    && chmod 0440 /etc/sudoers.d/$USERNAME

# ENV DEBIAN_FRONTEND=dialog

# Cache extensions in volumes to save time on rebuild
#RUN mkdir -p /home/${USERNAME}/.vscode-server/extensions \
#    /home/${USERNAME}/.vscode-server-insiders/extensions \
#    # TODO this is a no-no, temporary bypass of "Host key verification failed." \
#    /home/${USERNAME}/.ssh \
#    && echo "StrictHostKeyChecking no" >> /home/${USERNAME}/.ssh/config \
#    && chown -R ${USERNAME}:${USER_GID} /home/${USERNAME}

#USER node
#
#RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true
#
#USER root
#
## Setup reposiitory and install node v12
#RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
#    && apt-get install -y nodejs \
#    && apt-get autoremove -y \
#    && apt-get clean -y \
#    && rm -rf /var/lib/apt/lists/*

COPY library-scripts/*.sh /tmp/library-scripts/

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    # Remove imagemagick due to https://security-tracker.debian.org/tracker/CVE-2019-10131
    && apt-get purge -y imagemagick imagemagick-6-common \
    # Install common packages, non-root user, update yarn and install nvm
    && bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" \
    # Install nvm
    && rm -rf /opt/yarn-* /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    && bash /tmp/library-scripts/node-debian.sh "${NVM_DIR}" "none" "${USERNAME}" \
    # Clean up
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /root/.gnupg /tmp/library-scripts

# Configure global npm install location
ARG NPM_GLOBAL=/usr/local/share/npm-global
ENV PATH=${NPM_GLOBAL}/bin:${PATH}
RUN mkdir -p ${NPM_GLOBAL} \
    && chown ${USERNAME}:root ${NPM_GLOBAL} \
    && npm config -g set prefix ${NPM_GLOBAL} \
    && sudo -u ${USERNAME} npm config -g set prefix ${NPM_GLOBAL} \
    && echo "if [ \"\$(stat -c '%U' ${NPM_GLOBAL})\" != \"${USERNAME}\" ]; then sudo chown -R ${USERNAME}:root ${NPM_GLOBAL} ${NVM_DIR}; fi" \
    | tee -a /etc/bash.bashrc >> /etc/zsh/zshrc

# Install eslint
RUN sudo -u ${USERNAME} npm install -g eslint tslint typescript \
    && npm cache clean --force > /dev/null 2>&1

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    ca-certificates \
    wget \
    zsh \
    sudo \
    git \
    openssh-client \
    less \
    curl \
    zlib1g-dev \
    make \
    build-essential \
    ruby \
    ruby-dev \
    2>&1 \
    && gem update --system \
    && gem install \
    bundler \
    jekyll \
    && gem cleanup all

ARG EXTRA_NODE_VERSION=v14.14.0
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

RUN su node -c "mkdir -p /home/$USERNAME/.vscode-server/extensions \
    /home/$USERNAME/.vscode-server-insiders/extensions \
    && chown -R $USERNAME \
    /home/$USERNAME/.vscode-server \
    /home/$USERNAME/.vscode-server-insiders"


EXPOSE 4000

CMD [ "sleep", "infinity" ]
