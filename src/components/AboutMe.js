import React from "react";
import { Container, Typography, Card, CardContent, Grid, Avatar } from "@mui/material";

const AboutMe = () => {
  return (
    <Container maxWidth="md">
      <Card sx={{ marginTop: 5, padding: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Avatar 
                src="your-profile-picture-url" 
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h4">Vishal</Typography>
              <Typography variant="h6" color="textSecondary">
                Technical Program Manager | Delivery Director | Full Stack Engineer
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="body1" sx={{ marginTop: 2 }}>
            I have a passion for coding and automation. I’ve built visualization dashboards using Python Plotly Dash, automated Jira workflows with REST APIs, and developed portfolio projects with React JS.
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 3 }}>Key Skills</Typography>
          <Typography variant="body2">
            Python, React JS, Jira Automation, REST APIs, Full Stack Development
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 3 }}>Personal Projects</Typography>
          <Typography variant="body2">
            - Created Jira dashboards using Python and REST APIs.<br/>
            - Automated Jira issue transitions using Python.<br/>
            - Developed portfolio and visualization dashboards with React and Plotly Dash.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutMe;