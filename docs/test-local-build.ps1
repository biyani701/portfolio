# PowerShell script to test the Docusaurus build locally

Write-Host "Setting up Docusaurus for local testing..." -ForegroundColor Cyan

# Create a temporary directory for the Docusaurus site
$testDir = "docs-test"
Write-Host "Creating $testDir directory..." -ForegroundColor Cyan
New-Item -Path $testDir -ItemType Directory -Force | Out-Null

# Initialize Docusaurus
Write-Host "Initializing Docusaurus..." -ForegroundColor Cyan
npx create-docusaurus@latest $testDir classic --skip-install --yes

# Create necessary directories
Write-Host "Creating necessary directories..." -ForegroundColor Cyan
New-Item -Path "$testDir/src/css" -ItemType Directory -Force | Out-Null
New-Item -Path "$testDir/static/img" -ItemType Directory -Force | Out-Null

# Copy configuration and content
Write-Host "Copying configuration and content..." -ForegroundColor Cyan

# Copy docs content
if (Test-Path -Path "docs") {
    Copy-Item -Path "docs" -Destination "$testDir/docs" -Recurse -Force
    Write-Host "✅ Copied docs content" -ForegroundColor Green
}

# Copy config files
if (Test-Path -Path "docusaurus.config.js") {
    Copy-Item -Path "docusaurus.config.js" -Destination "$testDir/" -Force
    Write-Host "✅ Copied docusaurus.config.js" -ForegroundColor Green
}

if (Test-Path -Path "sidebars.js") {
    Copy-Item -Path "sidebars.js" -Destination "$testDir/" -Force
    Write-Host "✅ Copied sidebars.js" -ForegroundColor Green
}

# Copy or create custom.css
if (Test-Path -Path "src/css/custom.css") {
    Copy-Item -Path "src/css/custom.css" -Destination "$testDir/src/css/" -Force
    Write-Host "✅ Copied custom.css" -ForegroundColor Green
} else {
    Write-Host "⚠️ src/css/custom.css not found, creating default file..." -ForegroundColor Yellow
    $customCssContent = @"
/**
 * Any CSS included here will be global. The classic template
 * bundles Infima by default. Infima is a CSS framework designed to
 * work well for content-centric websites.
 */

/* You can override the default Infima variables here. */
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

/* For readability concerns, you should choose a lighter palette in dark mode. */
[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}
"@
    Set-Content -Path "$testDir/src/css/custom.css" -Value $customCssContent
    Write-Host "✅ Created default custom.css" -ForegroundColor Green
}

# Change to the test directory
Set-Location $testDir

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

# Build the site
Write-Host "Building the site..." -ForegroundColor Cyan
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Docusaurus build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Docusaurus build failed!" -ForegroundColor Red
}

# Return to the original directory
Set-Location ..

Write-Host "Test completed. Check the $testDir directory for results." -ForegroundColor Cyan
