// src/app/[locale]/campaign/CampaignClientPage.tsx
'use client';

import React from 'react';
import { Container, Box, Typography, Stack, Paper, Grid, useTheme, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DevicesIcon from '@mui/icons-material/Devices';
import GoogleSignInButton from '@/components/campaign/GoogleSignInButton';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useTranslations } from 'next-intl';

export default function CampaignClientPage() {
  const t = useTranslations('Campaign.Landing');
  const theme = useTheme();

  const benefits = [
    {
      icon: <MonetizationOnIcon sx={{ color: '#10b981' }} fontSize="large" />,
      title: t('Benefits.zeroCommissionTitle'),
      description: t.rich('Benefits.zeroCommissionDesc', { strong: (chunks) => <strong style={{ color: 'white' }}>{chunks}</strong> })
    },
    {
      icon: <RocketLaunchIcon sx={{ color: '#38bdf8' }} fontSize="large" />,
      title: t('Benefits.seoTitle'),
      description: t.rich('Benefits.seoDesc', { strong: (chunks) => <strong style={{ color: 'white' }}>{chunks}</strong> })
    },
    {
      icon: <DevicesIcon sx={{ color: theme.palette.secondary.main }} fontSize="large" />,
      title: t('Benefits.mobileAdminTitle'),
      description: t.rich('Benefits.mobileAdminDesc', { strong: (chunks) => <strong style={{ color: 'white' }}>{chunks}</strong> })
    }
  ];

  return (
    <Box sx={{ 
      bgcolor: '#030303', // Obsidian
      minHeight: '100vh', 
      pt: { xs: 8, md: 15 }, 
      pb: 8,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow */}
      <Box sx={{ 
        position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', 
        background: `radial-gradient(circle, ${theme.palette.secondary.main}15 0%, transparent 70%)`,
        filter: 'blur(100px)', zIndex: 0 
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} alignItems="center">
          
          {/* Left Column: The Sales Pitch */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ mb: 6 }}>
              <Chip 
                icon={<AutoAwesomeIcon sx={{ fontSize: '16px !important', color: 'black !important' }} />}
                label="BETA ACCESS" 
                sx={{ 
                  mb: 3, 
                  bgcolor: theme.palette.secondary.main, 
                  color: 'black', 
                  fontWeight: 700, 
                  border: '1px solid white'
                }} 
              />
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 900, 
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  lineHeight: 1.1,
                  mb: 3,
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em'
                }}
              >
                {t('heroTitle')}
              </Typography>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 400, color: 'white' }}>
                {t('heroSubtitle')}
              </Typography>
              <Typography variant="body1" fontSize="1.2rem" sx={{ mb: 6, maxWidth: '600px', color: 'text.secondary', lineHeight: 1.6 }}>
                {t.rich('heroDescription', {
                    strong: (chunks) => <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>{chunks}</Box>
                })}
              </Typography>
            </Box>

            <Stack spacing={3}>
              {benefits.map((benefit, index) => (
                <Paper 
                  key={index} 
                  elevation={0}
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3,
                    bgcolor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.04)',
                      transform: 'translateX(10px)',
                      borderColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <Box sx={{ mt: 0.5 }}>{benefit.icon}</Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', mb: 0.5 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {benefit.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Grid>

          {/* Right Column: The "Black Card" CTA */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper 
              elevation={24} 
              sx={{ 
                p: 5, 
                borderRadius: 4, 
                textAlign: 'center',
                // Glassmorphism Dark
                background: 'rgba(20, 20, 20, 0.6)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.palette.secondary.main}40`,
                boxShadow: `0 0 50px -10px ${theme.palette.secondary.main}20`
              }}
            >
              <Box sx={{ mb: 3, display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }}>
                 <RocketLaunchIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
              </Box>
              
              <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
                {t('ctaCardTitle')}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                {t('ctaCardSubtitle')}
              </Typography>

              {/* The Google Button Wrapper */}
              <Box sx={{ '& button': { width: '100% !important', justifyContent: 'center !important' } }}>
                 <GoogleSignInButton /> 
              </Box>

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 4 }}>
                <CheckCircleIcon sx={{ color: '#10b981', fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {t('securityNote')}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}