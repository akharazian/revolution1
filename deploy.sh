#!/bin/bash

# Check if node_modules exists, install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Clean any existing build folder
echo "Cleaning existing build folder..."
rm -rf build 2>/dev/null || true

# Build the React app
echo "Building the React app..."
npm run build

# Create .nojekyll file in build directory to prevent GitHub Pages from ignoring files starting with underscore
echo "Creating .nojekyll file..."
touch build/.nojekyll

# Copy the index.html to 404.html to handle direct access to routes in GitHub Pages
echo "Creating 404.html file for client-side routing..."
cp build/index.html build/404.html

# Add build files to git
echo "Adding build files to git..."
git add build .nojekyll

# Commit the files with a timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Build for GitHub Pages - $TIMESTAMP"

# Push to the main branch
echo "Pushing to main branch..."
git push origin main

echo "Deployment complete!"
echo "Your site should soon be available at https://akharazian.github.io/revolution1"
echo "Note: It may take a few minutes for the GitHub Actions workflow to deploy your site."
echo "You can check the progress at https://github.com/akharazian/revolution1/actions" 