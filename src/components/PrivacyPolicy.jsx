import { Box, Typography, useTheme, Link } from '@mui/material';

export default function PrivacyPolicy() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: theme.spacing(3),
        py: theme.spacing(4),
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        mt: (theme) => theme.spacing(5), // adds top margin equal to the AppBar height, // adds top margin equal to the AppBar height
        textAlign: 'left', 
      }}
    >
      <Typography 
      variant="h4" 
      gutterBottom 
      sx={{ 
        fontWeight: theme.typography.fontWeightBold,
        textAlign: 'center', 
      }} 

      >
        Privacy Policy
      </Typography>

      <Typography paragraph sx={{ mb: theme.spacing(2) }}>
        Your privacy is important to us. This website is hosted on GitHub Pages and uses third-party services to improve your experience.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: theme.spacing(4) }}>
        1. Data Collection
      </Typography>
      <Typography component="p">
        We collect personal information only when you submit the contact form provided via Tally.so. This includes your first name, last name, email address, and message content.
      </Typography>
      <Typography component="p">
        Form submissions are securely stored and managed using Notion for analysis and tracking.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: theme.spacing(4) }}>
        2. Analytics
      </Typography>
      <Typography component="p">
        We use Google Analytics to understand how visitors interact with our site. Google Analytics uses cookies to collect anonymous traffic data such as pages visited, browser type, and device information.
      </Typography>
      <Typography component="p">
        You can opt out of Google Analytics by installing the Google Analytics opt-out browser add-on:{' '}
        <Link
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: theme.palette.primary.main }}
        >
          https://tools.google.com/dlpage/gaoptout
        </Link>
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: theme.spacing(4) }}>
        3. Cookies
      </Typography>
      <Typography component="p">
        This site may store cookies in your browser to remember preferences like theme mode or palette selection. These are used solely to enhance your browsing experience and are not used for tracking or advertising purposes.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: theme.spacing(4) }}>
        4. Data Sharing
      </Typography>
      <Typography component="p">
        We do not sell or share your personal data with third parties. Data collected through the contact form is used solely by the site owner for communication purposes.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: theme.spacing(4) }}>
        5. Your Rights
      </Typography>
      <Typography component="p">
        If you wish to access, correct, or delete any personal information submitted through this website, please contact us directly using the form provided.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: theme.spacing(4) }}>
        6. Contact
      </Typography>
      <Typography component="p">
        If you have any questions regarding this privacy policy, feel free to reach out via the contact form.
      </Typography>

      <Typography
        variant="caption"
        display="block"
        sx={{ mt: theme.spacing(6), color: theme.palette.text.secondary }}
      >
        Last updated: May 6, 2025
      </Typography>
    </Box>
  );
}
