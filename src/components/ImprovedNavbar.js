import PropTypes from "prop-types";
import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Fuse from "fuse.js";
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
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
  Divider,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { resumeData } from "./resumeData";

import { useAuth } from "../context/AuthContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import config from "../config";

// Initialize Fuse.js for search functionality
const fuse = new Fuse(resumeData, {
  keys: ["section", "content"],
  threshold: 0.3, // lower is stricter
});

// Styled components - using theme properly
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(
    theme.palette.common[theme.palette.mode === "dark" ? "white" : "black"],
    theme.palette.mode === "dark" ? 0.15 : 0.08
  ),
  "&:hover": {
    backgroundColor: alpha(
      theme.palette.common[theme.palette.mode === "dark" ? "white" : "black"],
      theme.palette.mode === "dark" ? 0.25 : 0.12
    ),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchResultsDropdown = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  maxHeight: "300px",
  overflowY: "auto",
  zIndex: 1000,
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiListItem-root": {
    padding: theme.spacing(1, 2),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const SearchResultItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(0.5),
}));

const SearchResultSection = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: "0.875rem",
}));

const SearchResultContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

// Use the theme directly for AppBar styling - no hardcoded colors
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.footer,
  color: theme.palette.common.white,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(0,0,0,0.5)"
      : "0 2px 10px rgba(0,0,0,0.1)",
  backdropFilter: "blur(8px)",
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  "& .MuiIconButton-root": {
    color: theme.palette.common.white,
  },
  "& .MuiButton-root": {
    color: theme.palette.common.white,
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const ColorPaletteMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    boxShadow: theme.shadows[4],
    minWidth: 200,
    "& .MuiMenuItem-root": {
      padding: theme.spacing(1.5, 2),
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      "&.Mui-selected": {
        backgroundColor: theme.palette.action.selected,
      },
    },
  },
}));

const ColorPaletteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));

const ColorPaletteItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "&::before": {
    content: '""',
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: "currentColor",
    opacity: 0.7,
  },
}));

// Main component
const NavigationBar = ({
  isDarkMode,
  toggleDarkMode,
  currentPaletteIndex,
  changePalette,
  availablePalettes,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Add media queries for responsive behavior
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeAnchorEl, setResumeAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [query, setQuery] = useState("");
  const [paletteAnchorEl, setPaletteAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const results = fuse.search(query);
  const matches = query ? results.map((r) => r.item) : [];

  const { user, isAuthenticated, logout } = useAuth();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleResumeItemClick = (sectionId) => {
    handleResumeMenuClose(); // Close the dropdown
    if (location.pathname === "/") {
      // Already on home, just scroll
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home and scroll after landing
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    setQuery("");
  };

  const handleSearchResultClick = (section) => {
    handleSearchClose();
    scrollToSection(section.toLowerCase());
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleThemeToggle = () => {
    toggleDarkMode(!isDarkMode);
  };

  const handlePaletteMenuOpen = (event) => {
    setPaletteAnchorEl(event.currentTarget);
  };

  const handlePaletteMenuClose = () => {
    setPaletteAnchorEl(null);
  };

  const handlePaletteSelect = (index) => {
    changePalette(index);
    handlePaletteMenuClose();
  };

  // Get icon for each nav item
  const getIconForNavItem = (id) => {
    switch (id) {
      case "home":
        return <HomeIcon />;
      case "experience":
      case "timeline":
      case "skills":
        return <WorkIcon />;
      case "education":
      case "certifications":
        return <SchoolIcon />;
      case "recognition":
        return <EmojiEventsIcon />;
      case "contact":
        return <ContactMailIcon />;
      default:
        return null;
    }
  };

  // Memoized nav items to prevent unnecessary re-renders
  const navItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "summary", label: "Summary" },
      { id: "timeline", label: "Career Timeline" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "certifications", label: "Certifications" },
      { id: "education", label: "Education" },
      { id: "recognition", label: "Awards" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const resumeItems = useMemo(
    () =>
      navItems.filter((item) =>
        [
          "summary",
          "timeline",
          "skills",
          "experience",
          "certifications",
          "education",
          "recognition",
        ].includes(item.id)
      ),
    [navItems]
  );

  // Determine when to show desktop navigation vs mobile navigation
  const showDesktopNav = !isMobile || (isLandscape && !isMobile) || isTablet;

  return (
    <Box sx={{ display: "flex" }}>
      <StyledAppBar position="fixed">
        <Toolbar sx={{ minHeight: (theme) => theme.mixins.toolbar.minHeight }}>
          {/* Only show the left hamburger on mobile in portrait */}
          {isMobile && !isLandscape && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Portfolio
          </Typography>

          {/* Desktop and Landscape Navigation */}
          {showDesktopNav && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                component={RouterLink}
                to="/"
                onClick={() => {
                  if (location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                Home
              </Button>

              <Button component={RouterLink} to="/privacy">
                Privacy Policy
              </Button>

              <Button component={RouterLink} to="/about">
                About Me
              </Button>

              {/* Resume Menu */}
              <Button
                id="resume-button"
                onClick={handleResumeMenuOpen}
                endIcon={<KeyboardArrowDownIcon />}
                aria-controls="resume-menu"
                aria-haspopup="true"
                aria-expanded={Boolean(resumeAnchorEl) ? "true" : undefined}
              >
                Resume
              </Button>
              <Menu
                id="resume-menu"
                anchorEl={resumeAnchorEl}
                open={Boolean(resumeAnchorEl)}
                onClose={handleResumeMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                MenuListProps={{
                  "aria-labelledby": "resume-button",
                }}
              >
                {resumeItems.map(({ id, label }) => (
                  <MenuItem key={id} onClick={() => handleResumeItemClick(id)}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {getIconForNavItem(id)}
                    </ListItemIcon>
                    <ListItemText>{label}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>

              <Button component={RouterLink} to="/works">
                Portfolio
              </Button>
              <Button component={RouterLink} to="/blogs">
                Blog
              </Button>
              <Button
                onClick={() => navigate("/contact")}
                startIcon={<ContactMailIcon />}
              >
                Contact
              </Button>

              {/* Theme Controls */}
              <IconButton onClick={handleThemeToggle} sx={{ ml: 1 }}>
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              <ColorPaletteButton
                onClick={handlePaletteMenuOpen}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {availablePalettes[currentPaletteIndex]?.name || "Theme"}
              </ColorPaletteButton>

              <ColorPaletteMenu
                anchorEl={paletteAnchorEl}
                open={Boolean(paletteAnchorEl)}
                onClose={handlePaletteMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {availablePalettes.map((palette, index) => (
                  <ColorPaletteItem
                    key={palette.name}
                    onClick={() => handlePaletteSelect(index)}
                    selected={index === currentPaletteIndex}
                    sx={{ color: palette.primary }}
                  >
                    {palette.name}
                  </ColorPaletteItem>
                ))}
              </ColorPaletteMenu>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={query}
                  onChange={handleSearchChange}
                  onFocus={(e) =>
                    e.target.value && setSearchAnchorEl(e.currentTarget)
                  }
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

              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                aria-label="user menu"
                title={isAuthenticated ? "User Menu" : "Login with GitHub"}
              >
                {isAuthenticated && user?.avatar_url ? (
                  <Avatar
                    src={user.avatar_url}
                    alt={user.login}
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <Tooltip title={isAuthenticated ? "User Menu" : "Login with GitHub (Anonymous User)"}>
                    <PersonIcon />
                  </Tooltip>
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {isAuthenticated ? (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/profile"
                      onClick={handleMenuClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/dashboard"
                      onClick={handleMenuClose}
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon size={16} style={{ marginRight: 8 }} />
                      Logout
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${config.github.redirectUri}&scope=user,repo`;
                    window.location.href = githubAuthUrl;
                  }}>
                    <GitHubIcon style={{ marginRight: 8 }} />
                    Login with GitHub
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}

          {/* Only show the right hamburger on mobile and handle tablet in landscape */}
          {(isMobile || (isLandscape && !showDesktopNav)) && (
            <IconButton
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: "auto" }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Navigation Items */}
          <ListItem
            button
            component={RouterLink}
            to="/"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/about"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="About Me" />
          </ListItem>

          {/* Resume Items */}
          {resumeItems.map(({ id, label }) => (
            <ListItem
              key={id}
              button
              onClick={() => {
                handleDrawerToggle();
                handleResumeItemClick(id);
              }}
            >
              <ListItemIcon>{getIconForNavItem(id)}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}

          <ListItem
            button
            component={RouterLink}
            to="/works"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Portfolio" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/blogs"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/contact"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>

          <Divider />

          {/* Theme Controls */}
          <ListItem
            button
            onClick={() => {
              handleDrawerToggle();
              handleThemeToggle();
            }}
          >
            <ListItemIcon>
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText primary={isDarkMode ? "Light Mode" : "Dark Mode"} />
          </ListItem>

          <ListItem
            button
            onClick={handlePaletteMenuOpen}
            sx={{
              borderLeft:
                theme.palette.mode === "dark"
                  ? `3px solid ${theme.palette.text.primary}`
                  : "none",
              paddingLeft: theme.palette.mode === "dark" ? 1.5 : 2,
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                  color="text.primary"
                >
                  Color Theme
                </Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    opacity: theme.palette.mode === "dark" ? 0.9 : 0.7,
                  }}
                >
                  {availablePalettes[currentPaletteIndex]?.name}
                </Typography>
              }
            />
          </ListItem>

          <Divider />

          {/* Login/User Profile */}
          {isAuthenticated ? (
            <>
              <ListItem
                button
                component={RouterLink}
                to="/profile"
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>
                  {user?.avatar_url ? (
                    <Avatar
                      src={user.avatar_url}
                      alt={user.login}
                      sx={{ width: 24, height: 24 }}
                    />
                  ) : (
                    <PersonIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleDrawerToggle();
                  logout();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <ListItem
              button
              onClick={() => {
                handleDrawerToggle();
                const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${config.github.redirectUri}&scope=user,repo`;
                window.location.href = githubAuthUrl;
              }}
            >
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="Login with GitHub" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

NavigationBar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  currentPaletteIndex: PropTypes.number.isRequired,
  changePalette: PropTypes.func.isRequired,
  availablePalettes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default NavigationBar;
