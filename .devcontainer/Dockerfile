FROM debian:buster-slim

LABEL maintainer="jonesrussell42@gmail.com"

ENV DEBIAN_FRONTEND=noninteractive

ARG USERNAME=russell
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apt-get update \
    && apt-get -y upgrade \
    && apt-get -y install --no-install-recommends apt-utils dialog \
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

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd -s /bin/zsh --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
    && chmod 0440 /etc/sudoers.d/$USERNAME

ENV DEBIAN_FRONTEND=dialog

# Cache extensions in volumes to save time on rebuild
RUN mkdir -p /home/${USERNAME}/.vscode-server/extensions \
    /home/${USERNAME}/.vscode-server-insiders/extensions \
    # TODO this is a no-no, temporary bypass of "Host key verification failed." \
    /home/${USERNAME}/.ssh \
    && echo "StrictHostKeyChecking no" >> /home/${USERNAME}/.ssh/config \
    && chown -R ${USERNAME}:${USER_GID} /home/${USERNAME}

USER ${USERNAME}

RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

USER root

# Setup reposiitory and install node v12
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && apt-get install -y nodejs
