// src/app/[locale]/terms/page.tsx

import { Metadata } from 'next';
import TermsContent from "@/components/terms/TermsContent";
import { metadataStore, siteConfig } from '@/app/config/site';
import { generateCustomMetadata } from '../../../../lib/metadata';
import { Box, Container, Paper, Typography, Chip } from '@mui/material'; // Import MUI
import GavelIcon from '@mui/icons-material/Gavel'; // Legal Icon

type Props = {
  params: Promise<{ locale: string }>;
};

// ▼▼▼ METADATA (Kept exactly as you had it, it's perfect) ▼▼▼
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || siteConfig.url;
  const pageMeta = metadataStore['terms']?.[locale] || metadataStore['terms']?.en;

  if (!pageMeta) {
    return {
      title: "Terms of Use | Upmerce",
      description: "Read the terms of use governing Upmerce's digital services.",
    };
  }

  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}/terms`,
    images: [{
        src: pageMeta.ogImage.src,
        alt: pageMeta.ogImage.alt,
        width: 1200,
        height: 630,
      }],
    type: 'website',
    locale: locale,
    baseUrl: siteUrl
  });
}
// ▲▲▲

export default async function Page() {
  return (
    <Box 
      component="main" 
      sx={{ 
        minHeight: '100vh',
        // Hardcoded Obsidian Black to ensure no white flash
        backgroundColor: '#030303', 
        pt: { xs: 15, md: 20 },
        pb: 12,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Glow */}
      <Box sx={{ 
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', height: '500px', 
        background: 'radial-gradient(circle at top, rgba(255,255,255,0.03) 0%, transparent 70%)',
        zIndex: 0 
      }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        
        {/* 1. Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip 
            icon={<GavelIcon sx={{ fontSize: '16px !important', color: '#a1a1aa !important' }} />}
            label="LEGAL DOCUMENT" 
            sx={{ 
              mb: 3, 
              bgcolor: 'rgba(255,255,255,0.05)', 
              color: '#a1a1aa', 
              fontWeight: 700, 
              letterSpacing: 2,
              border: '1px solid rgba(255,255,255,0.1)'
            }} 
          />
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              color: 'white', 
              mb: 2,
              letterSpacing: '-0.02em'
            }}
          >
            Terms of Service
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Last Updated: January 2025
          </Typography>
        </Box>

        {/* 2. The Content Paper */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 4, md: 8 },
            // The "Obsidian Document" Look
            backgroundColor: 'rgba(255, 255, 255, 0.02)', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: 4,
            color: '#d4d4d8', // Readable gray text
            '& h1, & h2, & h3': { color: 'white', mt: 4, mb: 2, fontWeight: 700 }, // Style headings inside TermsContent
            '& p': { mb: 2, lineHeight: 1.7 }, // Style paragraphs
            '& ul': { pl: 3, mb: 2 }, // Style lists
            '& li': { mb: 1 },
            '& a': { color: '#D97706', textDecoration: 'none', borderBottom: '1px solid rgba(217, 119, 6, 0.3)' }
          }}
        >
          <TermsContent />
        </Paper>

        {/* 3. Footer Note */}
        <Typography 
          variant="caption" 
          align="center" 
          display="block" 
          sx={{ mt: 6, color: 'text.disabled', maxWidth: '500px', mx: 'auto' }}
        >
          These terms constitute a legally binding agreement between you and Upmerce. 
          If you have questions, please contact our legal team.
        </Typography>

      </Container>
    </Box>
  );
}