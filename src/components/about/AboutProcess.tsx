// /src/components/about/AboutProcess.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';

const AboutProcess = () => {
  const t = useTranslations('About.Process');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const steps = [
    { number: '01', titleKey: 'steps.step1.title', descKey: 'steps.step1.description' },
    { number: '02', titleKey: 'steps.step2.title', descKey: 'steps.step2.description' },
    { number: '03', titleKey: 'steps.step3.title', descKey: 'steps.step3.description' },
    { number: '04', titleKey: 'steps.step4.title', descKey: 'steps.step4.description' },
  ];

  return (
    <Box 
      component="section" 
      // ▼▼▼ UPDATED COLORS: Alternating dark background ▼▼▼
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.800', color: 'common.white' }}
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

        {/* The Process Steps Grid */}
        <Grid container spacing={4} sx={{ position: 'relative' }}>
          
          {!isMobile && (
            <Box 
              sx={{ 
                position: 'absolute', top: '60px', left: '10%', right: '10%', height: '2px',
                // Darker connecting line
                bgcolor: 'grey.700', zIndex: 0
              }} 
            />
          )}

          {steps.map((step) => (
            <Grid size={{ xs: 12, md: 3 }} key={step.number}>
              <Stack spacing={3} alignItems={isMobile ? 'flex-start' : 'center'} sx={{ textAlign: isMobile ? 'left' : 'center', position: 'relative', zIndex: 1 }}>
                {/* Number Circle */}
                <Box 
                  sx={{ 
                    width: '80px', height: '80px', borderRadius: '50%',
                    bgcolor: 'primary.main', color: 'common.white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: theme.shadows[6], 
                    // Dark border matching background to create "cutout" effect
                    border: `4px solid ${theme.palette.grey[800]}`
                  }}
                >
                  <Typography variant="h4" fontWeight={800}>{step.number}</Typography>
                </Box>
                
                {/* Title & Description */}
                <Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {t(step.titleKey)}
                  </Typography>
                  {/* Lighter gray text */}
                  <Typography variant="body1" color="grey.400" sx={{ lineHeight: 1.6 }}>
                    {t(step.descKey)}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutProcess;