#!/bin/bash
# Script to test the Docusaurus build locally

# Create a temporary directory for testing
mkdir -p docs-test
cd docs-test

# Initialize a new Docusaurus site
echo "Creating Docusaurus site..."
npx create-docusaurus@latest . classic --skip-install

# Copy configuration and content
echo "Copying configuration and content..."
cp -r ../docs docs/
cp ../docusaurus.config.js ./
cp ../sidebars.js ./
mkdir -p static/img

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the site
echo "Building the site..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "✅ Docusaurus build successful!"
  echo "The site would be available at: https://vishal.biyani.xyz/docs/"
else
  echo "❌ Docusaurus build failed!"
fi

# Cleanup
echo "Cleaning up..."
cd ..
rm -rf docs-test

echo "Test complete!"
