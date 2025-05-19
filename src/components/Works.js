import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Chip,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import BookIcon from '@mui/icons-material/Book';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import PythonIcon from '@mui/icons-material/Code'; // Using Code icon for Python
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import BuildIcon from '@mui/icons-material/Build';

const Works = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Project data
  const projects = [
    {
      id: 'get-confluence-space-pages-details',
      title: 'Confluence Space Pages Details',
      shortDescription: 'A Python tool to extract and format Confluence space pages details with secure credential management and enrichment capabilities.',
      fullDescription: 'This Python tool automates the extraction and formatting of Confluence space pages. It uses KeePass for secure credential management, formats data into structured JSON, filters unwanted pages, and leverages asynchronous API requests for better performance. The tool also includes an enrichment feature that can enhance glossary descriptions with external data from sources like Wikipedia and Investopedia.',
      technologies: ['Python', 'Async/Await', 'KeePass', 'Confluence API', 'JSON'],
      features: [
        'Extract page details from Confluence spaces',
        'Secure credential management using KeePass',
        'Format data into a structured JSON format',
        'Filter out unwanted pages',
        'Asynchronous API requests for better performance',
        'Enrich glossary descriptions with external data'
      ],
      image: 'https://via.placeholder.com/400x200?text=Confluence+Tool',
      links: {
        github: 'https://github.com/vishalbiyani/get-confluence-space-pages-details',
        docs: 'https://get-confluence-space-pages-details.readthedocs.io/',
        pypi: 'https://pypi.org/project/get-confluence-space-pages-details/'
      },
      type: 'Personal Project',
      year: '2023'
    }
    // More projects will be added here in the future
  ];

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to render feature icons based on feature text
  const getFeatureIcon = (feature) => {
    if (feature.includes('KeePass') || feature.includes('credential')) return <SecurityIcon color="primary" />;
    if (feature.includes('API') || feature.includes('requests')) return <CloudIcon color="primary" />;
    if (feature.includes('JSON') || feature.includes('data')) return <StorageIcon color="primary" />;
    if (feature.includes('Async') || feature.includes('performance')) return <SpeedIcon color="primary" />;
    if (feature.includes('Enrich') || feature.includes('external')) return <AutoAwesomeIcon color="primary" />;
    if (feature.includes('Filter')) return <BuildIcon color="primary" />;
    return <CheckCircleOutlineIcon color="primary" />;
  };

  return (
    <Box
      component="section"
      id="works"
      sx={{
        py: { xs: 5, md: 8 },
        backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 600,
            color: theme.palette.primary.main,
            textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'
          }}
          data-aos="fade-up"
        >
          My Projects
        </Typography>

        <Typography
          variant="h6"
          component="p"
          align="center"
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          A showcase of my personal and professional projects, demonstrating my skills and experience in software development.
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id} data-aos="fade-up" data-aos-delay="150">
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8
                  },
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'white',
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {project.title}
                    </Typography>
                    <Chip
                      label={project.type}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.shortDescription}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {project.technologies.slice(0, 5).map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        sx={{
                          borderRadius: 1,
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                <Divider />

                <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {project.links.github && (
                      <IconButton
                        size="small"
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                      >
                        <GitHubIcon />
                      </IconButton>
                    )}
                    {project.links.docs && (
                      <IconButton
                        size="small"
                        href={project.links.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Documentation"
                      >
                        <BookIcon />
                      </IconButton>
                    )}
                    {project.links.pypi && (
                      <IconButton
                        size="small"
                        href={project.links.pypi}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="PyPI Package"
                      >
                        <LanguageIcon />
                      </IconButton>
                    )}
                  </Box>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenDialog(project)}
                    endIcon={<CodeIcon />}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Project Details Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
          PaperProps={{
            sx: {
              borderRadius: isMobile ? 0 : 2,
              backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'white',
            }
          }}
        >
          {selectedProject && (
            <>
              <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                pb: 2
              }}>
                <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
                  {selectedProject.title}
                </Typography>
                <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      component="img"
                      image={selectedProject.image}
                      alt={selectedProject.title}
                      sx={{
                        borderRadius: 1,
                        mb: 2,
                        boxShadow: 1
                      }}
                    />

                    <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                      Description
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedProject.fullDescription}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                      {selectedProject.technologies.map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: 1 }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Key Features
                    </Typography>
                    <List>
                      {selectedProject.features.map((feature, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {getFeatureIcon(feature)}
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>

                    <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
                      Links
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {selectedProject.links.github && (
                        <Button
                          variant="outlined"
                          startIcon={<GitHubIcon />}
                          href={selectedProject.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ justifyContent: 'flex-start' }}
                        >
                          GitHub Repository
                        </Button>
                      )}
                      {selectedProject.links.docs && (
                        <Button
                          variant="outlined"
                          startIcon={<BookIcon />}
                          href={selectedProject.links.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ justifyContent: 'flex-start' }}
                        >
                          Documentation
                        </Button>
                      )}
                      {selectedProject.links.pypi && (
                        <Button
                          variant="outlined"
                          startIcon={<LanguageIcon />}
                          href={selectedProject.links.pypi}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ justifyContent: 'flex-start' }}
                        >
                          PyPI Package
                        </Button>
                      )}
                    </Box>

                    <Box sx={{ mt: 3, p: 2, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Type: {selectedProject.type} • Year: {selectedProject.year}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Works;