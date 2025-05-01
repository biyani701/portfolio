import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Grid
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

// Career data
const careerData = [
  {
    company: "Tata Infotech Ltd.",
    duration: "May 2000 – Oct 2003",
    title: "Senior Software Engineer",
    logoLight: "/images/tata-infotech-logo-light.png", // Logo for light mode
    logoDark: "/images/tata-infotech-logo-dark.png"    // Logo for dark mode
  },
  {
    company: "Cognizant Technology Solutions",
    duration: "Oct 2003 – Sep 2019",
    title: "Delivery Lead",
    logoLight: "/images/cognizant-logo-light.svg", // Logo for light mode
    logoDark: "/images/cognizant-logo-dark.png"    // Logo for dark mode
  },
  {
    company: "CoreCard India Software",
    duration: "Nov 2019 – Present",
    title: "Principal Project Analyst",
    logoLight: "/images/corecard-logo-light.png", // Logo for light mode
    logoDark: "/images/corecard-logo-dark.png"    // Logo for dark mode
  }
];

export default function CareerTimeline() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Renders horizontal timeline for desktop
  const HorizontalTimeline = () => (
    <Box sx={{ position: 'relative', py: 8, px: 2 }}>
      {/* The horizontal line */}
      <Box
        sx={{
          position: 'absolute',
          height: '2px',
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.primary.light})`,
          top: '100px',
          left: 0,
          right: 0,
          zIndex: 1
        }}
      />
      
      {/* Timeline items */}
      <Grid container justifyContent="space-around" alignItems="flex-start">
        {careerData.map((item, index) => (
          <Grid item key={index} xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Timeline node */}
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  bgcolor: theme.palette.primary.main,
                  borderRadius: '50%',
                  zIndex: 2,
                  mb: 2,
                  mt: 10
                }}
              />
              
              {/* Card */}
              <Paper
                elevation={activeIndex === index ? 6 : 3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  width: '100%',
                  maxWidth: 250,
                  textAlign: 'center',
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  // Ensure consistent background in dark mode
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(45, 45, 45, 0.9)' : 'background.paper',
                  border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}
              >
                {/* Logo */}
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(245, 245, 245, 0.8)',
                    borderRadius: '50%',
                    mx: 'auto',
                    mb: 2,
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}
                >
                  {(item.logoLight || item.logoDark) ? (
                    <img
                      src={theme.palette.mode === 'dark' ? item.logoDark : item.logoLight}
                      alt={`${item.company} logo`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <WorkIcon color="primary" sx={{ fontSize: 30 }} />
                  )}
                </Box>
                
                {/* Content */}
                <Typography variant="h6" color="primary" gutterBottom>
                  {item.company}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'text.primary' }}>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.duration}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  
  // Renders vertical timeline for mobile
  const VerticalTimeline = () => (
    <Box sx={{ position: 'relative', pl: 4, my: 4 }}>
      {/* Vertical line */}
      <Box
        sx={{
          position: 'absolute',
          width: '2px',
          background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.primary.light})`,
          top: 0,
          bottom: 0,
          left: '10px',
          zIndex: 1
        }}
      />
      
      {/* Timeline items */}
      {careerData.map((item, index) => (
        <Box
          key={index}
          sx={{
            mb: 4,
            position: 'relative'
          }}
        >
          {/* Timeline node */}
          <Box
            sx={{
              position: 'absolute',
              width: 16,
              height: 16,
              bgcolor: theme.palette.primary.main,
              borderRadius: '50%',
              left: -34,
              top: 20,
              zIndex: 2
            }}
          />
          
          {/* Card */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 1,
              ml: 1,
              // Ensure consistent background in dark mode
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(45, 45, 45, 0.9)' : 'background.paper',
              border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
            }}
          >
            <Grid container spacing={2} alignItems="center">
              {/* Logo */}
              <Grid item xs={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(245, 245, 245, 0.8)',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 0.5,
                    overflow: 'hidden'
                  }}
                >
                  {(item.logoLight || item.logoDark) ? (
                    <img
                      src={theme.palette.mode === 'dark' ? item.logoDark : item.logoLight}
                      alt={`${item.company} logo`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <WorkIcon color="primary" sx={{ fontSize: 20 }} />
                  )}
                </Box>
              </Grid>
              
              {/* Content */}
              <Grid item xs={10}>
                <Typography variant="subtitle1" color="primary">
                  {item.company}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'text.primary' }}>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.duration}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          mb: 4,
          color: theme.palette.primary.main,
          fontWeight: 'bold'
        }}
      >
        Career Timeline
      </Typography>

      {/* Conditionally render horizontal or vertical timeline based on screen size */}
      {isMobile ? <VerticalTimeline /> : <HorizontalTimeline />}
    </Box>
  );
}