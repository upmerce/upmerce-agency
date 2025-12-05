// /src/app/[locale]/campaign/qualify/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { 
  Container, Paper, Typography, TextField, Button, Box, 
  FormControl, InputLabel, Select, MenuItem, 
  FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress, Stack, Alert
} from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';
// ▲▲▲

export default function QualifyPage() {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('Campaign.Qualify');
  // ▲▲▲
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [websiteUrl, setWebsiteUrl] = useState('');
  const [tourCount, setTourCount] = useState('');
  const [isOwner, setIsOwner] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/campaign');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <Box sx={{ display: 'flex', height: '80vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
        <CircularProgress />
        {/* ▼▼▼ TRANSLATED LOADING TEXT ▼▼▼ */}
        <Typography color="text.secondary">{t('loadingAuth')}</Typography>
         {/* ▲▲▲ */}
      </Box>
    );
  }

  // Get first name for the greeting, fallback if missing
  const userFirstName = user.displayName?.split(' ')[0] || 'Candidate';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!websiteUrl || !tourCount || !isOwner) {
      // ▼▼▼ TRANSLATED VALIDATION ERROR ▼▼▼
      setError(t('validationError'));
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        websiteUrl,
        tourCount,
        isOwner: isOwner === 'yes',
      };

      const response = await fetch('/api/campaign/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        // Use server error if available, otherwise fallback translation
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || t('submitError'));
      }

      router.push('/campaign/thank-you');

    } catch (err: unknown) {
      console.error("Submission error:", err);
      const message = err instanceof Error ? err.message : String(err || t('submitError'));
      setError(message || t('submitError'));
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 8, md: 12 }, pb: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
          <Stack alignItems="center" spacing={2} mb={4}>
            <RocketLaunchIcon color="primary" sx={{ fontSize: 50 }} />
            {/* ▼▼▼ DYNAMIC TRANSLATED TITLE ▼▼▼ */}
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              {t('title', { name: userFirstName })}
            </Typography>
             {/* ▲▲▲ */}
            <Typography variant="body1" color="text.secondary" textAlign="center">
              {t('subtitle')}
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Q1: Website URL */}
              <TextField
                label={t('labels.websiteUrl')}
                variant="outlined"
                fullWidth
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder={t('labels.websitePlaceholder')}
              />

              {/* Q2: Tour Count */}
              <FormControl fullWidth required>
                <InputLabel>{t('labels.tourCount')}</InputLabel>
                <Select
                  value={tourCount}
                  label={t('labels.tourCount')}
                  onChange={(e) => setTourCount(e.target.value)}
                >
                  <MenuItem value="1-5">1 - 5</MenuItem>
                  <MenuItem value="6-20">6 - 20</MenuItem>
                  <MenuItem value="21+">21+</MenuItem>
                </Select>
              </FormControl>

              {/* Q3: Owner Status */}
              <FormControl component="fieldset" required>
                <FormLabel component="legend">{t('labels.isOwnerLegend')}</FormLabel>
                <RadioGroup
                  row
                  value={isOwner}
                  onChange={(e) => setIsOwner(e.target.value)}
                >
                  <FormControlLabel value="yes" control={<Radio />} label={t('labels.yes')} />
                  <FormControlLabel value="no" control={<Radio />} label={t('labels.no')} />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
              >
                {/* ▼▼▼ TRANSLATED BUTTON STATES ▼▼▼ */}
                {isSubmitting ? t('submittingButton') : t('submitButton')}
                {/* ▲▲▲ */}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}