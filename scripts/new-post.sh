#!/bin/bash

# Make script executable with: chmod +x scripts/new-post.sh

# Set default template directory
TEMPLATE_DIR="_templates"
POST_DIR="_posts"
DATE=$(date +%Y-%m-%d)

# Show help
show_help() {
    echo "Usage: ./new-post.sh [OPTIONS]"
    echo "Generate a new blog post from a template"
    echo ""
    echo "Options:"
    echo "  -t, --type     Post type (standard, tutorial, concept, review)"
    echo "  -n, --name     Post name (will be converted to slug)"
    echo "  -h, --help     Show this help message"
    echo ""
    echo "Example:"
    echo "  ./new-post.sh -t tutorial -n \"My Awesome Tutorial\""
}

# Convert title to slug
create_slug() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | tr '[:space:]' '-' | tr -cd '[:alnum:]-'
}

# Select template based on type
get_template() {
    case $1 in
        tutorial)
            echo "$TEMPLATE_DIR/tutorials/step-by-step.md"
            ;;
        concept)
            echo "$TEMPLATE_DIR/concepts/explanation.md"
            ;;
        review)
            echo "$TEMPLATE_DIR/reviews/review.md"
            ;;
        *)
            echo "$TEMPLATE_DIR/post-template.md"
            ;;
    esac
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -t|--type)
            POST_TYPE="$2"
            shift
            shift
            ;;
        -n|--name)
            POST_NAME="$2"
            shift
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Validate inputs
if [ -z "$POST_NAME" ]; then
    echo "Error: Post name is required"
    show_help
    exit 1
fi

# Create slug from post name
SLUG=$(create_slug "$POST_NAME")
TEMPLATE=$(get_template "$POST_TYPE")
NEW_POST="$POST_DIR/$DATE-$SLUG.md"

# Create post from template
if [ -f "$TEMPLATE" ]; then
    # Create post directory if it doesn't exist
    mkdir -p "$POST_DIR"
    
    # Copy template and replace placeholders
    sed "s/YYYY-MM-DD/$DATE/g" "$TEMPLATE" > "$NEW_POST"
    sed -i "s/Title Here: With a Subtitle/$POST_NAME/g" "$NEW_POST"
    
    echo "Created new post: $NEW_POST"
    echo "Edit this file to add your content!"
else
    echo "Error: Template not found: $TEMPLATE"
    exit 1
fi 