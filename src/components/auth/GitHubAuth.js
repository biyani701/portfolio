// src/components/auth/GitHubAuth.js
import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Snackbar, Alert } from '@mui/v7/material';
import { GitHub as GitHubIcon } from 'lucide-react';

// Replace with your OAuth application's client ID
const CLIENT_ID = 'Ov23lirEiA7MvCNmdhxl';
// Your redirect URI (must match what you set in GitHub)
const REDIRECT_URI = 'https://vishal.biyani.xyz/callback';

const GitHubAuth = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the GitHub OAuth login
  const handleLogin = () => {
    setLoading(true);
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user,repo`;
    window.location.href = githubAuthUrl;
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : <GitHubIcon />}
      >
        {loading ? 'Redirecting...' : 'Login with GitHub'}
      </Button>
      
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default GitHubAuth;