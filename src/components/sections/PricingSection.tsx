// src/components/sections/PricingSection.tsx

'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> {/* ADDED aria-hidden="true" */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

export default function PricingSection({ id }: { id?: string }) {
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
      specialNote: index === 2 ? '' : t(`packages.${index}.note`),
      isPopular: t.raw(`packages.${index}.isPopular`), // Assuming t.raw correctly returns boolean/string
    };
  });

  return (
    <section 
      id={id || "pricing"} // ENSURED ID, provided default
      className="py-20 bg-gray-900 dark:bg-gray-900"
      aria-labelledby="pricing-heading" // ADDED: Link section to its main heading
      role="region" // ADDED: Define section as a generic landmark region
    >
      <div className="container mx-auto px-6 text-center">
        <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2> {/* ADDED: ID */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">{t('subtitle')}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`bg-gray-800 p-8 rounded-lg border border-gray-700 flex flex-col ${pkg.isPopular ? 'border-2 border-purple-500 shadow-lg' : ''}`}
              role="group" // ADDED: Group content of each pricing card
              aria-labelledby={`package-name-${index}`} // ADDED: Link group to package name
            >
              {pkg.isPopular && (
                <span 
                  className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full self-center mb-4 -mt-12"
                  aria-label={t('popularPlanLabel', { packageName: pkg.name })} // ADDED: Descriptive label for screen readers
                >
                  {t('popular')}
                </span>
              )}
              <h3 id={`package-name-${index}`} className="text-2xl font-bold text-white mb-2">{pkg.name}</h3> {/* ADDED: ID for aria-labelledby */}
              <p className="text-4xl font-bold text-white mb-4">{pkg.price}</p>
              <p className="text-gray-200 mb-6 flex-grow">{pkg.description}</p>
              <ul className="text-left space-y-2 mb-8" aria-label={t('featuresListLabel', { packageName: pkg.name })}> {/* ADDED: Label for features list */}
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-gray-200">
                    <CheckIcon /> {/* Icon is decorative, meaning is in the list item text */}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="#contact" 
                className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                aria-label={t('choosePlanLabel', { packageName: pkg.name })} // ADDED: Descriptive label for the link
              >
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