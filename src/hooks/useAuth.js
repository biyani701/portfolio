// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import config from '../config';

/**
 * Custom hook for authentication with Auth.js
 * Handles session checking, sign-in, and sign-out
 */
export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to check the current session
  const checkSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get the auth server URL from config
      const authServerUrl = config.auth.serverUrl;

      // Use the direct URL to the auth server
      const sessionEndpoint = `${authServerUrl}/api/auth/session`;

      console.log('[Auth Debug] Checking session at:', sessionEndpoint);

      try {
        const response = await fetch(sessionEndpoint, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });

        console.log('[Auth Debug] Session response status:', response.status);
        console.log('[Auth Debug] Session response headers:', {
          contentType: response.headers.get('content-type'),
          setCookie: response.headers.get('set-cookie')
        });

        // Get the raw text first to debug
        const responseText = await response.text();
        console.log('[Auth Debug] Session response text:', responseText);

        if (response.ok) {
          try {
            // Try to parse the response as JSON
            const sessionData = responseText ? JSON.parse(responseText) : null;
            console.log('[Auth Debug] Parsed session data:', sessionData);

            if (sessionData) {
              setSession(sessionData);
              return sessionData;
            } else {
              console.warn('[Auth Debug] Empty session data');
              setSession(null);
              return null;
            }
          } catch (parseError) {
            console.error('[Auth Debug] Error parsing session response:', parseError);
            console.error('[Auth Debug] Raw response:', responseText);
            setError(`Error parsing session response: ${parseError.message}`);
            setSession(null);
            return null;
          }
        } else {
          // If response is not OK, clear the session
          setSession(null);

          // Only set error for non-404 responses (404 just means not authenticated)
          if (response.status !== 404) {
            console.error('[Auth Debug] Error response:', response.status, response.statusText);
            console.error('[Auth Debug] Response body:', responseText);
            setError(`Error fetching session: ${response.status} ${response.statusText}`);
          } else {
            console.log('[Auth Debug] Not authenticated (404 response)');
          }

          return null;
        }
      } catch (fetchError) {
        console.error('[Auth Debug] Error fetching session:', fetchError);
        setError(`Error fetching session: ${fetchError.message}`);
        setSession(null);
        return null;
      }
    } catch (error) {
      console.error('[Auth Debug] Error checking session:', error);
      setError(`Error checking session: ${error.message}`);
      setSession(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to sign in with a provider
  const signIn = useCallback((provider) => {
    // Store the current URL to redirect back after authentication
    const currentPath = window.location.pathname;
    sessionStorage.setItem('auth_redirect', currentPath);

    // Get the auth server URL from config
    const authServerUrl = config.auth.serverUrl;

    // Construct the callback URL - this is where the auth server will redirect after authentication
    // Use the root URL as the callback to avoid issues with specific paths
    const callbackUrl = encodeURIComponent(`${window.location.origin}`);

    // Construct the sign-in URL with the callback URL
    const signInUrl = `${authServerUrl}/api/auth/signin/${provider}?callbackUrl=${callbackUrl}`;

    console.log('[Auth Debug] Signing in with provider:', provider);
    console.log('[Auth Debug] Current path:', currentPath);
    console.log('[Auth Debug] Auth server URL:', authServerUrl);
    console.log('[Auth Debug] Callback URL:', callbackUrl);
    console.log('[Auth Debug] Sign-in URL:', signInUrl);

    // Log all cookies for debugging
    console.log('[Auth Debug] Current cookies:', document.cookie);

    // First check if the auth server is available
    console.log('[Auth Debug] Checking auth server availability...');

    fetch(`${authServerUrl}/api/auth/providers`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => {
        console.log('[Auth Debug] Providers response status:', response.status);

        if (response.status === 200) {
          // Auth server is available, proceed with sign-in
          console.log('[Auth Debug] Auth server is available, proceeding with sign-in');
          window.location.href = signInUrl;
        } else {
          console.error('[Auth Debug] Auth server returned error:', response.status);
          setError(`Auth server returned error: ${response.status}. Please try again later.`);

          // Try using the proxy instead
          const proxySignInUrl = `/api/auth/signin/${provider}?callbackUrl=${callbackUrl}`;
          console.log('[Auth Debug] Trying proxy URL instead:', proxySignInUrl);

          setTimeout(() => {
            window.location.href = proxySignInUrl;
          }, 1000);
        }
      })
      .catch(error => {
        console.error('[Auth Debug] Error checking auth server:', error);
        setError(`Error connecting to auth server: ${error.message}. Please try again later.`);

        // Try using the proxy as a fallback
        const proxySignInUrl = `/api/auth/signin/${provider}?callbackUrl=${callbackUrl}`;
        console.log('[Auth Debug] Trying proxy URL as fallback:', proxySignInUrl);

        setTimeout(() => {
          window.location.href = proxySignInUrl;
        }, 1000);
      });
  }, []);

  // Function to sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      console.log('[Auth Debug] Starting sign out process');

      // Get the auth server URL from config
      const authServerUrl = config.auth.serverUrl;

      // Use the direct URL to the auth server
      const signoutEndpoint = `${authServerUrl}/api/auth/signout`;

      // Use a specific callback URL that includes the full path to ensure proper redirection
      const callbackUrl = encodeURIComponent(`${window.location.origin}/`);
      const signoutUrl = `${signoutEndpoint}?callbackUrl=${callbackUrl}`;

      console.log('[Auth Debug] Using signout URL:', signoutUrl);

      // Clear session storage (for legacy auth)
      sessionStorage.removeItem('github_token');
      sessionStorage.removeItem('github_user');
      sessionStorage.removeItem('google_token');
      sessionStorage.removeItem('google_user');

      // Clear the auth redirect if it exists
      sessionStorage.removeItem('auth_redirect');

      // Clear the local session state
      setSession(null);

      // Redirect to the signout URL
      window.location.href = signoutUrl;
    } catch (error) {
      console.error('[Auth Debug] Error signing out:', error);
      setError(`Error signing out: ${error.message}`);

      // Even if there's an error, clear the local session and reload
      setSession(null);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  }, []);

  // Check the session when the component mounts
  useEffect(() => {
    checkSession();

    // Check if we need to redirect after authentication
    const redirectPath = sessionStorage.getItem('auth_redirect');
    if (redirectPath) {
      // Clear the stored path
      sessionStorage.removeItem('auth_redirect');

      // Only redirect if we're not already on that path
      if (window.location.pathname !== redirectPath) {
        window.location.href = redirectPath;
      }
    }
  }, [checkSession]);

  return {
    session,
    user: session?.user || null,
    loading,
    error,
    isAuthenticated: !!session?.user,
    signIn,
    signOut,
    checkSession,
  };
}

export default useAuth;
