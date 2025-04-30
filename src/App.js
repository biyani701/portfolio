import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavigationBar from './components/Navbar';
import Hero from './components/Hero';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import CareerTimeline from './components/CareerTimeline';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#1a237e',
          },
          secondary: {
            main: '#ff4081',
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <NavigationBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="summary">
            <Summary />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="experience">
            <Experience />
          </section>
          <section id="certifications">
            <Certifications />
          </section>
          <section id="education">
            <Education />
          </section>
          <section id="recognition">
            <Recognition />
          </section>
          <section id="contact">
            <Contact />
          </section>
          <CareerTimeline />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
