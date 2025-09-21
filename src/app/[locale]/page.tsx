import OwnershipSection from "@/components/OwnershipSection";
import ContactSection from "@/components/sections/ContactSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import PricingSection from "@/components/sections/PricingSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import StatsSection from "@/components/sections/StatsSection";
import TechnologyAdvantageSection from "@/components/sections/TechnologyAdvantageSection"; // 1. Import new component

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSolutionSection /> 
      <StatsSection />
      <FeaturesSection /> {/* 2. Moved Features before Portfolio */}
      <PortfolioSection />
      <TechnologyAdvantageSection /> {/* 3. Add new component */}
      <OwnershipSection />
      <PricingSection /> 
      <ContactSection />
    </main>
  );
}