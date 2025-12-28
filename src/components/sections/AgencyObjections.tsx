// src/components/sections/AgencyObjections.tsx
'use client';

import React from 'react';
import { Container, Grid, Typography, Box, Paper, useTheme } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldIcon from '@mui/icons-material/Shield'; // Added alternative icon for variety if needed
import { useTranslations } from 'next-intl';

const AgencyObjections: React.FC = () => {
  const theme = useTheme();
  const t = useTranslations('AgencyObjections');
  const items = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default, // Obsidian
        borderTop: '1px solid rgba(255,255,255,0.05)', // Subtle separator
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          <Typography
            variant="overline"
            sx={{ 
              color: theme.palette.success.main, // Teal for "Safety/Trust"
              fontWeight: 700, 
              letterSpacing: 2,
              mb: 1,
              display: 'block'
            }}
          >
            THE SAFETY NET
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: 'white',
            }}
          >
            {t('title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
            {t('subtitle')}
          </Typography>
        </Box>

        {/* OBJECTIONS GRID */}
        <Grid container spacing={4}>
          {items?.map((item, index) => (
            <Grid  key={index} size={{xs: 12, md: 6}}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  // The "Obsidian Glass" Look
                  backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
                  },
                }}
              >
                {/* ICON + QUESTION */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box 
                    sx={{ 
                      mr: 2, 
                      mt: 0.5,
                      p: 1,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(45, 212, 191, 0.1)', // Teal Tint
                      color: theme.palette.success.main, // Teal Icon
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <VerifiedUserIcon fontSize="medium" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.4, color: 'white' }}>
                    {item.question}
                  </Typography>
                </Box>
                
                {/* ANSWER */}
                <Typography variant="body1" sx={{ lineHeight: 1.7, ml: 7, color: 'text.secondary' }}>
                  {item.answer}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AgencyObjections;