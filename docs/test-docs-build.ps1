# PowerShell script to test the Docusaurus build locally on Windows

# Create a temporary directory for testing
Write-Host "Creating test directory..." -ForegroundColor Cyan
New-Item -Path "docs-test" -ItemType Directory -Force | Out-Null
Set-Location -Path "docs-test"

# Initialize a new Docusaurus site
Write-Host "Creating Docusaurus site..." -ForegroundColor Cyan
npx create-docusaurus@latest . classic --skip-install

# Copy configuration and content
Write-Host "Copying configuration and content..." -ForegroundColor Cyan
if (Test-Path -Path "../docs") {
    Copy-Item -Path "../docs" -Destination "./docs" -Recurse -Force
} else {
    Write-Host "Warning: ../docs directory not found" -ForegroundColor Yellow
    # Create the docs directory
    New-Item -Path "./docs" -ItemType Directory -Force | Out-Null
}

Copy-Item -Path "../docusaurus.config.js" -Destination "./" -Force
Copy-Item -Path "../sidebars.js" -Destination "./" -Force

# Create static/img directory
New-Item -Path "./static/img" -ItemType Directory -Force | Out-Null

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

# Build the site
Write-Host "Building the site..." -ForegroundColor Cyan
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Docusaurus build successful!" -ForegroundColor Green
    Write-Host "The site would be available at: https://vishal.biyani.xyz/docs/" -ForegroundColor Green
} else {
    Write-Host "❌ Docusaurus build failed!" -ForegroundColor Red
}

# Cleanup
Write-Host "Cleaning up..." -ForegroundColor Cyan
Set-Location -Path ".."
Remove-Item -Path "docs-test" -Recurse -Force

Write-Host "Test complete!" -ForegroundColor Cyan
