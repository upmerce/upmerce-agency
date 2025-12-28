// src/app/[locale]/campaign/qualify/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { 
  Container, Paper, Typography, TextField, Button, Box, 
  FormControl, InputLabel, Select, MenuItem, 
  FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress, Stack, Alert, useTheme
} from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useTranslations } from 'next-intl';

export default function QualifyPage() {
  const t = useTranslations('Campaign.Qualify');
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const [websiteUrl, setWebsiteUrl] = useState('');
  const [tourCount, setTourCount] = useState('');
  const [isOwner, setIsOwner] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Custom Dark Input Style
  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      color: 'white',
      borderRadius: 2,
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.5)' },
    '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.secondary.main },
    '& .MuiSelect-icon': { color: 'white' },
    '& .MuiFormLabel-root': { color: 'rgba(255, 255, 255, 0.7)', mb: 1 },
    '& .MuiRadio-root': { 
       color: 'rgba(255, 255, 255, 0.5)',
       '&.Mui-checked': { color: theme.palette.secondary.main }
    },
    '& .MuiFormControlLabel-label': { color: 'white' }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/campaign');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2, bgcolor: '#030303' }}>
        <CircularProgress sx={{ color: theme.palette.secondary.main }} />
        <Typography sx={{ color: 'text.secondary', letterSpacing: 2 }}>{t('loadingAuth')}</Typography>
      </Box>
    );
  }

  const userFirstName = user.displayName?.split(' ')[0] || 'Candidate';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!websiteUrl || !tourCount || !isOwner) {
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
    <Box sx={{ minHeight: '100vh', pt: { xs: 8, md: 15 }, pb: 8, bgcolor: '#030303' }}>
      <Container maxWidth="sm">
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: `0 0 50px -10px rgba(0,0,0,0.5)`
          }}
        >
          <Stack alignItems="center" spacing={2} mb={6}>
            <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)', mb: 1 }}>
               <RocketLaunchIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
            </Box>
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ color: 'white' }}>
              {t('title', { name: userFirstName })}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              {t('subtitle')}
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 4, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
               {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4} sx={inputStyle}>
              
              <TextField
                label={t('labels.websiteUrl')}
                variant="outlined"
                fullWidth
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder={t('labels.websitePlaceholder')}
              />

              <FormControl fullWidth required>
                <InputLabel>{t('labels.tourCount')}</InputLabel>
                <Select
                  value={tourCount}
                  label={t('labels.tourCount')}
                  onChange={(e) => setTourCount(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#1a1a1a',
                        color: 'white',
                        '& .MuiMenuItem-root': { '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }
                      }
                    }
                  }}
                >
                  <MenuItem value="1-5">1 - 5</MenuItem>
                  <MenuItem value="6-20">6 - 20</MenuItem>
                  <MenuItem value="21+">21+</MenuItem>
                </Select>
              </FormControl>

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
                sx={{ 
                  py: 1.5, 
                  fontSize: '1.1rem', 
                  fontWeight: 700,
                  bgcolor: 'white',
                  color: 'black',
                  borderRadius: '50px',
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                {isSubmitting ? t('submittingButton') : t('submitButton')}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}