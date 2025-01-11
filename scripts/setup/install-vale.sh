#!/bin/bash

VALE_VERSION="2.29.6"
VALE_URL="https://github.com/errata-ai/vale/releases/download/v${VALE_VERSION}/vale_${VALE_VERSION}_Linux_64-bit.tar.gz"

echo "Installing Vale v${VALE_VERSION}..."

# Create temporary directory
TMP_DIR=$(mktemp -d)
cd "$TMP_DIR" || exit 1

# Download and extract Vale
if ! curl -sfL "$VALE_URL" | tar xz; then
    echo "Failed to download or extract Vale"
    exit 1
fi

# Move Vale to /usr/local/bin
if ! sudo mv vale /usr/local/bin/; then
    echo "Failed to install Vale"
    exit 1
fi

# Clean up
cd - > /dev/null || exit 1
rm -rf "$TMP_DIR"

# Verify installation
if vale -v | grep -q "${VALE_VERSION}"; then
    echo "Vale v${VALE_VERSION} installed successfully"
else
    echo "Vale installation verification failed"
    exit 1
fi 