// /src/app/[locale]/case-studies/page.tsx
import React from 'react';
import { Metadata } from 'next';
import CaseHero from '@/components/case-studies/CaseHero';
import CaseChallenge from '@/components/case-studies/CaseChallenge';
import CaseSolution from '@/components/case-studies/CaseSolution';
import CaseResults from '@/components/case-studies/CaseResults';
import CaseCTA from '@/components/case-studies/CaseCTA';
// ▼▼▼ NEW IMPORT ▼▼▼
import { getTranslations } from 'next-intl/server';

// Dynamic metadata for SEO using translations
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'CaseStudies.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
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