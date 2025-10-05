// src/components/sections/OwnershipSection.tsx
'use client';
import { useTranslations } from 'next-intl';

// A simple checkmark icon component - ADDED aria-hidden="true"
const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-green-500 mr-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true" // ADDED: Hides this decorative icon from screen readers
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

export default function OwnershipSection({ id }: { id?: string }) { // ADDED id prop
  const t = useTranslations('AgencyOwnership');
  const items = [t('item1'), t('item2'), t('item3'), t('item4')];

  return (
    <section 
      id={id || "ownership"} // ENSURED ID, provided default
      className="bg-gray-800 py-20"
      aria-labelledby="ownership-heading" // ADDED: Link section to its main heading
      role="region" // ADDED: Define section as a generic landmark region
    >
      <div className="container mx-auto px-6 text-center">
        <h2 id="ownership-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2> {/* ADDED: ID */}
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">{t('subtitle')}</p>
        <div className="max-w-md mx-auto bg-gray-900 border border-gray-700 rounded-lg p-8">
          <ul className="space-y-4 text-left"> {/* Already a good <ul> structure */}
            {items.map((item, index) => (
              <li key={index} className="flex items-center text-lg text-gray-200">
                <CheckIcon /> {/* Icon is decorative, meaning is in the list item text */}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}