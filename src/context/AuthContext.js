// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing auth on component mount
    const checkAuth = () => {
      try {
        const storedToken = sessionStorage.getItem('github_token');
        const storedUser = sessionStorage.getItem('github_user');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Logout function
  const logout = () => {
    sessionStorage.removeItem('github_token');
    sessionStorage.removeItem('github_user');
    setUser(null);
    setToken(null);
  };

  // Function to get user's repos
  const fetchUserRepos = async () => {
    if (!token) return null;
    
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch repositories');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching repos:', error);
      return null;
    }
  };

  const value = {
    user,
    token,
    loading,
    logout,
    fetchUserRepos,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};