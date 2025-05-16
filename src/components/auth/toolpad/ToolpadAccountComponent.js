import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import { useAuthContext } from '../../../context/AuthProvider';
import { Logout } from '@mui/icons-material';
import config from '../../../config';
import PropTypes from "prop-types";
/**
 * ToolpadAccountComponent
 * Uses the @toolpad/core Account component to provide a sign-in/sign-out experience
 * that connects to the my-auth-backend server
 */
const ToolpadAccountComponent = ({ variant = 'default' }) => {
  const { user, isAuthenticated, signOut } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define the branding
  const branding = {
    logo: (
      <img
        src="/logo192.png"
        alt="Portfolio Logo"
        style={{ height: 40 }}
      />
    ),
    title: 'Portfolio',
  };

  // Handle sign-in
  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Navigate to the sign-in page
      navigate('/signin-toolpad');
      
      return { success: true };
    } catch (error) {
      console.error('[Auth Error]', error);
      setError(error.message || 'An error occurred during sign-in');
      return { error: error.message || 'An error occurred during sign-in' };
    } finally {
      setLoading(false);
    }
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('[Auth] Signing out');
      
      // Call the signOut function from the auth context
      await signOut();
      
      return { success: true };
    } catch (error) {
      console.error('[Auth Error]', error);
      setError(error.message || 'An error occurred during sign-out');
      return { error: error.message || 'An error occurred during sign-out' };
    } finally {
      setLoading(false);
    }
  };

  // Prepare user data for the Account component
  const userData = isAuthenticated && user ? {
    id: user.id || user.sub,
    name: user.name || user.login || 'User',
    email: user.email || '',
    avatarUrl: user.image || user.avatar_url || '',
  } : null;

  return (
    <AppProvider branding={branding}>
      <Account
        user={userData}
        signIn={handleSignIn}
        signOut={handleSignOut}
        loading={loading}
        variant={variant}
        slotProps={{
          signInButton: {
            color: 'success',
          },
          signOutButton: {
            color: 'success',
            startIcon: <Logout />,
          },
          preview: {
            variant: 'expanded',
            slotProps: {
              avatarIconButton: {
                sx: {
                  width: 'fit-content',
                  margin: 'auto',
                },
              },
              avatar: {
                variant: 'rounded',
              },
            },
          },
        }}
      />
    </AppProvider>
  );
};

ToolpadAccountComponent.propTypes = {
  variant: PropTypes.string,
};

export default ToolpadAccountComponent;
