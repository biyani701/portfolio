// build-prod.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load environment variables from .env.production
require('dotenv').config({ path: '.env.production' });

// Get the Auth server URL from environment or use default
const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL || 'https://auth.vishal.biyani.xyz';

console.log(`Building with Auth server URL: ${AUTH_SERVER_URL}`);

// Run the build command
try {
  execSync('npm run build', { 
    env: { 
      ...process.env, 
      REACT_APP_AUTH_SERVER_URL: AUTH_SERVER_URL 
    },
    stdio: 'inherit'
  });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Create a runtime config file in the build directory
const runtimeConfig = {
  AUTH_SERVER_URL
};

const configJson = JSON.stringify(runtimeConfig, null, 2);
fs.writeFileSync(path.join('build', 'runtime-config.json'), configJson);
console.log('Runtime config created in build/runtime-config.json');
