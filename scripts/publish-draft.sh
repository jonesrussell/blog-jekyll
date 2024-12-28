#!/bin/bash

# Make script executable with: chmod +x scripts/publish-draft.sh

DRAFTS_DIR="_drafts"
POSTS_DIR="_posts"
DATE=$(date +%Y-%m-%d)

# Show help
show_help() {
    echo "Usage: ./publish-draft.sh [OPTIONS] <draft-name>"
    echo "Publish a draft post by moving it to _posts with today's date"
    echo ""
    echo "Options:"
    echo "  -d, --date     Specify publication date (YYYY-MM-DD format)"
    echo "  -h, --help     Show this help message"
    echo ""
    echo "Example:"
    echo "  ./publish-draft.sh debugging-bubbletea-commands.md"
    echo "  ./publish-draft.sh -d 2024-03-20 debugging-bubbletea-commands.md"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -d|--date)
            DATE="$2"
            shift
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            DRAFT_NAME="$1"
            shift
            ;;
    esac
done

# Validate inputs
if [ -z "$DRAFT_NAME" ]; then
    echo "Error: Draft name is required"
    show_help
    exit 1
fi

DRAFT_PATH="$DRAFTS_DIR/$DRAFT_NAME"
if [ ! -f "$DRAFT_PATH" ]; then
    echo "Error: Draft not found: $DRAFT_PATH"
    exit 1
fi

# Create the new post name with date prefix
POST_NAME="$DATE-$DRAFT_NAME"
POST_PATH="$POSTS_DIR/$POST_NAME"

# Move the draft to posts
mkdir -p "$POSTS_DIR"
git mv "$DRAFT_PATH" "$POST_PATH"

echo "Published draft: $DRAFT_NAME"
echo "New location: $POST_PATH" 