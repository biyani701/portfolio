// ThemeProvider.jsx
import React, { useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme';
import { CssBaseline } from '@mui/material';

export default function ThemeProvider({ children, mode, paletteIndex  }) {
  // Get mode from localStorage or default to 'light'
  // const [mode, setMode] = useState(() => {
  //   const savedMode = localStorage.getItem('themeMode');
  //   return savedMode || 'light';
  // });
  
  // // Get palette index from localStorage or default to 0
  // const [paletteIndex, setPaletteIndex] = useState(() => {
  //   const savedIndex = localStorage.getItem('themePaletteIndex');
  //   return savedIndex ? parseInt(savedIndex, 10) : 0;
  // });
  
  // Create the theme based on current settings
  
  const theme = getTheme(mode, paletteIndex);
  
  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('themePaletteIndex', paletteIndex);
  }, [mode, paletteIndex]);

  // Provide theme context to children
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}