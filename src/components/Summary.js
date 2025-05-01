import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  useTheme,
  Avatar,
  Divider
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import './Summary.css';

const Summary = () => {
  const theme = useTheme();

  const summaryPoints = [
    {
      icon: <WorkIcon />,
      title: "Professional Experience",
      points: [
        "Over 20 years of experience in software development and project management",
        "Expertise in credit card processing and payment systems",
        "Strong background in system architecture and implementation"
      ]
    },
    {
      icon: <SchoolIcon />,
      title: "Education & Certifications",
      points: [
        "Bachelor's degree in Computer Science",
        "Multiple industry certifications in project management and software development",
        "Continuous learning and skill development"
      ]
    },
    {
      icon: <CodeIcon />,
      title: "Technical Expertise",
      points: [
        "Proficient in multiple programming languages and frameworks",
        "Extensive experience with database systems and data visualization",
        "Strong problem-solving and analytical skills"
      ]
    }
  ];

  return (
    <section id="summary" className="py-5">
      <div className="container">
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ 
            mb: 4,
            color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main'
          }}
        >
          Professional Summary
        </Typography>
        <Grid container spacing={4}>
          {summaryPoints.map((section, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      width: 40,
                      height: 40,
                      mr: 2
                    }}
                  >
                    {section.icon}
                  </Avatar>
                  <Typography variant="h6" component="h3">
                    {section.title}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box component="ul" sx={{ pl: 2 }}>
                  {section.points.map((point, pointIndex) => (
                    <Typography
                      key={pointIndex}
                      component="li"
                      variant="body1"
                      sx={{
                        mb: 1,
                        position: 'relative',
                        '&::before': {
                          content: '"•"',
                          color: theme.palette.primary.main,
                          fontWeight: 'bold',
                          display: 'inline-block',
                          width: '1em',
                          ml: '-1em'
                        }
                      }}
                    >
                      {point}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default Summary;
  