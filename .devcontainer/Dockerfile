FROM jonesrussell/vscode-deb-zsh:latest

LABEL maintainer="jonesrussell42@gmail.com"

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# This Dockerfile adds a non-root 'vscode' user with sudo access. However, for Linux,
# this user's GID/UID must match your local user UID/GID to avoid permission issues
# with bind mounts. Update USER_UID / USER_GID if yours is not 1000. See
# https://aka.ms/vscode-remote/containers/non-root-user for details.
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Configure apt and install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    #
    # Install vim, git, process tools, lsb-release
    && apt-get install -y \
    git \
    openssh-client \
    less \
    curl \
    zlib1g-dev \
    #
    # Install ruby
    && apt-get install -y \
    make \
    build-essential \
    ruby \
    ruby-dev \
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

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog

# TODO this is a no-no, temporary bypass of "Host key verification failed."
RUN mkdir -p /home/$USERNAME/.vscode-server/extensions \
    /home/$USERNAME/.vscode-server-insiders/extensions \
    /home/$USERNAME/.ssh \
    && echo "StrictHostKeyChecking no" >> /home/vscode/.ssh/config \
    && chown -R $USERNAME \
    /home/$USERNAME/.vscode-server \
    /home/$USERNAME/.vscode-server-insiders \
    /home/$USERNAME/.ssh
