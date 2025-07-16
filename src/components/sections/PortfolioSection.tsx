// -------------------------------------------------------------------------
// 1. NEW FILE: /src/components/sections/PortfolioSection.tsx
// This component should be placed in your 'sections' sub-folder.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function PortfolioSection() {
  const t = useTranslations('AgencyPortfolio');

  return (
    <section id="portfolio" className="py-20">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                {t('subtitle')}
            </p>
            
            {/* Screenshot of your tourism template */}
            <div className="bg-gray-800 rounded-lg shadow-2xl p-4 border border-gray-700">
                <Image 
                    src="https://placehold.co/1200x675/111827/FFFFFF?text=Your+Beautiful+Website+Screenshot" 
                    alt="Screenshot of the tourism website template" 
                    className="rounded-md"
                    width={1200}
                    height={675}
                />
            </div>

            <Link 
                // IMPORTANT: Replace "#" with the actual URL to your live tourism website demo.
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-12 inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
            >
                {t('ctaButton')}
            </Link>
        </div>
    </section>
  );
}