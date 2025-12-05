// /src/components/solutions/SolutionsMobile.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import Image from 'next/image';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import { useTranslations } from 'next-intl';

const SolutionsMobile = () => {
  const t = useTranslations('Solutions.Mobile');
  const theme = useTheme();

  const features = [
    { titleKey: "features.f1.title", descKey: "features.f1.desc" },
    { titleKey: "features.f2.title", descKey: "features.f2.desc" },
    { titleKey: "features.f3.title", descKey: "features.f3.desc" },
  ];

  return (
    // ▼▼▼ UPDATED COLORS: Main dark background ▼▼▼
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.900', color: 'common.white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          
          {/* Left Column: Image Visual */}
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '400px', md: '600px' }, 
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: theme.shadows[10],
                // Dark border
                border: `1px solid ${theme.palette.grey[800]}`
              }}
            >
              <Image
                src="/images/solutions/mobile-admin.webp"
                alt="Using Upmerce mobile admin panel on a smartphone in a Moroccan setting"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Box>
          </Grid>

          {/* Right Column: Text Content */}
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
            <Typography variant="h5" color="secondary" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              {t('pillarTitle')}
            </Typography>
            <Typography variant="h3" fontWeight={800} gutterBottom sx={{ mb: 4 }}>
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
                    <SettingsRemoteIcon color="secondary" fontSize="large" />
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

        </Grid>
      </Container>
    </Box>
  );
};

export default SolutionsMobile;