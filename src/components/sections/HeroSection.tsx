'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('AgencyHero');

  return (
    <section className="py-20 md:py-32 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-100 leading-tight mb-4">
                {t('title_part1')}
                <span className="block bg-gradient-to-r from-purple-300 to-indigo-400 bg-clip-text text-transparent">
                  {t('title_part2')}
                </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                {t('subtitle')}
            </p>
            <Link href="#portfolio" className="bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300 text-lg">
                {t('ctaButton')}
            </Link>
        </div>
    </section>
  );
}