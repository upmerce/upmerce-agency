// src/components/solutions/SolutionsHero.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, useTheme, Fade } from '@mui/material';
import { useTranslations } from 'next-intl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SolutionsHero = () => {
  const t = useTranslations('Solutions.Hero');
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '90vh', // Full immersion
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Layer 1: The Engine Background (Blended) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/solutions/hero-engine.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3, 
          filter: 'grayscale(100%) contrast(1.2)', // Mechanical/Tech feel
          zIndex: 0,
        }}
      />

      {/* Layer 2: The "Vignette" Gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, transparent 0%, ${theme.palette.background.default} 90%)`,
          zIndex: 1,
        }}
      />

      {/* Layer 3: The Amber Energy Source */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}10 0%, transparent 60%)`,
          filter: 'blur(100px)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center', pt: 10 }}>
        <Fade in={true} timeout={1000}>
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: theme.palette.secondary.main,
                letterSpacing: 4,
                fontWeight: 700,
                mb: 2,
                display: 'block',
                textShadow: '0 0 20px rgba(217, 119, 6, 0.5)'
              }}
            >
              UPMERCE ENGINE V2.0
            </Typography>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '5rem' },
                lineHeight: 1.1,
                mb: 4,
                color: 'white',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
              }}
            >
              {t.rich('title', {
                colored: (chunks) => (
                  <Box component="span" sx={{ color: 'white', textShadow: '0 0 40px rgba(255,255,255,0.3)' }}>
                    {chunks}
                  </Box>
                )
              })}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                fontWeight: 300,
                maxWidth: '800px',
                mx: 'auto',
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
               {t.rich('subtitle', {
                  strong: (chunks) => <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>{chunks}</Box>
               })}
            </Typography>
          </Box>
        </Fade>
      </Container>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translate(-50%, 0)' },
            '50%': { transform: 'translate(-50%, -10px)' },
          },
        }}
      >
        <KeyboardArrowDownIcon sx={{ color: 'white', opacity: 0.3 }} />
      </Box>
    </Box>
  );
};

export default SolutionsHero;