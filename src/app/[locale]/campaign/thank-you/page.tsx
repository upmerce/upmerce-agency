// src/app/[locale]/campaign/thank-you/page.tsx
'use client';

import React, { useEffect } from 'react';
import { Container, Paper, Typography, Box, Button, CircularProgress, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import ReactPixel from 'react-facebook-pixel';

export default function ThankYouPage() {
  const t = useTranslations('Campaign.ThankYou');
  const locale = useLocale();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const announcementDates: Record<string, string> = {
    en: 'January 15, 2026',
    fr: '15 Janvier 2026',
    ar: '15 يناير 2026'
  };

  const dateString = announcementDates[locale] || announcementDates.en;

  useEffect(() => {
    if (!authLoading && user) {
      try {
        ReactPixel.track('SubmitApplication');
      } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error('Meta Pixel Error:', error);
      }
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/campaign');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', bgcolor: '#030303' }}>
        <CircularProgress sx={{ color: theme.palette.success.main }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', pt: { xs: 8, md: 15 }, pb: 8, bgcolor: '#030303',
      display: 'flex', alignItems: 'center'
    }}>
      <Container maxWidth="sm">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            borderRadius: 4, 
            textAlign: 'center',
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: `0 0 50px -10px rgba(16, 185, 129, 0.2)` // Green Glow
          }}
        >
          {/* Animated Success Icon */}
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
             <Box sx={{ 
                position: 'absolute', inset: 0, 
                bgcolor: '#10B981', filter: 'blur(30px)', opacity: 0.4 
             }} />
             <CheckCircleIcon sx={{ fontSize: 100, color: '#10B981', position: 'relative' }} />
          </Box>
          
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
            {t('title')}
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 6, color: 'text.secondary', fontWeight: 400 }}>
            {t('subtitle')}
          </Typography>

          <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 4, borderRadius: 3, mb: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: theme.palette.secondary.main, mb: 1, letterSpacing: 1, textTransform: 'uppercase' }}>
              {t('nextStepsTitle')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }} component="div">
               {t.rich('nextStepsDesc', {
                 date: dateString, 
                 strong: (chunks) => <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>{chunks}</Box>
               })}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            {t('demoTitle')}
          </Typography>

          <Button
            variant="outlined"
            size="large"
            href="https://www.marrago.com"
            target="_blank"
            endIcon={<OpenInNewIcon />}
            sx={{ 
               py: 1.5, px: 5, fontWeight: 'bold', borderRadius: '50px',
               color: 'white', borderColor: 'rgba(255,255,255,0.2)',
               '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' }
            }}
          >
            {t('demoButton')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}