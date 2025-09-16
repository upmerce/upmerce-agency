'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

// Icon Components
const IncreaseIcon = () => (
  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);
const ManageIcon = () => (
  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const BrandIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

export default function FeaturesSection() {
  const t = useTranslations('AgencyFeatures');

  const increaseBookingsItems = [0, 1, 2, 3].map(i => t(`increaseBookings.items.${i}`));
  const effortlessManagementItems = [0, 1, 2, 3].map(i => t(`effortlessManagement.items.${i}`));
  const premiumExperienceItems = [0, 1, 2, 3].map(i => t(`premiumExperience.items.${i}`));

  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
        {/* UPDATED: Replaced hardcoded text with a key from en.json */}
        <p className="text-gray-400 max-w-3xl mx-auto mb-16">{t('subtitle')}</p>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-gray-800 p-8 rounded-lg text-left border border-gray-700">
            <div className="flex items-center mb-4">
              <IncreaseIcon />
              <h3 className="text-xl font-bold text-white ml-3">{t('increaseBookings.title')}</h3>
            </div>
            <p className="text-gray-400 mb-6">{t('increaseBookings.subtitle')}</p>
            <ul className="space-y-3 text-gray-300">
              {increaseBookingsItems.map((feature, index) => (
                <li key={index} className="flex items-center"><CheckIcon /><span>{feature}</span></li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg text-left border border-gray-700">
            <div className="flex items-center mb-4">
              <ManageIcon />
              <h3 className="text-xl font-bold text-white ml-3">{t('effortlessManagement.title')}</h3>
            </div>
            <p className="text-gray-400 mb-6">{t('effortlessManagement.subtitle')}</p>
            <ul className="space-y-3 text-gray-300">
              {effortlessManagementItems.map((feature, index) => (
                <li key={index} className="flex items-center"><CheckIcon /><span>{feature}</span></li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg text-left border border-gray-700">
            <div className="flex items-center mb-4">
              <BrandIcon />
              <h3 className="text-xl font-bold text-white ml-3">{t('premiumExperience.title')}</h3>
            </div>
            <p className="text-gray-400 mb-6">{t('premiumExperience.subtitle')}</p>
            <ul className="space-y-3 text-gray-300">
              {premiumExperienceItems.map((feature, index) => (
                <li key={index} className="flex items-center"><CheckIcon /><span>{feature}</span></li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}