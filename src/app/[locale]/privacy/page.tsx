// src/app/[locale]/privacy/page.tsx

import { Metadata } from 'next';
import PrivacyContent from "@/components/terms/PrivacyContent";
import { metadataStore, siteConfig } from '@/app/config/site';
import { generateCustomMetadata } from '../../../../lib/metadata';
import { Box, Container, Paper, Typography, Chip } from '@mui/material'; // Import MUI
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'; // Privacy Icon

// Define props type for page params
type Props = {
  params: Promise<{ locale: string }>;
};

// ▼▼▼ METADATA (Kept exactly as is) ▼▼▼
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || siteConfig.url;
  const pageMeta = metadataStore['privacy']?.[locale] || metadataStore['privacy']?.en;

  if (!pageMeta) {
    return {
      title: "Privacy Policy | Upmerce",
      description: "Learn how Upmerce collects, uses, and protects your data.",
    };
  }

  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}/privacy`,
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
        backgroundColor: '#030303', // Obsidian Black
        pt: { xs: 15, md: 20 },
        pb: 12,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Glow (Green/Teal hint for "Security") */}
      <Box sx={{ 
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', height: '500px', 
        background: 'radial-gradient(circle at top, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
        zIndex: 0 
      }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        
        {/* 1. Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip 
            icon={<PrivacyTipIcon sx={{ fontSize: '16px !important', color: '#10B981 !important' }} />} // Teal Icon
            label="DATA PROTECTION" 
            sx={{ 
              mb: 3, 
              bgcolor: 'rgba(16, 185, 129, 0.1)', // Teal Tint
              color: '#10B981', // Teal Text
              fontWeight: 700, 
              letterSpacing: 2,
              border: '1px solid rgba(16, 185, 129, 0.2)'
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
            Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Your data sovereignty is our priority.
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
            
            // CSS Injection for Inner Content
            '& h1, & h2, & h3': { color: 'white', mt: 4, mb: 2, fontWeight: 700 },
            '& p': { mb: 2, lineHeight: 1.7 },
            '& ul': { pl: 3, mb: 2 },
            '& li': { mb: 1 },
            '& a': { color: '#10B981', textDecoration: 'none', borderBottom: '1px solid rgba(16, 185, 129, 0.3)' }, // Teal links
            '& strong': { color: 'white' }
          }}
        >
          <PrivacyContent />
        </Paper>

        {/* 3. Footer Note */}
        <Typography 
          variant="caption" 
          align="center" 
          display="block" 
          sx={{ mt: 6, color: 'text.disabled', maxWidth: '500px', mx: 'auto' }}
        >
          This policy details how Upmerce collects, stores, and handles your data 
          in compliance with international data protection laws.
        </Typography>

      </Container>
    </Box>
  );
}