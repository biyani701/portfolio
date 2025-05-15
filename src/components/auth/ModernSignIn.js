// src/components/auth/ModernSignIn.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';

// MUI components
import {
  Box,
  Container,
  Typography,
  useTheme,
  Paper,
  Button,
  Divider,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

// Config
import config from '../../config';

/**
 * Modern Sign In component that integrates with Auth.js v5
 * This component uses the Auth.js v5 client functions to handle authentication
 */
const ModernSignIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { checkSession, isAuthenticated } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  // Get the redirect path from location state or default to '/'
  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Helper function to handle sign-in with a provider
  const handleSignIn = async (provider) => {
    try {
      setLoading(true);

      // Store the redirect path in sessionStorage
      sessionStorage.setItem('auth_redirect', from);

      // Show loading message
      setSnackbarMessage(`Redirecting to ${provider} authentication...`);
      setSnackbarSeverity('info');
      setSnackbarOpen(true);

      // Get the auth server URL from runtime config or config
      const authServerUrl = (window.runtimeConfig && window.runtimeConfig.AUTH_SERVER_URL) ||
                           config.auth.serverUrl;

      // Use the full URL as the callback URL - this is crucial for Auth.js to redirect back correctly
      const callbackUrl = encodeURIComponent(`${window.location.origin}/auth-callback`);

      // Get the client ID from runtime config, environment variables, or default to 'portfolio'
      const clientId = (window.runtimeConfig && window.runtimeConfig.CLIENT_ID) ||
                      process.env.REACT_APP_CLIENT_ID ||
                      'portfolio';

      // Construct the sign-in URL with client ID and origin as query parameters
      const origin = encodeURIComponent(window.location.origin);
      const signInUrl = `${authServerUrl}/api/auth/signin/${provider}?callbackUrl=${callbackUrl}&clientId=${clientId}&origin=${origin}`;

      console.log(`[Auth] Signing in with ${provider}`);
      console.log(`[Auth] Auth server URL: ${authServerUrl}`);
      console.log(`[Auth] Callback URL: ${callbackUrl}`);
      console.log(`[Auth] Client ID: ${clientId}`);
      console.log(`[Auth] Origin: ${window.location.origin}`);
      console.log(`[Auth] Sign-in URL: ${signInUrl}`);

      // Direct redirect to the auth server
      window.location.href = signInUrl;
    } catch (error) {
      console.error(`[Auth] Error during ${provider} sign-in:`, error);
      setSnackbarMessage(`Error during sign-in: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Sign In
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center">
            {location.state?.from ? (
              <>
                <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px' }} />
                You need to sign in to access this protected content
              </>
            ) : (
              'Sign in to access exclusive features'
            )}
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body1">Redirecting to authentication provider...</Typography>
          </Box>
        ) : (
          <Box sx={{ width: '100%', mt: 2 }}>
            {/* Social Sign-in Buttons */}
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSignIn('github')}
                startIcon={<FontAwesomeIcon icon={faGithub} />}
                sx={{
                  backgroundColor: '#24292e',
                  color: '#fff',
                  py: 1.5,
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#2c3440',
                  },
                }}
              >
                Continue with GitHub
              </Button>

              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSignIn('google')}
                startIcon={<FontAwesomeIcon icon={faGoogle} />}
                sx={{
                  backgroundColor: '#4285F4',
                  color: '#fff',
                  py: 1.5,
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#3367D6',
                  },
                }}
              >
                Continue with Google
              </Button>

              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSignIn('facebook')}
                startIcon={<FontAwesomeIcon icon={faFacebookF} />}
                sx={{
                  backgroundColor: '#1877F2',
                  color: '#fff',
                  py: 1.5,
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#166FE5',
                  },
                }}
              >
                Continue with Facebook
              </Button>

              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSignIn('linkedin')}
                startIcon={<FontAwesomeIcon icon={faLinkedinIn} />}
                sx={{
                  backgroundColor: '#0077B5',
                  color: '#fff',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#006699',
                  },
                }}
              >
                Continue with LinkedIn
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/')}
              sx={{ mt: 1 }}
            >
              Continue as Guest
            </Button>

            {/* Footer */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faShieldAlt} style={{ marginRight: '8px' }} />
                Your information is securely handled
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ModernSignIn;
