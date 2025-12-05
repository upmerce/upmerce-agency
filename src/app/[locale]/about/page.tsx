// /src/app/[locale]/about/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutDifference from '@/components/about/AboutDifference';
import AboutFounder from '@/components/about/AboutFounder';
import AboutProcess from '@/components/about/AboutProcess';
import AboutCTA from '@/components/about/AboutCTA';
// ▼▼▼ NEW IMPORT ▼▼▼
import AnimatedSection from "@/components/ui/AnimatedSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

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