// src/components/solutions/SolutionsMobile.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import Image from 'next/image';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import { useTranslations } from 'next-intl';

const SolutionsMobile = () => {
  const t = useTranslations('Solutions.Mobile');
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          
          <Grid  size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '400px', md: '600px' }, 
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                   '0%': { transform: 'translateY(0px)' },
                   '50%': { transform: 'translateY(-20px)' },
                   '100%': { transform: 'translateY(0px)' },
                }
              }}
            >
              <Box sx={{
                position: 'relative',
                width: '300px',
                height: '600px',
                borderRadius: '40px',
                border: '8px solid #1f1f1f',
                overflow: 'hidden',
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)'
              }}>
                 <Image
                  src="/images/solutions/mobile-admin.webp"
                  alt="Mobile Admin"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid  size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
            <Typography variant="overline" sx={{ color: theme.palette.secondary.main, fontWeight: 700, letterSpacing: 2 }}>
              {t('pillarTitle')}
            </Typography>
            <Typography variant="h3" fontWeight={800} sx={{ color: 'white', mb: 3, mt: 1 }}>
              {t('headline')}
            </Typography>
            <Typography variant="body1" fontSize="1.1rem" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
              {t('body')}
            </Typography>

            <List disablePadding>
              {[1, 2, 3].map((i, index) => (
                <ListItem key={index} disableGutters sx={{ mb: 3, alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    <SettingsRemoteIcon sx={{ color: theme.palette.secondary.main }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>{t(`features.f${i}.title`)}</Typography>}
                    secondary={<Typography variant="body2" sx={{ color: 'text.secondary' }}>{t(`features.f${i}.desc`)}</Typography>}
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