# Blog development

## Base image

```bash
docker build --build-arg USERNAME=$USER -f .devcontainer/Dockerfile.vscode-deb-zsh -t jonesrussell/vscode-deb-zsh:latest .devcontainer/
```

With oh-my-zsh: 514.9 MB

Without: n.n MB

## Jekyll image

```bash
docker build --build-arg USERNAME=$USER -f .devcontainer/Dockerfile .devcontainer/
```
