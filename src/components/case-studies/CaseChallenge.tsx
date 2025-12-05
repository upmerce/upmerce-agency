// /src/components/case-studies/CaseChallenge.tsx
'use client';

import React from 'react';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';

// Icons remain the same...
const CommissionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.051-.659-1.172-.879-1.172-2.303 0-3.182 1.172-.879 3.07-.879 4.242 0L15 8.818m-9 3a3 3 0 006 0v3a3 3 0 00-6 0v-3zm0 0h6m-6 0a3 3 0 01-3-3V9a3 3 0 013-3h6a3 3 0 013 3v3a3 3 0 01-3 3m-6 0a3 3 0 00-6 0v3a3 3 0 006 0v-3zm0 0h6" /></svg>
);
const ChaosIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-500"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
);
const DeskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-500"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
);

const CaseChallenge = () => {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('CaseStudies.Challenge');
  // ▲▲▲

  // Data updated to use translation keys
  const painPoints = [
    { icon: <CommissionIcon />, titleKey: "painPoints.commission.title", descKey: "painPoints.commission.description" },
    { icon: <ChaosIcon />, titleKey: "painPoints.chaos.title", descKey: "painPoints.chaos.description" },
    { icon: <DeskIcon />, titleKey: "painPoints.desk.title", descKey: "painPoints.desk.description" }
  ];

  return (
    // ▼▼▼ UPDATED COLORS: Alternating dark background ▼▼▼
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          {/* Lighter gray text */}
          <p className="text-lg text-gray-400 leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              // ▼▼▼ UPDATED CARDS: Main dark background, lighter border ▼▼▼
              className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-red-900/50 transition-all duration-300 group"
            >
              <div className="mb-6 p-3 bg-gray-800 rounded-lg inline-block group-hover:bg-gray-700 transition-colors">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {t(point.titleKey)}
              </h3>
              {/* Lighter gray text */}
              <p className="text-gray-400 leading-relaxed">
                {t(point.descKey)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseChallenge;