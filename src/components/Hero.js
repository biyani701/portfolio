import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';
import WorkIcon from '@mui/icons-material/Work'; 


function useAnimateOnScroll() {
  const ref = useRef();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    let hasScrolled = false;
    const handleScroll = () => { hasScrolled = true; };
    window.addEventListener('scroll', handleScroll, { once: true });

    const node = ref.current; // <--- Copy ref.current to a local variable

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasScrolled) {
          setShouldAnimate(true);
        }
      },
      { threshold: 0.2 }
    );
    if (node) observer.observe(node);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (node) observer.unobserve(node); // <--- Use the local variable here
    };
  }, []);

  return [ref, shouldAnimate];
}

// Styled components
const HeroContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  backgroundImage: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)'
    : 'linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #42a5f5 100%)',
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
    background: 'url("/images/pattern-overlay.png")', // Optional texture overlay
    opacity: 0.1,
    zIndex: -1,
  },
}));

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(8),
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
      transform: 'translateY(-10px)',
    },
    '60%': {
      transform: 'translateY(-5px)',
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

// New styled component for catchline items
const CatchlineItem = styled(Box)(({ theme }) => ({
  
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(5px)',
  color: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  maxWidth: '250px',
  width: 350,
  height: 120,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  border: '4px solid rgba(255, 255, 255, 0.7)',
  position: 'absolute',
  zIndex: 10,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 140,
    height: 100,
    padding: theme.spacing(1),
  },
}));

const CatchlineText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.95rem',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  lineHeight: 1.4,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));


const Hero = (props) => {
  const [ref, shouldAnimate] = useAnimateOnScroll();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('.MuiAppBar-root')?.offsetHeight || 0;
      const sectionTop = section.offsetTop;
      
      window.scrollTo({
        top: sectionTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  // Catchline data
  const catchlines = [
    "Experienced Technical Program Manager, Delivery Manager, Agilist",
    "Domain knowledge in Payments & Cards, Market Reference Data",
    "Developed visual dashboard using Python, Plotly Dash for data analysis",
    "Vibe coding using React.js"
  ];

  return (
    <HeroContainer>
      {/* Corner catchlines */}
      {/* <CatchlineItem 
        data-aos="fade-down-right" 
        data-aos-delay="200"
        sx={{ 
          top: 40, 
          left: 40, 
          [theme => theme.breakpoints.down('sm')]: {
            top: 20,
            left: 20,
            maxWidth: '160px',
          }
        }}
      >
        <WorkIcon sx={{ fontSize: 32, color: '#42a5f5' }} />
        <CatchlineText>{catchlines[0]}</CatchlineText>
      </CatchlineItem>
      
      <CatchlineItem 
        data-aos="fade-down-left" 
        data-aos-delay="300"
        sx={{ 
          top: 40, 
          right: 40,
          [theme => theme.breakpoints.down('sm')]: {
            top: 20,
            right: 20,
            maxWidth: '160px',
          }
        }}
      >
        <CatchlineText>{catchlines[1]}</CatchlineText>
      </CatchlineItem>
      
      <CatchlineItem 
        // data-aos="fade-up-right" 
        // data-aos-delay="400"
        sx={{ 
          bottom: 150, 
          left: 40,
          [theme => theme.breakpoints.down('sm')]: {
            bottom: 20,
            left: 20,
            maxWidth: '160px',
          }
        }}
      >
        <CatchlineText>{catchlines[2]}</CatchlineText>
      </CatchlineItem>
      
      <CatchlineItem 
      ref={ref}
      data-aos={shouldAnimate ? "fade-down-right" : undefined}
        // data-aos="fade-up-left" 
        // data-aos-delay="200"
        sx={{ 
          bottom: 150, 
          right: 40,
          [theme => theme.breakpoints.down('sm')]: {
            bottom: 20,
            right: 20,
            maxWidth: '160px',            
          }
        }}
      >
        <CatchlineText>{catchlines[3]}</CatchlineText>
      </CatchlineItem> */}
      
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
            data-aos-delay="600"
          >
            Get in Touch
          </ContactButton>
        </Box>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          bottom: theme => theme.spacing(16),
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': {
            '& .scroll-text': {
              opacity: 0.8,
            },
            '& .scroll-button': {
              transform: 'translateY(5px)',
            }
          }
        }}
        onClick={() => scrollToSection('summary')}
      >
        <Typography
          variant="body2"
          className="scroll-text"
          sx={{ 
            color: '#ffffff', 
            mb: 1,
            opacity: 0.6,
            transition: 'opacity 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '0.75rem'
          }}
        >
          Scroll Down
        </Typography>
        <ScrollDownButton
          aria-label="Scroll Down"
          className="scroll-button"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 30 }} />
        </ScrollDownButton>        
      </Box>
    </HeroContainer>
  );
};

export default Hero;