FROM jonesrussell/vscode-deb-zsh:latest

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
