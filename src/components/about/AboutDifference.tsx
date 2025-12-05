// /src/components/about/AboutDifference.tsx
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
      icon: <SpeedIcon sx={{ fontSize: 60 }} color="primary" />,
      titleKey: "pillars.speed.title",
      descKey: "pillars.speed.description"
    },
    {
      id: 2,
      icon: <MonetizationOnIcon sx={{ fontSize: 60 }} color="success" />,
      titleKey: "pillars.commission.title",
      descKey: "pillars.commission.description"
    },
    {
      id: 3,
      icon: <PhoneIphoneIcon sx={{ fontSize: 60 }} color="secondary" />,
      titleKey: "pillars.mobile.title",
      descKey: "pillars.mobile.description"
    }
  ];

  return (
    <Box 
      component="section" 
      // ▼▼▼ UPDATED COLORS: Alternating dark background ▼▼▼
      sx={{ 
        py: { xs: 8, md: 12 },
        bgcolor: 'grey.800',
        color: 'common.white'
      }}
    >
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          <Typography 
            variant="h5" 
            color="primary" 
            fontWeight="bold" 
            gutterBottom
            sx={{ textTransform: 'uppercase', letterSpacing: 1 }}
          >
            {t('sectionTitle')}
          </Typography>
          <Typography 
            variant="h3" 
            sx={{ fontWeight: 800, mb: 2 }}
          >
            {t('headline')}
          </Typography>
        </Box>

        {/* The 3-Column Grid of Pillars */}
        <Grid container spacing={4}>
          {pillars.map((pillar) => (
            <Grid size={{ xs: 12, md: 4 }} key={pillar.id}>
              <Paper
                elevation={2}
                // ▼▼▼ UPDATED CARDS: Dark background, light border ▼▼▼
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  bgcolor: 'grey.900', // Dark card background
                  color: 'common.white', // White text
                  border: `1px solid ${theme.palette.grey[800]}`, // Subtle border
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[10],
                    borderColor: 'primary.main' // Highlight border on hover
                  }
                }}
              >
                <Stack spacing={3} alignItems="flex-start">
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: '50%', 
                      // Darker background for icon circle
                      bgcolor: 'grey.800',
                      display: 'inline-flex',
                    }}
                  >
                    {pillar.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {t(pillar.titleKey)}
                  </Typography>
                  {/* Lighter gray text for description */}
                  <Typography variant="body1" color="grey.400" sx={{ lineHeight: 1.7 }}>
                    {t(pillar.descKey)}
                  </Typography>
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