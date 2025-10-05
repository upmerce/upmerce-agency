// src/app/[locale]/page.tsx

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