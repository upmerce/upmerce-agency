// /src/components/solutions/SolutionsEcosystem.tsx
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
    { icon: <ReviewsIcon color="warning" />, titleKey: "features.reviews.title", descKey: "features.reviews.desc" },
    { icon: <BookIcon color="primary" />, titleKey: "features.blog.title", descKey: "features.blog.desc" },
    { icon: <MapIcon color="success" />, titleKey: "features.maps.title", descKey: "features.maps.desc" },
    { icon: <PeopleAltIcon color="secondary" />, titleKey: "features.crm.title", descKey: "features.crm.desc" },
    { icon: <MarkEmailReadIcon color="info" />, titleKey: "features.notifications.title", descKey: "features.notifications.desc" },
    { icon: <PhotoFilterIcon color="error" />, titleKey: "features.images.title", descKey: "features.images.desc" },
  ];

  return (
    // ▼▼▼ UPDATED COLORS: Main dark background ▼▼▼
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.900', color: 'common.white' }}>
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            {t('sectionTitle')}
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>
            {t('headline')}
          </Typography>
          {/* Lighter gray text */}
          <Typography variant="body1" fontSize="1.2rem" color="grey.400">
            {t('body')}
          </Typography>
        </Box>

        {/* The Feature Grid */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Paper
                elevation={2}
                // ▼▼▼ UPDATED CARDS: Dark background, light border ▼▼▼
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  bgcolor: 'grey.900', // Dark card bg
                  color: 'common.white',
                  border: `1px solid ${theme.palette.grey[800]}`, // Light border
                  transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[8],
                    borderColor: theme.palette.primary.main
                  }
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ 
                    p: 1.5, borderRadius: '50%', 
                    // Darker icon background
                    bgcolor: 'grey.800',
                    display: 'inline-flex', alignSelf: 'flex-start', boxShadow: 1
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    {t(feature.titleKey)}
                  </Typography>
                  {/* Lighter gray text */}
                  <Typography variant="body2" color="grey.400" sx={{ lineHeight: 1.6 }}>
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