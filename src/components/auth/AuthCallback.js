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

        // Check the session to update the auth context
        const session = await checkSession();

        if (!session || !session.user) {
          console.warn('[Auth] No session found after authentication');
          setError('No session found. Please try signing in again.');
          setLoading(false);
          return;
        }

        // Get the redirect path from sessionStorage
        const redirectPath = sessionStorage.getItem('auth_redirect') || '/';

        // Clear the stored path
        sessionStorage.removeItem('auth_redirect');

        // Update status and redirect
        setStatus(`Authentication successful! Redirecting...`);

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = redirectPath;
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
