// src/components/solutions/SolutionsEcosystem.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Paper, Stack, useTheme } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import BookIcon from '@mui/icons-material/Book';
import MapIcon from '@mui/icons-material/Map';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import { useTranslations } from 'next-intl';

const SolutionsEcosystem = () => {
  const t = useTranslations('Solutions.Ecosystem');
  const theme = useTheme();

  const features = [
    { icon: <ReviewsIcon sx={{ color: '#f59e0b' }} />, titleKey: "features.reviews.title", descKey: "features.reviews.desc" },
    { icon: <BookIcon sx={{ color: '#3b82f6' }} />, titleKey: "features.blog.title", descKey: "features.blog.desc" },
    { icon: <MapIcon sx={{ color: '#10b981' }} />, titleKey: "features.maps.title", descKey: "features.maps.desc" },
    { icon: <PeopleAltIcon sx={{ color: '#8b5cf6' }} />, titleKey: "features.crm.title", descKey: "features.crm.desc" },
    { icon: <MarkEmailReadIcon sx={{ color: '#ec4899' }} />, titleKey: "features.notifications.title", descKey: "features.notifications.desc" },
    { icon: <PhotoFilterIcon sx={{ color: '#ef4444' }} />, titleKey: "features.images.title", descKey: "features.images.desc" },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 15 }, bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10, maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 2 }}>
            {t('sectionTitle')}
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ color: 'white', mt: 1, mb: 2 }}>
            {t('headline')}
          </Typography>
          <Typography variant="body1" fontSize="1.2rem" sx={{ color: 'text.secondary' }}>
            {t('body')}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.02)', // Glass
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                  }
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ 
                    p: 1.5, borderRadius: 2, 
                    bgcolor: 'rgba(255,255,255,0.05)', 
                    display: 'inline-flex', alignSelf: 'flex-start',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>
                    {t(feature.titleKey)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {t(feature.descKey)}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SolutionsEcosystem;