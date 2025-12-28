// src/components/sections/FeaturesSection.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, useTheme, Stack, Chip } from '@mui/material';
import BentoCard from '../ui/BentoCard'; // Ensure you created this in the previous step
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import SecurityIcon from '@mui/icons-material/Security';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function FeaturesSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyFeatures');
  const theme = useTheme();

  // Helper to render a list of items with checkmarks
  const renderList = (items: string[]) => (
    <Stack spacing={1.5} sx={{ mt: 3 }}>
      {items.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <CheckCircleIcon 
            sx={{ 
              fontSize: 20, 
              color: theme.palette.secondary.main, // Amber checkmarks
              mt: 0.3 
            }} 
          />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item}
          </Typography>
        </Box>
      ))}
    </Stack>
  );

  return (
    <Box
      id={id || "features"}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: `linear-gradient(135deg, white 0%, ${theme.palette.grey[500]} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
            {t('subtitle')}
          </Typography>
        </Box>

        {/* The Bento Grid */}
        <Grid container spacing={4}>
          
          {/* 1. CONVERSION WEAPONS (Big Card) */}
          <Grid  size={{xs: 12, md: 8}}>
            <BentoCard 
              title={t('increaseBookings.title')}
              subtitle={t('increaseBookings.subtitle')}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                {/* Visual "Graph" Representation */}
                <Box 
                  sx={{ 
                    flex: 1, 
                    p: 3, 
                    borderRadius: 3, 
                    bgcolor: 'rgba(0,0,0,0.3)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <MonetizationOnIcon sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1 }}>VISUAL PROOF</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                     <Chip label="SEO #1" size="small" color="success" variant="outlined" />
                     <Chip label="0% Fee" size="small" color="secondary" variant="outlined" />
                  </Box>
                </Box>

                {/* The List */}
                <Box sx={{ flex: 1.5 }}>
                   {renderList(t.raw('increaseBookings.items') as string[])}
                </Box>
              </Box>
            </BentoCard>
          </Grid>

          {/* 2. POCKET OFFICE (Tall Card) */}
          <Grid  size={{xs: 12, md: 4}}>
            <BentoCard 
              title={t('effortlessManagement.title')} 
              subtitle={t('effortlessManagement.subtitle')}
            >
               <Box sx={{ textAlign: 'center', my: 2 }}>
                  <SmartphoneIcon sx={{ fontSize: 60, color: theme.palette.primary.main, opacity: 0.8 }} />
               </Box>
               {renderList(t.raw('effortlessManagement.items') as string[])}
            </BentoCard>
          </Grid>

          {/* 3. INDEPENDENCE (Standard Card) */}
          <Grid  size={{xs: 12, md: 6}}>
            <BentoCard 
              title={t('premiumExperience.title')} 
              subtitle={t('premiumExperience.subtitle')}
            >
               {renderList(t.raw('premiumExperience.items') as string[])}
            </BentoCard>
          </Grid>

          {/* 4. DHAMANE / GUARANTEE (Standard Card) */}
          <Grid  size={{xs: 12, md: 6}}>
             <BentoCard 
              title={t('designTools.title')} 
              subtitle={t('designTools.subtitle')}
            >
              <Box sx={{ position: 'absolute', top: 20, right: 20, opacity: 0.1 }}>
                <HandshakeIcon sx={{ fontSize: 100 }} />
              </Box>
              {renderList(t.raw('designTools.items') as string[])}
            </BentoCard>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}