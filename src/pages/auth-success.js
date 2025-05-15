// src/pages/auth-success.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper, Container } from '@mui/material';
import { useAuthContext } from '../context/AuthProvider';

/**
 * Auth Success Page
 * This page is displayed after a successful authentication
 * It retrieves the stored redirect URL from localStorage and redirects the user
 */
const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkSession } = useAuthContext();
  const [status, setStatus] = useState('Authentication successful! Redirecting...');

  useEffect(() => {
    const completeAuthentication = async () => {
      try {
        console.log('[Auth Success] Processing successful authentication');

        // Get the provider from the URL if available
        const searchParams = new URLSearchParams(location.search);
        const provider = searchParams.get('provider') || 'unknown';

        console.log(`[Auth Success] Provider: ${provider}`);

        // Check the session to update the auth context
        const session = await checkSession();
        console.log('[Auth Success] Session check result:', session);

        // Get the redirect URL from localStorage
        const redirectPath = localStorage.getItem('auth_redirect_path') || '/';
        const redirectUrl = localStorage.getItem('auth_redirect_url') || '/';
        const authTimestamp = localStorage.getItem('auth_timestamp');
        const isGitHubPages = window.location.hostname.includes('github.io');

        console.log('[Auth Success] Redirect path from localStorage:', redirectPath);
        console.log('[Auth Success] Redirect URL from localStorage:', redirectUrl);
        console.log('[Auth Success] Auth timestamp:', authTimestamp);
        console.log('[Auth Success] Is GitHub Pages:', isGitHubPages);

        // Check if the stored redirect info is still valid (less than 10 minutes old)
        const isValidTimestamp = authTimestamp &&
                               (Date.now() - parseInt(authTimestamp, 10)) < 10 * 60 * 1000;

        if (!isValidTimestamp) {
          console.warn('[Auth Success] Stored redirect info is too old or missing, using default');
        }

        // Clear the stored path and timestamp
        localStorage.removeItem('auth_redirect_path');
        localStorage.removeItem('auth_redirect_url');
        localStorage.removeItem('auth_timestamp');

        // For GitHub Pages, we need to handle the redirect differently
        // The 404.html approach will handle the routing
        const targetUrl = isValidTimestamp ? (redirectUrl || redirectPath) : '/';

        // Redirect after a short delay
        setTimeout(() => {
          console.log('[Auth Success] Redirecting to:', targetUrl);
          window.location.href = targetUrl;
        }, 1500);
      } catch (error) {
        console.error('[Auth Success] Error:', error);
        setStatus(`Error: ${error.message}. Redirecting to home page...`);

        // Redirect to home page on error
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    completeAuthentication();
  }, [navigate, checkSession, location.search]);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Authentication Successful
        </Typography>

        <CircularProgress sx={{ my: 4 }} />

        <Typography variant="body1" align="center">
          {status}
        </Typography>
      </Paper>
    </Container>
  );
};

export default AuthSuccessPage;
