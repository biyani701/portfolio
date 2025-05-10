const config = {
  github: {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID?.trim(),
    redirectUri: process.env.REACT_APP_REDIRECT_URI?.trim(),
    tokenProxyUrl: process.env.REACT_APP_TOKEN_PROXY_URL?.trim(),
  }
};
console.log('ENV:', {
  clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  tokenProxyUrl: process.env.REACT_APP_TOKEN_PROXY_URL,
});

// For debugging - show the trimmed values
console.log('TRIMMED ENV:', {
  clientId: config.github.clientId,
  redirectUri: config.github.redirectUri,
  tokenProxyUrl: config.github.tokenProxyUrl,
});


export default config;