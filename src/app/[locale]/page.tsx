// src/app/[locale]/page.tsx

import { Metadata } from 'next';
// ▼▼▼ IMPORT METADATA TOOLS ▼▼▼

// ▲▲▲

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
import { metadataStore, siteConfig } from '../config/site';
import { generateCustomMetadata } from '../../../lib/metadata';

// Define props type for page params
type Props = {
  params: Promise<{ locale: string }>;
};

// ▼▼▼ NEW METADATA GENERATION FUNCTION ▼▼▼
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get current locale
  const { locale } = await params;
  // Get base URL
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || siteConfig.url;

  // 1. Retrieve specific homepage metadata based on locale
  // Using 'homepage' key from our store
  const pageMeta = metadataStore['homepage'][locale] || metadataStore['homepage'].en;

  // 2. Generate the final metadata object using utility function
  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}`, // Homepage path is just the locale root
    images: [
      {
        src: pageMeta.ogImage.src, // Will use /images/og/og-main.webp
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

export default function HomePage() {
  return (
    <main>
      <HeroSection /> 
      
      <AnimatedSection delay={0.1}>
        {/* ADDED ID */}
        <ProblemSolutionSection id="problem-solution" /> 
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <FounderNoteSection /> {/* No ID needed as it's not in header nav */}
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <StatsSection /> {/* No ID needed as it's not in header nav */}
      </AnimatedSection>
      
      {/* ADDED ID */}
      {/* FeaturesSection has its own animation, so no AnimatedSection wrapper here */}
      <FeaturesSection id="features" /> 
      
      <AnimatedSection delay={0.1}>
        {/* ADDED ID */}
        <PortfolioSection id="portfolio" /> 
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <TechnologyAdvantageSection /> {/* No ID needed as it's not in header nav */}
      </AnimatedSection>
      
      <AnimatedSection delay={0.1}>
        <OwnershipSection /> {/* No ID needed as it's not in header nav */}
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        {/* ADDED ID */}
        <PricingSection id="pricing" /> 
      </AnimatedSection>
      
      <AnimatedSection delay={0.1}>
        {/* ADDED ID */}
        <FaqHubSection id="faq" /> 
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        {/* ADDED ID */}
        <ContactSection id="contact" /> 
      </AnimatedSection>
    </main>
  );
}