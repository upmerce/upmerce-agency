// src/components/solutions/SolutionsFinance.tsx
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
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: theme.palette.background.default, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 8, md: 8 }} alignItems="center">
          
          {/* Text Content */}
          <Grid  size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: '#10b981', fontWeight: 700, letterSpacing: 2 }}>
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
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    <CheckCircleIcon sx={{ color: '#10b981' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>{t(feature.titleKey)}</Typography>}
                    secondary={<Typography variant="body2" sx={{ color: 'text.secondary' }}>{t(feature.descKey)}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Visual: The Money Dashboard */}
          <Grid  size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative' }}>
              {/* Green Revenue Glow */}
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
              
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '500px' },
                  width: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  bgcolor: '#000',
                  boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5)',
                  zIndex: 1
                }}
              >
                <Image
                  src="/images/solutions/finance-dashboard.webp"
                  alt="Upmerce Dashboard"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SolutionsFinance;