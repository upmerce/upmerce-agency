// /src/components/case-studies/CaseHero.tsx
'use client';

import React from 'react';
import Image from 'next/image';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';

const CaseHero = () => {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('CaseStudies.Hero');
  // ▲▲▲

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/themes/adventure-pc.webp"
          alt="Marrago website desktop mockup background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
          className="opacity-40 blur-sm scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-gray-900" aria-hidden="true"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <span className="inline-block py-1 px-3 mb-6 text-sm font-semibold text-purple-300 bg-purple-900/50 border border-purple-500/30 rounded-full uppercase tracking-wider">
          {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
          {t('eyebrow')}
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
         {/* ▲▲▲ */}
      </div>
    </section>
  );
};

export default CaseHero;