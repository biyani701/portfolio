# PowerShell script to check the structure of the docs directory

Write-Host "Checking docs directory structure..." -ForegroundColor Cyan

# Check if docs directory exists
if (Test-Path -Path "docs") {
    Write-Host "✅ docs directory exists" -ForegroundColor Green
    
    # Check subdirectories
    $subdirs = @("docs", "architecture", "libraries", "sbom")
    foreach ($subdir in $subdirs) {
        $path = if ($subdir -eq "docs") { "docs" } else { "docs/docs/$subdir" }
        
        if (Test-Path -Path $path) {
            Write-Host "✅ $path directory exists" -ForegroundColor Green
            
            # List files in the directory
            $files = Get-ChildItem -Path $path -File
            Write-Host "   Files in $path:" -ForegroundColor Gray
            foreach ($file in $files) {
                Write-Host "   - $($file.Name)" -ForegroundColor Gray
            }
        } else {
            Write-Host "❌ $path directory does not exist" -ForegroundColor Red
            Write-Host "   Creating $path directory..." -ForegroundColor Yellow
            New-Item -Path $path -ItemType Directory -Force | Out-Null
        }
    }
    
    # Check config files
    $configFiles = @("docusaurus.config.js", "sidebars.js")
    foreach ($file in $configFiles) {
        if (Test-Path -Path "docs/$file") {
            Write-Host "✅ docs/$file exists" -ForegroundColor Green
        } else {
            Write-Host "❌ docs/$file does not exist" -ForegroundColor Red
        }
    }
    
    # Check intro file
    if (Test-Path -Path "docs/docs/intro.md") {
        Write-Host "✅ docs/docs/intro.md exists" -ForegroundColor Green
    } else {
        Write-Host "❌ docs/docs/intro.md does not exist" -ForegroundColor Red
        Write-Host "   Creating basic intro.md file..." -ForegroundColor Yellow
        
        $introContent = @"
---
sidebar_position: 1
---

# Portfolio Documentation

Welcome to the documentation for the Portfolio project. This documentation provides detailed information about the architecture, libraries, and components used in the project.

## Overview

The Portfolio project is a personal website built with React and Material-UI. It showcases skills, experience, projects, and blog posts.

## Features

- **Resume Sections**: Display professional information
- **Blog**: Create, view, edit, and delete blog posts
- **Knowledge Base**: Share domain knowledge
- **Authentication**: Secure access to protected routes
- **Responsive Design**: Optimized for all screen sizes
"@
        
        New-Item -Path "docs/docs" -ItemType Directory -Force | Out-Null
        Set-Content -Path "docs/docs/intro.md" -Value $introContent
    }
} else {
    Write-Host "❌ docs directory does not exist" -ForegroundColor Red
}

Write-Host "Structure check complete!" -ForegroundColor Cyan
