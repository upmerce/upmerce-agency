// src/components/about/AboutFounder.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Stack, useTheme, Avatar } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutFounder = () => {
  const t = useTranslations('About.Founder');
  const theme = useTheme();

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 15 },
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 8, md: 8 }} alignItems="center">
          
          {/* Left Column: The Manifesto */}
          <Grid size={{ xs: 12, md: 7 }} order={{ xs: 2, md: 1 }}>
            <Box sx={{ position: 'relative', zIndex: 2, pl: { md: 4 } }}>
              {/* Giant Background Icon */}
              <FormatQuoteIcon 
                sx={{ 
                  fontSize: { xs: 80, md: 160 }, 
                  color: 'white',
                  opacity: 0.03,
                  position: 'absolute',
                  top: -60, left: -40, zIndex: -1,
                  transform: 'rotate(180deg)'
                }} 
              />
              
              <Typography 
                component="blockquote"
                sx={{ 
                  fontFamily: 'serif',
                  fontStyle: 'italic', 
                  fontSize: { xs: '1.5rem', md: '2.2rem' },
                  lineHeight: 1.4,
                  mb: 5,
                  color: 'white',
                }}
              >
                &ldquo;{t('quote')}&rdquo;
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 3, height: 40, bgcolor: theme.palette.secondary.main }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>
                    {t('name')}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.secondary.main, letterSpacing: 1, textTransform: 'uppercase' }}>
                    {t('role')}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Right Column: The Portrait */}
          <Grid size={{ xs: 12, md: 5 }} order={{ xs: 1, md: 2 }}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '1 / 1', 
                width: '100%',
                maxWidth: '450px',
                mx: 'auto',
                borderRadius: '50%', // Circle crop for elegance
                border: `1px solid rgba(255,255,255,0.1)`,
                overflow: 'hidden',
                boxShadow: `0 20px 60px -20px rgba(0,0,0,0.8)`
              }}
            >
              <Image
                src="/images/founder-photo.webp"
                alt="Mustapha Ouazza"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Inner Glow Border */}
              <Box 
                sx={{ 
                  position: 'absolute', inset: 0, 
                  borderRadius: '50%', 
                  border: `1px solid ${theme.palette.secondary.main}`, 
                  opacity: 0.5 
                }} 
              />
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default AboutFounder;