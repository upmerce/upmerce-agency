// -------------------------------------------------------------------------
// 1. UPDATED FILE: /src/components/sections/ProcessSection.tsx
// This component now displays a 5-step timeline.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

// --- UPDATED to a 5-step process ---
const processSteps = [
  {
    step: '01',
    titleKey: 'step1_title',
    descKey: 'step1_desc',
  },
  {
    step: '02',
    titleKey: 'step2_title',
    descKey: 'step2_desc',
  },
  {
    step: '03',
    titleKey: 'step3_title',
    descKey: 'step3_desc',
  },
  {
    step: '04',
    titleKey: 'step4_title',
    descKey: 'step4_desc',
  },
  {
    step: '05',
    titleKey: 'step5_title',
    descKey: 'step5_desc',
  },
];

export default function ProcessSection() {
  const t = useTranslations('AgencyProcess');

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="relative border-l-2 border-purple-500 ml-6 md:ml-0 md:border-l-0 md:border-t-2">
          {/* --- UPDATED to use a 5-column grid on desktop --- */}
          <div className="grid md:grid-cols-5">
            {processSteps.map((item, index) => (
              <div key={index} className="relative mb-12 md:mb-0">
                <div className="absolute -left-7 md:left-auto md:-top-7 md:right-1/2 transform md:translate-x-1/2">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div className="ml-12 md:ml-0 md:mt-12 md:text-center p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{t(item.titleKey)}</h3>
                  <p className="text-gray-400">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
