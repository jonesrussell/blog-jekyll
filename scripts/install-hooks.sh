#!/bin/bash

# Make executable with: chmod +x scripts/install-hooks.sh

HOOK_DIR=".git/hooks"
PRE_COMMIT="$HOOK_DIR/pre-commit"

# Create hooks directory if it doesn't exist
mkdir -p "$HOOK_DIR"

# Create pre-commit hook
cat > "$PRE_COMMIT" << 'EOL'
#!/bin/bash

echo "Running pre-commit checks..."

# Check for title case in new/modified posts
for file in $(git diff --cached --name-only | grep '^_posts/.*\.md$'); do
    title=$(grep "^title:" "$file" | cut -d'"' -f2)
    if [[ ! "$title" =~ ^[A-Z] ]]; then
        echo "Error: Title in $file should be in Title Case"
        exit 1
    fi
    
    # Check for unique description
    desc=$(grep "^description:" "$file" | cut -d'"' -f2)
    if [ "$title" = "$desc" ] || [ -z "$desc" ]; then
        echo "Error: $file needs a unique description"
        exit 1
    fi
    
    # Check for required front matter
    for field in "layout:" "title:" "date:" "categories:" "tags:" "description:"; do
        if ! grep -q "^$field" "$file"; then
            echo "Error: Missing $field in $file"
            exit 1
        fi
    done
done

# All checks passed
exit 0
EOL

# Make the hook executable
chmod +x "$PRE_COMMIT"

echo "Git hooks installed successfully!" 