// src/components/about/AboutProcess.tsx
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
      sx={{ 
        py: { xs: 8, md: 15 }, 
        backgroundColor: theme.palette.background.default, 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Glow */}
      <Box sx={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '800px', height: '400px', 
        background: `radial-gradient(circle, ${theme.palette.secondary.main}08 0%, transparent 70%)`,
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography variant="overline" sx={{ color: theme.palette.secondary.main, letterSpacing: 2, fontWeight: 700 }}>
            {t('sectionTitle')}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mt: 1 }}>
            {t('headline')}
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ position: 'relative' }}>
          {/* Connector Line (Desktop) */}
          {!isMobile && (
            <Box 
              sx={{ 
                position: 'absolute', top: '40px', left: '12%', right: '12%', height: '1px',
                background: `linear-gradient(90deg, transparent 0%, ${theme.palette.secondary.main} 50%, transparent 100%)`, 
                opacity: 0.5,
                zIndex: 0
              }} 
            />
          )}

          {steps.map((step) => (
            <Grid size={{ xs: 12, md: 3 }} key={step.number}>
              <Stack 
                spacing={3} 
                alignItems="center" 
                sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
              >
                {/* Number Badge */}
                <Box 
                  sx={{ 
                    width: '80px', height: '80px', borderRadius: '50%',
                    backgroundColor: theme.palette.background.default, // Match bg to cut line
                    border: `1px solid ${theme.palette.secondary.main}`,
                    color: theme.palette.secondary.main,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 20px ${theme.palette.secondary.main}30`
                  }}
                >
                  <Typography variant="h4" fontWeight={800}>{step.number}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ color: 'white', mb: 1 }}>
                    {t(step.titleKey)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, maxWidth: '220px', mx: 'auto' }}>
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