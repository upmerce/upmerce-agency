'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

export default function PricingSection() {
  const t = useTranslations('AgencyPricing');
  
  const packages = [0, 1, 2].map(index => {
    const featureLengths = [2, 4, 5];
    const features = Array.from({ length: featureLengths[index] }, (_, i) => 
        t(`packages.${index}.features.${i}`)
    );

    return {
      name: t(`packages.${index}.name`),
      price: t(`packages.${index}.price`),
      description: t(`packages.${index}.description`),
      features: features,
      cta: t(`packages.${index}.cta`),
      // FINAL FIX: Manually handle the empty string for the last package's note to bypass the bug.
      specialNote: index === 2 ? '' : t(`packages.${index}.note`),
      isPopular: t.raw(`packages.${index}.isPopular`),
    };
  });

  return (
    <section id="pricing" className="py-20 bg-gray-900 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">{t('subtitle')}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className={`bg-gray-800 p-8 rounded-lg border border-gray-700 flex flex-col ${pkg.isPopular ? 'border-2 border-purple-500 shadow-lg' : ''}`}>
              {pkg.isPopular && <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full self-center mb-4 -mt-12">{t('popular')}</span>}
              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-4xl font-bold text-white mb-4">{pkg.price}</p>
              <p className="text-gray-200 mb-6 flex-grow">{pkg.description}</p>
              <ul className="text-left space-y-2 mb-8">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-gray-200">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="#contact" className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                {pkg.cta}
              </Link>
              {pkg.specialNote && <p className="text-sm text-gray-500 mt-4">{pkg.specialNote}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}