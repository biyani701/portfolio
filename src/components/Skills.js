import React, { useState, useMemo } from "react";
import {
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Box,
  useTheme,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";

// Icons
import CodeIcon from "@mui/icons-material/Code";

import BuildIcon from "@mui/icons-material/Build";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WebIcon from "@mui/icons-material/Web";

import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import BugReportIcon from "@mui/icons-material/BugReport";
import CloudIcon from "@mui/icons-material/Cloud";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { FaDatabase } from "react-icons/fa";

// Import the getSkillIcon function


const getSkillIcon = (skillName) => {
  const iconMap = {
    // Programming
    Python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    "C++":
      "https://cdn.jsdelivr.net/npm/@programming-languages-logos/cpp@0.0.2/cpp.svg",
    JavaScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    HTML5:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",

    // Libraries & Frameworks
    "React.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    dash: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg",
    Bootstrap:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    "Tailwind CSS": "/images/tailwindcss-original.svg",
    Sass: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    Flask:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    "Node.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",

    // Databases
    Oracle:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    PostgreSQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "MS SQL":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    MySQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    MongoDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",

    // IDEs & Editors
    PyCharm:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg",
    "VS Code":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    IntelliJ:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
    Eclipse:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg",

    // Version Control & CI/CD
    Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    SVN: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/subversion/subversion-original.svg",
    GitHub:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    GitLab:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    Bitbucket:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg",
    Jenkins:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    "Bitbucket Pipelines":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg",
    "GitHub Actions":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",

    // Project Management
    Jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    "MS Project":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    Trello:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",

    // Documentation & Collaboration
    Confluence:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    SharePoint: "/images/sharepoint.svg",
    Notion:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
    "Google Docs":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",

    // Testing & QA
    Selenium:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
    Pytest:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Postman:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    SonarQube:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg",

    // Data Visualization & Analytics
    "Plotly Dash":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Excel: "/images/excel.svg",
    Pandas:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    "Power BI": "/images/PowerBi.svg",
    Tableau: "/images/tableau.svg",

    // Cloud & DevOps
    AWS: "/images/aws.svg",
    Azure:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    Docker:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    Terraform:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",

    // Package Managers
    pip: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    npm: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  };

  return iconMap[skillName] || null;
};

// Colors for periodic table view
const getSkillColor = (category) => {
  const colors = {
    // "Tools": "success",
    // "Programming": "primary",
    // "Databases": "secondary",
    // "Libraries": "info",
    // "Repositories": "warning",
    // "Data Visualization": "error",
    // "Domain Knowledge": "default"
    Programming: "alpha",
    Frontend: "beta",
    Database: "secondary",
    SCM: "theta",
    "Cloud & DevOps": "epsilon",
    "Project Management": "alpha",
    "Collaboration Tools": "beta",
    Testing: "gamma",
    Visualization: "theta",
    "Dev Tools": "epsilon",
  };
  const key = colors[category] || "knowledge";

  // Debug: make sure this is a string
  console.log("[getSkillColor]", { category, key });

  // return colors[category] || "default";
  return key;
};

// Enhanced skill data with usage and project experience
export const skillSections = {
  Programming: [
    { name: "Python", years: 5, usage: "current", projectUse: true },
    { name: "C", years: 10, usage: "past", projectUse: true },
    { name: "C++", years: 10, usage: "past", projectUse: true },
    { name: "JavaScript", years: 4, usage: "current", projectUse: false },
    { name: "HTML5", years: 4, usage: "current", projectUse: true },
    { name: "SQL", years: 9, usage: "past", projectUse: true },
    { name: "Java", years: 1, usage: "past", projectUse: false },
  ],
  Frontend: [
    { name: "React.js", years: 1, usage: "current", projectUse: true },
    { name: "CSS3", years: 4, usage: "current", projectUse: true },
    { name: "Tailwind CSS", years: 0.5, usage: "current", projectUse: false },
    { name: "Sass", years: 0.5, usage: "current", projectUse: false },
    { name: "Bootstrap", years: 4, usage: "current", projectUse: true },
    { name: "Flask", years: 3, usage: "current", projectUse: true },
  ],

  Database: [
    { name: "Oracle", years: 9, usage: "past", projectUse: true },
    { name: "Sybase", years: 5, usage: "past", projectUse: true },
    { name: "DB2", years: 2, usage: "past", projectUse: true },
    { name: "PostgreSQL", years: 3, usage: "current", projectUse: true },
    { name: "MS SQL", years: 4, usage: "past", projectUse: true },
    { name: "MongoDB", years: 0.5, usage: "past", projectUse: false },
  ],
  SCM: [
    { name: "Git", years: 5, usage: "current", projectUse: true },
    { name: "SVN", years: 5, usage: "past", projectUse: true },
    { name: "GitHub", years: 5, usage: "current", projectUse: true },
    { name: "Bitbucket", years: 5, usage: "current", projectUse: true },
  ],
  "Cloud & DevOps": [
    {
      name: "Bitbucket Pipelines",
      years: 3,
      usage: "current",
      projectUse: true,
    },
    { name: "Jenkins", years: 1, usage: "current", projectUse: false },
    { name: "GitHub Actions", years: 1, usage: "current", projectUse: false },
    { name: "AWS", years: 1, usage: "past", projectUse: true },
    { name: "Azure", years: 1, usage: "past", projectUse: false },
    { name: "Docker", years: 1, usage: "past", projectUse: false },
    { name: "Terraform", years: 1, usage: "past", projectUse: false },
  ],
  "Project Management": [
    { name: "Jira", years: 10, usage: "current", projectUse: true },
    { name: "MS Project", years: 13, usage: "past", projectUse: true },
    { name: "Trello", years: 1, usage: "current", projectUse: false },
  ],
  "Collaboration Tools": [
    { name: "Confluence", years: 5, usage: "current", projectUse: true },
    { name: "SharePoint", years: 5, usage: "current", projectUse: true },
    { name: "Notion", years: 1, usage: "current", projectUse: false },
  ],
  Testing: [
    { name: "Selenium", years: 1, usage: "current", projectUse: false },
    { name: "Pytest", years: 3, usage: "current", projectUse: true },
    { name: "Postman", years: 1, usage: "current", projectUse: false },
    { name: "SonarQube", years: 1, usage: "current", projectUse: false },
  ],
  Visualization: [
    { name: "Plotly Dash", years: 3, usage: "current", projectUse: true },
    { name: "Pandas", years: 4, usage: "current", projectUse: true },
    { name: "Power BI", years: 1, usage: "past", projectUse: false },
    { name: "Tableau", years: 1, usage: "past", projectUse: true },
  ],
  "Dev Tools": [
    { name: "PyCharm", years: 5, usage: "current", projectUse: true },
    { name: "VS Code", years: 4, usage: "current", projectUse: true },
    { name: "pip", years: 5, usage: "current", projectUse: false },
    { name: "npm", years: 1, usage: "current", projectUse: false },
  ],
};

const categoryIcons = {
  Programming: <CodeIcon />,
  Frontend: <WebIcon />,
  Database: <FaDatabase size={20} />,
  SCM: <CloudIcon />,
  "Cloud & DevOps": <CloudQueueIcon />,
  "Project Management": <AssignmentIcon />,
  "Collaboration Tools": <GroupWorkIcon />,
  Testing: <BugReportIcon />,
  Visualization: <AssessmentIcon />,
  "Dev Tools": <BuildIcon />,
};

// Periodic Table Layout
const periodicTableLayout = {
  row1: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  row2: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  row3: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  row4: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  row5: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  row6: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  row7: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
};

// Helper function to organize skills into periodic table layout
const organizeSkillsIntoPeriodicTable = (
  skills,
  layout = periodicTableLayout
) => {
  console.log(
    `organizeSkillsIntoPeriodicTable called with ${skills.length} skills`
  );

  const table = JSON.parse(JSON.stringify(layout));
  const rows = Object.keys(table);

  const sortedSkills = [...skills].sort((a, b) => {
    if (a.usage !== b.usage) return a.usage === "current" ? -1 : 1;
    if (b.years !== a.years) return b.years - a.years;
    if (a.projectUse !== b.projectUse) return a.projectUse ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const validPositions = [];

  // Define custom placement rules per row
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const rowKey = rows[rowIndex];

    if (rowIndex === 0) {
      // Row 1: Only positions 0 and 17
      validPositions.push({ row: rowKey, col: 0 });
      validPositions.push({ row: rowKey, col: 17 });
    } else if (rowIndex === 1 || rowIndex === 2) {
      // Row 2 and 3: columns 0-1 and 12-17
      [0, 1, 12, 13, 14, 15, 16, 17].forEach((col) => {
        validPositions.push({ row: rowKey, col });
      });
    } else {
      // Rows 4-7: all columns (0–17)
      for (let col = 0; col < 18; col++) {
        validPositions.push({ row: rowKey, col });
      }
    }
  }

  const skillsToPlace = sortedSkills.slice(0, validPositions.length);

  // Fill the table using only valid positions
  skillsToPlace.forEach((skill, index) => {
    const { row, col } = validPositions[index];
    table[row][col] = skill;
  });

  // Log how many skills were actually placed
  console.log(
    `Placed ${skillsToPlace.length} skills out of ${skills.length} in the periodic table`
  );

  // Count non-null cells in the table for verification
  let filledCells = 0;
  Object.values(table).forEach((row) => {
    row.forEach((cell) => {
      if (cell !== null) filledCells++;
    });
  });
  console.log(`Table has ${filledCells} filled cells`);

  return table;
};

// Skill usage badge text
const getUsageBadge = (usage) => {
  return usage === "current" ? "Active" : "Past";
};

const Skills = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Process and sort skills data
  const processedSkills = useMemo(() => {
    const result = {};

    Object.entries(skillSections).forEach(([category, skills]) => {
      // Sort by usage (current first), then by years (descending), then by project use (true first)
      result[category] = [...skills].sort((a, b) => {
        if (a.usage !== b.usage) return a.usage === "current" ? -1 : 1;
        if (b.years !== a.years) return b.years - a.years;
        if (a.projectUse !== b.projectUse) return a.projectUse ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    });

    return result;
  }, []);

  // Get all skills as a flat array for periodic table view
  const allSkills = useMemo(() => {
    const skills = [];

    Object.entries(skillSections).forEach(([category, categorySkills]) => {
      categorySkills.forEach((skill) => {
        skills.push({
          ...skill,
          category,
        });
      });
    });

    // Sort by years (descending), then by name
    return skills.sort(
      (a, b) => b.years - a.years || a.name.localeCompare(b.name)
    );
  }, []);

  // Organize skills into periodic table layout
  const periodicTableData = useMemo(() => {
    // Only filter by search term, not by category
    const searchFilteredSkills = allSkills.filter((skill) => {
      return skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    console.log(`Search filtered skills: ${searchFilteredSkills.length} skills`);

    // Use all skills that match the search term for the periodic table layout
    // The category filtering will be handled by the opacity logic in the rendering
    return organizeSkillsIntoPeriodicTable(searchFilteredSkills);
  }, [allSkills, searchTerm]);

  // Filter skills based on search and category
  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesSearch =
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allSkills, searchTerm, selectedCategory]);

  // Handle view mode change
  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    console.log(`Category changed to: ${category}`);
    setSelectedCategory(category);

    // Force re-render of the periodic table when changing categories
    if (viewMode === "periodic") {
      // This is a workaround to ensure the periodic table updates correctly
      setTimeout(() => {
        const event = new Event("resize");
        window.dispatchEvent(event);
      }, 50);
    }
  };

  // Get all categories for filter
  const categories = ["All", ...Object.keys(skillSections)];

  return (
    <section id="skills" className="py-5">
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: 3, fontWeight: theme.typography.fontWeightBold }}
        >
          Technical Skills
        </Typography>

        {/* View Toggle and Search */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            mb: 3,
            gap: 2,
          }}
        >
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            size="small"
            sx={{ alignSelf: { xs: "center", sm: "flex-start" } }}
          >
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon />{" "}
              <Box sx={{ ml: 1, display: { xs: "none", sm: "block" } }}>
                List
              </Box>
            </ToggleButton>
            <ToggleButton value="periodic" aria-label="periodic table view">
              <ViewModuleIcon />{" "}
              <Box sx={{ ml: 1, display: { xs: "none", sm: "block" } }}>
                Periodic Table
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search skills..."
            size="small"
            sx={{ width: { xs: "100%", sm: "auto", md: "25%" } }}
            // Using slotProps instead of deprecated InputProps
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={clearSearch} edge="end">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Category Filters */}
        {viewMode === "periodic" && (
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryChange(category)}
                color={category === selectedCategory ? "primary" : "default"}
                variant={category === selectedCategory ? "filled" : "outlined"}
                icon={category !== "All" ? categoryIcons[category] : undefined}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <Grid container spacing={3}>
            {Object.entries(processedSkills).map(([category, skills]) => (
              <Grid item xs={12} sm={6} md={4} key={category}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.background.paper
                        : theme.palette.grey[50],
                    borderRadius: theme.shape.borderRadius,
                    transition: theme.transitions.create(["box-shadow"]),
                    "&:hover": {
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      pb: 1,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                        borderRadius: "50%",
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? theme.palette.background.default
                            : theme.palette.primary.light + "20",
                      }}
                    >
                      {categoryIcons[category]}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        ml: 1,
                        fontWeight: theme.typography.fontWeightMedium,
                      }}
                    >
                      {category}
                    </Typography>
                  </Box>

                  {/* Skills Tags */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(100px, 1fr))",
                      gap: 1,
                      mb: 3,
                      minHeight: 120, // Ensure minimum height for consistency
                    }}
                  >
                    {skills.map((skill) => (
                      <Chip
                        key={skill.name}
                        label={skill.name}
                        color={
                          skill.usage === "current" ? "primary" : "default"
                        }
                        variant={skill.projectUse ? "filled" : "outlined"}
                        size="small"
                        sx={{
                          m: 0.5,
                          height: 32, // Fixed height
                          maxWidth: "100%",
                          "& .MuiChip-label": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          },
                        }}
                      />
                    ))}
                  </Box>

                  {/* Skill Progress Bars */}
                  {skills.map((skill) => (
                    <Box key={skill.name} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={theme.typography.fontWeightMedium}
                        >
                          {skill.name}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Chip
                            label={getUsageBadge(skill.usage)}
                            size="small"
                            color={
                              skill.usage === "current" ? "primary" : "default"
                            }
                            sx={{
                              height: 20,
                              "& .MuiChip-label": {
                                px: 1,
                                fontSize: theme.typography.pxToRem(10),
                              },
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={theme.typography.fontWeightMedium}
                          >
                            {skill.years}+ yrs
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((skill.years / 15) * 100, 100)}
                        color={
                          skill.usage === "current" ? "primary" : "secondary"
                        }
                        sx={{
                          height: 8,
                          borderRadius: theme.shape.borderRadius,
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? theme.palette.grey[700]
                              : theme.palette.grey[200],
                          "& .MuiLinearProgress-bar": {
                            borderRadius: theme.shape.borderRadius,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
       

        {/* Periodic Table View */}
        {viewMode === "periodic" && (
          <Box sx={{ mt: 2 }}>
            {Object.keys(periodicTableData).length === 0 ||
            Object.values(periodicTableData).every((row) =>
              row.every((cell) => cell === null)
            ) ? (
              <Typography variant="body1" align="center" sx={{ py: 4 }}>
                No skills found matching your criteria.
              </Typography>
            ) : (
              <Grid container spacing={1}>
                {Object.entries(periodicTableData).map(([rowKey, rowData]) => (
                  <Grid item xs={12} key={rowKey}>
                    <Box
                      sx={{
                        display: "flex",                        
                        justifyContent: "center",
                        gap: { xs: 0.5, sm: 1 },
                      }}
                    >
                      {rowData.map((skill, cellIndex) => {
                        // Check if skill matches both the search term and category filter
                        const matchesSearch = !searchTerm ||
                          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          skill.category.toLowerCase().includes(searchTerm.toLowerCase());

                        const matchesCategory = !skill ||
                          selectedCategory === "All" ||
                          skill.category === selectedCategory;

                        const matchesFilter = matchesSearch && matchesCategory;

                        return (
                          <Box
                            key={`${rowKey}-${cellIndex}`}
                            sx={{
                              width: {
                                xs: 70,
                                sm: 90,
                                md: 110,
                                lg: 120,
                              },
                              m: 0.5,
                            }}
                          >
                            {skill && (
                              <Tooltip
                                title={`${skill.category} • ${skill.years}+ years • ${skill.usage} • ${skill.projectUse ? "Project experience" : "Training only"}`}
                                arrow
                              >
                                <Card
                                  elevation={2}
                                  sx={{
                                    height: { xs: 90, sm: 110, md: 120 },
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    opacity: matchesFilter ? 1 : 0.25,
                                    visibility: "visible",
                                    filter: matchesFilter
                                      ? "none"
                                      : "grayscale(70%)",
                                    transition: (theme) =>
                                      theme.transitions.create([
                                        "transform",
                                        "box-shadow",
                                        "opacity",
                                      ]),
                                    "&:hover": {
                                      transform: "scale(1.5)",
                                      zIndex: 10,
                                      opacity: 1,
                                      boxShadow: (theme) => theme.shadows[10],
                                    },
                                    "&:focus": {
                                      transform: "scale(2.5)",
                                      zIndex: 20,
                                      opacity: 1,
                                      boxShadow: (theme) => theme.shadows[12],
                                    },
                                    border: (theme) =>
                                      `5px solid ${theme.palette[getSkillColor(skill.category)].main}20`,
                                  }}
                                  tabIndex={0}
                                >
                                  <CardContent
                                    sx={{
                                      p: 1,
                                      flexGrow: 1,
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    {/* Skill Icon */}
                                    {getSkillIcon(skill.name) && (
                                      <Box
                                        component="img"
                                        src={getSkillIcon(skill.name)}
                                        alt={`${skill.name} icon`}
                                        sx={{
                                          width: 24,
                                          height: 24,
                                          mb: 1,
                                          opacity: 0.9,
                                        }}
                                      />
                                    )}

                                    {/* Years Badge */}
                                    <Typography
                                      variant="caption"
                                      sx={(theme) => {
                                        const key = getSkillColor(
                                          skill.category
                                        );
                                        console.log(
                                          `[sx debug key] ${skill.category} → ${key}`
                                        );
                                        const color = theme.palette[key]?.main;
                                        console.log(
                                          `[sx debug color] ${skill.category} → ${color}`
                                        );
                                        console.log(
                                          `[sx debug] ${skill.category} → ${key} → ${color}`
                                        );
                                        return {
                                          fontWeight: "bold",
                                          bgcolor: `${color}20`,
                                          color,
                                          px: 1,
                                          py: 0.25,
                                          borderRadius:
                                            theme.shape.borderRadius,
                                          fontSize: "0.65rem",
                                        };
                                      }}
                                    >
                                      {skill.years}yr
                                    </Typography>

                                    {/* Skill name */}
                                    <Typography
                                      variant="subtitle2"
                                      component="h3"
                                      align="center"
                                      sx={{
                                        mt: 0.5,
                                        fontWeight: (theme) =>
                                          theme.typography.fontWeightMedium,
                                        fontSize: {
                                          xs: "0.7rem",
                                          sm: "0.75rem",
                                        },
                                      }}
                                    >
                                      {skill.name}
                                    </Typography>

                                    {/* Status */}
                                    <Chip
                                      label={
                                        skill.usage === "current"
                                          ? "Active"
                                          : "Past"
                                      }
                                      size="small"
                                      color={
                                        skill.usage === "current"
                                          ? "primary"
                                          : "default"
                                      }
                                      sx={{
                                        mt: "auto",
                                        height: 16,
                                        "& .MuiChip-label": {
                                          px: 0.5,
                                          fontSize: "0.625rem",
                                        },
                                      }}
                                    />
                                  </CardContent>
                                </Card>
                              </Tooltip>
                            )}
                          </Box>
                        );
                      })}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Box>
    </section>
  );
};

export default Skills;
