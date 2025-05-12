// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Get the Auth.js server URL from environment variable or use a default for development
  const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL || 'http://localhost:4000';

  console.log(`[Proxy] Using Auth server URL: ${AUTH_SERVER_URL}`);

  // Create a single proxy middleware for all auth-related paths
  const authProxy = createProxyMiddleware({
    target: AUTH_SERVER_URL,
    changeOrigin: true,
    secure: false, // Set to false for development to allow self-signed certs
    logLevel: 'debug',
    // Add a router function to handle different paths
    router: function(req) {
      // Log the original request
      console.log(`[Proxy Router] Original request: ${req.method} ${req.path}`);
      return AUTH_SERVER_URL;
    },
    // Modify the path if needed
    pathRewrite: function(path, req) {
      // If the path starts with /auth, rewrite it to /api/auth
      if (path.startsWith('/auth/')) {
        const newPath = path.replace(/^\/auth\//, '/api/auth/');
        console.log(`[Proxy] Rewriting path from ${path} to ${newPath}`);
        return newPath;
      }
      return path;
    },
    onProxyReq: (proxyReq, req, res) => {
      // Log the request for debugging
      console.log(`[Proxy] Proxying ${req.method} ${req.url} to ${AUTH_SERVER_URL}${proxyReq.path}`);

      // Add origin header for the auth server to identify the client
      const origin = req.headers.origin || `http://${req.headers.host}`;
      proxyReq.setHeader('X-Forwarded-Host', req.headers.host);
      proxyReq.setHeader('X-Client-Origin', origin);
      proxyReq.setHeader('Origin', origin);

      // Log all headers for debugging
      console.log('[Proxy] Request headers:', req.headers);
    },
    onProxyRes: (proxyRes, req, res) => {
      // Log the response for debugging
      console.log(`[Proxy] Received ${proxyRes.statusCode} for ${req.method} ${req.url}`);
      console.log('[Proxy] Response headers:', proxyRes.headers);

      // Add CORS headers to the response
      const origin = req.headers.origin || '*';
      proxyRes.headers['access-control-allow-origin'] = origin;
      proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['access-control-allow-headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
      proxyRes.headers['access-control-allow-credentials'] = 'true';
      proxyRes.headers['access-control-max-age'] = '86400';

      // Handle cookies properly
      if (proxyRes.headers['set-cookie']) {
        const cookies = proxyRes.headers['set-cookie'];
        // Ensure cookies work across domains if needed
        const modifiedCookies = cookies.map(cookie => {
          // For development, make sure cookies work with localhost
          return cookie
            .replace(/Domain=[^;]+;/i, '')
            .replace(/SameSite=[^;]+;/i, 'SameSite=Lax;');
        });
        proxyRes.headers['set-cookie'] = modifiedCookies;
        console.log('[Proxy] Modified cookies:', modifiedCookies);
      }
    },
    onError: (err, req, res) => {
      console.error('[Proxy] Error:', err);
      res.writeHead(500, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Credentials': 'true'
      });
      res.end(`Proxy error: ${err.message}`);
    }
  });

  // Apply the proxy to both /api/auth and /auth paths
  app.use('/api/auth', authProxy);
  app.use('/auth', authProxy);

  // Add a special handler for the root path of the auth server
  app.use('/api', createProxyMiddleware({
    target: AUTH_SERVER_URL,
    changeOrigin: true,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      console.log(`[Proxy] Proxying /api request to ${AUTH_SERVER_URL}/api`);
    }
  }));
};
