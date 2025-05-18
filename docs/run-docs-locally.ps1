# PowerShell script to run Docusaurus locally

Write-Host "Setting up Docusaurus for local development..." -ForegroundColor Cyan

# Create a temporary directory for the Docusaurus site
Write-Host "Creating docs-local directory..." -ForegroundColor Cyan
New-Item -Path "docs-local" -ItemType Directory -Force | Out-Null

# Initialize Docusaurus
Write-Host "Initializing Docusaurus..." -ForegroundColor Cyan
npx create-docusaurus@latest docs-local classic --skip-install --yes

# Copy configuration and content
Write-Host "Copying configuration and content..." -ForegroundColor Cyan

# Copy docs content
if (Test-Path -Path "docs") {
    if (Test-Path -Path "docs/docs") {
        Copy-Item -Path "docs/docs" -Destination "docs-local/docs" -Recurse -Force
        Write-Host "✅ Copied docs content" -ForegroundColor Green
    } else {
        Write-Host "⚠️ docs/docs directory not found, creating basic structure..." -ForegroundColor Yellow
        New-Item -Path "docs-local/docs" -ItemType Directory -Force | Out-Null
        
        # Create a basic intro file
        $introContent = @"
---
sidebar_position: 1
---

# Portfolio Documentation

Welcome to the documentation for the Portfolio project.

## Overview

The Portfolio project is a personal website built with React and Material-UI.

## Features

- Resume Sections
- Blog
- Knowledge Base
- Authentication
- Responsive Design
"@
        Set-Content -Path "docs-local/docs/intro.md" -Value $introContent
    }
    
    # Copy config files
    if (Test-Path -Path "docs/docusaurus.config.js") {
        Copy-Item -Path "docs/docusaurus.config.js" -Destination "docs-local/" -Force
        Write-Host "✅ Copied docusaurus.config.js" -ForegroundColor Green
    } else {
        Write-Host "⚠️ docs/docusaurus.config.js not found, creating basic config..." -ForegroundColor Yellow
        
        $configContent = @"
// @ts-check
const config = {
  title: 'Portfolio Documentation',
  tagline: 'Documentation for the portfolio project',
  url: 'http://localhost:3000',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'biyani701',
  projectName: 'portfolio',
};

module.exports = config;
"@
        Set-Content -Path "docs-local/docusaurus.config.js" -Value $configContent
    }
    
    if (Test-Path -Path "docs/sidebars.js") {
        Copy-Item -Path "docs/sidebars.js" -Destination "docs-local/" -Force
        Write-Host "✅ Copied sidebars.js" -ForegroundColor Green
    }
} else {
    Write-Host "❌ docs directory not found" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
Set-Location -Path "docs-local"
npm install

# Start the development server
Write-Host "`nStarting Docusaurus development server..." -ForegroundColor Cyan
Write-Host "Your documentation site will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server when you're done." -ForegroundColor Yellow
Write-Host "`nAfter testing, you can delete the docs-local directory." -ForegroundColor Cyan

npm start

# Note: The script will wait here until the server is stopped with Ctrl+C

# Cleanup instructions
Write-Host "`nTo clean up the temporary files, run:" -ForegroundColor Cyan
Write-Host "Remove-Item -Path 'docs-local' -Recurse -Force" -ForegroundColor White
