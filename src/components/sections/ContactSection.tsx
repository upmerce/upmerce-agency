// -------------------------------------------------------------------------
// 1. NEW FILE: /src/components/sections/ContactSection.tsx
// This component should be placed in your 'sections' sub-folder.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('AgencyContact');

  return (
    <section id="contact" className="py-20">
        <div className="container mx-auto px-6 text-center">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('title')}
             </h2>
             <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                {t('subtitle')}
             </p>
             <Link 
                href="mailto:your-email@upmerce.com" // <-- IMPORTANT: Change this to your actual email
                className="bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300 text-lg"
             >
                {t('ctaButton')}
            </Link>
        </div>
    </section>
  );
}