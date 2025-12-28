// src/app/[locale]/blog/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { getSortedPostsData } from '../../../../lib/blog';
import { Box, Container, Typography, Grid, Paper, Stack, Chip, Button, Avatar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArticleIcon from '@mui/icons-material/Article';

export const metadata: Metadata = {
  title: 'Upmerce Insights | The Knowledge Engine',
  description: 'Strategic intelligence on direct bookings, Next.js architecture, and the future of Moroccan tourism.',
};

type BlogProps = Promise<{ locale: string }>;

export default async function BlogPage({ params }: { params: BlogProps }) {
  const { locale } = await params;
  const allPostsData = getSortedPostsData(locale);

  return (
    <Box 
      component="main" 
      sx={{ 
        minHeight: '100vh',
        backgroundColor: '#030303', // Obsidian Background directly applied
        pb: 12
      }}
    >
      {/* 1. THE HEADER (Cinematic) */}
      <Box 
        sx={{ 
          pt: 20, 
          pb: 12, 
          position: 'relative', 
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        {/* Background Ambient Glow */}
        <Box sx={{ 
          position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '500px', 
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)', 
          zIndex: 0 
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
           <Chip 
              label="KNOWLEDGE BASE" 
              sx={{ 
                mb: 3, 
                bgcolor: 'rgba(255,255,255,0.05)', 
                color: '#D97706', // Amber
                fontWeight: 700, 
                letterSpacing: 2,
                border: '1px solid rgba(255,255,255,0.1)'
              }} 
            />
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4.5rem' }, 
              fontWeight: 900, 
              color: 'white', 
              mb: 2,
              letterSpacing: '-0.02em'
            }}
          >
            The Upmerce <Box component="span" sx={{ color: '#D97706' }}>Intelligence</Box>
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'text.secondary', 
              fontWeight: 300, 
              maxWidth: '700px', 
              mx: 'auto' 
            }}
          >
            Strategic insights for Moroccan travel leaders.
          </Typography>
        </Container>
      </Box>

      {/* 2. THE GRID (Glass Dossiers) */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          {allPostsData.map(({ id, date, title, author }) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={id}>
              <Link href={`/blog/${id}`} style={{ textDecoration: 'none' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 4,
                    // The "Obsidian Glass" Style
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      borderColor: '#D97706', // Amber Border on Hover
                      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                      '& .arrow-icon': {
                        transform: 'translateX(5px)',
                        color: '#D97706'
                      }
                    }
                  }}
                >
                  <Box>
                    {/* Meta Data */}
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.875rem' }}>
                          <AccessTimeIcon sx={{ fontSize: 16 }} />
                          {date}
                       </Box>
                    </Stack>

                    {/* Title */}
                    <Typography 
                      variant="h5" 
                      component="h2"
                      sx={{ 
                        color: 'white', 
                        fontWeight: 700, 
                        lineHeight: 1.4,
                        mb: 2,
                        minHeight: '3.6em' // Align heights
                      }}
                    >
                      {title}
                    </Typography>

                    {/* Author */}
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
                       <Avatar sx={{ width: 24, height: 24, bgcolor: '#D97706', fontSize: '0.75rem' }}>
                          {author?.charAt(0) || 'U'}
                       </Avatar>
                       <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                          {author}
                       </Typography>
                    </Stack>
                  </Box>

                  {/* Read More Action */}
                  <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="button" sx={{ color: 'white', fontWeight: 700 }}>
                      Read Analysis
                    </Typography>
                    <ArrowForwardIcon className="arrow-icon" sx={{ color: 'text.secondary', transition: 'all 0.2s' }} />
                  </Box>

                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}