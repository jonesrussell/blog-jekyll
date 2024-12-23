#!/bin/bash
set -x  # Enable debug mode to print commands as they execute

echo "Creating ~/.local/bin directory if it doesn't exist..."
sudo mkdir -p ~/.local/bin
sudo chown vscode:vscode ~/.local/bin
sudo chmod 755 ~/.local/bin

echo "Installing Task..."
sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b ~/.local/bin

echo "Checking if ~/.local/bin is in PATH..."
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    echo "Adding ~/.local/bin to PATH in ~/.zshrc"
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
    export PATH="$HOME/.local/bin:$PATH"
fi

echo "Verifying task installation..."
which task || echo "Task not found in PATH"
task --version || echo "Task command not working"
