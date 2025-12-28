// src/components/sections/FounderNoteSection.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Box, Container, Typography, Paper, useTheme, Avatar } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AnimatedSection from '../ui/AnimatedSection';

export default function FounderNoteSection() {
  const t = useTranslations('AgencyFounder');
  const theme = useTheme();

  return (
    <Box
      id="founder-note"
      component="section"
      aria-labelledby="founder-note-heading"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default, // Obsidian
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatedSection>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              overflow: 'hidden',
              // "Obsidian Glass" Look
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px -20px rgba(0,0,0,0.5)',
              }
            }}
          >
            {/* Decorative Big Quote Icon (Background) */}
            <FormatQuoteIcon 
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                fontSize: 120,
                color: 'white',
                opacity: 0.03,
                transform: 'rotate(180deg)',
                zIndex: 0,
              }}
            />

            {/* LEFT: The Founder's Portrait */}
            <Box 
              sx={{ 
                flexShrink: 0, 
                position: 'relative', 
                zIndex: 1 
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  p: 0.5, // Spacing for border
                  // The "Amber Halo"
                  border: `1px solid ${theme.palette.secondary.main}`,
                  boxShadow: `0 0 30px -5px ${theme.palette.secondary.main}40`, // Amber Glow
                }}
              >
                <Avatar
                  sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: 'grey.900',
                  }}
                >
                  <Image
                    src="/images/founder-photo.webp"
                    alt={t('name') + ", " + t('title')}
                    fill
                    sizes="160px"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </Avatar>
              </Box>
            </Box>

            {/* RIGHT: The Manifesto */}
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                component="blockquote"
                variant="h5"
                sx={{
                  color: 'white',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  mb: 4,
                  opacity: 0.9,
                  fontFamily: 'serif', // Use serif for that "Editorial" feel
                }}
              >
                &ldquo;{t('missionStatement')}&rdquo;
              </Typography>
              
              <Box>
                <Typography 
                  id="founder-note-heading" 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 800, 
                    color: 'white',
                    letterSpacing: 0.5 
                  }}
                >
                  {t('name')}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: theme.palette.secondary.main, // Amber text
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    mt: 0.5
                  }}
                >
                  {t('title')}
                </Typography>
              </Box>
            </Box>

          </Paper>
        </Container>
      </AnimatedSection>
    </Box>
  );
}