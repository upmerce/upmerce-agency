// src/components/case-studies/CaseResults.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, Paper, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import SearchIcon from '@mui/icons-material/Search';

const CaseResults = () => {
  const t = useTranslations('CaseStudies.Results');
  const theme = useTheme();

  const metrics = [
    { icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#10b981' }} />, valueKey: "metrics.commission.value", labelKey: "metrics.commission.label", descKey: "metrics.commission.description" },
    { icon: <SpeedIcon sx={{ fontSize: 40, color: '#38bdf8' }} />, valueKey: "metrics.time.value", labelKey: "metrics.time.label", descKey: "metrics.time.description" },
    { icon: <SearchIcon sx={{ fontSize: 40, color: '#f472b6' }} />, valueKey: "metrics.seo.value", labelKey: "metrics.seo.label", descKey: "metrics.seo.description" }
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: theme.palette.background.default, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="lg">
        
        <Box sx={{ textAlign: 'center', mb: 12, maxWidth: '800px', mx: 'auto' }}>
           <Typography variant="overline" sx={{ color: '#10b981', fontWeight: 700, letterSpacing: 2 }}>
            ROI VERIFIED
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ color: 'white', mt: 1, mb: 2 }}>
            {t('title')}
          </Typography>
          <Typography variant="body1" fontSize="1.2rem" sx={{ color: 'text.secondary' }}>
            {t('subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {metrics.map((metric, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  height: '100%',
                  borderRadius: 4,
                  textAlign: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <Box sx={{ mb: 3, display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }}>
                  {metric.icon}
                </Box>
                
                {/* The "Neon" Number */}
                <Typography 
                  variant="h2" 
                  fontWeight={800} 
                  sx={{ 
                    mb: 1,
                    background: index === 0 
                      ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' 
                      : 'linear-gradient(135deg, white 0%, #94a3b8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {t(metric.valueKey)}
                </Typography>

                <Typography variant="h6" fontWeight={700} sx={{ color: 'white', mb: 2 }}>
                  {t(metric.labelKey)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {t(metric.descKey)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default CaseResults;