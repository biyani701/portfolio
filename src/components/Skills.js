import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Box,
  useTheme,
  Chip
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/Business';

const skillSections = {
  "Tools": [
    { name: "Jira", years: 10 },
    { name: "Confluence", years: 5 },
    { name: "MS Project", years: 13 }
  ],
  "Programming": [
    { name: "Python", years: 5 },
    { name: "SQL", years: 9 },
    { name: "Unix C/C++", years: 12 }
  ],
  "Databases": [
    { name: "Oracle", years: 9 },
    { name: "PostgreSQL", years: 3 },
    { name: "MS SQL", years: 4 }
  ],
  "Data Visualization": [
    { name: "Plotly", years: 5 }
  ],
  "Domain Knowledge": [
    { name: "Credit Card & Payments", years: 8 },
    { name: "Market Reference Data", years: 6 }
  ]
};

const getIconForCategory = (category) => {
  switch (category) {
    case "Tools":
      return <BuildIcon />;
    case "Programming":
      return <CodeIcon />;
    case "Databases":
      return <StorageIcon />;
    case "Data Visualization":
      return <AssessmentIcon />;
    case "Domain Knowledge":
      return <BusinessIcon />;
    default:
      return null;
  }
};

const Skills = () => {
  const theme = useTheme();

  return (
    <section id="skills" className="py-5">
      <div className="container">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Technical Skills
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {Object.entries(skillSections).map(([category, skills]) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getIconForCategory(category)}
                  <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                    {category}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {skills.map((skill) => (
                    <Chip
                      key={skill.name}
                      label={`${skill.name} (${skill.years}+ yrs)`}
                      color="primary"
                      variant="outlined"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
                {skills.map((skill) => (
                  <Box key={skill.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{skill.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {skill.years}+ years
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((skill.years / 15) * 100, 100)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default Skills;
  