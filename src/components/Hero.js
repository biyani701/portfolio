import React from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';

// Styled components
const HeroContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url("/images/hero-background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#ffffff',
  textAlign: 'center',
  padding: theme.spacing(2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(to bottom, rgba(18, 18, 18, 0.8), rgba(18, 18, 18, 0.6))'
      : 'linear-gradient(to bottom, rgba(25, 118, 210, 0.7), rgba(21, 101, 192, 0.5))',
    zIndex: -1,
  },
}));

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(6),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  transition: 'all 0.3s ease',
  animation: 'bounce 2s infinite',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: 'translateY(5px)',
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-20px)',
    },
    '60%': {
      transform: 'translateY(-10px)',
    },
  },
}));

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '2px',
  marginBottom: theme.spacing(1),
  fontSize: '3.5rem',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  fontSize: '1.5rem',
  opacity: 0.9,
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const ContactButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '10px 25px',
  fontSize: '1rem',
  fontWeight: 600,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 7px 15px rgba(0, 0, 0, 0.2)',
  },
}));

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <Container maxWidth="md">
        <Box data-aos="fade-up" data-aos-delay="200">
          <Name variant="h1">
            Vishal Biyani
          </Name>
          <Title variant="h2">
            Principal Project Analyst | Technical Program Manager
          </Title>
          <ContactButton
            variant="contained"
            color="primary"
            size="large"
            onClick={() => scrollToSection('contact')}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Get in Touch
          </ContactButton>
        </Box>
      </Container>
      
      <ScrollDownButton
        aria-label="Scroll Down"
        onClick={() => scrollToSection('summary')}
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 40 }} />
      </ScrollDownButton>
    </HeroContainer>
  );
};

export default Hero;