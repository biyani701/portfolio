# PowerShell script to test docs routing

Write-Host "Setting up test environment for docs routing..." -ForegroundColor Cyan

# Create a temporary directory for testing
$testDir = "routing-test"
Write-Host "Creating $testDir directory..." -ForegroundColor Cyan
New-Item -Path $testDir -ItemType Directory -Force | Out-Null

# Create main site structure
New-Item -Path "$testDir/docs" -ItemType Directory -Force | Out-Null

# Create a simple index.html file for the main site
$indexHtmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Main Site</title>
</head>
<body>
    <h1>Main Site</h1>
    <p>This is the main site.</p>
    <p><a href="docs/">Go to Documentation</a></p>
</body>
</html>
"@
Set-Content -Path "$testDir/index.html" -Value $indexHtmlContent
Write-Host "Created main site index.html" -ForegroundColor Green

# Create a router.js file for the docs directory
$routerJsContent = @"
// This script handles routing within the docs subdirectory
(function() {
  console.log('📚 Docs router.js loaded');
  
  // Check if we're in the docs directory
  if (window.location.pathname.includes('/docs/')) {
    // Get the path after /docs/
    const path = window.location.pathname.split('/docs/')[1];
    
    // If we're at the root of docs, we're good
    if (!path || path === '' || path === 'index.html') {
      console.log('📍 At docs root, no redirect needed');
      return;
    }
    
    // Check if the requested file exists
    fetch(path)
      .then(response => {
        if (response.ok) {
          console.log(`✅ File \${path} exists, no redirect needed`);
        } else {
          console.log(`❌ File \${path} not found, redirecting to index.html`);
          window.location.href = '/docs/';
        }
      })
      .catch(error => {
        console.error('Error checking file:', error);
        // On error, redirect to docs home
        window.location.href = '/docs/';
      });
  }
})();
"@
Set-Content -Path "$testDir/docs/router.js" -Value $routerJsContent
Write-Host "Created docs/router.js" -ForegroundColor Green

# Create a simple index.html file for the docs site
$docsIndexHtmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Documentation</title>
    <script src="router.js"></script>
</head>
<body>
    <h1>Documentation</h1>
    <p>This is the documentation site.</p>
    <ul>
        <li><a href="intro.html">Introduction</a></li>
        <li><a href="architecture/overview.html">Architecture Overview</a></li>
        <li><a href="non-existent-page.html">Non-existent Page (will redirect)</a></li>
    </ul>
    <p><a href="..">Back to Main Site</a></p>
</body>
</html>
"@
Set-Content -Path "$testDir/docs/index.html" -Value $docsIndexHtmlContent
Write-Host "Created docs/index.html" -ForegroundColor Green

# Create a simple intro.html file
$introHtmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Introduction</title>
    <script src="router.js"></script>
</head>
<body>
    <h1>Introduction</h1>
    <p>This is the introduction page.</p>
    <p><a href="./">Back to Documentation Home</a></p>
</body>
</html>
"@
Set-Content -Path "$testDir/docs/intro.html" -Value $introHtmlContent
Write-Host "Created docs/intro.html" -ForegroundColor Green

# Create architecture directory
New-Item -Path "$testDir/docs/architecture" -ItemType Directory -Force | Out-Null

# Create a simple overview.html file
$overviewHtmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Architecture Overview</title>
    <script src="../router.js"></script>
</head>
<body>
    <h1>Architecture Overview</h1>
    <p>This is the architecture overview page.</p>
    <p><a href="../">Back to Documentation Home</a></p>
</body>
</html>
"@
Set-Content -Path "$testDir/docs/architecture/overview.html" -Value $overviewHtmlContent
Write-Host "Created docs/architecture/overview.html" -ForegroundColor Green

# Create a simple server.js file using Node.js
$serverJsContent = @"
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT_DIR = '.';

const server = http.createServer((req, res) => {
    console.log(`Request: \${req.method} \${req.url}`);
    
    // Parse the URL
    let url = req.url;
    if (url === '/') url = '/index.html';
    if (url === '/docs') url = '/docs/';
    if (url === '/docs/') url = '/docs/index.html';
    
    let filePath = path.join(ROOT_DIR, url);
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`File not found: \${filePath}`);
            
            // Check if this is a docs path
            if (url.startsWith('/docs/')) {
                // Serve the docs index.html for any missing docs file
                filePath = path.join(ROOT_DIR, '/docs/index.html');
                fs.readFile(filePath, (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Server Error');
                        return;
                    }
                    
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
                return;
            }
            
            // Serve 404.html for any other missing file
            filePath = path.join(ROOT_DIR, '/index.html');
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                    return;
                }
                
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            });
            return;
        }
        
        // Serve the file
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
                return;
            }
            
            // Determine content type
            const ext = path.extname(filePath);
            let contentType = 'text/html';
            
            switch (ext) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                    contentType = 'image/jpg';
                    break;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:\${PORT}/`);
    console.log(`Test docs routing by visiting:`);
    console.log(`- http://localhost:\${PORT}/docs/`);
    console.log(`- http://localhost:\${PORT}/docs/intro.html`);
    console.log(`- http://localhost:\${PORT}/docs/architecture/overview.html`);
    console.log(`- http://localhost:\${PORT}/docs/non-existent-page.html (should redirect)`);
});
"@
Set-Content -Path "$testDir/server.js" -Value $serverJsContent
Write-Host "Created server.js" -ForegroundColor Green

# Create a README.md file with instructions
$readmeContent = @"
# Docs Routing Test

This is a test environment for docs routing.

## How to Use

1. Install Node.js if you haven't already
2. Open a terminal in this directory
3. Run the server with: `node server.js`
4. Open a browser and go to http://localhost:3000/
5. Click on the links to test navigation
6. Try accessing non-existent pages to test the routing

## What to Look For

- The router.js script should handle navigation within the docs directory
- Non-existent pages in the docs directory should redirect to the docs home page
- The console should show messages about the routing
"@
Set-Content -Path "$testDir/README.md" -Value $readmeContent
Write-Host "Created README.md with instructions" -ForegroundColor Green

Write-Host "`nTest environment created in the '$testDir' directory." -ForegroundColor Cyan
Write-Host "To test the docs routing:" -ForegroundColor Cyan
Write-Host "1. Navigate to the '$testDir' directory" -ForegroundColor Cyan
Write-Host "2. Run 'node server.js'" -ForegroundColor Cyan
Write-Host "3. Open a browser and go to http://localhost:3000/" -ForegroundColor Cyan
Write-Host "4. Test the docs routing by clicking on the links" -ForegroundColor Cyan
