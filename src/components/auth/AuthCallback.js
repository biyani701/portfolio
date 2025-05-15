// src/components/auth/AuthCallback.js
import  React,{ useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
  Paper,
  Container,
  Alert,
  Button
} from '@mui/material';
import { useAuthContext } from '../../context/AuthProvider';

/**
 * Generic Auth Callback component
 * This component handles the callback from OAuth providers via Auth.js
 * Simplified to work with the MUI sign-in pattern
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkSession } = useAuthContext();
  const [status, setStatus] = useState('Processing authentication...');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processAuthentication = async () => {
      try {
        setLoading(true);
        console.log('[Auth] Processing authentication callback');

        // Extract error from URL if present
        const searchParams = new URLSearchParams(location.search);
        const urlError = searchParams.get('error');

        if (urlError) {
          console.error('[Auth] Error from URL:', urlError);
          setError(`Authentication error: ${urlError}`);
          setLoading(false);
          return;
        }

        // Add a small delay to ensure the session is established
        console.log('[Auth] Waiting for session to be established...');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check the session to update the auth context
        const session = await checkSession();

        console.log('[Auth] Session check result:', session);

        if (!session || !session.user) {
          console.warn('[Auth] No session found after authentication');

          // Try one more time after a delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          const retrySession = await checkSession();

          if (!retrySession || !retrySession.user) {
            setError('No session found. Please try signing in again.');
            setLoading(false);
            return;
          }

          console.log('[Auth] Session found on retry:', retrySession);
        }

        // Get the redirect path from localStorage
        const redirectPath = localStorage.getItem('auth_redirect_path') || '/';
        const redirectUrl = localStorage.getItem('auth_redirect_url') || '/';
        const authTimestamp = localStorage.getItem('auth_timestamp');
        const isGitHubPages = window.location.hostname.includes('github.io');

        console.log('[Auth] Redirect path from localStorage:', redirectPath);
        console.log('[Auth] Redirect URL from localStorage:', redirectUrl);
        console.log('[Auth] Auth timestamp:', authTimestamp);
        console.log('[Auth] Is GitHub Pages:', isGitHubPages);

        // Check if the stored redirect info is still valid (less than 10 minutes old)
        const isValidTimestamp = authTimestamp &&
                               (Date.now() - parseInt(authTimestamp, 10)) < 10 * 60 * 1000;

        if (!isValidTimestamp) {
          console.warn('[Auth] Stored redirect info is too old or missing, using default');
        }

        // Clear the stored path and timestamp
        localStorage.removeItem('auth_redirect_path');
        localStorage.removeItem('auth_redirect_url');
        localStorage.removeItem('auth_timestamp');

        // Update status and redirect
        setStatus(`Authentication successful! Redirecting...`);

        // Redirect after a short delay
        setTimeout(() => {
          // For GitHub Pages, we need to handle the redirect differently
          // The 404.html approach will handle the routing
          const targetUrl = isValidTimestamp ? (redirectUrl || redirectPath) : '/';

          console.log('[Auth] Redirecting to:', targetUrl);

          // Use the full URL if available, otherwise use the path
          window.location.href = targetUrl;
        }, 1500);
      } catch (err) {
        console.error('[Auth] Error during authentication:', err);
        setError(`Authentication error: ${err.message}`);
        setLoading(false);
      }
    };

    processAuthentication();
  }, [navigate, checkSession, location.search]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Authentication
        </Typography>

        {loading ? (
          <>
            <CircularProgress sx={{ my: 4 }} />
            <Typography variant="body1">{status}</Typography>
          </>
        ) : error ? (
          <>
            <Alert severity="error" sx={{ width: '100%', my: 2 }}>
              {error}
            </Alert>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/signin')}
              sx={{ mt: 2 }}
            >
              Back to Sign In
            </Button>
          </>
        ) : (
          <>
            <Alert severity="success" sx={{ width: '100%', my: 2 }}>
              {status}
            </Alert>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default AuthCallback;
