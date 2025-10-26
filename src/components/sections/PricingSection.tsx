'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

// --- Reusable Check Icon Component ---
const CheckIcon = () => (
  <svg 
    className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

// --- Interface for Pricing Card Props ---
interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  isPopular: boolean;
  specialNote?: string;
  popularLabel: string;
  featuresListLabel: string;
  choosePlanLabel: string;
}

// --- Pricing Card Sub-component ---
const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  cta,
  isPopular,
  specialNote,
  popularLabel,
  featuresListLabel,
  choosePlanLabel
}) => {
  return (
    <div
      className={`
        bg-gray-800 p-8 rounded-lg border border-gray-700 
        flex flex-col 
        transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl
        ${isPopular ? 'border-2 border-purple-500 shadow-lg relative pt-14' : ''} 
      `} // REFINED: Increased pt slightly for more space below label
      role="group"
      aria-labelledby={`package-name-${name.replace(/\s+/g, '-')}`}
    >
      {isPopular && (
        <span
          className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
          // REFINED: Adjusted vertical position slightly if needed, e.g., top-[-10px], but centering on border usually works. Let's rely on parent padding first.
          aria-label={popularLabel}
        >
          {popularLabel.split(',')[0]} {/* Extracting just the "Popular" text */}
        </span>
      )}
      <h3 id={`package-name-${name.replace(/\s+/g, '-')}`} className="text-2xl font-bold text-white mb-2">{name}</h3>
      <p className="text-4xl font-bold text-white mb-4">{price}</p>
      {/* REFINED: Removed flex-grow to prevent pushing list down */}
      <p className="text-gray-200 mb-6">{description}</p> 
      <ul className="text-left space-y-2 mb-8" aria-label={featuresListLabel}>
        {features.map((feature, fIndex) => (
          <li key={fIndex} className="flex items-center text-gray-200">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="#contact" 
        className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center"
        aria-label={choosePlanLabel}
      >
        {cta}
      </Link>
      {specialNote && <p className="text-sm text-gray-500 mt-4">{specialNote}</p>}
    </div>
  );
};

// --- Main Pricing Section Component ---
export default function PricingSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyPricing');

  // --- Data Generation ---
  const packages = [0, 1, 2].map(index => {
    const features: string[] = t.raw(`packages.${index}.features`);
    return {
      name: t(`packages.${index}.name`),
      price: t(`packages.${index}.price`),
      description: t(`packages.${index}.description`),
      features: features,
      cta: t(`packages.${index}.cta`),
      specialNote: index === 2 ? undefined : t(`packages.${index}.note`),
      isPopular: t.raw(`packages.${index}.isPopular`) as boolean,
    };
  });

  return (
    <section
      id={id || "pricing"}
      className="py-20 bg-gray-900 dark:bg-gray-900"
      aria-labelledby="pricing-heading"
      role="region"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">{t('subtitle')}</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PricingCard
              key={index}
              name={pkg.name}
              price={pkg.price}
              description={pkg.description}
              features={pkg.features}
              cta={pkg.cta}
              isPopular={pkg.isPopular}
              specialNote={pkg.specialNote}
              popularLabel={t('popularPlanLabel', { packageName: pkg.name })}
              featuresListLabel={t('featuresListLabel', { packageName: pkg.name })}
              choosePlanLabel={t('choosePlanLabel', { packageName: pkg.name })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

