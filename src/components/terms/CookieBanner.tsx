// src/components/layout/CookieBanner.tsx
"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  onAcceptAll: () => void;
  onDeclineAll: () => void;
  onCustomize: () => void;
};

export default function CookieBanner({
  onAcceptAll,
  onDeclineAll,
  onCustomize,
}: Props) {
  const t = useTranslations("CookieConsent");

  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100 dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="mb-2">
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
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onAcceptAll}
            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 sm:flex-grow"
          >
            {t("acceptAll")}
          </button>
          <button
            onClick={onDeclineAll}
            className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 sm:flex-grow"
          >
            {t("declineAll")}
          </button>
          <button
            onClick={onCustomize}
            className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 sm:flex-grow"
          >
            {t("customize")}
          </button>
        </div>
      </div>
    </section>
  );
}