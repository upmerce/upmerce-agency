// src/components/layout/Footer.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { contactConfig } from '@/config/site';
import { Box, Container, Grid, Typography, Stack, IconButton, useTheme, Divider } from '@mui/material';

type SocialLink = {
  name: string;
  href: string;
  iconSrc: string;
};

// Import Icons (MUI Icons are safer for theming than SVGs if possible, but we stick to images for social)
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  const t = useTranslations('AgencyFooter');
  const tNav = useTranslations('AgencyNavigation');
  const theme = useTheme();

  const currentYear = new Date().getFullYear();

  const footerNavs = [
    {
      title: t('footerNavs.companyTitle'),
      links: [
        { name: tNav('home'), href: '/', type: 'link' },
        { name: tNav('about'), href: '/about', type: 'link' },
        { name: tNav('solutions'), href: '/solutions', type: 'link' },
        { name: tNav('caseStudies'), href: '/case-studies', type: 'link' },
      ],
    },
    {
      title: t('footerNavs.resourcesTitle'),
      links: [
        { name: tNav('blog'), href: '/blog', type: 'link' },
        { name: tNav('faq'), href: '/#faq', type: 'scroll' },
        { name: t('footerNavs.support'), href: '/#contact', type: 'scroll' },
        { name: t('footerNavs.termsOfService'), href: '/terms', type: 'link' },
        { name: t('footerNavs.privacyPolicy'), href: '/privacy', type: 'link' },
      ],
    },
  ];

  const socialLinks: SocialLink[] = [
    contactConfig.linkedin ? { name: 'LinkedIn', href: contactConfig.linkedin, iconSrc: '/icons/linkedin.svg' } : null,
    contactConfig.facebook ? { name: 'Facebook', href: contactConfig.facebook, iconSrc: '/icons/facebook.svg' } : null,
    contactConfig.twitter ? { name: 'X', href: contactConfig.twitter, iconSrc: '/icons/x-logo.svg' } : null,
    contactConfig.instagram ? { name: 'Instagram', href: contactConfig.instagram, iconSrc: '/icons/instagram.svg' } : null,
  ].filter(Boolean) as SocialLink[];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.default, // Obsidian
        borderTop: '1px solid rgba(255,255,255,0.05)',
        pt: 10,
        pb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Glow */}
      <Box sx={{ 
        position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px', 
        background: `radial-gradient(circle, ${theme.palette.secondary.main}08 0%, transparent 70%)`,
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8}>
          
          {/* Column 1: Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Link href="/" aria-label={tNav('siteTitle')}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Image
                  src="/icons/logo.webp"
                  alt={tNav('siteTitle')}
                  width={32}
                  height={32}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                  {tNav('siteTitle')}
                </Typography>
              </Box>
            </Link>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4, maxWidth: '300px' }}>
              {t('shortDescription')}
            </Typography>

            {/* Social Icons */}
            <Stack direction="row" spacing={2}>
              {socialLinks.map((link: SocialLink) => (
                <IconButton 
                  key={link.name} 
                  component="a" 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    '&:hover': { bgcolor: 'white', '& img': { filter: 'invert(1)' } }
                  }}
                >
                  <Image src={link.iconSrc} alt={link.name} width={20} height={20} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Column 2 & 3: Links */}
          {footerNavs.map((nav, index) => (
            <Grid size={{ xs: 6, md: 2 }} key={index}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  letterSpacing: 1.5, 
                  textTransform: 'uppercase', 
                  mb: 3 
                }}
              >
                {nav.title}
              </Typography>
              <Stack spacing={1.5}>
                {nav.links.map((link) => (
                  <Box key={link.name}>
                    {link.type === 'scroll' ? (
                      <Typography 
                        component="a" 
                        href={link.href}
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary', 
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                          '&:hover': { color: theme.palette.secondary.main }
                        }}
                      >
                        {link.name}
                      </Typography>
                    ) : (
                      <Link 
                        href={link.href} 
                        style={{ textDecoration: 'none' }}
                      >
                         <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary', 
                            transition: 'color 0.2s',
                            '&:hover': { color: theme.palette.secondary.main }
                          }}
                        >
                          {link.name}
                        </Typography>
                      </Link>
                    )}
                  </Box>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Column 4: Contact */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: 'white', 
                fontWeight: 700, 
                letterSpacing: 1.5, 
                textTransform: 'uppercase', 
                mb: 3 
              }}
            >
              {t('footerNavs.contactTitle')}
            </Typography>
            <Stack spacing={2}>
              {contactConfig.phoneNumber.formatted && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', color: theme.palette.secondary.main }}>
                    <PhoneIcon fontSize="small" />
                  </Box>
                  <Typography 
                    component="a" 
                    href={`tel:${contactConfig.phoneNumber.raw}`} 
                    variant="body2" 
                    sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'white' } }}
                  >
                    {contactConfig.phoneNumber.formatted}
                  </Typography>
                </Box>
              )}
              
              {contactConfig.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', color: theme.palette.secondary.main }}>
                    <EmailIcon fontSize="small" />
                  </Box>
                  <Typography 
                    component="a" 
                    href={`mailto:${contactConfig.email}`} 
                    variant="body2" 
                    sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'white' } }}
                  >
                    {contactConfig.email}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Grid>

        </Grid>

        <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.05)' }} />

        {/* Copyright */}
        <Typography variant="body2" align="center" sx={{ color: 'text.disabled' }}>
          &copy; {currentYear} {t('copyright')}
        </Typography>
      </Container>
    </Box>
  );
}