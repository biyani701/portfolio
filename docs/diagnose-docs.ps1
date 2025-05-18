# PowerShell script to diagnose Docusaurus issues

Write-Host "Diagnosing Docusaurus setup..." -ForegroundColor Cyan

# Create a temporary directory for testing
Write-Host "Creating test directory..." -ForegroundColor Cyan
New-Item -Path "docs-test" -ItemType Directory -Force | Out-Null
Set-Location -Path "docs-test"

# Initialize a new Docusaurus site with verbose output
Write-Host "Creating Docusaurus site (with verbose output)..." -ForegroundColor Cyan
npx --yes create-docusaurus@latest . classic --skip-install

# Check if the initialization was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Docusaurus initialization successful" -ForegroundColor Green
} else {
    Write-Host "❌ Docusaurus initialization failed" -ForegroundColor Red
    Set-Location -Path ".."
    Remove-Item -Path "docs-test" -Recurse -Force
    exit 1
}

# Examine the structure
Write-Host "`nDocusaurus default structure:" -ForegroundColor Cyan
Get-ChildItem -Recurse -Depth 2 | Select-Object FullName

# Check docusaurus.config.js
Write-Host "`nExamining docusaurus.config.js:" -ForegroundColor Cyan
if (Test-Path -Path "docusaurus.config.js") {
    $config = Get-Content -Path "docusaurus.config.js" -Raw
    
    # Extract baseUrl
    if ($config -match "baseUrl:\s*'([^']*)'") {
        $baseUrl = $matches[1]
        Write-Host "baseUrl is set to: $baseUrl" -ForegroundColor Yellow
        
        if ($baseUrl -ne "/docs/") {
            Write-Host "⚠️ baseUrl should be '/docs/' for your setup" -ForegroundColor Yellow
        } else {
            Write-Host "✅ baseUrl is correctly set to '/docs/'" -ForegroundColor Green
        }
    }
    
    # Extract trailingSlash
    if ($config -match "trailingSlash:\s*(true|false)") {
        $trailingSlash = $matches[1]
        Write-Host "trailingSlash is set to: $trailingSlash" -ForegroundColor Yellow
        
        if ($trailingSlash -eq "true") {
            Write-Host "⚠️ trailingSlash should be 'false' for your setup" -ForegroundColor Yellow
        } else {
            Write-Host "✅ trailingSlash is correctly set to 'false'" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️ trailingSlash is not explicitly set, default is 'undefined'" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ docusaurus.config.js not found" -ForegroundColor Red
}

# Check if docs directory exists and has content
Write-Host "`nExamining docs directory:" -ForegroundColor Cyan
if (Test-Path -Path "docs") {
    $docsFiles = Get-ChildItem -Path "docs" -Recurse
    Write-Host "Found $($docsFiles.Count) files in docs directory" -ForegroundColor Yellow
    
    if ($docsFiles.Count -eq 0) {
        Write-Host "⚠️ docs directory is empty" -ForegroundColor Yellow
    } else {
        Write-Host "✅ docs directory has content" -ForegroundColor Green
    }
} else {
    Write-Host "❌ docs directory not found" -ForegroundColor Red
}

# Cleanup
Write-Host "`nCleaning up..." -ForegroundColor Cyan
Set-Location -Path ".."
Remove-Item -Path "docs-test" -Recurse -Force

Write-Host "`nRecommendations:" -ForegroundColor Cyan
Write-Host "1. Make sure your docusaurus.config.js has baseUrl: '/docs/'" -ForegroundColor White
Write-Host "2. Make sure trailingSlash is set to false" -ForegroundColor White
Write-Host "3. Ensure your docs directory has content" -ForegroundColor White
Write-Host "4. Check that the GitHub Actions workflow is correctly copying files" -ForegroundColor White
Write-Host "5. Try running a local build with 'npm run build' in the Docusaurus directory" -ForegroundColor White

Write-Host "`nDiagnosis complete!" -ForegroundColor Cyan
