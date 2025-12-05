// /src/components/solutions/SolutionsGrowth.tsx
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
    { 
      icon: <RocketLaunchIcon color="primary" fontSize="large" />,
      titleKey: "features.f1.title", descKey: "features.f1.desc"
    },
    { 
      icon: <TravelExploreIcon color="success" fontSize="large" />,
      titleKey: "features.f2.title", descKey: "features.f2.desc"
    },
    { 
      icon: <LanguageIcon color="secondary" fontSize="large" />,
      titleKey: "features.f3.title", descKey: "features.f3.desc"
    },
  ];

  return (
    // ▼▼▼ UPDATED COLORS: Alternating dark background ▼▼▼
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.800', color: 'common.white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          
          {/* Left Column: Text Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              {t('pillarTitle')}
            </Typography>
            <Typography 
                variant="h3" 
                fontWeight={800} 
                gutterBottom 
                sx={{ mb: 4, whiteSpace: 'pre-wrap' }}
            >
               {t('headline')}
            </Typography>
            {/* Lighter gray text */}
            <Typography variant="body1" fontSize="1.1rem" color="grey.400" paragraph sx={{ mb: 4 }}>
              {t('body')}
            </Typography>

            <List disablePadding>
              {features.map((feature, index) => (
                <ListItem key={index} disableGutters sx={{ mb: 3, alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6" fontWeight={700} gutterBottom>{t(feature.titleKey)}</Typography>}
                    // Lighter gray text
                    secondary={<Typography variant="body1" color="grey.400">{t(feature.descKey)}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Right Column: Image Visual */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '300px', md: '500px' },
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: `0 20px 40px ${theme.palette.primary.main}30`, 
                // Dark border
                border: `1px solid ${theme.palette.grey[700]}`
              }}
            >
              <Image
                src="/images/solutions/seo-speed.webp"
                alt="Abstract concept illustration of website speed and SEO growth"
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

export default SolutionsGrowth;