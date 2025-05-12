import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Typography,
  Link,
  useTheme,
  Paper,
  Stack,
  Grid,
} from '@mui/material';

import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LayersIcon from '@mui/icons-material/Layers';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        textAlign: 'center',
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: theme.palette.primary.main,
          mb: 1,
        }}
      >
        Credits & Inspirations
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Acknowledging the people, ideas, and tools that made this portfolio possible.
      </Typography>
    </Box>
  );
};

const Section = ({ icon, title, children }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body1">{children}</Typography>
    </Paper>
  );
};

Section.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function CreditsPage() {
  return (
    <>
      <Hero />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Section
              icon={<ArticleIcon color="primary" />}
              title="Periodic Table Filter Logic"
            >
              The filter logic in my Periodic Table of Skills was inspired by{' '}
              <Link
                href="https://dev.to/madsstoumann/the-periodic-table-in-css-3lmm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mads Stoumann&apos;s article on DEV.to
              </Link>
              . I adapted the concept into a React-based UI using MUI.
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              icon={<CodeIcon color="secondary" />}
              title="Responsive Skill Icons"
            >
              Got the idea to use responsive icons for Skills from{' '}
              <Link
                href="https://dev.to/chrisbenjamin/responsive-skill-icons-for-your-portfolio-tutorial-2270"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chris Benjamin&apos;s article on DEV.to
              </Link>
              . I adapted the concept into a React-based UI using MUI.
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              icon={<EmojiObjectsIcon color="warning" />}
              title="AI Tools Acknowledgement"
            >
              This portfolio was built with assistance from various AI tools (including ChatGPT) for code generation,
              optimization, and UX suggestions.
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              icon={<LayersIcon color="success" />}
              title="Technology Stack"
            >
              Built with <strong>React 19</strong>, styled using <strong>MUI v7</strong>, and hosted on{' '}
              <Link
                href="https://pages.github.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Pages
              </Link>
              .
            </Section>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
