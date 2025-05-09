import React from 'react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubLoginButton = () => {
  const handleLogin = () => {
    // Your GitHub OAuth App client ID
    const clientId = 'YOUR_CLIENT_ID';
    
    // This must match what's configured in your GitHub OAuth App settings
    const redirectUri = 'https://vishal.biyani.xyz/callback';
    
    // For production, add state parameter for CSRF protection
    // const state = generateRandomString();
    // sessionStorage.setItem('oauth_state', state);
    
    // Redirect to GitHub's authorization page
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<GitHubIcon />}
      onClick={handleLogin}
      sx={{
        bgcolor: '#24292e',
        '&:hover': {
          bgcolor: '#2c3238'
        }
      }}
    >
      Login with GitHub
    </Button>
  );
};

export default GitHubLoginButton;