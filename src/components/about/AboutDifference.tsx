// src/components/about/AboutDifference.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Paper, Stack, useTheme } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useTranslations } from 'next-intl';

const AboutDifference = () => {
  const t = useTranslations('About.Difference');
  const theme = useTheme();

  const pillars = [
    {
      id: 1,
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#38bdf8' }} />, // Cyan for Speed
      titleKey: "pillars.speed.title",
      descKey: "pillars.speed.description"
    },
    {
      id: 2,
      icon: <MonetizationOnIcon sx={{ fontSize: 40, color: '#10b981' }} />, // Emerald for Money
      titleKey: "pillars.commission.title",
      descKey: "pillars.commission.description"
    },
    {
      id: 3,
      icon: <PhoneIphoneIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />, // Amber for Mobile
      titleKey: "pillars.mobile.title",
      descKey: "pillars.mobile.description"
    }
  ];

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography 
            variant="overline" 
            sx={{ color: 'text.secondary', letterSpacing: 2, fontWeight: 700 }}
          >
            {t('sectionTitle')}
          </Typography>
          <Typography 
            variant="h3" 
            sx={{ fontWeight: 800, color: 'white', mt: 1 }}
          >
            {t('headline')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {pillars.map((pillar) => (
            <Grid size={{ xs: 12, md: 4 }} key={pillar.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  // Glassmorphism Card
                  backgroundColor: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    boxShadow: `0 10px 40px -10px rgba(0,0,0,0.5)`
                  }
                }}
              >
                <Stack spacing={3} alignItems="flex-start">
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: 'rgba(255,255,255,0.05)',
                      display: 'inline-flex',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    {pillar.icon}
                  </Box>
                  
                  <Box>
                    <Typography variant="h5" fontWeight={700} sx={{ color: 'white', mb: 1 }}>
                      {t(pillar.titleKey)}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {t(pillar.descKey)}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutDifference;