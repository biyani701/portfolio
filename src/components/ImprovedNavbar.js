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
  Grow,
  MenuItem,
  Button,
  Divider,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faAward,
  faEnvelope,
  faFileLines,
  faRoad
} from "@fortawesome/free-solid-svg-icons";

import { motion } from 'framer-motion';

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
import DashboardIcon from "@mui/icons-material/Dashboard";
import { resumeData } from "./resumeData";
import { skillSections } from "./Skills"; // Import skillSections from Skills component

import { useAuth } from "../context/AuthContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import SettingsIcon from "@mui/icons-material/Settings";
import config from "../config";

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -5 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  }),
};

// Initialize Fuse.js for search functionality
const fuse = new Fuse(resumeData, {
  keys: ["section", "content"],
  threshold: 0.3, // lower is stricter
});

// Add skills data to search index
const addSkillsToSearchIndex = (skillSections) => {
  if (!skillSections) return;

  // Create skill search entries
  const skillEntries = [];

  Object.entries(skillSections).forEach(([category, skills]) => {
    // Add category as a section
    const skillNames = skills.map((skill) => skill.name).join(", ");
    skillEntries.push({
      section: category,
      content: `Skills in ${category}: ${skillNames}`,
    });

    // Add individual skills with more details
    skills.forEach((skill) => {
      skillEntries.push({
        section: "Skills",
        content: `${skill.name} (${skill.years}+ years experience) - ${category}`,
      });
    });
  });

  // Add to fuse index
  skillEntries.forEach((entry) => {
    if (
      !resumeData.some(
        (item) =>
          item.section === entry.section && item.content === entry.content
      )
    ) {
      resumeData.push(entry);
    }
  });
};

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
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [settingsHover, setSettingsHover] = useState(false);
  // Add skills to search index
  React.useEffect(() => {
    // Add skills data to search index
    addSkillsToSearchIndex(skillSections);
  }, []);

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

    // Handle skill-specific searches
    if (section === "Skills" || Object.keys(skillSections).includes(section)) {
      // If we're not on the home page, navigate there first
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: "skills" } });
      } else {
        // Scroll to skills section
        scrollToSection("skills");
      }
    } else {
      // For other sections, use the standard behavior
      scrollToSection(section.toLowerCase());
    }
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

  // Settings menu handlers
  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    if (!settingsHover) {
      setSettingsAnchorEl(null);
    }
  };

  const handleSettingsMouseEnter = (event) => {
    setSettingsHover(true);
    if (!settingsAnchorEl) {
      setSettingsAnchorEl(event.currentTarget);
    }
  };

  const handleSettingsMouseLeave = () => {
    setSettingsHover(false);
    setTimeout(() => {
      if (!settingsHover) {
        setSettingsAnchorEl(null);
      }
    }, 300);
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
        return <FontAwesomeIcon icon={faBriefcase} />;
      case "timeline":
        return <FontAwesomeIcon icon={faRoad} />;
      case "skills":
        return <WorkIcon />;
      case "education":
        return <FontAwesomeIcon icon={faGraduationCap} />;
      case "certifications":
        return <SchoolIcon />;
      case "recognition":
        // return <EmojiEventsIcon />;
        return <FontAwesomeIcon icon={faAward} />;
      case "contact":
        return <FontAwesomeIcon icon={faEnvelope} />;
      case "summary":
        <FontAwesomeIcon icon={faFileLines} />;
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

  // New Addition
  const groupedResumeItems = [
    {
      label: "Professional",
      items: [
        { id: "summary", label: "Summary" },
        { id: "timeline", label: "Career Timeline" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" },
      ],
    },
    {
      label: "Education & Certs",
      items: [
        { id: "certifications", label: "Certifications" },
        { id: "education", label: "Education" },
      ],
    },
    {
      label: "Other",
      items: [
        { id: "recognition", label: "Awards" },
        { id: "contact", label: "Contact" },
      ],
    },
  ];

  // New Addition
  // Determine when to show desktop navigation vs mobile navigation
  const showDesktopNav = !isMobile || (isLandscape && !isMobile) || isTablet;

  return (
    <Box sx={{ display: "flex" }}>
      <StyledAppBar position="fixed">
        <Toolbar sx={{ minHeight: (theme) => theme.mixins.toolbar.minHeight }}>
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
              {/* <Menu
                id="resume-menu"
                anchorEl={resumeAnchorEl}
                open={Boolean(resumeAnchorEl)}
                onClose={handleResumeMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                MenuListProps={{ "aria-labelledby": "resume-button" }}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    borderRadius: 2,
                    minWidth: 220,
                    bgcolor: theme.palette.background.paper,
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                {resumeItems.map(({ id, label }) => (
                  <MenuItem
                    key={id}
                    onClick={() => handleResumeItemClick(id)}
                    sx={{
                      py: 1.2,
                      px: 2,
                      gap: 1,
                      "&:hover": {
                        bgcolor: theme.palette.action.hover,
                      },
                      "&:focus": {
                        bgcolor: theme.palette.action.selected,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: theme.palette.text.secondary, minWidth: 32 }}
                    >
                      {getIconForNavItem(id)}
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        variant: "body1",
                        sx: { color: theme.palette.text.primary },
                      }}
                    >
                      {label}
                    </ListItemText>
                  </MenuItem>
                ))}
              </Menu> */}
              {/* New section */}
              <Menu
                id="resume-menu"
                anchorEl={resumeAnchorEl}
                open={Boolean(resumeAnchorEl)}
                onClose={handleResumeMenuClose}
                TransitionComponent={Grow}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                MenuListProps={{ "aria-labelledby": "resume-button" }}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    borderRadius: 2,
                    minWidth: 240,
                    bgcolor: theme.palette.background.paper,
                    boxShadow: theme.shadows[4],
                    p: 1,
                  },
                }}
              >
                {groupedResumeItems.map((group, groupIndex) => (
                  <Box key={group.label}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        color: theme.palette.text.secondary,
                        textTransform: "uppercase",
                      }}
                    >
                      {group.label}
                    </Typography>
                    {group.items.map((item, itemIndex ) => (
                       <motion.div
        key={item.id}
        custom={groupIndex * 10 + itemIndex}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
                      <MenuItem
                        key={item.id}
                        onClick={() => handleResumeItemClick(item.id)}
                        sx={{
                          py: 1.2,
                          px: 2,
                          gap: 1,
                          "&:hover": {
                            bgcolor: theme.palette.action.hover,
                          },
                          "&:focus": {
                            bgcolor: theme.palette.action.selected,
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: theme.palette.text.secondary,
                            minWidth: 32,
                          }}
                        >
                          {getIconForNavItem(item.id)}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          slotProps={{
                            primary: {
                              variant: "body1",
                              sx: { color: theme.palette.text.primary },
                            },
                          }}
                        />
                      </MenuItem>
                      </motion.div>
                    ))}
                    {groupIndex  < groupedResumeItems.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </Box>
                ))}
              </Menu>
              {/* End New Section */}

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

              {/* Settings Icon */}
              <IconButton
                onClick={handleSettingsClick}
                onMouseEnter={handleSettingsMouseEnter}
                color="inherit"
                aria-label="settings"
                sx={{ ml: 1 }}
              >
                <SettingsIcon />
              </IconButton>

              {/* Settings Menu */}
              <Menu
                anchorEl={settingsAnchorEl}
                open={Boolean(settingsAnchorEl)}
                onClose={handleSettingsClose}
                MenuListProps={{
                  onMouseEnter: () => setSettingsHover(true),
                  onMouseLeave: handleSettingsMouseLeave,
                  sx: { minWidth: 220 },
                }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {/* User Profile Section */}
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {isAuthenticated ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {user?.avatar_url ? (
                        <Avatar
                          src={user.avatar_url}
                          alt={user.login}
                          sx={{ width: 40, height: 40, mr: 1.5 }}
                        />
                      ) : (
                        <Avatar sx={{ width: 40, height: 40, mr: 1.5 }}>
                          <PersonIcon />
                        </Avatar>
                      )}
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {user?.name || user?.login || "User"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user?.email || "Authenticated"}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ width: 40, height: 40, mr: 1.5 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          Guest User
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<GitHubIcon />}
                          onClick={() => {
                            handleSettingsClose();
                            const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${config.github.redirectUri}&scope=user,repo`;
                            window.location.href = githubAuthUrl;
                          }}
                        >
                          Login with GitHub
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Theme Toggle */}
                <MenuItem onClick={() => toggleDarkMode(!isDarkMode)}>
                  <ListItemIcon>
                    {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={isDarkMode ? "Light Mode" : "Dark Mode"}
                  />
                </MenuItem>

                {/* Color Palette Section */}
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Color Theme
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {availablePalettes.map((palette, index) => (
                      <Tooltip key={palette.name} title={palette.name} arrow>
                        <Box
                          onClick={() => handlePaletteSelect(index)}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            bgcolor: palette.primary,
                            border: "2px solid",
                            borderColor:
                              index === currentPaletteIndex
                                ? "primary.main"
                                : "transparent",
                            cursor: "pointer",
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "scale(1.2)",
                            },
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </Box>

                {/* User Actions */}
                {isAuthenticated && (
                  <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                    <MenuItem
                      component={RouterLink}
                      to="/profile"
                      onClick={handleSettingsClose}
                    >
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/dashboard"
                      onClick={handleSettingsClose}
                    >
                      <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleSettingsClose();
                        logout();
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </MenuItem>
                  </Box>
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
              sx={{
                ml: "auto",
                position: { xs: "absolute", sm: "relative" },
                right: { xs: 8, sm: "auto" },
                zIndex: 1100,
              }}
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
