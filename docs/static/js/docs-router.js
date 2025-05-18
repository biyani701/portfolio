// Create this file in your Docusaurus site at /static/js/docs-router.js
(function() {
  console.log('📚 Docusaurus router script loaded');
  
  // Check if we're in the docs section
  if (window.location.pathname.startsWith('/docs/')) {
    // Check if we have a path parameter (coming from 404.html redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('path');
    
    if (redirectPath) {
      console.log('🔄 Found redirect path:', redirectPath);
      
      // Clean the URL by removing the query parameter
      const cleanUrl = '/docs/' + redirectPath;
      
      // Use History API to update the URL without page reload
      window.history.replaceState({}, document.title, cleanUrl);
      
      // Try to find and activate the correct navigation item
      setTimeout(() => {
        try {
          // Find sidebar items matching our path
          const sidebarItems = document.querySelectorAll('.menu__link');
          let matchFound = false;
          
          sidebarItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href.endsWith(redirectPath)) {
              console.log('✅ Found matching sidebar item:', href);
              item.click();
              matchFound = true;
            }
          });
          
          if (!matchFound) {
            console.log('⚠️ No matching sidebar item found for path:', redirectPath);
          }
        } catch (e) {
          console.error('Error handling docs navigation:', e);
        }
      }, 1000);
    }
  }
})();