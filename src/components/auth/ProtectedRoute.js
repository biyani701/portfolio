import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { Box, CircularProgress, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

/**
 * ProtectedRoute component that redirects to the sign-in page if the user is not authenticated
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {boolean} props.requireAuth - Whether authentication is required (default: true)
 * @returns {React.ReactNode} - The protected route component
 */
const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body1">Checking authentication...</Typography>
      </Box>
    );
  }

  // If authentication is required and user is not authenticated, redirect to sign-in
  if (requireAuth && !isAuthenticated) {
    // Pass the current location to the sign-in page so we can redirect back after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If we have a child component with its own authentication status indicator,
  // add lock/unlock icon to it
  const childrenWithAuthStatus = React.Children.map(children, child => {
    // Only add props to valid elements
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        authStatus: {
          isAuthenticated,
          icon: isAuthenticated ? faUnlock : faLock,
        },
      });
    }
    return child;
  });

  // If authenticated or auth not required, render the children
  return childrenWithAuthStatus || children;
};

export default ProtectedRoute;
