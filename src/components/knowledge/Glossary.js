import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  useTheme,
  Paper,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  Stack,  
} from '@mui/material';
import Icon from '@mui/material/Icon';
import glossaryData from '../../data/glossaryData';

// Glossary component
const Glossary = () => {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});

  // Generate alphabet filters
  const alphabetFilters = useMemo(() => {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const numbers = ['0-9'];
    return [...letters, ...numbers];
  }, []);

  // Filter glossary items based on selected filter
  const filteredItems = useMemo(() => {
    if (selectedFilter === 'all') {
      return glossaryData;
    } else if (selectedFilter === '0-9') {
      return glossaryData.filter(item => /^[0-9]/.test(item.acronym[0]));
    } else {
      return glossaryData.filter(item =>
        item.acronym[0].toUpperCase() === selectedFilter
      );
    }
  }, [selectedFilter]);

  // Log glossary data for debugging
  useEffect(() => {
    console.log('Glossary Data:', glossaryData);
    console.log('Filtered Items:', filteredItems);
  }, [filteredItems]);

  // Group items by first letter for better organization
  const groupedItems = useMemo(() => {
    const groups = {};

    // Ensure we have data to work with
    console.log('filteredItems: ', filteredItems);
    console.log('filteredItems length', filteredItems.length);
    if (!filteredItems || filteredItems.length === 0) {
      console.warn('No filtered items available for grouping');
      return {};
    }

    filteredItems.forEach(item => {
      if (!item.acronym) {
        console.warn('Item missing acronym:', item);
        return;
      }

      const firstLetter = item.acronym[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(item);
    });
    console.log("data in groups");
    console.log(groups);

    // Sort the groups alphabetically
    return Object.keys(groups).sort().reduce((acc, key) => {
      acc[key] = groups[key];
      return acc;
    }, {});
  }, [filteredItems]);

  // Handle card flip
  const handleCardFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Count items for each filter
  const filterCounts = useMemo(() => {
    const counts = { all: glossaryData.length };

    alphabetFilters.forEach(letter => {
      if (letter === '0-9') {
        counts[letter] = glossaryData.filter(item => /^[0-9]/.test(item.acronym[0])).length;
      } else {
        counts[letter] = glossaryData.filter(item =>
          item.acronym[0].toUpperCase() === letter
        ).length;
      }
    });

    return counts;
  }, [alphabetFilters]);

  return (
    <Box
      component="section"
      sx={{
        py: 6,
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: 4,
            color: 'primary.main',
            textAlign: 'center'
          }}
          // data-aos="fade-down"
        >
          Glossary
        </Typography>

        {/* Alphabet filter */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1
          }}
          // data-aos="fade-up"
        >
          <Chip
            label="All"
            color={selectedFilter === 'all' ? 'primary' : 'default'}
            onClick={() => setSelectedFilter('all')}
            sx={{ m: 0.5 }}
          />

          {alphabetFilters.map(letter => (
            <Badge
              key={letter}
              badgeContent={filterCounts[letter] || 0}
              color="secondary"
              showZero
              sx={{ m: 0.5 }}
            >
              <Chip
                label={letter}
                color={selectedFilter === letter ? 'primary' : 'default'}
                onClick={() => setSelectedFilter(letter)}
                disabled={!filterCounts[letter]}
              />
            </Badge>
          ))}
        </Paper>

        {/* Glossary content */}
        {Object.entries(groupedItems).map(([letter, items]) => (
  <Box key={letter} sx={{ mb: 4 }}>
    <Typography
      variant="h5"
      component="h2"
      sx={{
        mb: 2,
        fontWeight: 500,
        color: 'text.primary',
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        pb: 1,
      }}
    >
      {letter}
    </Typography>

    <Grid container spacing={2}>
      {items.map((item) => {
        const isFlipped = flippedCards[item.id];
        return (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Box sx={{ perspective: 1000 }}>
              <Box
                onClick={() =>
                  setFlippedCards((prev) => ({
                    ...prev,
                    [item.id]: !prev[item.id],
                  }))
                }
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    bgcolor: 'background.paper',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    {item.acronym}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    {item.fullForm}
                  </Typography>
                </Box>

                {/* Back */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    bgcolor: 'background.paper',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <Typography variant="body2" color="text.primary" align="center">
                    {item.details}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  </Box>
))}



        {filteredItems.length === 0 && (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              my: 8,
              color: 'text.secondary'
            }}
          >
            No glossary items found for this filter.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Glossary;
