// src/components/sections/FaqHubSection.tsx
'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Box, Container, Grid, Typography, useTheme, Paper, Button } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// Data Configuration
const hubData: Record<string, { question: string; slug: string }[]> = {
  en: [
    { question: "What is the best alternative to WordPress?", slug: "/blog/badil-wordpress-haloul-asriya" },
    { question: "How much does it cost to create a website in Morocco?", slug: "/blog/thaman-inshaa-mawqi-electroni-bil-maghrib-dalil" },
    { question: "What is a direct booking website?", slug: "/blog/ma-hwa-mawqi-alhajz-al-mubashir" },
    { question: "Why is my WordPress website so slow?", slug: "/blog/limaza-mawqie-wordpress-batee-wal-hal" },
    { question: "How can I increase my Booking.com reservations?", slug: "/blog/ziadat-hujuzat-booking-com-wal-sir" },
    { question: "What is the best hotel booking strategy?", slug: "/blog/meilleure-strategie-reservation-hotel" },
    { question: "Can I get a professional website for free?", slug: "/blog/template-site-web-agence-de-voyage-gratuit" },
    { question: "How do I take better photos of my hotel rooms?", slug: "/blog/comment-prendre-photo-chambre-hotel-riad" },
    { question: "How can I make my riad more profitable?", slug: "/blog/comment-rendre-riad-rentable-maroc" },
    { question: "Why is website speed so important for tourism?", slug: "/blog/pourquoi-vitesse-site-web-importante" },
  ],
  fr: [
    { question: "Quelle est la meilleure stratégie de réservation d’hôtel ?", slug: "/blog/meilleure-strategie-reservation-hotel" },
    { question: "Comment trouver un template de site web gratuit pour agence de voyage ?", slug: "/blog/template-site-web-agence-de-voyage-gratuit" },
    { question: "Mon site WordPress est lent, que faire ?", slug: "/blog/site-wordpress-lent-solution" },
    { question: "Comment prendre en photo une chambre d'hôtel pour un riad ?", slug: "/blog/comment-prendre-photo-chambre-hotel-riad" },
    { question: "Comment rendre un riad rentable au Maroc ?", slug: "/blog/comment-rendre-riad-rentable-maroc" },
    { question: "Pourquoi la vitesse est-elle si importante sur un site Web ?", slug: "/blog/pourquoi-vitesse-site-web-importante" },
    { question: "Quel est le montant de la commission sur Booking.com ?", slug: "/blog/calcul-commission-booking-alternative" },
    { question: "Comment améliorer le SEO d'un site web à Agadir ?", slug: "/blog/creation-site-web-agadir-secrets-hotel-pro" },
    { question: "Quel est le meilleur site pour créer un site web pour un hôtel ?", slug: "/blog/meilleur-site-creation-web-hotel" },
    { question: "Comment répondre à un avis client (positif ou négatif) ?", slug: "/blog/repondre-avis-client-positif-negatif" }
  ],
  ar: [
    { question: "ما هو بديل ووردبريس لموقع احترافي؟", slug: "/blog/badil-wordpress-haloul-asriya" },
    { question: "كم تكلفة عمل موقع إلكتروني بالمغرب؟", slug: "/blog/thaman-inshaa-mawqi-electroni-bil-maghrib-dalil" },
    { question: "ما هو موقع الحجز المباشر وكيف يعمل؟", slug: "/blog/ma-hwa-mawqi-alhajz-al-mubashir" },
    { question: "لماذا موقع الووردبريس الخاص بي بطيء جدًا؟", slug: "/blog/limaza-mawqie-wordpress-batee-wal-hal" },
    { question: "كيفية زيادة حجوزات Booking.com ؟", slug: "/blog/ziadat-hujuzat-booking-com-wal-sir" },
    { question: "كيفية تسريع موقع ووردبريس؟", slug: "/blog/limaza-mawqie-wordpress-batee-wal-hal" },
    { question: "ما هي عيوب ووردبريس؟", slug: "/blog/badil-wordpress-haloul-asriya" },
    { question: "هل يمكن إنشاء موقع الكتروني مجاني واحترافي؟", slug: "/blog/thaman-inshaa-mawqi-electroni-bil-maghrib-dalil" },
    { question: "كيف يتم تسويق الفنادق عبر الإنترنت؟", slug: "/blog/kayfa-yatem-taswiq-alfanadiq-online" },
    { question: "ما هي أنواع الحجوزات في الفنادق؟", slug: "/blog/anwaa-alhujuzat-fi-alfanadiq" }
  ]
};

export default function FaqHubSection({ id }: { id?: string }) {
  const t = useTranslations('FaqHub');
  const locale = useLocale();
  const theme = useTheme();

  // Type-safe locale access
  const questions = hubData[locale as keyof typeof hubData] || hubData.en;

  return (
    <Box
      id={id || "faq"}
      component="section"
      aria-labelledby="faq-hub-title"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default, // Obsidian
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ 
              color: theme.palette.primary.main, // White/Bright
              letterSpacing: 2, 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 1
            }}
          >
            <MenuBookIcon fontSize="small" /> KNOWLEDGE BASE
          </Typography>
          <Typography
            id="faq-hub-title"
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'white',
              mb: 2
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            {t('subtitle')}
          </Typography>
        </Box>

        {/* The Grid */}
        <Grid container spacing={2}>
          {questions.map((item, index) => (
            <Grid  key={index} size={{xs: 12, md: 6}}>
              <Link href={item.slug} style={{ textDecoration: 'none' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    // "Obsidian Glass" Style
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.2s ease',
                    group: 'true',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      borderColor: theme.palette.secondary.main, // Amber Border Glow
                      transform: 'translateX(6px)', // Slide effect
                      '& .icon-arrow': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      }
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, overflow: 'hidden' }}>
                    <Box 
                      sx={{ 
                        p: 1, 
                        borderRadius: 2, 
                        bgcolor: 'rgba(255,255,255,0.05)', 
                        color: 'text.secondary' 
                      }}
                    >
                      <ArticleIcon fontSize="small" />
                    </Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600, 
                        color: 'white',
                        lineHeight: 1.4
                      }}
                    >
                      {item.question}
                    </Typography>
                  </Box>

                  {/* Hover Arrow (Initially Hidden/Subtle) */}
                  <ArrowForwardIcon 
                    className="icon-arrow"
                    sx={{ 
                      color: theme.palette.secondary.main, 
                      opacity: 0.5,
                      fontSize: 20,
                      transform: 'translateX(-4px)',
                      transition: 'all 0.2s ease'
                    }} 
                  />
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* View All Button */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button
            component={Link}
            href="/blog"
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            {t('browseAllButton')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}