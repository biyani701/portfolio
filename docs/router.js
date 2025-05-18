// This script handles routing within the docs subdirectory
(function() {
  console.log('📚 Docs router.js loaded');

  // Check if we're in the docs directory
  if (window.location.pathname.startsWith('/docs/')) {
    // Get the path after /docs/
    const path = window.location.pathname.substring(6);

    // If we're at the root of docs, we're good
    if (path === '' || path === 'index.html') {
      console.log('📍 At docs root, no redirect needed');
      return;
    }

    // Check if the requested file exists
    fetch(path)
      .then(response => {
        if (response.ok) {
          console.log(`✅ File ${path} exists, no redirect needed`);
        } else {
          console.log(`❌ File ${path} not found, redirecting to index.html`);
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
