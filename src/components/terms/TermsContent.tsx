// src/components/terms/TermsContent.tsx
"use client";

import { useTranslations } from "next-intl";

export default function TermsContent() {
  const t = useTranslations("Terms");

  // We now define the keys here to control the order and add new ones
  const sectionKeys = [
    "acceptance",
    "definitions",
    "services",
    "ipOwnership",
    "thirdParty",
    "responsibility",
    "modifications",
    "law",
    "contact",
  ];

  return (
    <>
      {/* HEADER BLOCK (No change) */}
      <header className="mb-10 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold mb-2 text-white">{t("title")}</h1>
        <p className="text-sm text-gray-400">{t("lastUpdated")}</p>

        <div className="mt-6 space-y-1 text-sm">
          <p className="font-semibold text-gray-300">{t("projectInfo")}</p>
          <p>{t("project")}</p>
          <p>{t("founder")}</p>
          <p>
            {t("contactLabel")}{" "}
            <a
              href={`mailto:${t("contactEmail")}`}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {t("contactEmail")}
            </a>
          </p>
          <p>{t("status")}</p>
        </div>
      </header>

      {/* BODY SECTIONS (Upgraded) */}
      <section className="space-y-10 text-justify text-gray-300">
        {sectionKeys.map((key) => (
          <article key={key}>
            <h2 className="font-semibold text-lg mb-2 text-white">
              {t(`sections.${key}.title`)}
            </h2>
            {/* UPGRADE: We now use t.raw() and dangerouslySetInnerHTML.
              This allows us to render HTML (like <ul>, <li>, <strong>) 
              from our translation file.
            */}
            <div
              className="prose prose-invert prose-sm max-w-none text-gray-300"
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