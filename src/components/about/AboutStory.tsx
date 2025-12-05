// /src/components/about/AboutStory.tsx
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutStory = () => {
  const t = useTranslations('About.Story');

  return (
    <Box 
      component="section" 
      // ▼▼▼ UPDATED COLORS ▼▼▼
      // Changed bgcolor to dark gray, added white text color
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.900', color: 'common.white' }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          {/* Left Column: The Narrative */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography 
              variant="h5" 
              color="primary" 
              fontWeight="bold" 
              gutterBottom
              sx={{ textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {t('sectionTitle')}
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 800,
                mb: 4,
                lineHeight: 1.2
              }}
            >
              {t('headline')}
            </Typography>

            {/* Narrative paragraphs */}
            {/* ▼▼▼ UPDATED TEXT COLORS to text.secondary (light gray in dark mode) ▼▼▼ */}
            <Typography variant="body1" fontSize="1.1rem" paragraph sx={{ mb: 3 }}>
              {t.rich('p1', {
                // Bold text should inherit the section color (white)
                bold: (chunks) => <Box component="span" fontWeight="bold" sx={{ color: 'inherit' }}>{chunks}</Box>
              })}
            </Typography>
            <Typography variant="body1" fontSize="1.1rem" paragraph>
               {t('p2')}
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="common.white" sx={{ mt: 4 }}>
               {t('p3')}
            </Typography>
             {/* ▲▲▲ */}
          </Grid>

          {/* Right Column: The Visual */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box 
              sx={{ 
                position: 'relative', 
                height: { xs: '300px', md: '500px' },
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                // Added a subtle dark border for definition
                border: `1px solid rgba(255, 255, 255, 0.1)`,
                boxShadow: 10
              }}
            >
              <Image
                src="/images/about/story-gap.webp"
                alt="High quality Moroccan hospitality setting"
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

export default AboutStory;