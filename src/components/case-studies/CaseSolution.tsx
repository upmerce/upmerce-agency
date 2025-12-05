// /src/components/case-studies/CaseSolution.tsx
'use client';

import React from 'react';
import Image from 'next/image';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';

const CaseSolution = () => {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('CaseStudies.Solution');
  // ▲▲▲

  return (
    <section className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
           {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            {t('subtitle')}
          </p>
           {/* ▲▲▲ */}
        </div>

        {/* Solution Part 1: Frontend */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block p-3 bg-purple-900/30 rounded-xl border border-purple-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25" /></svg>
            </div>
             {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {t('frontend.title')}
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t('frontend.description')}
            </p>
             {/* ▲▲▲ */}
          </div>
          {/* Tablet Mockup Visual (Unchanged) */}
          <div className="lg:w-1/2 relative h-[300px] md:h-[450px] w-full">
            <div className="absolute -inset-4 bg-purple-600/20 blur-2xl rounded-3xl -z-10"></div>
            <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-gray-800 shadow-2xl">
              <Image
                src="/images/themes/adventure-tablet.webp"
                alt="Marrago website shown on a tablet device"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                className="hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Solution Part 2: Backend */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
           {/* Mobile Mockup Visual (Unchanged) */}
          <div className="lg:w-1/2 relative h-[400px] md:h-[550px] w-full flex justify-center lg:justify-start">
            <div className="absolute inset-y-4 left-1/4 right-1/4 bg-blue-600/20 blur-2xl rounded-full -z-10 lg:left-0 lg:right-1/2"></div>
            <div className="relative h-full aspect-[9/19] rounded-[2.5rem] overflow-hidden border-8 border-gray-800 shadow-2xl bg-gray-950">
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-950 z-20 rounded-b-3xl"></div>
              <Image
                src="/images/themes/adventure-mobile.webp"
                alt="Upmerce mobile admin panel on a smartphone"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6 lg:pl-12">
            <div className="inline-block p-3 bg-blue-900/30 rounded-xl border border-blue-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
            </div>
             {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {t('backend.title')}
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t('backend.description')}
            </p>
             {/* ▲▲▲ */}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CaseSolution;