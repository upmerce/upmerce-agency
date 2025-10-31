// src/components/sections/FounderNoteSection.tsx

'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import AnimatedSection from '../ui/AnimatedSection';

export default function FounderNoteSection() {
  const t = useTranslations('AgencyFounder');

  return (
    <section 
      id="founder-note" // ADDED: ID for potential future direct linking (e.g., from a "About Us" page)
      className="bg-gray-800 py-20"
      aria-labelledby="founder-note-heading" // ADDED: Link section to its main heading (or implicitly, the founder's name)
      role="region" // ADDED: Define section as a generic landmark region
    >
      <AnimatedSection>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8 md:p-12 border border-gray-700 flex flex-col md:flex-row items-center text-center md:text-left">
            <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-10">
              <Image
                src="/images/founder-photo.webp"
                alt={t('name') + ", " + t('title')} // IMPROVED: More descriptive alt text for founder photo
                width={160}
                height={160}
                className="rounded-full object-cover w-40 h-40 ring-4 ring-purple-500/50"
                sizes="(max-width: 768px) 160px, 160px" 
                loading="lazy" // Added explicit lazy loading for clarity
              />
            </div>
            <div>
              {/* CHANGED to <blockquote> for semantic markup of a quote */}
              <blockquote className="text-xl lg:text-2xl text-gray-300 mb-4 font-light italic" cite="#"> {/* ADDED cite attribute (placeholder) */}
                <p>&quot;{t('missionStatement')}&quot;</p>
              </blockquote>
              <p id="founder-note-heading" className="text-lg font-bold text-white mt-6">{t('name')}</p> {/* ADDED ID: This serves as the heading for the section */}
              <p className="text-purple-400">{t('title')}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}