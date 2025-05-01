import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavigationBar from './components/Navbar';
import Hero from './components/Hero';
import ProfileSummary from './components/ProfileSummary';
import Skills from './components/Skills';
import ExperienceTimeline from './components/Experience';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import CareerTimeline from './components/CareerTimeline';
import Footer from './components/Footer';

import './App.css';

function App() {
  // Initialize darkMode state based on user preference or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  // Initialize AOS with better settings
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // Changed to false to allow animations to occur every time an element scrolls into view
      offset: 100,
      easing: 'ease-in-out',
      delay: 100,
    });
    
    // Refresh AOS when the theme changes
    AOS.refresh();
  }, [darkMode]); // Add darkMode as a dependency to refresh animations when theme switches

  // Apply dark/light mode classes when darkMode state changes
  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
    
    // Apply appropriate classes
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    
    // Force update of MUI components with the new theme
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    
  }, [darkMode]);

  // Create MUI theme based on dark mode state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#90caf9' : '#1a237e', // Lighter blue in dark mode
          },
          secondary: {
            main: darkMode ? '#f48fb1' : '#f50057', // Different secondary colors for each mode
          },
          background: {
            default: darkMode ? '#121212' : '#f5f5f7',
            paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
          text: {
            primary: darkMode ? '#ffffff' : '#121212',
            secondary: darkMode ? '#b0b0b0' : '#6b6b6b',
          }
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
            fontSize: '2.8rem',
            '@media (max-width:600px)': {
              fontSize: '2.3rem',
            },
          },
          h2: {
            fontWeight: 600,
            fontSize: '2.4rem',
            '@media (max-width:600px)': {
              fontSize: '2rem',
            },
          },
          h3: {
            fontWeight: 600,
            fontSize: '2rem',
            '@media (max-width:600px)': {
              fontSize: '1.8rem',
            },
          },
          h6: {
            fontWeight: 600,
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(8px)',
                background: darkMode 
                  ? 'rgba(30, 30, 30, 0.8)' 
                  : 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
              },
            },
            defaultProps: {
              enableColorOnDark: true, // This will keep AppBar color in dark mode
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                transition: 'all 0.3s ease',
                boxShadow: darkMode 
                  ? '0 8px 40px rgba(0,0,0,0.5)' 
                  : '0 4px 20px rgba(0,0,0,0.1)',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: darkMode 
                    ? '0 8px 15px rgba(0,0,0,0.5)' 
                    : '0 5px 15px rgba(0,0,0,0.1)',
                },
              },
              contained: {
                boxShadow: darkMode 
                  ? '0 4px 10px rgba(0,0,0,0.4)' 
                  : '0 2px 5px rgba(0,0,0,0.1)',
              }
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: darkMode 
                    ? '0 12px 30px rgba(0,0,0,0.6)' 
                    : '0 10px 25px rgba(0,0,0,0.15)',
                }
              }
            }
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                borderRight: 0,
                width: 280,
                background: darkMode 
                  ? 'rgba(30, 30, 30, 0.95)' 
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              },
            },
          },
          MuiListItem: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.2s ease',
                borderRadius: 6,
                margin: '4px 0',
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.2s ease',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: 500,
              }
            }
          },
          MuiDivider: {
            styleOverrides: {
              root: {
                margin: '16px 0',
                opacity: darkMode ? 0.2 : 0.15,
              }
            }
          }
        },
      }),
    [darkMode]
  );

  // Toggle function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`App ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <NavigationBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <section id="home" data-aos="fade-up">
            <Hero />
          </section>
          <section id="summary" data-aos="fade-up">
            <ProfileSummary />
          </section>
          <section id="timeline" data-aos="fade-up">
            <CareerTimeline />
          </section>
          <section id="skills" data-aos="fade-up">
            <Skills />
          </section>
          <section id="experience" data-aos="fade-up">
            <ExperienceTimeline />
          </section>
          <section id="certifications" data-aos="fade-up">
            <Certifications />
          </section>
          <section id="education" data-aos="fade-up">
            <Education />
          </section>
          <section id="recognition" data-aos="fade-up">
            <Recognition />
          </section>
        </main>
        <footer id="contact" data-aos="fade-up">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;