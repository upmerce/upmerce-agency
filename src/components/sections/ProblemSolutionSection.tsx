// -------------------------------------------------------------------------
// 1. NEW FILE: /src/components/sections/ProblemSolutionSection.tsx
// This component should be placed in your 'sections' sub-folder.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ProblemSolutionSection() {
  const t = useTranslations('AgencyProblemSolution');

  return (
    <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-bold text-white mb-4">{t('problemTitle')}</h2>
                <p className="text-gray-400">
                    {t('problemText')}
                </p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-3">{t('solutionTitle')}</h3>
                <p className="text-gray-300">
                    {t('solutionText')}
                </p>
            </div>
        </div>
    </section>
  );
}