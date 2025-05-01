import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
  Card,
  CardContent,
  Chip,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import AOS from 'aos';
import 'aos/dist/aos.css';

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 'bold',
  paddingLeft: theme.spacing(2),
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '4px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
  },
}));

const PassionText = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  maxWidth: 800,
  margin: '32px auto 0',
  textAlign: 'center'
}));

const ProfileSummary = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const profileData = {
    title: "Technical Program Manager / Delivery Director",
    experience: "25+ years",
    summary: "A results-driven Technical Program Manager / Delivery Director with over 25 years of experience steering complex, high-impact software initiatives. Proven track record of aligning strategy with execution to deliver transformative business outcomes across diverse industries.",
    keyPoints: [
      {
        icon: <TimelineIcon />,
        title: "Methodology Expert",
        description: "Expert in Agile, Waterfall, Scrum, and Kanban methodologies, leading cross-functional, globally distributed teams to deliver high-performance results and maximize client value."
      },
      {
        icon: <CheckCircleIcon />,
        title: "Project Delivery",
        description: "Delivered large-scale, mission-critical programs, including regulatory, time-sensitive, and high-complexity projects — consistently achieving on-time, within-budget delivery."
      },
      {
        icon: <WorkIcon />,
        title: "Strategic Problem-Solver",
        description: "Strategic problem-solver, combining meticulous planning with proactive risk mitigation to ensure delivery excellence while fostering an innovation-first culture."
      },
      {
        icon: <GroupIcon />,
        title: "Stakeholder Engagement",
        description: "Exceptional stakeholder engagement, cultivating strong partnerships and promoting transparent, outcome-focused communication to keep business and technology teams aligned."
      },
      {
        icon: <StarIcon />,
        title: "Award-Winning Leadership",
        description: "Award-winning leadership, recognized with accolades such as 'Best Project Manager of the Quarter' for driving measurable improvements in delivery, team performance, and client satisfaction."
      }
    ],
    passion: "Passionate about leading high-impact programs, accelerating innovation, and empowering teams to exceed expectations."
  };

  const skills = [
    "Agile", "Scrum", "Kanban", "Waterfall", "Risk Management", 
    "Stakeholder Management", "Program Management", "Project Delivery", 
    "Cross-functional Leadership", "Strategic Planning"
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: theme => theme.palette.background.default }}>
      <Box maxWidth="lg" mx="auto">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mb: 4, background: theme => theme.palette.mode === 'light' ? 'linear-gradient(to right, #f5f7fa, #e4e8ed)' : 'linear-gradient(to right, #1e1e1e, #2a2a2a)' }} data-aos="fade-up">
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <StyledAvatar>
              <SchoolIcon fontSize="large" />
            </StyledAvatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {profileData.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {profileData.experience} of Professional Experience
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ fontSize: '1.1rem', mt: 2 }}>
            {profileData.summary}
          </Typography>

          <Box mt={2} display="flex" flexWrap="wrap">
            {skills.map((skill, index) => (
              <Chip 
                key={index}
                label={skill} 
                variant="filled"
                sx={{ 
                  m: 0.5,
                  bgcolor: theme => theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
                  color: theme => theme.palette.getContrastText(
                    theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light
                  )
                }}
              />
            ))}
          </Box>
        </Paper>

        <SectionTitle variant="h5" data-aos="fade-up">
          Professional Excellence
        </SectionTitle>

        <Grid container spacing={3}>
          {profileData.keyPoints.map((point, index) => (
            <Grid item xs={12} sm={6} key={index} data-aos="fade-up">
              <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 8, borderLeft: theme => `4px solid ${theme.palette.primary.main}` } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ backgroundColor: theme => theme.palette.primary.main, mr: 2 }}>
                      {point.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight={600}>
                      {point.title}
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1">
                    {point.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <PassionText variant="h6" data-aos="fade-up">
          {profileData.passion}
        </PassionText>
      </Box>
    </Box>
  );
};

export default ProfileSummary;