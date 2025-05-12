// src/components/auth/LogoutPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Paper, Container } from '@mui/material';
import { useAuthContext } from '../../context/AuthProvider';
import { useAuth as useLegacyAuth } from '../../context/AuthContext';

/**
 * Dedicated logout page component
 * Handles the logout process and redirects the user
 */
const LogoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get auth functions from both auth systems
  const { signOut } = useAuthContext();
  const legacyAuth = useLegacyAuth();

  // Get the callback URL from the query parameters, defaulting to the home page
  const searchParams = new URLSearchParams(location.search);
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Flag to prevent infinite loops
  const [logoutPerformed, setLogoutPerformed] = useState(false);

  useEffect(() => {
    // Check if we've already performed logout to prevent infinite loops
    if (logoutPerformed) {
      return;
    }

    async function performLogout() {
      try {
        setIsLoading(true);
        console.log('[LogoutPage] Starting logout process');
        setLogoutPerformed(true); // Mark logout as performed to prevent loops

        // Try Auth.js signOut
        if (signOut) {
          try {
            console.log('[LogoutPage] Calling Auth.js signOut');
            await signOut();
          } catch (error) {
            console.error('[LogoutPage] Error calling Auth.js signOut:', error);
          }
        }

        // Try legacy logout
        if (legacyAuth && legacyAuth.logout) {
          try {
            console.log('[LogoutPage] Calling legacy logout');
            legacyAuth.logout();
          } catch (error) {
            console.error('[LogoutPage] Error calling legacy logout:', error);
          }
        }

        // Since this is a GitHub Pages site with no server-side code,
        // we'll focus on client-side cleanup

        // Clear all storage
        try {
          console.log('[LogoutPage] Clearing storage');
          sessionStorage.clear();
          localStorage.clear();
        } catch (error) {
          console.error('[LogoutPage] Error clearing storage:', error);
        }

        // Clear all cookies
        try {
          console.log('[LogoutPage] Clearing cookies');
          document.cookie.split(";").forEach(function(c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });

          // Clear Auth.js specific cookies with different paths
          const cookiePaths = ['/', '/api', '/api/auth', '/auth'];
          cookiePaths.forEach(path => {
            document.cookie = `next-auth.session-token=;expires=${new Date().toUTCString()};path=${path}`;
            document.cookie = `next-auth.callback-url=;expires=${new Date().toUTCString()};path=${path}`;
            document.cookie = `next-auth.csrf-token=;expires=${new Date().toUTCString()};path=${path}`;
            
            // Only set secure cookies on HTTPS
            if (window.location.protocol === 'https:') {
              document.cookie = `__Secure-next-auth.session-token=;expires=${new Date().toUTCString()};path=${path};secure`;
              // __Host- prefix requires path=/ and no domain attribute
              if (path === '/') {
                document.cookie = `__Host-next-auth.csrf-token=;expires=${new Date().toUTCString()};path=/;secure`;
              }
            } else {
              // For development/HTTP: use standard cookies instead
              console.log('[LogoutPage] Skipping secure cookie prefixes in non-HTTPS environment');
            }
          });
        } catch (error) {
          console.error('[LogoutPage] Error clearing cookies:', error);
        }

        // Redirect after a short delay
        console.log('[LogoutPage] Logout successful, redirecting to:', callbackUrl);

        // Force a direct page reload and redirect to root URL to completely reset the app state
        // This will break the infinite loop by completely reloading the application
        if (window.location.pathname.includes('/logout')) {
          console.log('[LogoutPage] Forcing navigation to root with hard refresh');
          window.location.replace('/'); // Use replace instead of href to prevent adding to history
        } else {
          // If we're not on the logout page, use React Router
          navigate('/');
        }

        // setTimeout(() => {
        //   // Use absolute URL to avoid issues with relative paths
        //   const baseUrl = window.location.origin; // e.g., "http://localhost:3000" or your GitHub Pages URL
        //   const absoluteUrl = callbackUrl.startsWith('http')
        //     ? callbackUrl
        //     : `${baseUrl}${callbackUrl.startsWith('/') ? callbackUrl : `/${callbackUrl}`}`;

        //   console.log('[LogoutPage] Redirecting to absolute URL:', absoluteUrl);
        //   window.location.href = absoluteUrl;
        // }, 1000);
      } catch (err) {
        console.error('[LogoutPage] Error during logout:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    }

    performLogout();
  }, [callbackUrl, signOut, legacyAuth, logoutPerformed]);

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Logout Error
          </Typography>

          <Box sx={{
            p: 2,
            bgcolor: 'error.light',
            borderRadius: 1,
            mb: 2,
            color: 'error.dark'
          }}>
            <Typography variant="h6" component="h2" sx={{ mt: 0 }}>
              Error
            </Typography>
            <Typography>{error}</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
            >
              Return Home
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Logging Out...
        </Typography>

        <CircularProgress sx={{ my: 4 }} />

        <Typography paragraph>
          Please wait while we log you out.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(callbackUrl)}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogoutPage;
