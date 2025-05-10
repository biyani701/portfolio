import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import config from "./config";

// import { ThemeProvider } from '@mui/material/styles';
import ThemeProvider from "./ThemeProvider";

import CssBaseline from "@mui/material/CssBaseline";
import AOS from "aos";
import "aos/dist/aos.css";

import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";

import NavigationBar from "./components/ImprovedNavbar";
import Hero from "./components/Hero";
import ProfileSummary from "./components/ProfileSummary";
// import EnhancedSkillsWithTabs from './components/EnhancedSkillsWithTabs';
import Skills from "./components/Skills";
import ExperienceTimeline from "./components/Experience";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Recognition from "./components/Recognition";
import CareerTimeline from "./components/CareerTimeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import Works from "./components/Works";
import Blogs from "./components/Blogs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import BlogEditor from "./components/BlogEditor";
import GitHubCallback from "./components/auth/GitHubCallback";
import GitHubAuth from "./components/auth/GitHubAuth";
import AuthDebug from "./components/auth/AuthDebug";
import ProfilePage from "./components/ProfilePage";

import { AuthProvider, useAuth } from "./context/AuthContext";

// Import just the minimal non-themeable styles
import "./App.minimal.css";
import { palettes } from "./theme";

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        // Store the intended destination to redirect back after login
        sessionStorage.setItem('auth_redirect', location.pathname);

        // Redirect to GitHub login if not authenticated
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${config.github.redirectUri}&scope=user,repo`;
        console.log(githubAuthUrl);

        // Redirect to GitHub login
        window.location.href = githubAuthUrl;
      }
    }, [loading, isAuthenticated, location.pathname]);

    if (loading) {
      return <div>Loading authentication...</div>;
    }

    return isAuthenticated ? children : null;
  };


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
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 76, // Adjusted to appear above footer
          right: 16,
          zIndex: 1600, // Higher than footer's z-index (1500)
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function App(props) {
  const location = useLocation();

  const [mode, setMode] = useState("light"); // Default to 'light'
  const [paletteIndex, setPaletteIndex] = useState(0); // Default to 0

  useEffect(() => {
    // Check if we have consent to use cookies
    const checkConsent = () => {
      try {
        const manager = window.klaro?.getManager?.();
        const consents = manager?.consents;
        const cookieConsent = consents?.essentialCookies === true;

        // If we have consent or no Klaro (development), load from cookies
        if (cookieConsent || !window.klaro) {
          const savedMode = document.cookie.split('; ').find(row => row.startsWith('themeMode='));
          if (savedMode) {
            setMode(savedMode.split('=')[1]);
          }

          const savedIndex = document.cookie.split('; ').find(row => row.startsWith('themePaletteIndex='));
          if (savedIndex) {
            setPaletteIndex(parseInt(savedIndex.split('=')[1], 10));
          }
        } else {
          // Fallback to localStorage if no cookie consent
          const savedMode = localStorage.getItem("themeMode");
          if (savedMode) {
            setMode(savedMode);
          }

          const savedIndex = localStorage.getItem("themePaletteIndex");
          if (savedIndex) {
            setPaletteIndex(parseInt(savedIndex, 10));
          }
        }
      } catch (error) {
        console.warn('Error checking consent or loading theme preferences:', error);
        // Fallback to localStorage
        const savedMode = localStorage.getItem("themeMode");
        if (savedMode) {
          setMode(savedMode);
        }

        const savedIndex = localStorage.getItem("themePaletteIndex");
        if (savedIndex) {
          setPaletteIndex(parseInt(savedIndex, 10));
        }
      }
    };

    // Initial check
    checkConsent();

    // Listen for Klaro consent changes
    document.addEventListener('klaro-consent-changed', checkConsent);

    return () => {
      document.removeEventListener('klaro-consent-changed', checkConsent);
    };
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
    if (location.pathname === "/" && location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
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
      easing: "ease-in-out",
      delay: 100,
    });

    // Refresh AOS when the theme changes
    AOS.refresh();
  }, [mode]);

  // Save theme preferences to cookies or localStorage
  useEffect(() => {
    try {
      const manager = window.klaro?.getManager?.();
      const consents = manager?.consents;
      const cookieConsent = consents?.essentialCookies === true;

      // If we have consent or no Klaro (development), save to cookies
      if (cookieConsent || !window.klaro) {
        // Set cookies with 365 days expiry
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 365);
        document.cookie = `themeMode=${mode}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
        document.cookie = `themePaletteIndex=${paletteIndex}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
      }

      // Always save to localStorage as fallback
      localStorage.setItem("themeMode", mode);
      localStorage.setItem("themePaletteIndex", paletteIndex);
    } catch (error) {
      console.warn('Error saving theme preferences:', error);
      // Fallback to localStorage
      localStorage.setItem("themeMode", mode);
      localStorage.setItem("themePaletteIndex", paletteIndex);
    }

    // Apply data-theme attribute for any components that might need it
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode, paletteIndex]);

  // Create MUI theme based on mode and palette index
  // const theme = useMemo(() => getTheme(mode, paletteIndex), [mode, paletteIndex]);

  const toggleThemeMode = (isDark) => {
    setMode(isDark ? "dark" : "light");
  };

  const changeThemePalette = (index) => {
    if (index >= 0 && index < palettes[mode].length) {
      setPaletteIndex(index);
    }
  };

  // Protected route component

  return (
    <ThemeProvider mode={mode} paletteIndex={paletteIndex}>
      <CssBaseline />
      <div id="back-to-top-anchor" />
      <AuthProvider>
        <NavigationBar
          isDarkMode={mode === "dark"}
          toggleDarkMode={toggleThemeMode}
          currentPaletteIndex={paletteIndex}
          changePalette={changeThemePalette}
          availablePalettes={palettes[mode]}
        />
        <Box
          component="div"
          className="App"
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            minHeight: "100vh",
            position: "relative",
            paddingBottom: "60px",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
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
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={
              <ProtectedRoute>
                <AboutMe />
              </ProtectedRoute>

              } />
              <Route path="/profile" element={
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    } />
            <Route path="/works" element={<Works />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<GitHubAuth />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<PrivacyPolicy initialTab={1} />} />
            {/* Blog Routes */}
            {/* <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:dateFolder/:blogId" element={<BlogPost />} /> */}
            <Route path="/blog/new" element={<BlogEditor />} />
            <Route path="/callback" element={<GitHubCallback />} />
            <Route path="/auth-debug" element={<AuthDebug />} />
            {/* <Route path="/blog/edit/:blogId" element={<BlogEditor />} /> */}

            {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
          </Routes>
          <Footer />
          <ScrollTop {...props}>
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}
ScrollTop.propTypes = {
  children: PropTypes.node,
  window: PropTypes.func,
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
