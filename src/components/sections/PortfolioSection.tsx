'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const themes = [
  {
    id: 'default',
    nameKey: 'theme_default_name',
    tagsKey: 'theme_default_tags', // UPDATED from descriptionKey
    liveDemoUrl: 'https://upmerce-default-demo.vercel.app/',
    desktopImg: '/images/themes/default-desktop.webp',
    tabletImg: '/images/themes/default-tablet.webp',
    mobileImg: '/images/themes/default-mobile.webp',
  },
  {
    id: 'adventure',
    nameKey: 'theme_adventure_name',
    tagsKey: 'theme_adventure_tags', // UPDATED from descriptionKey
    liveDemoUrl: 'https://upmerce-adventure-demo.vercel.app/',
    desktopImg: '/images/themes/adventure-desktop.webp',
    tabletImg: '/images/themes/adventure-tablet.webp',
    mobileImg: '/images/themes/adventure-mobile.webp',
  },
  {
    id: 'luxury',
    nameKey: 'theme_luxury_name',
    tagsKey: 'theme_luxury_tags', // UPDATED from descriptionKey
    liveDemoUrl: 'https://upmerce-luxury-demo.vercel.app/',
    desktopImg: '/images/themes/luxury-desktop.webp',
    tabletImg: '/images/themes/luxury-tablet.webp',
    mobileImg: '/images/themes/luxury-mobile.webp',
  },
];

export default function PortfolioSection() {
  const t = useTranslations('AgencyPortfolio');
  const [activeThemeId, setActiveThemeId] = useState('default');

  const activeTheme = themes.find(theme => theme.id === activeThemeId) || themes[0];

  return (
    <section id="portfolio" className="py-20 bg-gray-800 overflow-x-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        {/* UPDATED: Theme selectors now use tags for a cleaner look */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => setActiveThemeId(theme.id)}
              className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border ${
                activeThemeId === theme.id 
                ? 'bg-gray-700 border-purple-500' 
                : 'bg-gray-900 border-gray-700 hover:border-gray-500'
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-2">{t(theme.nameKey)}</h3>
              <p className="text-purple-400 text-sm font-medium">{t(theme.tagsKey)}</p>
            </div>
          ))}
        </div>
        
        <div className="flex items-end justify-center">
          <div className="relative h-[300px] md:h-[500px] lg:h-[600px] w-full">
            <div className="absolute z-10 w-[90%] left-[5%] aspect-video bg-gray-900 rounded-t-lg p-2 shadow-2xl">
              <div className="relative w-full h-full rounded-sm overflow-hidden">
                <Image src={activeTheme.desktopImg} alt="Desktop view of the selected theme" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="80vw" key={`${activeTheme.id}-desktop`} priority />
              </div>
            </div>
            
            <div className="absolute z-20 w-1/3 max-w-[250px] bottom-0 right-0 aspect-[3/4] bg-gray-900 rounded-lg p-1.5 shadow-xl border-4 border-gray-800">
                <div className="relative w-full h-full rounded-sm overflow-hidden">
                  <Image src={activeTheme.tabletImg} alt="Tablet view of the selected theme" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="33vw" key={`${activeTheme.id}-tablet`} />
                </div>
            </div>

            <div className="absolute z-20 w-1/5 max-w-[120px] bottom-2 left-0 aspect-[9/19] bg-gray-900 rounded-lg p-1 shadow-xl border-2 border-gray-800">
                <div className="relative w-full h-full rounded-sm overflow-hidden">
                  <Image src={activeTheme.mobileImg} alt="Mobile view of the selected theme" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="20vw" key={`${activeTheme.id}-mobile`} />
                </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
            <Link
              href={activeTheme.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300 text-lg"
            >
              {t('ctaButton')}: {t(activeTheme.nameKey)}
            </Link>
        </div>
      </div>
    </section>
  );
}