// src/components/auth/GitHubCallback.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

// Important: Since GitHub Pages is static hosting, we need a proxy server
// to exchange the code for an access token (to keep client_secret secure)
import config from '../../config';


const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing GitHub login...');

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      if (!code) {
        setStatus('No authorization code found');
        setTimeout(() => navigate('/'), 5000);
        return;
      }

      try {
        // Call your proxy server to exchange the code for an access token
        console.log('Using token proxy URL:', config.github.tokenProxyUrl);
        const response = await fetch(config.github.tokenProxyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to exchange code for token');
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

        // Check if the error is related to the token proxy
        const errorMessage = error.message.includes('Failed to fetch')
          ? 'Failed to connect to authentication server. Please try again later.'
          : `Authentication failed: ${error.message}`;

        setStatus(`${errorMessage}. Redirecting to home page in 10 seconds.`);

        // Add a debug link
        console.log('For debugging, visit: /auth-debug');

        // Longer timeout to give user time to read the error
        setTimeout(() => navigate('/'), 10000);
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