// -------------------------------------------------------------------------
// 1. NEW FILE: /src/components/sections/PricingSection.tsx
// This component should be placed in your 'sections' sub-folder.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const CrossIcon = () => (
    <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

export default function PricingSection() {
  const t = useTranslations('AgencyPricing');

  const packages = [
    {
      name: t('package1_name'),
      description: t('package1_desc'),
      features: [
        { text: t('feature_core'), included: true },
        { text: t('feature_admin'), included: true },
        { text: t('feature_reviews'), included: false },
        { text: t('feature_blog'), included: false },
        { text: t('feature_booking'), included: false },
      ],
      cta: t('cta_contact'),
      specialNote: t('package1_note'),
      isPopular: false,
    },
    {
      name: t('package2_name'),
      description: t('package2_desc'),
      features: [
        { text: t('feature_core'), included: true },
        { text: t('feature_admin'), included: true },
        { text: t('feature_reviews'), included: true },
        { text: t('feature_blog'), included: true },
        { text: t('feature_booking'), included: false },
      ],
      cta: t('cta_quote'),
      specialNote: t('package2_note'),
      isPopular: true,
    },
    {
      name: t('package3_name'),
      description: t('package3_desc'),
      features: [
        { text: t('feature_core'), included: true },
        { text: t('feature_admin'), included: true },
        { text: t('feature_reviews'), included: true },
        { text: t('feature_blog'), included: true },
        { text: t('feature_booking'), included: true },
      ],
      cta: t('cta_quote'),
      specialNote: '',
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">{t('title')}</h2>
        <p className="text-gray-200 max-w-2xl mx-auto mb-12">{t('subtitle')}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className={`bg-gray-800 p-8 rounded-lg border border-gray-700 flex flex-col ${pkg.isPopular ? 'border-2 border-purple-400 shadow-lg' : ''}`}>
              {pkg.isPopular && <span className="bg-purple-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full self-center mb-4 -mt-12">{t('popular')}</span>}
              <h3 className="text-2xl font-bold text-gray-100 mb-4">{pkg.name}</h3>
              <p className="text-gray-200 mb-6 flex-grow">{pkg.description}</p>
              <ul className="text-left space-y-2 mb-8">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    {feature.included ? <CheckIcon /> : <CrossIcon />}
                    <span className="text-gray-100">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Link href="#contact" className="mt-auto bg-purple-400 hover:bg-purple-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300">
                {pkg.cta}
              </Link>
              {pkg.specialNote && <p className="text-sm text-gray-400 mt-4">{pkg.specialNote}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}