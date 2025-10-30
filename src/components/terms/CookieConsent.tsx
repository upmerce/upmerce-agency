// src/components/layout/CookieConsent.tsx
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const [isVisible, setIsVisible] = useState(false);

  // On component mount, check localStorage
  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (consent === null) {
      // No choice made yet, show the banner
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "given");
    setIsVisible(false);
    // You can also add a function here to initialize analytics
    // e.g., initAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100 dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 sm:flex sm:items-center sm:justify-between">
        {/* Message */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t("message")}{" "}
          <Link
            href="/privacy"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t("privacyLinkText")}
          </Link>
          .
        </p>

        {/* Buttons */}
        <div className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 flex gap-2">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            {t("decline")}
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </section>
  );
}