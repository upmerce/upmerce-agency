// src/app/[locale]/page.tsx

import { Metadata } from 'next';
import ContactSection from "@/components/sections/ContactSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection";
import FounderNoteSection from "@/components/sections/FounderNoteSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import PricingSection from "@/components/sections/PricingSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import StatsSection from "@/components/sections/StatsSection";
import TechnologyAdvantageSection from "@/components/sections/TechnologyAdvantageSection";
import FaqHubSection from "@/components/sections/FaqHubSection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import OwnershipSection from "@/components/OwnershipSection";
// 1. IMPORT THE NEW COMPONENT
import AgencyObjections from "@/components/sections/AgencyObjections"; 

import { metadataStore, siteConfig } from '../config/site';
import { generateCustomMetadata } from '../../../lib/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || siteConfig.url;
  const pageMeta = metadataStore['homepage'][locale] || metadataStore['homepage'].en;

  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}`,
    images: [
      {
        src: pageMeta.ogImage.src,
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

export default function HomePage() {
  return (
    <main>
      <HeroSection /> 
      
      <AnimatedSection delay={0.1}>
        <ProblemSolutionSection id="problem-solution" /> 
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <FounderNoteSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <StatsSection />
      </AnimatedSection>
      
      <FeaturesSection id="features" /> 
      
      <AnimatedSection delay={0.1}>
        <PortfolioSection id="portfolio" /> 
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <TechnologyAdvantageSection />
      </AnimatedSection>
      
      <AnimatedSection delay={0.1}>
        <OwnershipSection />
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <PricingSection id="pricing" /> 
      </AnimatedSection>

      {/* 2. INSERT OBJECTIONS HERE (The Fear Killer) */}
      <AnimatedSection delay={0.1}>
         <AgencyObjections />
      </AnimatedSection>
      
      <AnimatedSection delay={0.1}>
        <FaqHubSection id="faq" /> 
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <ContactSection id="contact" /> 
      </AnimatedSection>
    </main>
  );
}