import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { ThemeProvider } from '@mui/material/styles';
import ThemeProvider from './ThemeProvider';


import CssBaseline from '@mui/material/CssBaseline';
import AOS from 'aos';
import 'aos/dist/aos.css';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';

import NavigationBar from './components/ImprovedNavbar';
import Hero from './components/Hero';
import ProfileSummary from './components/ProfileSummary';
// import EnhancedSkillsWithTabs from './components/EnhancedSkillsWithTabs';
import Skills from './components/Skills';
import ExperienceTimeline from './components/Experience';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Recognition from './components/Recognition';
import CareerTimeline from './components/CareerTimeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutMe from './components/AboutMe';
import Works from './components/Works';
import Blogs from './components/Blogs';
import PrivacyPolicy from './components/PrivacyPolicy';
import BlogEditor from './components/BlogEditor';
import GitHubCallback from './components/callback';

// Import just the minimal non-themeable styles
import './App.minimal.css';
import { palettes } from './theme';

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    // Prevent default behavior
    event.preventDefault();

    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 76, // Adjusted to appear above footer
          right: 16,
          zIndex: 1600 // Higher than footer's z-index (1500)
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function App(props) {
  const location = useLocation();

  const [mode, setMode] = useState('light'); // Default to 'light'
  const [paletteIndex, setPaletteIndex] = useState(0); // Default to 0
  useEffect(() => {
    // Now we're safely in the browser environment
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    }

    const savedIndex = localStorage.getItem('themePaletteIndex');
    if (savedIndex) {
      setPaletteIndex(parseInt(savedIndex, 10));
    }
  }, []);

  // Initialize mode state based on user preference or default to 'light'
  // const [mode, setMode] = useState(() => {    

  //   if (typeof window !== 'undefined' && localStorage.getItem('themeMode')) {
  //     return localStorage.getItem('themeMode');
  //   }
  //   else {

  //   return 'light';

  //   }

  // });

  // Initialize palette index state or default to 0
  // const [paletteIndex, setPaletteIndex] = useState(() => {    
  //   if (typeof window !== 'undefined' && localStorage.getItem('themePaletteIndex')) {
  //     return parseInt(localStorage.getItem('themePaletteIndex'), 10);
  //   }
  //   return 0;
  // });



  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Initialize AOS with better settings
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
      easing: 'ease-in-out',
      delay: 100,
    });

    // Refresh AOS when the theme changes
    AOS.refresh();
  }, [mode]);

  // Save theme preferences to localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('themePaletteIndex', paletteIndex);

    // Apply data-theme attribute for any components that might need it
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode, paletteIndex]);

  // Create MUI theme based on mode and palette index
  // const theme = useMemo(() => getTheme(mode, paletteIndex), [mode, paletteIndex]);

  const toggleThemeMode = (isDark) => {
    setMode(isDark ? 'dark' : 'light');
  };

  const changeThemePalette = (index) => {
    if (index >= 0 && index < palettes[mode].length) {
      setPaletteIndex(index);
    }
  };

  return (
    <ThemeProvider mode={mode} paletteIndex={paletteIndex}>
      <CssBaseline />
      <div id="back-to-top-anchor" />
      <NavigationBar
        isDarkMode={mode === 'dark'}
        toggleDarkMode={toggleThemeMode}
        currentPaletteIndex={paletteIndex}
        changePalette={changeThemePalette}
        availablePalettes={palettes[mode]}
      />
      <Box
        component="div"
        className="App"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          minHeight: '100vh',
          position: 'relative',
          paddingBottom: '60px',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProfileSummary />              
              <Skills />
              <ExperienceTimeline />
              <Certifications />
              <Education />
              <Recognition />
              <CareerTimeline />
            </>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/works" element={<Works />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* Blog Routes */}
          {/* <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:dateFolder/:blogId" element={<BlogPost />} /> */}
          <Route path="/blog/new" element={<BlogEditor />} />
          <Route path="/callback" element={<GitHubCallback />} />
          {/* <Route path="/blog/edit/:blogId" element={<BlogEditor />} /> */}

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
        <ScrollTop {...props}>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
    </ThemeProvider>
  );
}
ScrollTop.propTypes = {
  children: PropTypes.node,
  window: PropTypes.func,
};

export default App;