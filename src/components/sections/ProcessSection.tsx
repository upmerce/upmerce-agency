// src/components/sections/ProcessSection.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, useTheme, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ProcessSection() {
  const t = useTranslations('AgencyProcess');
  const theme = useTheme();

  const processSteps = [0, 1, 2, 3].map(index => ({
    step: `0${index + 1}`,
    title: t(`steps.${index}.title`),
    description: t(`steps.${index}.description`),
  }));

  return (
    <Box
      id="our-process"
      component="section"
      aria-labelledby="process-title"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default, // Obsidian
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
           <Typography 
            variant="overline" 
            sx={{ 
              color: theme.palette.secondary.main, 
              letterSpacing: 3, 
              fontWeight: 700 
            }}
          >
            THE BLUEPRINT
          </Typography>
          <Typography
            id="process-title"
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'white',
              mb: 2,
            }}
          >
            {t('title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
            {t('subtitle')}
          </Typography>
        </Box>

        {/* The Pipeline Grid */}
        <Grid container spacing={4}>
          {processSteps.map((item, index) => (
            <Grid  key={index} sx={{ position: 'relative' }} size={{xs: 12, md: 3}}>
              
              {/* Connector Line (Desktop Only - except last item) */}
              {index < processSteps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    top: '50%',
                    right: -20, // Position between cards
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    color: 'rgba(255,255,255,0.1)'
                  }}
                >
                  <ArrowForwardIcon />
                </Box>
              )}

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  // "Obsidian Glass"
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    borderColor: theme.palette.secondary.main, // Amber Glow
                    '& .step-number': {
                      color: theme.palette.secondary.main,
                      opacity: 0.2
                    }
                  }
                }}
              >
                {/* Background Giant Number */}
                <Typography
                  className="step-number"
                  variant="h1"
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    fontSize: '6rem',
                    fontWeight: 900,
                    color: 'white',
                    opacity: 0.03, // Subtle watermark
                    transition: 'all 0.3s ease',
                    zIndex: 0,
                    userSelect: 'none'
                  }}
                >
                  {item.step}
                </Typography>

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {/* Step Badge */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: `1px solid ${theme.palette.secondary.main}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: `0 0 15px ${theme.palette.secondary.main}20`
                    }}
                  >
                    <Typography 
                      variant="button" 
                      sx={{ color: theme.palette.secondary.main, fontWeight: 700 }}
                    >
                      {index + 1}
                    </Typography>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', mb: 1.5, lineHeight: 1.2 }}>
                    {item.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}