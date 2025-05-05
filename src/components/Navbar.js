import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Fuse from 'fuse.js';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Menu,
  MenuItem,
  Button,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './Navbar.css';
import { resumeData } from './resumeData';

const fuse = new Fuse(resumeData, {
  keys: ['section', 'content'],
  threshold: 0.3, // lower is stricter
});

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchResultsDropdown = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  maxHeight: '300px',
  overflowY: 'auto',
  zIndex: 1000,
  '& .MuiListItem-root': {
    padding: theme.spacing(1, 2),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const SearchResultItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(0.5),
}));

const SearchResultSection = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '0.875rem',
}));

const SearchResultContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const ResumeButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));


// Main component
const NavigationBar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeAnchorEl, setResumeAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [query, setQuery] = useState('');
  const results = fuse.search(query);
  const matches = query ? results.map(r => r.item) : [];

  const handleResumeItemClick = (sectionId) => {
    handleResumeMenuClose(); // Close the dropdown
    if (location.pathname === '/') {
      // Already on home, just scroll
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home and scroll after landing
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

    // Set data attribute on the AppBar when dark mode changes
  useEffect(() => {
    const appBar = document.querySelector('.MuiAppBar-root');
    if (appBar) {
      appBar.setAttribute('data-color-on-dark', String(darkMode));
    }
  }, [darkMode]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleResumeClick = (sectionId) => {    
  //   handleResumeMenuClose();
  //   if (location.pathname === '/') {
  //     const el = document.getElementById(sectionId);
  //     if (el) {
  //       el.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   } else {
  //     navigate('/', { state: { scrollTo: sectionId } });
  //   }
  // };

  const handleResumeMenuOpen = (event) => {
    setResumeAnchorEl(event.currentTarget);
  };

  const handleResumeMenuClose = () => {
    setResumeAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value) {
      setSearchAnchorEl(event.currentTarget);
    } else {
      setSearchAnchorEl(null);
    }
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
    setQuery('');
  };

  const handleSearchResultClick = (section) => {
    handleSearchClose();
    scrollToSection(section.toLowerCase());
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // const handleMenuItemClick = (id) => {
  //   handleResumeMenuClose();
  //   scrollToSection(id);
  // };

  // Get icon for each nav item
  const getIconForNavItem = (id) => {
    switch (id) {
      case 'home': return <HomeIcon />;
      case 'experience':
      case 'timeline':
      case 'skills': return <WorkIcon />;
      case 'education':
      case 'certifications': return <SchoolIcon />;
      case 'recognition': return <EmojiEventsIcon />;
      case 'contact': return <ContactMailIcon />;
      default: return null;
    }
  };

  // Memoized nav items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { id: "home", label: "Home" },
    { id: "summary", label: "Summary" },
    { id: "timeline", label: "Career Timeline" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "recognition", label: "Awards" },
    { id: "contact", label: "Contact" },
  ], []);

  const resumeItems = useMemo(() =>
    navItems.filter(item =>
      ["summary", "timeline", "skills", "experience", "certifications", "education", "recognition"].includes(item.id)
    ), [navItems]);

  const drawer = (
    <>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'rtl' ? <MenuIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
          Menu
        </Typography>
      </DrawerHeader>
      <List>
        {navItems.map(({ id, label }) => (
          <ListItem
            key={id}
            button
            onClick={() => {
              handleDrawerToggle();
              scrollToSection(id);
            }}
          >
            <ListItemIcon>
              {getIconForNavItem(id)}
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
        <ListItem button onClick={toggleDarkMode}>
          <ListItemIcon>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <StyledAppBar
        position="fixed"
        color="primary"
        elevation={1}
        enableColorOnDark={darkMode}
        data-color-on-dark={String(darkMode)}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            &nbsp;
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 1
          }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/about"
            >
              About Me
            </Button>

            <ResumeButton
              id="resume-button"
              color="inherit"
              onClick={handleResumeMenuOpen}
              endIcon={<KeyboardArrowDownIcon />}
              aria-controls="resume-menu"
              aria-haspopup="true"
              aria-expanded={Boolean(resumeAnchorEl) ? 'true' : undefined}
            >
              Resume
            </ResumeButton>

            <Menu
              id="resume-menu"
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
              MenuListProps={{
                'aria-labelledby': 'resume-button',
              }}
            >
              {resumeItems.map(({ id, label }) => (
                <MenuItem
                  key={id}
                  onClick={() => handleResumeItemClick(id)}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                    {getIconForNavItem(id)}
                  </ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
            <Button
              color="inherit"
              component={RouterLink}
              to="/works"
            >
              My Works
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/blogs"
            >
              Blogs
            </Button>
            <Button
              color="inherit"
              // onClick={() => scrollToSection('contact')}
              onClick={() => navigate('/contact')}
              startIcon={<ContactMailIcon />}
            >
              Contact
            </Button>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={handleSearchChange}
                onFocus={(e) => e.target.value && setSearchAnchorEl(e.currentTarget)}
              />
              {Boolean(searchAnchorEl) && (
                <SearchResultsDropdown>
                  {matches.length > 0 ? (
                    matches.map((item, index) => (
                      <SearchResultItem
                        key={index}
                        button
                        onClick={() => handleSearchResultClick(item.section)}
                      >
                        <SearchResultSection>
                          {item.section}
                        </SearchResultSection>
                        <SearchResultContent>
                          {item.content}
                        </SearchResultContent>
                      </SearchResultItem>
                    ))
                  ) : (
                    <ListItem>
                      <Typography color="text.secondary">
                        No results found
                      </Typography>
                    </ListItem>
                  )}
                </SearchResultsDropdown>
              )}
            </Search>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'left' : 'right'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 280,
              backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fff',
              color: theme.palette.text.primary
            },
          }}
        >
          {drawer}
        </Drawer>
      </StyledAppBar>
    </>
  );
};

export default React.memo(NavigationBar);