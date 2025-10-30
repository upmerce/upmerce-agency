// src/components/analytics/AnalyticsScripts.tsx
"use client";


import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import { useEffect } from "react";
import { useCookieConsent } from "../context/CookieConsentContext";

export default function AnalyticsScripts() {
  const { consent } = useCookieConsent();

  // Optional: Log to console to verify consent state
  useEffect(() => {
    console.log("Cookie Consent State:", consent);
  }, [consent]);

  return (
    <>
      {/* Only render Google Analytics if the user has consented to 'analytics'
        and the environment variable is set.
      */}
      {consent.analytics && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      
      {/* Only render Meta Pixel if the user has consented to 'marketing'
        and the environment variable is set.
      */}
      {consent.marketing && process.env.NEXT_PUBLIC_META_PIXEL_ID && (
        <MetaPixel />
      )}
    </>
  );
}