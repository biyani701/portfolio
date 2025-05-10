import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box, useTheme, useMediaQuery, IconButton, Container, Button } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SvgIcon from '@mui/material/SvgIcon';
import PrivacyPreferencesButton from './PrivacyPreferencesButton'; // Importing the PrivacyPreferencesButton component
import { alpha } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: theme.palette.background.footer,
        color: theme.palette.common.white,
        // borderTop: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
        borderTop: `1px solid ${theme.palette.divider}`,
        px: 3,
        py: isMobile ? 1 : 2,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: isMobile ? 1 : 0,
        backdropFilter: 'blur(8px)',
        transition: theme.transitions.create(['background-color', 'border-color'], {
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          minHeight: '40px'
        }}>
          {/* Left section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PrivacyPreferencesButton />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              size="medium"
              component={RouterLink}
              to="/privacy"
              variant="text"
              sx={{
                color: theme.palette.common.white,
                '&:hover': {
                  textDecoration: 'underline',
                  backgroundColor: 'transparent',
                },
                fontSize: '0.875rem',
              }}
            >
              Privacy Policy
            </Button>
            <Button
              size="medium"
              component={RouterLink}
              to="/terms"
              variant="text"
              sx={{
                color: theme.palette.common.white,
                '&:hover': {
                  textDecoration: 'underline',
                  backgroundColor: 'transparent',
                },
                fontSize: '0.875rem',
              }}
            >
              Terms of Use
            </Button>
            <Button
              size="medium"
              component={RouterLink}
              to="/credits"
              variant="text"
              sx={{
                color: theme.palette.common.white,
                '&:hover': {
                  textDecoration: 'underline',
                  backgroundColor: 'transparent',
                },
                fontSize: '0.875rem',
              }}
            >
              Credits
            </Button>
          </Box>
          {/* Social links section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/vishalbiyani2/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              size="small"
              sx={{
                color: theme.palette.common.white,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                  transform: 'translateY(-2px)',
                },
                transition: theme.transitions.create(['background-color', 'transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/biyani701"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              size="small"
              sx={{
                color: theme.palette.common.white,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                  transform: 'translateY(-2px)',
                },
                transition: theme.transitions.create(['background-color', 'transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              className="social-link"
              href="https://bitbucket.org/visby8em/workspace/overview/"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: theme.palette.common.white,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                  transform: 'translateY(-2px)',
                },
                transition: theme.transitions.create(['background-color', 'transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
              }}
            >
              <SvgIcon fontSize="small">
                {/* Bitbucket SVG path */}
                <path d="M0.86,2C0.41,2 0.02,2.34 0,2.78C0,2.81 0,2.84 0,2.88L3.66,21.26C3.73,21.69 4.1,22 4.54,22H19.94C20.28,22 20.57,21.78 20.65,21.45L24,2.88V2.8C23.99,2.36 23.62,2.01 23.18,2C23.16,2 23.14,2 23.12,2H0.86ZM14.93,14.6H9.06L7.85,9.4H16.12L14.93,14.6Z" />
              </SvgIcon>
            </IconButton>
          </Box>

          {/* Copyright section */}
          <Typography
            variant="body2"
            sx={{
              color: alpha(theme.palette.common.white, 0.9),
              transition: theme.transitions.create('color', {
                duration: theme.transitions.duration.standard,
              }),
            }}
          >
            © {currentYear} Vishal Biyani
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;