import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './Navbar.css';

const NavigationBar = ({ darkMode, toggleDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeAnchorEl, setResumeAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleResumeMenuOpen = (event) => {
    setResumeAnchorEl(event.currentTarget);
  };

  const handleResumeMenuClose = () => {
    setResumeAnchorEl(null);
  };

  const handleMenuItemClick = (id) => {
    handleResumeMenuClose();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "summary", label: "Summary" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "recognition", label: "Awards" },
    { id: "contact", label: "Contact" },
  ];

  const resumeItems = navItems.filter(item => 
    ["summary", "skills", "experience", "certifications", "education", "recognition"].includes(item.id)
  );

  const drawer = (
    <List>
      {navItems.map(({ id, label }) => (
        <ListItem 
          key={id} 
          button
          onClick={() => {
            handleDrawerToggle();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ListItemText primary={label} />
        </ListItem>
      ))}
      <ListItem button onClick={toggleDarkMode}>
        <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </ListItem>
    </List>
  );

  return (
    <AppBar position="fixed" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vishal Biyani
        </Typography>
        
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
          <Button 
            color="inherit" 
            onClick={handleResumeMenuOpen}
            sx={{ mr: 2 }}
          >
            Resume
          </Button>
          <Menu
            anchorEl={resumeAnchorEl}
            open={Boolean(resumeAnchorEl)}
            onClose={handleResumeMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {resumeItems.map(({ id, label }) => (
              <MenuItem 
                key={id}
                onClick={() => handleMenuItemClick(id)}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
          <Button 
            color="inherit"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact
          </Button>
          <IconButton color="inherit" onClick={toggleDarkMode} sx={{ ml: 1 }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default NavigationBar;
