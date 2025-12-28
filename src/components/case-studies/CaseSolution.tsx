// src/components/case-studies/CaseSolution.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, useTheme, Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';

const CaseSolution = () => {
  const t = useTranslations('CaseStudies.Solution');
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: theme.palette.background.default, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 12, maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: theme.palette.secondary.main, fontWeight: 700, letterSpacing: 2 }}>
            THE ARCHITECTURE
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ color: 'white', mt: 1, mb: 2 }}>
            {t('title')}
          </Typography>
          <Typography variant="body1" fontSize="1.2rem" sx={{ color: 'text.secondary' }}>
            {t('subtitle')}
          </Typography>
        </Box>

        {/* 1. FRONTEND (Tablet) */}
        <Grid container spacing={8} alignItems="center" sx={{ mb: 12 }}>
          <Grid  size={{ xs: 12, md: 6 }}>
            <Chip icon={<CodeIcon />} label="FRONTEND v2.0" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} />
            <Typography variant="h4" fontWeight={800} sx={{ color: 'white', mb: 2 }}>
              {t('frontend.title')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
              {t('frontend.description')}
            </Typography>
          </Grid>

          <Grid  size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '300px', md: '450px' },
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `0 20px 60px -10px ${theme.palette.secondary.main}20`
              }}
            >
              <Image
                src="/images/themes/adventure-tablet.webp"
                alt="Tablet View"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* 2. BACKEND (Mobile) */}
        <Grid container spacing={8} alignItems="center">
          <Grid  size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '280px',
                  height: '550px',
                  borderRadius: '40px',
                  border: '8px solid #1f1f1f',
                  overflow: 'hidden',
                  boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)'
                }}
              >
                <Image
                  src="/images/themes/adventure-mobile.webp"
                  alt="Mobile Admin"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid  size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
            <Chip icon={<StorageIcon />} label="BACKEND OPS" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} />
            <Typography variant="h4" fontWeight={800} sx={{ color: 'white', mb: 2 }}>
              {t('backend.title')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
              {t('backend.description')}
            </Typography>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};

export default CaseSolution;