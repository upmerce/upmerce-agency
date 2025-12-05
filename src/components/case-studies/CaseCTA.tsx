// /src/components/case-studies/CaseCTA.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// ▼▼▼ NEW IMPORT ▼▼▼
import { useTranslations } from 'next-intl';

const CaseCTA = () => {
  // ▼▼▼ INITIALIZE TRANSLATIONS ▼▼▼
  const t = useTranslations('CaseStudies.CTA');
  // ▲▲▲

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements unchanged... */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 z-0"></div>
      <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
         {/* ▼▼▼ TRANSLATED TEXT ▼▼▼ */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto">
          {t('title')}
        </h2>
        <p className="text-xl text-purple-100 leading-relaxed max-w-2xl mx-auto mb-12">
          {t('subtitle')}
        </p>
         {/* ▲▲▲ */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Primary Action */}
          <Link 
            href="/campaign" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-purple-900 bg-white rounded-xl overflow-hidden transition-all duration-300 hover:bg-purple-50 hover:scale-105 hover:shadow-2xl shadow-purple-900/30"
          >
            <span className="mr-3"><RocketLaunchIcon /></span>
             {/* ▼▼▼ TRANSLATED BUTTON ▼▼▼ */}
            {t('primaryBtn')}
          </Link>

          {/* Secondary Action */}
          <a 
            href="https://www.marrago.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white"
          >
            <span className="mr-3"><OpenInNewIcon /></span>
             {/* ▼▼▼ TRANSLATED BUTTON ▼▼▼ */}
            {t('secondaryBtn')}
          </a>
        </div>

      </div>
    </section>
  );
};

export default CaseCTA;