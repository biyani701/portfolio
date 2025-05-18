# PowerShell script to test 404 handling for docs paths

Write-Host "Testing 404 handling for docs paths..." -ForegroundColor Cyan

# Create a temporary directory for testing
$testDir = "404-test"
Write-Host "Creating $testDir directory..." -ForegroundColor Cyan
New-Item -Path $testDir -ItemType Directory -Force | Out-Null

# Create a simple index.html file
$indexHtmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>404 Test</title>
</head>
<body>
    <h1>404 Test</h1>
    <p>This is a test page for 404 handling.</p>
    <ul>
        <li><a href="docs/">Docs Home</a></li>
        <li><a href="docs/intro">Intro</a></li>
        <li><a href="docs/architecture/overview">Architecture Overview</a></li>
    </ul>
</body>
</html>
"@
Set-Content -Path "$testDir/index.html" -Value $indexHtmlContent
Write-Host "Created index.html" -ForegroundColor Green

# Create a docs directory
New-Item -Path "$testDir/docs" -ItemType Directory -Force | Out-Null

# Create a simple docs index.html file
$docsIndexHtmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Docs Home</title>
</head>
<body>
    <h1>Docs Home</h1>
    <p>This is the docs home page.</p>
    <ul>
        <li><a href="intro">Intro</a></li>
        <li><a href="architecture/overview">Architecture Overview</a></li>
    </ul>
</body>
</html>
"@
Set-Content -Path "$testDir/docs/index.html" -Value $docsIndexHtmlContent
Write-Host "Created docs/index.html" -ForegroundColor Green

# Copy the 404.html file
Copy-Item -Path "public/404.html" -Destination "$testDir/404.html" -Force
Write-Host "Copied 404.html" -ForegroundColor Green

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
    let filePath = path.join(ROOT_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`File not found: \${filePath}`);
            
            // Serve 404.html for any missing file
            filePath = path.join(ROOT_DIR, '404.html');
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
    console.log(`Test 404 handling by visiting:`);
    console.log(`- http://localhost:\${PORT}/docs/non-existent-page`);
    console.log(`- http://localhost:\${PORT}/docs/architecture/non-existent-page`);
});
"@
Set-Content -Path "$testDir/server.js" -Value $serverJsContent
Write-Host "Created server.js" -ForegroundColor Green

# Create a README.md file with instructions
$readmeContent = @"
# 404 Handling Test

This is a test environment for 404 handling with docs paths.

## How to Use

1. Install Node.js if you haven't already
2. Open a terminal in this directory
3. Run the server with: `node server.js`
4. Open a browser and go to http://localhost:3000/
5. Click on the links to test navigation
6. Try accessing non-existent pages like:
   - http://localhost:3000/docs/non-existent-page
   - http://localhost:3000/docs/architecture/non-existent-page
7. Check the browser console to see the 404 handling in action

## What to Look For

- The 404.html page should detect docs paths and redirect to /docs/
- The console should show messages about the path detection and redirection
"@
Set-Content -Path "$testDir/README.md" -Value $readmeContent
Write-Host "Created README.md with instructions" -ForegroundColor Green

Write-Host "`nTest environment created in the '$testDir' directory." -ForegroundColor Cyan
Write-Host "To test the 404 handling:" -ForegroundColor Cyan
Write-Host "1. Navigate to the '$testDir' directory" -ForegroundColor Cyan
Write-Host "2. Run 'node server.js'" -ForegroundColor Cyan
Write-Host "3. Open a browser and go to http://localhost:3000/" -ForegroundColor Cyan
Write-Host "4. Test accessing non-existent docs paths" -ForegroundColor Cyan
