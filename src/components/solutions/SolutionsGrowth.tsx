// src/components/solutions/SolutionsGrowth.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import Image from 'next/image';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslations } from 'next-intl';

const SolutionsGrowth = () => {
  const t = useTranslations('Solutions.Growth');
  const theme = useTheme();

  const features = [
    { icon: <RocketLaunchIcon sx={{ color: '#38bdf8' }} />, titleKey: "features.f1.title", descKey: "features.f1.desc" },
    { icon: <TravelExploreIcon sx={{ color: '#10b981' }} />, titleKey: "features.f2.title", descKey: "features.f2.desc" },
    { icon: <LanguageIcon sx={{ color: '#f472b6' }} />, titleKey: "features.f3.title", descKey: "features.f3.desc" },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: theme.palette.background.default, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          
          <Grid  size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: '#38bdf8', fontWeight: 700, letterSpacing: 2 }}>
              {t('pillarTitle')}
            </Typography>
            <Typography variant="h3" fontWeight={800} sx={{ color: 'white', mb: 3, mt: 1 }}>
               {t('headline')}
            </Typography>
            <Typography variant="body1" fontSize="1.1rem" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
              {t('body')}
            </Typography>

            <List disablePadding>
              {features.map((feature, index) => (
                <ListItem key={index} disableGutters sx={{ mb: 3, alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>{feature.icon}</ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>{t(feature.titleKey)}</Typography>}
                    secondary={<Typography variant="body2" sx={{ color: 'text.secondary' }}>{t(feature.descKey)}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid  size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '300px', md: '500px' },
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `0 0 50px -20px #38bdf830` // Blue Glow
              }}
            >
              <Image
                src="/images/solutions/seo-speed.webp"
                alt="SEO Speed"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SolutionsGrowth;