// src/app/[locale]/about/page.tsx

import React from 'react';
import { Metadata } from 'next';
// ▼▼▼ REMOVED getTranslations IMPORT ▼▼▼
// import { getTranslations } from 'next-intl/server';



import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutDifference from '@/components/about/AboutDifference';
import AboutFounder from '@/components/about/AboutFounder';
import AboutProcess from '@/components/about/AboutProcess';
import AboutCTA from '@/components/about/AboutCTA';
import AnimatedSection from "@/components/ui/AnimatedSection";
import { metadataStore, siteConfig } from '@/app/config/site';
import { generateCustomMetadata } from '../../../../lib/metadata';

// Define props type for page params
type Props = {
  params: Promise<{ locale: string }>;
};

// ▼▼▼ UPDATED METADATA FUNCTION ▼▼▼
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get current locale
  const { locale } = await params;
  // Get base URL
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || siteConfig.url;

  // 1. Retrieve specific about page metadata based on locale
  // Using 'about' key from our store
  const pageMeta = metadataStore['about'][locale] || metadataStore['about'].en;

  // 2. Generate the final metadata object using utility function
  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}/about`, // Specific path for this page
    images: [
      {
        src: pageMeta.ogImage.src, // Will use /images/og/og-main.webp as defined in store
        alt: pageMeta.ogImage.alt,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    locale: locale,
    baseUrl: siteUrl
  });
}
// ▲▲▲

export default function AboutPage() {
  return (
    <main>
      {/* Hero loads instantly */}
      <AboutHero />
      
      <AnimatedSection delay={0.1}>
        <AboutStory />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <AboutDifference />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <AboutFounder />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <AboutProcess />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <AboutCTA />
      </AnimatedSection>
    </main>
  );
}