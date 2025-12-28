// src/components/privacy/PrivacyContent.tsx
"use client";

import { useTranslations } from "next-intl";

export default function PrivacyContent() {
  const t = useTranslations("Privacy");

  const sectionKeys = [
    "intro", "dataController", "dataCollected", "usagePurpose", 
    "legalBasis", "storage", "thirdParties", "security", 
    "cookies", "userRights", "hosting", "links", "updates", "contact",
  ];

  return (
    <>
      <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t("title")}</h1>
        <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>{t("lastUpdated")}</p>

        <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
          <p><strong>{t("projectInfo")}</strong></p>
          <p>{t("project")}</p>
          <p>{t("founder")}</p>
          <p>
            {t("contactLabel")}{" "}
            <a href={`mailto:${t("contactEmail")}`}>{t("contactEmail")}</a>
          </p>
          <p>{t("status")}</p>
        </div>
      </header>

      <section>
        {sectionKeys.map((key) => (
          <article key={key} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {t(`sections.${key}.title`)}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: t.raw(`sections.${key}.content`) }}
            />
          </article>
        ))}
      </section>
    </>
  );
}