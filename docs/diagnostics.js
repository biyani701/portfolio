// Diagnostic script to help troubleshoot Docusaurus issues
console.log('📊 Running diagnostics for Docusaurus site');

// List all loaded scripts
const scripts = document.querySelectorAll('script');
console.log('📜 Loaded scripts:');
scripts.forEach((script, index) => {
  console.log(`${index + 1}. ${script.src || '(inline script)'}`);
});

// Check if key Docusaurus elements exist
console.log('🔍 Checking for key Docusaurus elements:');
const navbar = document.querySelector('nav.navbar');
console.log(`Navbar: ${navbar ? '✅ Found' : '❌ Not found'}`);

const sidebar = document.querySelector('div.theme-doc-sidebar-container');
console.log(`Sidebar: ${sidebar ? '✅ Found' : '❌ Not found'}`);

const mainContent = document.querySelector('main.container');
console.log(`Main content: ${mainContent ? '✅ Found' : '❌ Not found'}`);

// Check for stylesheets
const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
console.log('🎨 Loaded stylesheets:');
stylesheets.forEach((stylesheet, index) => {
  console.log(`${index + 1}. ${stylesheet.href}`);
});

// List all resources that failed to load
console.log('❌ Failed resources:');
if (window.performance) {
  const resources = window.performance.getEntriesByType('resource');
  let failedCount = 0;
  resources.forEach(resource => {
    // Approximation: resources with very small transfer sizes might have failed
    if (resource.transferSize < 100 && !resource.name.includes('favicon')) {
      console.log(`- ${resource.name}`);
      failedCount++;
    }
  });
  if (failedCount === 0) {
    console.log('None detected');
  }
}

console.log('📊 Diagnostics complete');
