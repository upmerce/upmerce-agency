// /src/app/[locale]/solutions/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import SolutionsPain from '@/components/solutions/SolutionsPain';
import SolutionsFinance from '@/components/solutions/SolutionsFinance';
import SolutionsMobile from '@/components/solutions/SolutionsMobile';
import SolutionsGrowth from '@/components/solutions/SolutionsGrowth';
import SolutionsEcosystem from '@/components/solutions/SolutionsEcosystem';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';
// ▼▼▼ NEW IMPORT ▼▼▼
import AnimatedSection from "@/components/ui/AnimatedSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Solutions.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

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