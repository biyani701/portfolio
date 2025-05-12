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

    // Get the client URL from config or use the current origin
    const clientUrl = config.auth.callbackUrl || window.location.origin;

    // Use the client URL as the callback URL
    const callbackUrl = encodeURIComponent(clientUrl);

    // Construct the sign-in URL with the callback URL - use the direct auth server URL
    const signInUrl = `${authServerUrl}/api/auth/signin/${provider}?callbackUrl=${callbackUrl}`;

    console.log('[Auth Debug] Signing in with provider:', provider);
    console.log('[Auth Debug] Current path:', currentPath);
    console.log('[Auth Debug] Auth server URL:', authServerUrl);
    console.log('[Auth Debug] Client URL:', clientUrl);
    console.log('[Auth Debug] Callback URL:', callbackUrl);
    console.log('[Auth Debug] Sign-in URL:', signInUrl);

    // Directly redirect to the auth server URL
    window.location.href = signInUrl;
  }, []);

  // Function to sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      console.log('[Auth Debug] Starting sign out process');

      // Get the auth server URL from config
      const authServerUrl = config.auth.serverUrl;

      // Get the client URL from config or use the current origin
      const clientUrl = config.auth.callbackUrl || window.location.origin;

      // Use the direct auth server URL for signout
      const callbackUrl = encodeURIComponent(clientUrl);
      const signoutUrl = `${authServerUrl}/api/auth/signout?callbackUrl=${callbackUrl}`;

      console.log('[Auth Debug] Auth server URL:', authServerUrl);
      console.log('[Auth Debug] Client URL:', clientUrl);
      console.log('[Auth Debug] Callback URL:', callbackUrl);
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
