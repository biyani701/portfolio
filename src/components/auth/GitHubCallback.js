// src/components/auth/GitHubCallback.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

// Important: Since GitHub Pages is static hosting, we need a proxy server
// to exchange the code for an access token (to keep client_secret secure)
const TOKEN_PROXY_URL = 'https://github-oauth-proxy-dad46y34u-vishals-projects-d59fa5fe.vercel.app/api/github-token.js';
// Or if using custom domain: 'https://auth.vishal.biyani.xyz/api/github-token.js'
// https://github-oauth-proxy.vercel.app/api/github-token.js


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
        const response = await fetch(TOKEN_PROXY_URL, {
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
        setStatus(`Authentication failed: ${error.message}. Redirecting to home page in 5 seconds.`);
        setTimeout(() => navigate('/'), 5000);
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