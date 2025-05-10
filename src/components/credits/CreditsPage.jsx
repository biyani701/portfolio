import React from 'react';
import { Box, Container, Typography, Link, Divider, useTheme } from '@mui/material';

export default function CreditsPage() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 4, md: 6 },
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
        }}
      >
        Credits & Inspirations
      </Typography>

      <Divider
        sx={{
          mb: 4,
          borderColor: theme.palette.divider,
        }}
      />
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Periodic Table Filter Logic
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          The filter logic in my Periodic Table of Skills was inspired by{' '}
          <Link
            href="https://dev.to/madsstoumann/the-periodic-table-in-css-3lmm"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.secondary.main }}
          >
            Mads Stoumann&apos;s article on DEV.to
          </Link>
          . I adapted the concept into a React-based UI using MUI.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          AI Tools Acknowledgement
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          This portfolio was built with assistance from various AI tools (including ChatGPT) for code generation,
          optimization, and UX suggestions.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Technology Stack
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Built with <strong>React 19</strong>, styled using <strong>MUI v7</strong>, and hosted on{' '}
          <Link
            href="https://pages.github.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.secondary.main }}
          >
            GitHub Pages
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
}
