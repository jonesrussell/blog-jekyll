FROM jonesrussell/vscode-deb-zsh:latest

LABEL maintainer="jonesrussell42@gmail.com"

ENV DEBIAN_FRONTEND=noninteractive

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apt-get update \
    && apt-get -y upgrade \
    && apt-get -y install --no-install-recommends \
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
    #
    # Update
    && gem update --system \
    #
    # Install jekyll
    && gem install \
    bundler \
    jekyll \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

ENV DEBIAN_FRONTEND=dialog

# TODO this is a no-no, temporary bypass of "Host key verification failed."
RUN mkdir -p /home/${USERNAME}/{.vscode-server,.vscode-server-insiders}/extensions \
    /home/${USERNAME}/.ssh \
    && echo "StrictHostKeyChecking no" >> /home/${USERNAME}/.ssh/config \
    && chown -R ${USERNAME} /home/${USERNAME}
