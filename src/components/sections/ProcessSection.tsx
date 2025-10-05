'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ProcessSection() {
  const t = useTranslations('AgencyProcess');

  const processSteps = [0, 1, 2, 3].map(index => ({
    step: `0${index + 1}`,
    title: t(`steps.${index}.title`),
    description: t(`steps.${index}.description`),
  }));

  return (
    // Accessibility: Add aria-labelledby to link the section to its heading.
    <section id="our-process" className="py-20 bg-gray-900" aria-labelledby="process-title">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          {/* Accessibility: Change h1 to h2 if this is not the main heading of the page. */}
          {/* Most pages should only have one h1. This is a sub-section. */}
          {/* Add an ID to the heading for aria-labelledby. */}
          <h2 id="process-title" className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Accessibility: Use an ordered list to semantically represent a sequence of steps. */}
        {/* The current structure uses divs and styling to imply order, but an <ol> is much better for screen readers. */}
        <ol className="relative border-l-2 border-purple-500 ml-6 md:ml-0 md:border-l-0 md:border-t-2">
          {processSteps.map((item, index) => (
            // Each step is a list item
            <li key={index} className="relative mb-12 md:mb-0">
              <div className="absolute -left-7 md:left-auto md:-top-7 md:right-1/2 transform md:translate-x-1/2">
                {/* Accessibility: The step number (01, 02, etc.) is decorative but also provides order. */}
                {/* As it's visually present, it's fine. If it were purely decorative, aria-hidden might be considered. */}
                {/* However, since it's an explicit step number, it's informative. */}
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
              </div>
              <div className="ml-12 md:ml-0 md:mt-12 md:text-center p-4">
                {/* Accessibility: Use h3 for the step title, ensuring proper heading hierarchy. */}
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}