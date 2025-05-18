import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Container,
  Fade,
  Zoom,
  Avatar
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

// Career data
const careerData = [
  {
    company: "Tata Infotech Ltd.",
    duration: "May 2000 – Oct 2003",
    title: "Senior Software Engineer",
    description: "Started career journey in software development",
    logoLight: "/images/tata-infotech-logo-light.png", // Logo for light mode
    logoDark: "/images/tata-infotech-logo-dark.png"    // Logo for dark mode
  },
  {
    company: "Cognizant Technology Solutions",
    duration: "Oct 2003 – Sep 2019",
    title: "Delivery Lead",
    description: "Led multiple project teams and initiatives",
    logoLight: "/images/cognizant-logo-light.svg", // Logo for light mode
    logoDark: "/images/cognizant-logo-dark.png"    // Logo for dark mode
  },
  {
    company: "CoreCard India Software",
    duration: "Nov 2019 – Present",
    title: "Principal Project Analyst",
    description: "Driving technical solutions and project analysis",
    logoLight: "/images/corecard-logo-light.png", // Logo for light mode
    logoDark: "/images/corecard-logo-dark.png"    // Logo for dark mode
  }
];

export default function CareerTimeline() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [activeIndex, setActiveIndex] = useState(null);
  const [animatedItems, setAnimatedItems] = useState([]);

  // Animation effect for staggered item appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimatedItems = [];
      const interval = setInterval(() => {
        if (newAnimatedItems.length < careerData.length) {
          newAnimatedItems.push(newAnimatedItems.length);
          setAnimatedItems([...newAnimatedItems]);
        } else {
          clearInterval(interval);
        }
      }, 300);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Renders horizontal timeline for desktop
  const HorizontalTimeline = () => (
    <Box
      sx={{
        position: 'relative',
        py: 8,
        px: { xs: 2, md: 4 },
        overflow: 'hidden'
      }}
    >
      {/* The horizontal line */}
      <Box
        sx={{
          position: 'absolute',
          height: '4px',
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.primary.light})`,
          top: '120px',
          left: '5%',
          right: '5%',
          zIndex: 1,
          borderRadius: '4px',
          boxShadow: `0 0 8px ${theme.palette.primary.main}`,
        }}
      />

      {/* Timeline items */}
      <Grid container spacing={isTablet ? 2 : 4} justifyContent="space-around" alignItems="flex-start">
        {careerData.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              opacity: animatedItems.includes(index) ? 1 : 0,
              transform: animatedItems.includes(index)
                ? 'translateY(0)'
                : 'translateY(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: 300,
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Timeline node with pulse animation */}
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: theme.palette.primary.main,
                  borderRadius: '50%',
                  zIndex: 2,
                  mb: 2,
                  mt: 10,
                  position: 'relative',
                  boxShadow: `0 0 0 4px ${theme.palette.background.paper}, 0 0 0 6px ${theme.palette.primary.main}30`,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                    backgroundColor: theme.palette.primary.main,
                    opacity: 0.6,
                    top: 0,
                    left: 0,
                    zIndex: -1,
                  },
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                      opacity: 0.6,
                    },
                    '70%': {
                      transform: 'scale(2)',
                      opacity: 0,
                    },
                    '100%': {
                      transform: 'scale(2.5)',
                      opacity: 0,
                    },
                  },
                }}
              />

              {/* Card */}
              <Paper
                elevation={activeIndex === index ? 8 : 3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  width: '100%',
                  textAlign: 'center',
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  bgcolor: theme.palette.mode === 'dark'
                    ? 'rgba(45, 45, 45, 0.9)'
                    : 'background.paper',
                  border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': activeIndex === index ? {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.primary.light})`,
                  } : {},
                }}
              >
                {/* Logo */}
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(30, 30, 30, 0.8)'
                      : 'rgba(245, 245, 245, 0.8)',
                    borderRadius: '50%',
                    mx: 'auto',
                    mb: 2,
                    p: 1.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    boxShadow: `0 4px 8px rgba(0,0,0,0.1)`,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {(item.logoLight || item.logoDark) ? (
                    <img
                      src={theme.palette.mode === 'dark' ? item.logoDark : item.logoLight}
                      alt={`${item.company} logo`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none',
                      }}
                    />
                  ) : (
                    <WorkIcon
                      color="primary"
                      sx={{
                        fontSize: 36,
                        filter: `drop-shadow(0 2px 2px ${theme.palette.primary.main}40)`,
                      }}
                    />
                  )}
                </Box>

                {/* Content */}
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    textShadow: theme.palette.mode === 'dark'
                      ? '0 2px 4px rgba(0,0,0,0.5)'
                      : 'none',
                  }}
                >
                  {item.company}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    color: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'text.primary',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  {item.duration}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '0.875rem',
                    opacity: 0.9,
                  }}
                >
                  {item.description}
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
    <Box
      sx={{
        position: 'relative',
        pl: { xs: 3, sm: 5 },
        pr: { xs: 1, sm: 2 },
        py: 4,
        mx: 'auto',
        maxWidth: 600,
      }}
    >
      {/* Vertical line */}
      <Box
        sx={{
          position: 'absolute',
          width: '4px',
          background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.primary.light})`,
          top: 0,
          bottom: 0,
          left: { xs: '12px', sm: '20px' },
          zIndex: 1,
          borderRadius: '4px',
          boxShadow: `0 0 8px ${theme.palette.primary.main}`,
        }}
      />

      {/* Timeline items */}
      {careerData.map((item, index) => (
        <Box
          key={index}
          sx={{
            mb: 5,
            position: 'relative',
            opacity: animatedItems.includes(index) ? 1 : 0,
            transform: animatedItems.includes(index)
              ? 'translateX(0)'
              : 'translateX(-20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {/* Timeline node with pulse animation */}
          <Box
            sx={{
              position: 'absolute',
              width: 20,
              height: 20,
              bgcolor: theme.palette.primary.main,
              borderRadius: '50%',
              left: { xs: -26, sm: -34 },
              top: 24,
              zIndex: 2,
              boxShadow: `0 0 0 4px ${theme.palette.background.paper}, 0 0 0 6px ${theme.palette.primary.main}30`,
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
                backgroundColor: theme.palette.primary.main,
                opacity: 0.6,
                top: 0,
                left: 0,
                zIndex: -1,
              },
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 0.6,
                },
                '70%': {
                  transform: 'scale(2)',
                  opacity: 0,
                },
                '100%': {
                  transform: 'scale(2.5)',
                  opacity: 0,
                },
              },
            }}
          />

          {/* Card */}
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              ml: 1,
              bgcolor: theme.palette.mode === 'dark'
                ? 'rgba(45, 45, 45, 0.9)'
                : 'background.paper',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : 'none',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.primary.light})`,
              },
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Grid container spacing={2} alignItems="center">
              {/* Logo */}
              <Grid item xs={3} sm={2}>
                <Box
                  sx={{
                    width: { xs: 45, sm: 55 },
                    height: { xs: 45, sm: 55 },
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(30, 30, 30, 0.8)'
                      : 'rgba(245, 245, 245, 0.8)',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 1,
                    overflow: 'hidden',
                    boxShadow: `0 4px 8px rgba(0,0,0,0.1)`,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {(item.logoLight || item.logoDark) ? (
                    <img
                      src={theme.palette.mode === 'dark' ? item.logoDark : item.logoLight}
                      alt={`${item.company} logo`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none',
                      }}
                    />
                  ) : (
                    <WorkIcon
                      color="primary"
                      sx={{
                        fontSize: { xs: 24, sm: 30 },
                        filter: `drop-shadow(0 2px 2px ${theme.palette.primary.main}40)`,
                      }}
                    />
                  )}
                </Box>
              </Grid>

              {/* Content */}
              <Grid item xs={9} sm={10}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    textShadow: theme.palette.mode === 'dark'
                      ? '0 1px 2px rgba(0,0,0,0.5)'
                      : 'none',
                  }}
                >
                  {item.company}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'text.primary',
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'block',
                    mb: 0.5,
                    fontStyle: 'italic',
                  }}
                >
                  {item.duration}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    opacity: 0.9,
                  }}
                >
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, md: 6 },
        position: 'relative',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          mb: { xs: 4, md: 6 },
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          position: 'relative',
          display: 'inline-block',
          mx: 'auto',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '60px',
            height: '4px',
            background: theme.palette.primary.main,
            bottom: '-10px',
            left: 'calc(50% - 30px)',
            borderRadius: '2px',
          },
        }}
      >
        Career Timeline
      </Typography>

      {/* Conditionally render horizontal or vertical timeline based on screen size */}
      {isMobile ? <VerticalTimeline /> : <HorizontalTimeline />}
    </Box>
  );
}