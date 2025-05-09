const config = {
  github: {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    tokenProxyUrl: process.env.REACT_APP_TOKEN_PROXY_URL,
  }
};
console.log('ENV:', {
  clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  tokenProxyUrl: process.env.REACT_APP_TOKEN_PROXY_URL,
});

export default config;