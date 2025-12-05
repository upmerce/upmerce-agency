// /src/components/about/AboutCTA.tsx
'use client';
import React from 'react';
import { Box, Container, Typography, Button, Stack, useTheme } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';

const AboutCTA = () => {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('About.CTA');
  // ▲▲▲
  const theme = useTheme();

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'common.white',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
         {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 800, 
            mb: 3,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          {t('headline')}
        </Typography>
        
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 6, 
            opacity: 0.9,
            fontWeight: 400,
            maxWidth: '700px',
            mx: 'auto'
          }}
        >
          {t('subtitle')}
        </Typography>

        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          justifyContent="center"
          alignItems="center"
        >
          {/* Primary Action */}
          <Button
            component={Link}
            href="/campaign"
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<RocketLaunchIcon />}
            sx={{ 
              py: 1.5, px: 4, fontSize: '1.1rem', fontWeight: 700,
              borderRadius: 2, boxShadow: theme.shadows[10]
            }}
          >
             {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
            {t('primaryButton')}
          </Button>

          {/* Secondary Action */}
          <Button
            href="https://www.marrago.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            color="inherit"
            size="large"
            endIcon={<OpenInNewIcon />}
            sx={{ 
              py: 1.5, px: 4, fontSize: '1.1rem', fontWeight: 600,
              borderRadius: 2, borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
             {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
            {t('secondaryButton')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutCTA;