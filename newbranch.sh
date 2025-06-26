#!/bin/bash

# Script to create a new git branch, check it out, and push to origin

# Check if branch name is provided
if [ $# -eq 0 ]; then
    echo "Error: Branch name is required."
    echo "Usage: $0 <branch-name>"
    exit 1
fi

# Get the branch name from command line argument
BRANCH_NAME=$1

# Create and checkout the new branch
echo "Creating and checking out branch: $BRANCH_NAME"
if git checkout -b "$BRANCH_NAME"; then
    echo "Branch '$BRANCH_NAME' created successfully."
else
    echo "Failed to create branch. Exiting."
    exit 1
fi

# Push to origin and set upstream
echo "Pushing to origin and setting upstream tracking..."
if git push -u origin "$BRANCH_NAME"; then
    echo "Success! Branch '$BRANCH_NAME' is now tracking 'origin/$BRANCH_NAME'."
else
    echo "Failed to push to origin. The remote might be unavailable or you may not have permission."
    exit 1
fi

echo "All done! You're now working on branch '$BRANCH_NAME'."
