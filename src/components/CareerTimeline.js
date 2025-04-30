import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import './CareerTimeline.css';

const careerData = [
  {
    company: "Tata Infotech Ltd.",
    duration: "May 2000 – Oct 2003",
    designation: "Senior Software Engineer",
    logo: "/images/tata-infotech-logo.png",
    description: "Worked on various software development projects focusing on system architecture and implementation."
  },
  {
    company: "Cognizant Technologies",
    duration: "Oct 2003 – Sep 2019",
    designation: "Delivery Lead",
    logo: "/images/cognizant.svg",
    description: "Led multiple teams in delivering complex software solutions and managing client relationships."
  },
  {
    company: "CoreCard Software",
    duration: "Nov 2019 – Present",
    designation: "Principal Project Analyst",
    logo: "/images/corecard.png",
    description: "Currently leading project analysis and implementation for credit card processing systems."
  }
];

const CareerTimeline = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <section id="timeline" className="py-5">
      <div className="container">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Career Timeline
        </Typography>
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
          <Stepper orientation={isMobile ? "vertical" : "horizontal"} alternativeLabel>
            {careerData.map((item, index) => (
              <Step key={index} active={true}>
                <StepLabel StepIconComponent={WorkIcon}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.company}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.duration}
                  </Typography>
                </StepLabel>
                {/* <StepContent>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 2, 
                      mt: 1,
                      backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        component="img"
                        src={item.logo}
                        alt={`${item.company} logo`}
                        sx={{ 
                          height: 40, 
                          width: 'auto',
                          mr: 2,
                          filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none'
                        }}
                      />
                      <Box>
                        <Typography variant="h6" component="h3">
                          {item.designation}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </StepContent> */}
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    </section>
  );
};

export default CareerTimeline;
