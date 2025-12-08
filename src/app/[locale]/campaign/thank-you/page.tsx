// /src/app/[locale]/campaign/thank-you/page.tsx
'use client';

import React, { useEffect } from 'react';
import { Container, Paper, Typography, Box, Button, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
// ▼▼▼ 1. ADD ReactPixel IMPORT ▼▼▼
import ReactPixel from 'react-facebook-pixel';
// ▲▲▲

export default function ThankYouPage() {
  const t = useTranslations('Campaign.ThankYou');
  const locale = useLocale();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const announcementDates: Record<string, string> = {
    en: 'January 15, 2026',
    fr: '15 Janvier 2026',
    ar: '15 يناير 2026'
  };

  const dateString = announcementDates[locale] || announcementDates.en;

  // ▼▼▼ 2. ADD PIXEL TRACKING useEffect ▼▼▼
  useEffect(() => {
    // Only fire if the user is authenticated and not loading
    if (!authLoading && user) {
      try {
        // Track the standard 'SubmitApplication' event
        ReactPixel.track('SubmitApplication');
        console.log('Meta Pixel: SubmitApplication event fired successfully');
      } catch (error) {
        // Fail silently in production, log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Meta Pixel Error:', error);
        }
      }
    }
  }, [authLoading, user]); // Run this when auth state changes
  // ▲▲▲

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/campaign');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <Box sx={{ display: 'flex', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '80vh', pt: { xs: 8, md: 12 }, pb: 8, bgcolor: 'background.default',
      display: 'flex', alignItems: 'center'
    }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4, textAlign: 'center' }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
          
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {t('title')}
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {t('subtitle')}
          </Typography>

          <Box sx={{ bgcolor: 'action.hover', p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {t('nextStepsTitle')}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
               {t.rich('nextStepsDesc', {
                 date: dateString, 
                 strong: (chunks) => <strong>{chunks}</strong>
               })}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {t('demoTitle')}
          </Typography>

          <Button
            variant="outlined"
            size="large"
            href="https://www.marrago.com"
            target="_blank"
            sx={{ py: 1.5, px: 4, fontWeight: 'bold' }}
          >
            {t('demoButton')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}