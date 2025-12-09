// src/app/[locale]/case-studies/page.tsx

import React from 'react';
import { Metadata } from 'next';
// ▼▼▼ REMOVED getTranslations IMPORT ▼▼▼
// import { getTranslations } from 'next-intl/server';


import CaseHero from '@/components/case-studies/CaseHero';
import CaseChallenge from '@/components/case-studies/CaseChallenge';
import CaseSolution from '@/components/case-studies/CaseSolution';
import CaseResults from '@/components/case-studies/CaseResults';
import CaseCTA from '@/components/case-studies/CaseCTA';
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

  // 1. Retrieve specific case-studies page metadata based on locale
  // Using 'case-studies' key from our store
  const pageMeta = metadataStore['case-studies'][locale] || metadataStore['case-studies'].en;

  // 2. Generate the final metadata object using utility function
  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}/case-studies`, // Specific path for this page
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

export default function CaseStudiesPage() {
  return (
    <main className="bg-gray-900 min-h-screen">
      <CaseHero />
      <CaseChallenge />
      <CaseSolution />
      <CaseResults />
      <CaseCTA />
    </main>
  );
}