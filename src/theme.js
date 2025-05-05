// theme.js
import { createTheme } from '@mui/material/styles';

// Salt & Pepper (light) + Blue Eclipse (dark)
export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Salt & Pepper
            primary: { main: '#4A4A4A' },
            secondary: { main: '#A1A1A1' },
            background: { default: '#F9FAFB', paper: '#FFFFFF' },
            text: { primary: '#1A1A1A' },
          }
        : {
            // Blue Eclipse
            primary: { main: '#90CAF9' },
            secondary: { main: '#3949AB' },
            background: { default: '#121212', paper: '#1E1E1E' },
            text: { primary: '#E0E0E0' },
          }),
    },
  });
