// theme.js
import { createTheme } from '@mui/material/styles';

// Define multiple palettes for light and dark modes
export const palettes = {
  light: [
    {
      name: 'Salt & Pepper',
      primary: '#4A4A4A',
      secondary: '#A1A1A1',
      background: { default: '#F9FAFB', paper: '#FFFFFF', header: '#1a237e', footer: '#1a237e' },
      text: { primary: '#1A1A1A', secondary: '#6B6B6B' },
      appLink: '#61dafb',
    },
    {
      name: 'Lush Forest',
      primary: '#2E6F40',
      secondary: '#68BA7F',
      background: { default: '#CFFEDC', paper: '#FFFFFF', header: '#253D2C', footer: '#253D2C' },
      text: { primary: '#253D2C', secondary: '#2E6F40' },
      appLink: '#2E6F40',
    },
    {
      name: 'Ocean Breeze',
      primary: '#1976D2',
      secondary: '#64B5F6',
      background: { default: '#E3F2FD', paper: '#FFFFFF', header: '#1565C0', footer: '#1565C0' },
      text: { primary: '#0D47A1', secondary: '#1976D2' },
      appLink: '#1976D2',
    }
  ],
  dark: [
    {
      name: 'Blue Eclipse',
      primary: '#90CAF9',
      secondary: '#3949AB',
      background: { default: '#121212', paper: '#1E1E1E', header: '#121212', footer: '#121212' },
      text: { primary: '#E0E0E0', secondary: '#B0B0B0' },
      appLink: '#90CAF9',
    },
    {
      name: 'Gothic Noir',
      primary: '#000000',
      secondary: '#988686',
      background: { default: '#5C4E4E', paper: '#1E1E1E', header: '#000000', footer: '#000000' },
      text: { primary: '#D1D0D0', secondary: '#988686' },
      appLink: '#988686',
    },
    {
      name: 'Deep Ocean',
      primary: '#64B5F6',
      secondary: '#1976D2',
      background: { default: '#0A1929', paper: '#132F4C', header: '#0A1929', footer: '#0A1929' },
      text: { primary: '#E3F2FD', secondary: '#90CAF9' },
      appLink: '#64B5F6',
    }
  ],
};

/**
 * Creates a theme based on the specified mode and palette index
 * @param {('light'|'dark')} mode - The theme mode
 * @param {number} paletteIndex - Index of the palette to use (defaults to 0)
 * @returns {Theme} The created theme object
 */
export const getTheme = (mode, paletteIndex = 0) => {
  // Get the selected palette or fallback to the first one if index is invalid
  const selectedPalettes = palettes[mode] || palettes.light;
  const selectedPalette = selectedPalettes[paletteIndex] || selectedPalettes[0];
  
  return createTheme({
    palette: {
      mode,
      primary: { main: selectedPalette.primary },
      secondary: { main: selectedPalette.secondary },
      background: { 
        default: selectedPalette.background.default,
        paper: selectedPalette.background.paper,
        header: selectedPalette.background.header,
        footer: selectedPalette.background.footer
      },
      text: { 
        primary: selectedPalette.text.primary,
        secondary: selectedPalette.text.secondary
      },
      appLink: selectedPalette.appLink,
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      action: {
        hover: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
        selected: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.16)'
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Rajdhani", "Roboto", "Helvetica", sans-serif',
        fontWeight: 700,
        fontSize: '2.8rem',
        '@media (max-width:600px)': {
          fontSize: '2.3rem',
        },
      },
      h2: {
        fontFamily: '"Rajdhani", "Roboto", "Helvetica", sans-serif',
        fontWeight: 600,
        fontSize: '2.4rem',
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h3: {
        fontFamily: '"Rajdhani", "Roboto", "Helvetica", sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
        '@media (max-width:600px)': {
          fontSize: '1.8rem',
        },
      },
      h4: {
        fontFamily: '"Rajdhani", "Roboto", "Helvetica", sans-serif',
        fontWeight: 600,
      },
      h5: {
        fontFamily: '"Rajdhani", "Roboto", "Helvetica", sans-serif',
        fontWeight: 600,
      },
      h6: {
        fontFamily: '"Rajdhani", "Roboto", "Helvetica", sans-serif',
        fontWeight: 600,
      },
      body1: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      body2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      button: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        textTransform: 'none',
        fontWeight: 500,
      },
      caption: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      subtitle1: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      subtitle2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(8px)',
            background: theme.palette.background.header,
            color: theme.palette.common.white,
            transition: 'all 0.3s ease',
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: 'none',
            transition: 'all 0.3s ease',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 40px rgba(0,0,0,0.5)'
              : '0 4px 20px rgba(0,0,0,0.1)',
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            color: theme.palette.text.primary,
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 15px rgba(0,0,0,0.5)'
                : '0 5px 15px rgba(0,0,0,0.1)',
            },
          }),
          contained: ({ theme }) => ({
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 10px rgba(0,0,0,0.4)'
              : '0 2px 5px rgba(0,0,0,0.1)',
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 12,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 12px 30px rgba(0,0,0,0.6)'
                : '0 10px 25px rgba(0,0,0,0.15)',
            }
          }),
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.primary,
            minWidth: 40,
          }),
        }
      },
      MuiListItemText: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.primary,
          }),
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
          }),
        }
      },
      MuiSelect: {
        styleOverrides: {
          select: ({ theme }) => ({
            color: theme.palette.common.white,
            '&:focus': {
              backgroundColor: 'transparent',
            },
          }),
          icon: ({ theme }) => ({
            color: theme.palette.common.white,
          }),
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.common.white,
            '&.Mui-focused': {
              color: theme.palette.common.white,
            },
          }),
        },
      },
    },
  });
};