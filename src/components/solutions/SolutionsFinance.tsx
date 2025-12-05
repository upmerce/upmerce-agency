// /src/components/solutions/SolutionsFinance.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import Image from 'next/image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslations } from 'next-intl';

const SolutionsFinance = () => {
  const t = useTranslations('Solutions.Finance');
  const theme = useTheme();

  const features = [
    { titleKey: "features.f1.title", descKey: "features.f1.desc" },
    { titleKey: "features.f2.title", descKey: "features.f2.desc" },
    { titleKey: "features.f3.title", descKey: "features.f3.desc" },
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
                    <CheckCircleIcon color="success" fontSize="large" />
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
                boxShadow: theme.shadows[20],
                // Dark border
                border: `1px solid ${theme.palette.grey[700]}`
              }}
            >
              <Image
                src="/images/solutions/finance-dashboard.webp"
                alt="Upmerce financial analytics dashboard showing direct revenue growth"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SolutionsFinance;