#!/bin/bash

# Clean any existing build folder in main branch
echo "Cleaning existing build files in main branch..."
git rm -rf --cached build 2>/dev/null || true
rm -rf build/.git 2>/dev/null || true

# Build the React app
echo "Building the React app..."
npm run build

# Add all files in the build directory to the main branch
echo "Adding build files to main branch..."
git add build

# Commit the files with a timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Build for GitHub Pages - $TIMESTAMP"

# Push to the main branch
echo "Pushing to main branch..."
git push origin main

echo "Deployment complete!"
echo "Your site will be available at https://akharazian.github.io/revolution1"
echo "Note: Make sure you've configured GitHub Pages to use the main branch in your repository settings" 