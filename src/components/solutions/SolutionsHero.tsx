// /src/components/solutions/SolutionsHero.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';

const SolutionsHero = () => {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('Solutions.Hero');
  // ▲▲▲
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '70vh', md: '80vh' }, 
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        color: 'common.white',
        backgroundImage: `url('/images/solutions/hero-engine.webp')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        '&::before': {
          content: '""',
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        },
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          position: 'relative', zIndex: 2, textAlign: 'center',
          pt: { xs: 10, md: 12 },
          px: { xs: 2, sm: 3 }
        }}
      >
        {/* ▼▼▼ USE RICH TRANSLATION FOR TITLE ▼▼▼ */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '2rem', sm: '2.8rem', md: '4rem' },
            lineHeight: 1.15,
            mb: 5,
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxWidth: '100%',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {t.rich('title', {
            colored: (chunks) => <Box component="span" sx={{ color: 'primary.light', fontWeight: 900 }}>{chunks}</Box>
          })}
        </Typography>
        {/* ▲▲▲ */}

        {/* ▼▼▼ USE RICH TRANSLATION FOR SUBTITLE ▼▼▼ */}
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
            fontWeight: 300,
            maxWidth: '750px',
            mx: 'auto',
            opacity: 0.95,
            lineHeight: 1.7,
            letterSpacing: '0.01em',
          }}
        >
           {t.rich('subtitle', {
              strong: (chunks) => <strong style={{ fontWeight: 600 }}>{chunks}</strong>
           })}
        </Typography>
         {/* ▲▲▲ */}
      </Container>
    </Box>
  );
};

export default SolutionsHero;