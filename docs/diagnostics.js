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

console.log('📊 Diagnostics complete');
