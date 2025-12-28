// src/components/case-studies/CaseHero.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Container, Typography, useTheme, Fade, Chip } from '@mui/material';
import { useTranslations } from 'next-intl';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const CaseHero = () => {
  const t = useTranslations('CaseStudies.Hero');
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Layer 1: The Background Texture (Marrago) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/images/themes/adventure-pc.webp"
          alt="Marrago Case Study"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
          className="opacity-20 grayscale blur-sm scale-105"
          priority
        />
        {/* Layer 2: The "Vignette" Gradient */}
        <Box 
          sx={{ 
            position: 'absolute', 
            inset: 0, 
            background: `radial-gradient(circle at center, transparent 0%, ${theme.palette.background.default} 90%)` 
          }} 
        />
      </Box>

      {/* Layer 3: Amber Glow */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '300px',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}15 0%, transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center', pt: 8 }}>
        <Fade in={true} timeout={1000}>
          <Box>
            <Chip 
              icon={<AutoAwesomeIcon sx={{ fontSize: '16px !important', color: 'black !important' }} />}
              label={t('eyebrow')} 
              sx={{ 
                mb: 4, 
                backgroundColor: theme.palette.secondary.main, 
                color: 'black', 
                fontWeight: 700,
                border: '1px solid white'
              }} 
            />

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '5rem' },
                lineHeight: 1.1,
                mb: 4,
                color: 'white',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              {t('title')}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                fontWeight: 300,
                maxWidth: '750px',
                mx: 'auto',
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              {t('subtitle')}
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default CaseHero;