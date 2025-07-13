// -------------------------------------------------------------------------
// 2. UPDATED FILE: /src/app/[locale]/page.tsx
// Update your homepage to render the new HeroSection.
// -------------------------------------------------------------------------
import Header from "@/components/layout/Header";
import ContactSection from "@/components/sections/ContactSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection"; // <-- Import the new section
import PortfolioSection from "@/components/sections/PortfolioSection";
import PricingSection from "@/components/sections/PricingSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";

export default function HomePage() {
  return (
    // The main layout is handled by layout.tsx, so we only need the content here.
    <main>
        <HeroSection />
        <ProblemSolutionSection /> 
        <PortfolioSection />
        <FeaturesSection />
        <PricingSection /> 
        <ContactSection />
    </main>
  );
}
