import React from 'react';
import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot, 
  TimelineOppositeContent 
} from '@mui/lab';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ExperienceTimeline = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const experiences = [
    {
      company: "CoreCard Software India Pvt. Ltd",
      period: "Nov 2019 – Present",
      title: "Principal Project Analyst",
      location: "Mumbai",
      responsibilities: [
        "Led Agile PMO, mentored 150+ members, aligned product delivery with client goals.",
        "Owned delivery for key accounts like Cookie & Jazz projects.",
        "Improved operational efficiency, established release best practices."
      ]
    },
    {
      company: "Cognizant Technology Solutions",
      period: "2003 – 2019",
      title: "Delivery Lead",
      location: "Pune, Dallas, Washington DC",
      responsibilities: [
        "Directed delivery for 8 UK banking clients, managed cross-functional dependencies.",
        "Led Agile transformations and optimized delivery pipelines."
      ]
    },
    {
      company: "Tata Infotech Ltd",
      period: "2000 – 2003",
      title: "Senior Software Engineer",
      location: "Mumbai, Singapore",
      responsibilities: []
    }
  ];

  return (
    <section id="experience" className="py-5">
      <Box sx={{ 
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[50],
        borderRadius: 2,
        p: 4
      }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Professional Experience
        </Typography>
        
        <Timeline position={isMobile ? "right" : "alternate"} sx={{ p: 0 }}>
          {experiences.map((exp, index) => (
            <TimelineItem key={index}>
              {!isMobile && (
                <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                  <Typography variant="h6" component="span" color="primary">
                    {exp.period}
                  </Typography>
                </TimelineOppositeContent>
              )}
              
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined">
                  <WorkIcon />
                </TimelineDot>
                {index < experiences.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Paper elevation={3} sx={{ 
                  p: 3, 
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper
                }}>
                  {isMobile && (
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {exp.period}
                    </Typography>
                  )}
                  
                  <Typography variant="h6" component="h3" gutterBottom>
                    {exp.company}
                  </Typography>
                  
                  <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mb: 1 }}>
                    {exp.title} – {exp.location}
                  </Typography>
                  
                  {exp.responsibilities.length > 0 && (
                    <List dense sx={{ pl: 1 }}>
                      {exp.responsibilities.map((resp, idx) => (
                        <ListItem key={idx} sx={{ p: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <ArrowRightIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={resp} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </section>
  );
};

export default ExperienceTimeline;