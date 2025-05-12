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
  Stack
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

  // Group items by first letter for better organization
  const groupedItems = useMemo(() => {
    const groups = {};
    
    filteredItems.forEach(item => {
      const firstLetter = item.acronym[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(item);
    });
    
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
          data-aos="fade-down"
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
          data-aos="fade-up"
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
          <Box key={letter} sx={{ mb: 4 }} data-aos="fade-up">
            <Typography
              variant="h5"
              component="h2"
              sx={{ 
                mb: 2,
                fontWeight: 500,
                color: 'text.primary',
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                pb: 1
              }}
            >
              {letter}
            </Typography>
            
            <Grid container spacing={3}>
              {items.map(item => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      height: 200,
                      position: 'relative',
                      transition: 'transform 0.6s',
                      transformStyle: 'preserve-3d',
                      transform: flippedCards[item.id] ? 'rotateY(180deg)' : 'rotateY(0)',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 6
                      }
                    }}
                    onClick={() => handleCardFlip(item.id)}
                  >
                    {/* Front of card */}
                    <CardContent
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        width: '100%',
                        p: 3
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Icon color="primary" sx={{ mr: 1 }}>{item.icon}</Icon>
                        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                          {item.acronym}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {item.fullForm}
                      </Typography>
                      
                      <Chip 
                        label={item.category} 
                        size="small" 
                        color="secondary"
                        sx={{ alignSelf: 'flex-start' }}
                      />
                    </CardContent>
                    
                    {/* Back of card */}
                    <CardContent
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        position: 'absolute',
                        width: '100%',
                        p: 3
                      }}
                    >
                      <Typography variant="body1">
                        {item.details}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
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
