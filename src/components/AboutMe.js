import React from "react";
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Avatar, 
  Box,
  useTheme 
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

const AboutMe = () => {
  const theme = useTheme();
  const { mode } = useColorScheme();

  return (
    <Container 
      maxWidth="md" 
      id="about"
      sx={{ 
        scrollMarginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        marginTop: { xs: 8, sm: 10, md: 12 },
      }}
    >
      <Card 
        elevation={mode === 'dark' ? 2 : 1}
        sx={{ 
          marginTop: { xs: 3, sm: 4, md: 5 }, 
          padding: { xs: 2, sm: 3 },
          backgroundColor: 'background.paper',
          borderRadius: theme.shape.borderRadius,
          width: '100%'
        }}
      >
        <CardContent>
          <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="center">
            <Grid 
              item 
              xs={12} 
              sm={3}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-start' }
              }}
            >
              <Avatar 
                src="/images/DSC_0694.jpg" 
                sx={{ 
                  width: { xs: 100, sm: 80 }, 
                  height: { xs: 100, sm: 80 },
                  border: `2px solid ${theme.palette.primary.main}`
                }}
                alt="Vishal Biyani"
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
                  Vishal Biyani
                </Typography>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', sm: '1.25rem' }
                  }}
                >
                  Technical Program Manager | Delivery Director | Full Stack Engineer
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography 
            variant="body1" 
            component="p" 
            sx={{ 
              marginTop: { xs: 2, sm: 3 }, 
              textAlign: { xs: 'left', sm: "justify" },
              color: 'text.primary',
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}
          >
            I have a passion for coding and automation. Created visualization dashboards using Python Plotly Dash, automated Jira workflows with REST APIs, and developed portfolio projects with React JS.
          </Typography>

          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              marginTop: { xs: 3, sm: 4 },
              color: 'text.primary',
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            Key Skills
          </Typography>
          <Typography 
            variant="body2" 
            component="p"
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '0.875rem' }
            }}
          >
            Python, React JS, Jira Automation, REST APIs, Full Stack Development
          </Typography>

          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              marginTop: { xs: 3, sm: 4 },
              color: 'text.primary',
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            Personal Projects
          </Typography>
          <Typography 
            variant="body2" 
            component="p" 
            sx={{ 
              textAlign: { xs: 'left', sm: "justify" },
              color: 'text.secondary',
              lineHeight: 1.6,
              fontSize: { xs: '0.875rem', sm: '0.875rem' }
            }}
          >
            Developed a portfolio website using React JS and Material UI.<br/>
            Automated creation of Jira dashboard using python and Jira REST APIs.<br/>
            Created a Python script to automate Jira issue transitions.<br/>
            Created Jira dashboards using Python and REST APIs.<br/>            
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutMe;