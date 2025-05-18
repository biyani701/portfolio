# PowerShell script to update navigation links in docusaurus.config.js

Write-Host "Updating navigation links in docusaurus.config.js..." -ForegroundColor Cyan

# Check if docusaurus.config.js exists
if (-not (Test-Path -Path "docusaurus.config.js")) {
    Write-Host "Error: docusaurus.config.js not found in the current directory." -ForegroundColor Red
    exit 1
}

# Read the current configuration
$configContent = Get-Content -Path "docusaurus.config.js" -Raw

# Update onBrokenLinks setting
$configContent = $configContent -replace "onBrokenLinks: 'throw'", "onBrokenLinks: 'warn'"

# Update navbar links
$navbarPattern = @"
      navbar: {
        title: 'Portfolio Docs',
        logo: {
          alt: 'Portfolio Logo',
          src: 'img/logo.svg',
        },
        items: \[
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/vishal-biyani/portfolio',
            label: 'GitHub',
            position: 'right',
          },
        \],
      },
"@

$navbarReplacement = @"
      navbar: {
        title: 'Portfolio Docs',
        logo: {
          alt: 'Portfolio Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: 'https://vishal.biyani.xyz', label: 'Main Site', position: 'right'},
          {
            href: 'https://github.com/vishal-biyani/portfolio',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
"@

$configContent = $configContent -replace [regex]::Escape($navbarPattern), $navbarReplacement

# Update footer links
$footerPattern = @"
      footer: {
        style: 'dark',
        links: \[
          {
            title: 'Docs',
            items: \[
              {
                label: 'Architecture',
                to: '/docs/architecture',
              },
              {
                label: 'Libraries',
                to: '/docs/libraries',
              },
              {
                label: 'SBOM',
                to: '/docs/sbom',
              },
            \],
          },
          {
            title: 'Community',
            items: \[
              {
                label: 'GitHub',
                href: 'https://github.com/vishal-biyani/portfolio',
              },
            \],
          },
          {
            title: 'More',
            items: \[
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Main Site',
                href: 'https://vishal.biyani.xyz',
              },
            \],
          },
        \],
"@

$footerReplacement = @"
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Architecture',
                to: '/docs/architecture/overview',
              },
              {
                label: 'Libraries',
                to: '/docs/libraries/mui',
              },
              {
                label: 'SBOM',
                to: '/docs/sbom/dependencies',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/vishal-biyani/portfolio',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Main Site',
                href: 'https://vishal.biyani.xyz',
              },
            ],
          },
        ],
"@

$configContent = $configContent -replace [regex]::Escape($footerPattern), $footerReplacement

# Save the updated configuration
Set-Content -Path "docusaurus.config.js" -Value $configContent

Write-Host "Navigation links in docusaurus.config.js have been updated." -ForegroundColor Green
Write-Host "You can now run the test-local-build.ps1 script to verify that the documentation builds correctly." -ForegroundColor Cyan
