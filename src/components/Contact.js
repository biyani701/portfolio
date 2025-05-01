import { Typography, Box, useTheme, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Contact.css';

const Contact = () => {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      className="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#1a237e',
        color: 'white',
        py: 1,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Box className="container">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          minHeight: '40px'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" component="span" sx={{ color: 'white' }}>
              <a href="mailto:support@biyani.xyz" className="footer-link">                
              Support Team
              </a>
            </Typography>
            {/* <Typography variant="body2" component="span" sx={{ color: 'white' }}>
              <a href="tel:+917720028522" className="footer-link">
                📞 +91 77 20 02 85 22
              </a>
            </Typography> */}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              component="a" 
              href="https://www.linkedin.com/in/vishal-biyani-0a0b0c/" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              size="small"
              sx={{ color: 'white' }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton 
              component="a" 
              href="https://github.com/vishalbiyani" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              size="small"
              sx={{ color: 'white' }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
            © {new Date().getFullYear()} Vishal Biyani
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
