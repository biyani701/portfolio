// src/components/auth/GitHubCallback.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

// Important: Since GitHub Pages is static hosting, we need a proxy server
// to exchange the code for an access token (to keep client_secret secure)
import config from '../../config';


// Log the complete request details before sending
const logCompleteRequest = async (url, options) => {
  console.group('🚀 OUTGOING FETCH REQUEST');
  console.log('📍 URL:', url);
  console.log('📊 Method:', options.method);
  console.log('🔑 Headers:', JSON.stringify(options.headers, null, 2));
  console.log('📦 Body:', options?.body ? JSON.stringify(JSON.parse(options.body), null, 2) : null);
  console.log('🔒 Mode:', options.mode);
  console.log('🍪 Credentials:', options.credentials);
  console.groupEnd();
  
  return { url, options };
};

// Replace your fetch call with this enhanced version
const fetchWithLogging = async (url, options) => {
  // Log complete request
  const { url: finalUrl, options: finalOptions } = await logCompleteRequest(url, options);
  
  try {
    // Make the actual request
    const response = await fetch(finalUrl, finalOptions);
    
    // Clone the response so we can log it without consuming it
    const clonedResponse = response.clone();
    
    try {
      // Try to parse response as JSON
      const responseData = await clonedResponse.json();
      console.group('📥 INCOMING FETCH RESPONSE');
      console.log('📍 URL:', finalUrl);
      console.log('📊 Status:', response.status, response.statusText);
      console.log('🔑 Headers:', JSON.stringify(Object.fromEntries([...response.headers.entries()]), null, 2));
      console.log('📦 Body:', responseData);
      console.groupEnd();
    } catch (e) {
      // Handle non-JSON responses
      console.group('📥 INCOMING FETCH RESPONSE (non-JSON)');
      console.log('📍 URL:', finalUrl);
      console.log('📊 Status:', response.status, response.statusText);
      console.log('🔑 Headers:', JSON.stringify(Object.fromEntries([...response.headers.entries()]), null, 2));
      console.log('📦 Body: Unable to parse as JSON');
      console.groupEnd();
    }
    
    return response;
  } catch (error) {
    console.group('❌ FETCH ERROR');
    console.log('📍 URL:', finalUrl);
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.groupEnd();
    throw error;
  }
};


const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing GitHub login...');

  useEffect(() => {
    // Check if we're in an infinite loop
    const isProcessed = sessionStorage.getItem('oauth_redirect_processed');
    console.log('GitHubCallback: Processing code, isProcessed flag =', isProcessed);

    // If we don't have the processed flag and we're on the callback route,
    // this might be a direct hit from GitHub OAuth that bypassed our 404.html
    if (!isProcessed && window.location.pathname.includes('/callback')) {
      console.log('Setting processed flag to prevent loops');
      sessionStorage.setItem('oauth_redirect_processed', 'true');
    }

    const exchangeCodeForToken = async () => {
      // Clear the flag after we've used it
      sessionStorage.removeItem('oauth_redirect_processed');

      if (!code) {
        setStatus('No authorization code found');
        setTimeout(() => navigate('/'), 5000);
        return;
      }

      try {
        // Call your proxy server to exchange the code for an access token
        console.log('Using token proxy URL:', config.github.tokenProxyUrl);

        // Log the environment variables for debugging
        console.log('Environment variables:', {
          clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
          redirectUri: process.env.REACT_APP_REDIRECT_URI,
          tokenProxyUrl: process.env.REACT_APP_TOKEN_PROXY_URL,
        });

        // Add more headers and options for better CORS handling
        const response = await fetchWithLogging(config.github.tokenProxyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': window.location.origin,
          },
          mode: 'cors',
          credentials: 'same-origin',
          body: JSON.stringify({
            code,
            redirect_uri: config.github.redirectUri
          }),
        });

        if (!response.ok) {
          console.error('Token exchange failed with status:', response.status);
          try {
            // Try to get more error details
            const errorData = await response.text();
            console.error('Error response:', errorData);
            throw new Error(`Failed to exchange code for token: ${response.status} ${errorData}`);
          } catch (parseError) {
            throw new Error(`Failed to exchange code for token: ${response.status}`);
          }
        }

        const data = await response.json();

        // Store the token securely (using sessionStorage for demo purposes)
        // In production, consider more secure options or short-lived tokens
        sessionStorage.setItem('github_token', data.access_token);

        // Get user info with the token
        const userResponse = await fetch('https://api.github.com/user', {
          headers: {
            Authorization: `token ${data.access_token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user information');
        }

        const userInfo = await userResponse.json();
        sessionStorage.setItem('github_user', JSON.stringify(userInfo));

        // Check if there's a redirect URL stored from a protected route
        const redirectPath = sessionStorage.getItem('auth_redirect') || '/';
        sessionStorage.removeItem('auth_redirect'); // Clear it after use

        // Redirect to the stored path or home page
        setStatus('Login successful! Redirecting...');
        setTimeout(() => navigate(redirectPath), 1500);
      } catch (error) {
        console.error('Authentication error:', error);

        // More detailed error logging
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }

        // Log the current environment and configuration
        console.error('Current configuration:', {
          tokenProxyUrl: config.github.tokenProxyUrl,
          redirectUri: config.github.redirectUri,
          origin: window.location.origin,
          currentUrl: window.location.href
        });

        // Check if the error is related to the token proxy
        let errorMessage = '';
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Failed to connect to authentication server. This may be due to CORS restrictions. Please check the console for more details.';
        } else if (error.message.includes('CORS')) {
          errorMessage = 'CORS error: The authentication server is not configured to accept requests from this domain.';
        } else {
          errorMessage = `Authentication failed: ${error.message}`;
        }

        setStatus(`${errorMessage}. Redirecting to home page in 15 seconds.`);

        // Add a debug link
        console.log('For debugging, visit: /auth-debug');
        console.log('Try using a different token proxy URL in your .env.local file');

        // Longer timeout to give user time to read the error
        setTimeout(() => navigate('/'), 15000);
      }
    };

    exchangeCodeForToken();
  }, [code, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh'
      }}
    >
      <CircularProgress sx={{ mb: 3 }} />
      <Typography variant="h6">{status}</Typography>
    </Box>
  );
};

export default GitHubCallback;