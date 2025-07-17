// /src/components/sections/PortfolioSection.tsx
'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// Define the structure for our portfolio items
const portfolioItems = [
  {
    id: 'homepage',
    nameKey: 'showcase_homepage_name',
    desktopImg: '/images/showcase/homepage-desktop.png',
    tabletImg: '/images/showcase/homepage-tablet.png',
    mobileImg: '/images/showcase/homepage-mobile.png',
  },
  {
    id: 'experiences',
    nameKey: 'showcase_experiences_name',
    desktopImg: '/images/showcase/experiences-desktop.png',
    tabletImg: '/images/showcase/experiences-tablet.png',
    mobileImg: '/images/showcase/experiences-mobile.png',
  },
  {
    id: 'blog',
    nameKey: 'showcase_blog_name',
    desktopImg: '/images/showcase/blog-desktop.png',
    tabletImg: '/images/showcase/blog-tablet.png',
    mobileImg: '/images/showcase/blog-mobile.png',
  },
];

export default function PortfolioSection() {
  const t = useTranslations('AgencyPortfolio');
  const [activeTab, setActiveTab] = useState('homepage');

  const activeItem = portfolioItems.find(item => item.id === activeTab) || portfolioItems[0];

  const liveDemoUrl = "https://tourism-template.vercel.app/";

  return (
    <section id="portfolio" className="py-20 bg-gray-800 overflow-x-hidden ">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                {t('subtitle')}
            </p>

            {/* --- Tab-like buttons to switch views --- */}
            <div className="flex justify-center space-x-2 md:space-x-4 mb-10">
                {portfolioItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`px-4 py-2 text-xs md:text-base font-semibold rounded-lg transition-colors duration-300 ${
                            activeTab === item.id 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {t(item.nameKey)}
                    </button>
                ))}
            </div>

            {/* --- Multi-device mockup display --- */}
            <div className="flex items-end justify-center">
                <div className="relative h-[300px] md:h-[500px] lg:h-[600px] scale-90  origin-bottom w-full">
                {/* Desktop */}
                <div className="absolute z-10 w-full aspect-video bg-gray-900 rounded-t-lg p-2 shadow-2xl">
                    <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image src={activeItem.desktopImg} alt="Desktop view" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="80vw" />
                    </div>
                </div>
                {/* Tablet */}
                <div className="absolute z-20 w-1/3 max-w-[250px] -bottom-4 -right-4 md:-right-8 lg:-right-12 aspect-[3/4] bg-gray-900 rounded-lg p-1.5 shadow-xl border-4 border-gray-800">
                     <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image src={activeItem.tabletImg} alt="Tablet view" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="33vw" />
                    </div>
                </div>
                {/* Mobile */}
                <div className="absolute z-20 w-1/5 max-w-[120px] -bottom-2 -left-2 md:-left-4 lg:-left-6 aspect-[9/19] bg-gray-900 rounded-lg p-1 shadow-xl border-2 border-gray-800">
                    <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image src={activeItem.mobileImg} alt="Mobile view" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="20vw" />
                    </div>
                </div>
                </div>
            </div>

            <Link 
                href={liveDemoUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-20 inline-block bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300 text-lg"
            >
                {t('ctaButton')}
            </Link>
        </div>
    </section>
  );
}
