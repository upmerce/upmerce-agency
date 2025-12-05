// /src/components/case-studies/CaseResults.tsx
'use client';

import React from 'react';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';

// Icons remain the same...
const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.051-.659-1.172-.879-1.172-2.303 0-3.182 1.172-.879 3.07-.879 4.242 0L15 8.818m-9 3a3 3 0 006 0v3a3 3 0 00-6 0v-3zm0 0h6m-6 0a3 3 0 01-3-3V9a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-3 3m-6 0a3 3 0 00-6 0v3a3 3 0 006 0v-3zm0 0h6" /></svg>
);
const TimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
);

const CaseResults = () => {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('CaseStudies.Results');
  // ▲▲▲

  // Data updated to use translation keys
  const metrics = [
    { icon: <MoneyIcon />, valueKey: "metrics.commission.value", labelKey: "metrics.commission.label", descKey: "metrics.commission.description" },
    { icon: <TimeIcon />, valueKey: "metrics.time.value", labelKey: "metrics.time.label", descKey: "metrics.time.description" },
    { icon: <SearchIcon />, valueKey: "metrics.seo.value", labelKey: "metrics.seo.label", descKey: "metrics.seo.description" }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements unchanged... */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-gray-900 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
           {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t('subtitle')}
          </p>
           {/* ▲▲▲ */}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="mb-6 inline-flex p-4 bg-gray-900/50 rounded-xl group-hover:scale-110 transition-transform">
                {metric.icon}
              </div>
              {/* Big Number with Glow */}
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full -z-10"></div>
                <span className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                   {/* ▼▼▼ TRANSLATED VALUE ▼▼▼ */}
                  {t(metric.valueKey)}
                </span>
              </div>
               {/* ▼▼▼ TRANSLATED LABEL & DESC ▼▼▼ */}
              <h3 className="text-xl font-bold text-white mb-4">
                {t(metric.labelKey)}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {t(metric.descKey)}
              </p>
               {/* ▲▲▲ */}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseResults;