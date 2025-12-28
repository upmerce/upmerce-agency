// src/components/sections/ContactSection.tsx
'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl'; // Import useLocale
import { Box, Container, Grid, Typography, TextField, Button, useTheme, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

export default function ContactSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyContact');
  const locale = useLocale(); // Get current language
  const theme = useTheme();
  
  const isRtl = locale === 'ar'; // Check for Arabic
  const direction = isRtl ? 'rtl' : 'ltr';

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  // Custom Input Style ("Stripe/Linear" + RTL Gap Fix)
  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      color: 'white',
      borderRadius: 2,
      textAlign: isRtl ? 'right' : 'left', 
      
      // ▼▼▼ FIX 1: THE BORDER COLORS ▼▼▼
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
      
      // ▼▼▼ FIX 2: THE GAP (LEGEND) ALIGNMENT ▼▼▼
      '& .MuiOutlinedInput-notchedOutline': {
        textAlign: isRtl ? 'right' : 'left', // Moves the "cut" to the correct side
      },
      
      // ▼▼▼ FIX 3: INPUT TEXT ALIGNMENT ▼▼▼
      '& input': {
        textAlign: isRtl ? 'right' : 'left',
        ...(isRtl && { paddingRight: '14px' }), // Ensure padding matches
      }
    },

    // ▼▼▼ FIX 4: THE FLOATING LABEL POSITION ▼▼▼
    '& .MuiInputLabel-root': { 
      color: 'rgba(255, 255, 255, 0.5)',
      // Reset default positioning
      left: isRtl ? 'auto' : 'inherit',
      right: isRtl ? '28px' : 'inherit', // Position it correctly on the right
      transformOrigin: isRtl ? 'top right' : 'top left',
      
      '&.Mui-focused': { color: theme.palette.secondary.main },
      
      // Fix the "Shrink" animation position
      '&.MuiInputLabel-shrink': {
        transform: isRtl 
          ? 'translate(0, -9px) scale(0.75)' // RTL: Just move up
          : 'translate(14px, -9px) scale(0.75)' // LTR: Move up and right
      }
    },
  };

  return (
    <Box
      id={id || "contact"}
      component="section"
      dir={direction} // Set section direction
      sx={{
        py: { xs: 8, md: 15 },
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          
          {/* LEFT: The Final Pitch */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 6, textAlign: isRtl ? 'right' : 'left' }}>
              <Typography 
                variant="overline" 
                sx={{ color: theme.palette.secondary.main, fontWeight: 700, letterSpacing: 2 }}
              >
                {t('overline')}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  mt: 1,
                  mb: 3,
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                  color: 'white'
                }}
              >
                {t('title')}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, mb: 4, maxWidth: '90%' }}>
                {t('subtitle')}
              </Typography>
            </Box>

            {/* Value Props Recap */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: isRtl ? 'row-reverse' : 'row', textAlign: isRtl ? 'right' : 'left' }}>
                <Box sx={{ 
                  p: 1.5, borderRadius: '50%', 
                  bgcolor: 'rgba(255,255,255,0.05)', 
                  color: theme.palette.secondary.main,
                  height: 'fit-content'
                }}>
                  <AutoGraphIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                    {t('audit.title')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {t('audit.description')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT: The Glass Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 20px 80px -20px rgba(0,0,0,0.5)',
              }}
            >
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 4, textAlign: isRtl ? 'right' : 'left' }}>
                {t('form.title')}
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    dir={direction} // Explicit direction for input
                    label={t('form.nameLabel')}
                    variant="outlined"
                    required
                    sx={inputStyle}
                    // Force the label to align correctly if MUI theme context is missing
                    InputLabelProps={{ 
                      sx: { 
                        transformOrigin: isRtl ? 'top right' : 'top left',
                        left: isRtl ? 'auto' : 14,
                        right: isRtl ? 14 : 'auto'
                      } 
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    dir={direction}
                    label={t('form.emailLabel')}
                    type="email"
                    variant="outlined"
                    required
                    sx={inputStyle}
                    InputLabelProps={{ 
                      sx: { 
                        transformOrigin: isRtl ? 'top right' : 'top left',
                        left: isRtl ? 'auto' : 14,
                        right: isRtl ? 14 : 'auto'
                      } 
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    dir={direction}
                    label={t('form.messageLabel')}
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                    sx={inputStyle}
                    InputLabelProps={{ 
                      sx: { 
                        transformOrigin: isRtl ? 'top right' : 'top left',
                        left: isRtl ? 'auto' : 14,
                        right: isRtl ? 14 : 'auto'
                      } 
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={status === 'submitting' || status === 'success'}
                    // Flip icon position for RTL
                    startIcon={isRtl && status !== 'success' ? <SendIcon sx={{ transform: 'scaleX(-1)' }} /> : null}
                    endIcon={!isRtl && status !== 'success' ? <SendIcon /> : null}
                    sx={{
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: 2,
                      backgroundColor: status === 'success' ? '#10b981' : 'white',
                      color: status === 'success' ? 'white' : 'black',
                      boxShadow: status === 'success' ? '0 0 20px #10b981' : 'none',
                      '&:hover': {
                          backgroundColor: status === 'success' ? '#10b981' : '#f0f0f0',
                      }
                    }}
                  >
                     {status === 'submitting' ? t('form.loadingButton') : 
                      status === 'success' ? t('form.successButton') : 
                      t('form.submitButton')}
                  </Button>
                </Grid>
              </Grid>

            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}