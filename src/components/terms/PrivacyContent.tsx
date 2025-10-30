// src/components/privacy/PrivacyContent.tsx
"use client";

import { useTranslations } from "next-intl";

export default function PrivacyContent() {
  const t = useTranslations("Privacy");

  // We define keys here to control order and add new ones
  const sectionKeys = [
    "intro",
    "dataController",
    "dataCollected",
    "usagePurpose",
    "legalBasis",
    "storage",
    "thirdParties",
    "security",
    "cookies",
    "userRights",
    "hosting",
    "links",
    "updates",
    "contact",
  ];

  return (
    <>
      {/* HEADER BLOCK (No change, adjusted for light/dark) */}
      <header className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t("lastUpdated")}
        </p>

        <div className="mt-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <p className="font-semibold">{t("projectInfo")}</p>
          <p>{t("project")}</p>
          <p>{t("founder")}</p>
          <p>
            {t("contactLabel")}{" "}
            <a
              href={`mailto:${t("contactEmail")}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-300 underline"
            >
              {t("contactEmail")}
            </a>
          </p>
          <p>{t("status")}</p>
        </div>
      </header>

      {/* BODY SECTIONS (Upgraded) */}
      <section className="space-y-8 text-justify text-gray-700 dark:text-gray-300">
        {sectionKeys.map((key) => (
          <article key={key}>
            <h2 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              {t(`sections.${key}.title`)}
            </h2>
            {/* UPGRADE: We now use t.raw() and dangerouslySetInnerHTML.
              This allows us to render HTML (like <ul>, <li>, <strong>) 
              from our translation file.
            */}
            <div
              className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: t.raw(`sections.${key}.content`),
              }}
            />
          </article>
        ))}
      </section>
    </>
  );
}