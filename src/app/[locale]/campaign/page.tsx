// /src/app/[locale]/campaign/page.tsx
'use client'; // Must be a client component to use useTranslations

import React from 'react';
import { Container, Box, Typography, Stack, Paper, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DevicesIcon from '@mui/icons-material/Devices';
import GoogleSignInButton from '@/components/campaign/GoogleSignInButton';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';
// ▲▲▲

// Note: We cannot use server-side metadata export here because we are now a client component.
// We will handle metadata in the layout or a separate server component later if needed for ads.

export default function CampaignLandingPage() {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('Campaign.Landing');
  // ▲▲▲

  // Define benefits using translation keys
  const benefits = [
    {
      icon: <MonetizationOnIcon color="success" fontSize="large" />,
      title: t('Benefits.zeroCommissionTitle'),
      description: t.rich('Benefits.zeroCommissionDesc')
    },
    {
      icon: <RocketLaunchIcon color="primary" fontSize="large" />,
      title: t('Benefits.seoTitle'),
      description: t.rich('Benefits.seoDesc')
    },
    {
      icon: <DevicesIcon color="info" fontSize="large" />,
      title: t('Benefits.mobileAdminTitle'),
      description: t.rich('Benefits.mobileAdminDesc')
    }
  ];

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      color: (theme) => theme.palette.getContrastText(theme.palette.background.default),
      minHeight: '100vh', 
      pt: { xs: 8, md: 12 }, 
      pb: 8
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Column: The Sales Pitch */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 800, 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  mb: 2,
                  background: '-webkit-linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('heroTitle')}
              </Typography>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 500, color: (theme) => theme.palette.getContrastText(theme.palette.background.default) }}>
                {t('heroSubtitle')}
              </Typography>
              <Typography variant="body1" fontSize="1.2rem" sx={{ mb: 4, maxWidth: '600px', color: 'rgba(255,255,255,0.85)' }}>
                {/* Use t.rich for content with html tags like <strong> */}
                {t.rich('heroDescription', {
                    strong: (chunks) => <strong>{chunks}</strong>
                })}
              </Typography>
            </Box>

            <Stack spacing={3}>
              {benefits.map((benefit, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ mt: 0.5 }}>{benefit.icon}</Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.76)' }}>
                      {benefit.description}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>

          {/* Right Column: The CTA Card */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper 
              elevation={12} 
              sx={{ 
                p: 5, 
                borderRadius: 4, 
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
               <RocketLaunchIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {t('ctaCardTitle')}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                {t('ctaCardSubtitle')}
              </Typography>

              {/* The Google Button component will handle its own translations in the next step */}
              <GoogleSignInButton /> 

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 3 }}>
                <CheckCircleIcon color="success" fontSize="small" />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
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