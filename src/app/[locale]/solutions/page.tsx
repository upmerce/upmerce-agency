// src/app/[locale]/solutions/page.tsx

import React from 'react';
import { Metadata } from 'next';
// ▼▼▼ REMOVED getTranslations IMPORT ▼▼▼
// import { getTranslations } from 'next-intl/server';


import SolutionsHero from '@/components/solutions/SolutionsHero';
import SolutionsPain from '@/components/solutions/SolutionsPain';
import SolutionsFinance from '@/components/solutions/SolutionsFinance';
import SolutionsMobile from '@/components/solutions/SolutionsMobile';
import SolutionsGrowth from '@/components/solutions/SolutionsGrowth';
import SolutionsEcosystem from '@/components/solutions/SolutionsEcosystem';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';
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

  // 1. Retrieve specific solutions page metadata based on locale
  // Using 'solutions' key from our store
  const pageMeta = metadataStore['solutions'][locale] || metadataStore['solutions'].en;

  // 2. Generate the final metadata object using utility function
  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}/solutions`, // Specific path for this page
    images: [
      {
        src: pageMeta.ogImage.src, // Will use /images/og/og-solutions.webp as defined in store
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

export default function SolutionsPage() {
  return (
    <main>
      {/* Hero loads instantly */}
      <SolutionsHero />

      <AnimatedSection delay={0.1}>
        <SolutionsPain />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <SolutionsFinance />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <SolutionsMobile />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <SolutionsGrowth />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <SolutionsEcosystem />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <SolutionsCTA />
      </AnimatedSection>
    </main>
  );
}