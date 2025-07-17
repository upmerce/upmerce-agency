// -------------------------------------------------------------------------
// 2. NEW FILE: /src/app/[locale]/process/page.tsx
// This is the page that will live at the /process route.
// -------------------------------------------------------------------------
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";

export default function ProcessPage() {
  return (
    <main>
      <ProcessSection />
      <ContactSection />
    </main>
  );
}