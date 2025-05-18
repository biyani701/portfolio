# PowerShell script to create static files for Docusaurus

Write-Host "Creating static files for Docusaurus..." -ForegroundColor Cyan

# Create static/img directory
$staticImgDir = "static/img"
New-Item -Path $staticImgDir -ItemType Directory -Force | Out-Null
Write-Host "Created directory: $staticImgDir" -ForegroundColor Green

# Create logo.svg
$logoSvgPath = "$staticImgDir/logo.svg"
$logoSvgContent = @"
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="200"
   height="200"
   viewBox="0 0 200 200"
   version="1.1"
   id="portfolio-logo"
   xmlns="http://www.w3.org/2000/svg">
  <rect
     style="fill:#2e8555;fill-opacity:1;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"
     width="200"
     height="200"
     x="0"
     y="0"
     rx="20"
     ry="20" />
  <text
     xml:space="preserve"
     style="font-style:normal;font-weight:normal;font-size:120px;line-height:1.25;font-family:sans-serif;fill:#ffffff;fill-opacity:1;stroke:none"
     x="50"
     y="140"
     id="text"><tspan
       x="50"
       y="140"
       style="font-size:120px;fill:#ffffff">V</tspan></text>
</svg>
"@
Set-Content -Path $logoSvgPath -Value $logoSvgContent
Write-Host "Created file: $logoSvgPath" -ForegroundColor Green

# Create favicon.ico (empty placeholder)
$faviconPath = "$staticImgDir/favicon.ico"
New-Item -Path $faviconPath -ItemType File -Force | Out-Null
Write-Host "Created file: $faviconPath" -ForegroundColor Green

# Create docusaurus-social-card.jpg (empty placeholder)
$socialCardPath = "$staticImgDir/docusaurus-social-card.jpg"
New-Item -Path $socialCardPath -ItemType File -Force | Out-Null
Write-Host "Created file: $socialCardPath" -ForegroundColor Green

Write-Host "`nAll static files have been created." -ForegroundColor Cyan
Write-Host "You can now run the test-local-build.ps1 script to verify that the documentation builds correctly." -ForegroundColor Cyan
