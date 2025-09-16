// src/components/sections/ProcessSection.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ProcessSection() {
  const t = useTranslations('AgencyProcess');

  const processSteps = [0, 1, 2, 3].map(index => ({
    step: `0${index + 1}`,
    title: t(`steps.${index}.title`),
    description: t(`steps.${index}.description`),
  }));

  return (
    <section id="our-process" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="relative border-l-2 border-purple-500 ml-6 md:ml-0 md:border-l-0 md:border-t-2">
          <div className={`grid md:grid-cols-${processSteps.length}`}>
            {processSteps.map((item, index) => (
              <div key={index} className="relative mb-12 md:mb-0">
                <div className="absolute -left-7 md:left-auto md:-top-7 md:right-1/2 transform md:translate-x-1/2">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div className="ml-12 md:ml-0 md:mt-12 md:text-center p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}