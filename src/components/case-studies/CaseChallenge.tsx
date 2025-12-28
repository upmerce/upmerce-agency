// src/components/case-studies/CaseChallenge.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, Paper, useTheme } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CaseChallenge = () => {
  const t = useTranslations('CaseStudies.Challenge');
  const theme = useTheme();

  // Map to MUI Icons
  const painPoints = [
    { icon: <MonetizationOnIcon sx={{ color: '#ef4444' }} />, titleKey: "painPoints.commission.title", descKey: "painPoints.commission.description" },
    { icon: <CrisisAlertIcon sx={{ color: '#f97316' }} />, titleKey: "painPoints.chaos.title", descKey: "painPoints.chaos.description" },
    { icon: <AccessTimeIcon sx={{ color: '#eab308' }} />, titleKey: "painPoints.desk.title", descKey: "painPoints.desk.description" }
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        
        <Box sx={{ textAlign: 'center', mb: 12, maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: '#ef4444', fontWeight: 700, letterSpacing: 2 }}>
            THE DIAGNOSIS
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ color: 'white', mt: 1, mb: 2 }}>
            {t('title')}
          </Typography>
          <Typography variant="body1" fontSize="1.2rem" sx={{ color: 'text.secondary' }}>
            {t('description')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {painPoints.map((point, index) => (
            <Grid  size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  // Dark "Warning" Card
                  bgcolor: 'rgba(239, 68, 68, 0.03)', 
                  border: '1px solid rgba(239, 68, 68, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    boxShadow: '0 10px 30px -10px rgba(239, 68, 68, 0.1)'
                  }
                }}
              >
                <Box sx={{ 
                  mb: 3, p: 1.5, display: 'inline-flex', 
                  borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.1)' 
                }}>
                  {point.icon}
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'white', mb: 2 }}>
                  {t(point.titleKey)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {t(point.descKey)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default CaseChallenge;