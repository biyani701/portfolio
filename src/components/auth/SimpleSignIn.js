// src/components/auth/SimpleSignIn.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';

// MUI components
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
} from '@mui/material';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

/**
 * Simple sign-in component using MUI
 * Provides buttons for signing in with Google and GitHub
 */
const SimpleSignIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, loading, isAuthenticated, error } = useAuthContext();

  // Get the redirect path from location state or default to '/'
  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Handle sign-in with Google
  const handleGoogleSignIn = () => {
    signIn('google');
  };

  // Handle sign-in with GitHub
  const handleGitHubSignIn = () => {
    signIn('github');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>

        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          {location.state?.from ? (
            <>
              <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px' }} />
              You need to sign in to access this protected content
            </>
          ) : (
            'Sign in to access exclusive features'
          )}
        </Typography>

        {loading ? (
          <CircularProgress sx={{ my: 3 }} />
        ) : (
          <>
            {/* Error message */}
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mb: 2, p: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', borderRadius: 1, width: '100%', textAlign: 'center' }}
              >
                {error}
              </Typography>
            )}

            {/* GitHub Sign In Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleGitHubSignIn}
              disabled={loading}
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

            {/* Google Sign In Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleGoogleSignIn}
              disabled={loading}
              startIcon={<FontAwesomeIcon icon={faGoogle} />}
              sx={{
                backgroundColor: '#4285F4',
                color: '#fff',
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#3367D6',
                },
              }}
            >
              Continue with Google
            </Button>

            <Divider sx={{ width: '100%', my: 3 }}>
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

            {/* Debug buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
              <Button
                variant="text"
                size="small"
                onClick={() => window.open('/api/auth/providers', '_blank')}
                sx={{ fontSize: '0.75rem' }}
              >
                Check Auth Server
              </Button>

              <Button
                variant="text"
                size="small"
                onClick={() => navigate('/auth-debug')}
                sx={{ fontSize: '0.75rem' }}
              >
                Run Diagnostics
              </Button>
            </Box>
          </>
        )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SimpleSignIn;
