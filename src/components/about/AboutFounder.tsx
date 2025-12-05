// /src/components/about/AboutFounder.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Stack, useTheme } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Image from 'next/image';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';

const AboutFounder = () => {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('About.Founder');
  // ▲▲▲
  const theme = useTheme();

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 12 },
        bgcolor: 'grey.900',
        color: 'common.white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          {/* Left Column: The Quote */}
          <Grid size={{ xs: 12, md: 7 }} order={{ xs: 2, md: 1 }}>
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              {/* Giant Quote Icon */}
              <FormatQuoteIcon 
                sx={{ 
                  fontSize: { xs: 80, md: 120 }, 
                  color: 'primary.main',
                  opacity: 0.3,
                  position: 'absolute',
                  top: -40, left: -20, zIndex: -1
                }} 
              />
              
              {/* The Manifesto Quote */}
              <Typography 
                variant="h4" 
                component="blockquote"
                sx={{ 
                  fontStyle: 'italic', 
                  fontWeight: 500,
                  lineHeight: 1.4,
                  mb: 4,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                 {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
                {t('quote')}
              </Typography>

              {/* Signature Block */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box>
                   {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
                  <Typography variant="h6" fontWeight={700} sx={{ color: 'primary.light' }}>
                    {t('name')}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8, letterSpacing: 1, textTransform: 'uppercase' }}>
                    {t('role')}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Right Column: The Photo */}
          <Grid size={{ xs: 12, md: 5 }} order={{ xs: 1, md: 2 }}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '1 / 1', 
                width: '100%',
                maxWidth: '500px',
                mx: 'auto',
                borderRadius: 4,
                border: `4px solid ${theme.palette.primary.main}`,
                overflow: 'hidden',
                boxShadow: theme.shadows[20]
              }}
            >
              {/* Make sure this image exists! */}
              <Image
                src="/images/founder-photo.webp"
                alt="Mustapha Ouazza, Founder of Upmerce"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutFounder;