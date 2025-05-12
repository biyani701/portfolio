// src/components/auth/AuthCallback.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useAuthContext } from '../../context/AuthProvider';
import config from '../../config';

/**
 * Generic Auth Callback component
 * This component handles the callback from OAuth providers via Auth.js
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkSession } = useAuthContext();
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const getAuthSession = async () => {
      try {
        setStatus('Checking authentication status...');
        console.log('[Auth Debug] Auth callback triggered');
        console.log('[Auth Debug] Current URL:', window.location.href);
        
        // Extract error from URL if present
        const searchParams = new URLSearchParams(location.search);
        const error = searchParams.get('error');
        
        if (error) {
          console.error('[Auth Debug] Auth error from URL:', error);
          throw new Error(`Authentication error: ${error}`);
        }
        
        // Check the session to update the auth context
        const session = await checkSession();
        console.log('[Auth Debug] Session after auth:', session);
        
        if (!session || !session.user) {
          console.warn('[Auth Debug] No session found after authentication');
          setStatus('No session found. Redirecting to sign-in page...');
          setTimeout(() => navigate('/signin'), 2000);
          return;
        }
        
        // Log session info for debugging
        console.log('[Auth Debug] User info:', session.user);
        
        // Check if there's a redirect URL stored from a protected route
        const redirectPath = sessionStorage.getItem('auth_redirect') || '/';
        console.log('[Auth Debug] Redirect path from storage:', redirectPath);
        
        // Clear the stored path after use
        sessionStorage.removeItem('auth_redirect');
        
        // Redirect to the stored path or home page
        setStatus(`Login successful! Redirecting to ${redirectPath}...`);
        setTimeout(() => {
          console.log('[Auth Debug] Navigating to:', redirectPath);
          navigate(redirectPath);
        }, 1500);
      } catch (error) {
        console.error('[Auth Debug] Authentication error:', error);
        setStatus(`Authentication failed: ${error.message}. Redirecting to sign-in page in 5 seconds.`);
        setTimeout(() => navigate('/signin'), 5000);
      }
    };

    getAuthSession();
  }, [navigate, checkSession, location.search]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 3,
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6">{status}</Typography>
    </Box>
  );
};

export default AuthCallback;
