'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const OldIcon = () => (
  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" /></svg>
);
const NewIcon = () => (
  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);

export default function TechnologyAdvantageSection() {
  const t = useTranslations('AgencyTechnology');

  return (
    <section className="bg-gray-800 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* The Old Way */}
          <div className="bg-gray-900 p-8 rounded-lg border border-red-500/30">
            <div className="flex items-center mb-4">
              <OldIcon />
              <h3 className="text-2xl font-bold text-white ml-4">{t('oldWay.title')}</h3>
            </div>
            <ul className="space-y-4 text-gray-400">
              {/* === CHANGED LINES START === */}
              <li><strong>{t('labels.performance')}</strong> {t('oldWay.performance')}</li>
              <li><strong>{t('labels.security')}</strong> {t('oldWay.security')}</li>
              <li><strong>{t('labels.cost')}</strong> {t('oldWay.cost')}</li>
              {/* === CHANGED LINES END === */}
            </ul>
          </div>
          {/* The Upmerce Way */}
          <div className="bg-gray-900 p-8 rounded-lg border border-green-500/30">
            <div className="flex items-center mb-4">
              <NewIcon />
              <h3 className="text-2xl font-bold text-white ml-4">{t('newWay.title')}</h3>
            </div>
            <ul className="space-y-4 text-gray-300">
              {/* === CHANGED LINES START === */}
              <li><strong>{t('labels.performance')}</strong> {t('newWay.performance')}</li>
              <li><strong>{t('labels.security')}</strong> {t('newWay.security')}</li>
              <li><strong>{t('labels.cost')}</strong> {t('newWay.cost')}</li>
              {/* === CHANGED LINES END === */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}