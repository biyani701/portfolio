// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';

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

      // Try different session endpoint formats
      const sessionEndpoints = [
        '/api/auth/session',
        'http://localhost:4000/api/auth/session',
        '/auth/session',
        'http://localhost:4000/auth/session'
      ];

      console.log('[Auth Debug] Trying multiple session endpoints...');

      // Try each endpoint until one works
      let response = null;
      // let responseText = '';
      let endpointUsed = '';

      for (const endpoint of sessionEndpoints) {
        try {
          console.log('[Auth Debug] Trying session endpoint:', endpoint);

          const tempResponse = await fetch(endpoint, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
            },
          });

          console.log('[Auth Debug] Response from', endpoint, ':', tempResponse.status);

          // If we got a successful response, use this endpoint
          if (tempResponse.status === 200) {
            response = tempResponse;
            endpointUsed = endpoint;
            break;
          }

          // If this is the first endpoint, store the response for debugging
          if (!response) {
            response = tempResponse;
            endpointUsed = endpoint;
          }
        } catch (endpointError) {
          console.error('[Auth Debug] Error trying endpoint', endpoint, ':', endpointError);
        }
      }

      if (!response) {
        throw new Error('Failed to connect to any session endpoint');
      }

      console.log('[Auth Debug] Using session endpoint:', endpointUsed);
      console.log('[Auth Debug] Session response status:', response.status);

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

    // Construct the sign-in URL with different formats
    const callbackUrl = encodeURIComponent(window.location.origin);

    // Try different sign-in URL formats
    const signInUrls = {
      standard: `/api/auth/signin/${provider}?callbackUrl=${callbackUrl}`,
      direct: `http://localhost:4000/api/auth/signin/${provider}?callbackUrl=${callbackUrl}`,
      noApi: `/auth/signin/${provider}?callbackUrl=${callbackUrl}`,
      directNoApi: `http://localhost:4000/auth/signin/${provider}?callbackUrl=${callbackUrl}`
    };

    console.log('[Auth Debug] Signing in with provider:', provider);
    console.log('[Auth Debug] Callback URL:', callbackUrl);
    console.log('[Auth Debug] Available sign-in URLs:', signInUrls);

    // Use the standard URL format by default
    const signInUrl = signInUrls.direct; // Try direct URL first

    // Try to check if the Auth.js server is available
    const providerEndpoints = [
      '/api/auth/providers',
      'http://localhost:4000/api/auth/providers',
      '/auth/providers',
      'http://localhost:4000/auth/providers'
    ];

    // Try each endpoint
    let foundWorkingEndpoint = false;

    Promise.all(providerEndpoints.map(endpoint =>
      fetch(endpoint)
        .then(response => {
          console.log(`[Auth Debug] Providers endpoint ${endpoint} status:`, response.status);
          if (response.status === 200) {
            foundWorkingEndpoint = true;
            return response.text().then(text => ({ endpoint, text }));
          }
          return { endpoint, text: `Error: ${response.status}` };
        })
        .catch(error => {
          console.error(`[Auth Debug] Error checking providers at ${endpoint}:`, error);
          return { endpoint, text: `Error: ${error.message}` };
        })
    )).then(results => {
      // Log all results
      results.forEach(({ endpoint, text }) => {
        console.log(`[Auth Debug] Providers response from ${endpoint}:`, text);
        try {
          const data = JSON.parse(text);
          console.log(`[Auth Debug] Available providers from ${endpoint}:`, data);
        } catch (e) {
          console.error(`[Auth Debug] Error parsing providers response from ${endpoint}:`, e);
        }
      });

      // Redirect to the OAuth server
      console.log('[Auth Debug] Redirecting to sign-in URL:', signInUrl);
      window.location.href = signInUrl;
    });
  }, []);

  // Function to sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true);

      // Try different signout endpoint formats
      const signoutEndpoints = [
        '/api/auth/signout',
        'http://localhost:4000/api/auth/signout',
        '/auth/signout',
        'http://localhost:4000/auth/signout'
      ];

      console.log('[Auth Debug] Trying multiple signout endpoints...');

      let success = false;
      let responseError = null;

      // Try each endpoint until one works
      for (const endpoint of signoutEndpoints) {
        try {
          console.log('[Auth Debug] Trying signout endpoint:', endpoint);

          const response = await fetch(endpoint, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log('[Auth Debug] Signout response from', endpoint, ':', response.status);

          if (response.ok) {
            console.log('[Auth Debug] Successful signout from', endpoint);
            success = true;
            break;
          } else {
            responseError = `${response.status} ${response.statusText}`;
          }
        } catch (endpointError) {
          console.error('[Auth Debug] Error trying signout endpoint', endpoint, ':', endpointError);
        }
      }

      if (success) {
        // Clear the session
        setSession(null);

        // Reload the page to ensure all state is cleared
        window.location.reload();
      } else {
        setError(`Error signing out: ${responseError || 'Failed to connect to any signout endpoint'}`);
      }
    } catch (error) {
      console.error('[Auth Debug] Error signing out:', error);
      setError(`Error signing out: ${error.message}`);
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
