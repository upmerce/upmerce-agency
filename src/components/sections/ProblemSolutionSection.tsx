// src/components/sections/ProblemSolutionSection.tsx

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

// IMPORTANT: ADD `aria-hidden="true"` to these decorative SVG icons
// This tells screen readers to ignore them, as their meaning is conveyed by the surrounding text.
const CommissionIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const SlowIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);
const HeadacheIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
  </svg>
);

const icons = [CommissionIcon, SlowIcon, HeadacheIcon];

export default function ProblemSolutionSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyProblemSolution');
  
  const problems = [0, 1, 2].map(index => ({
    title: t(`problems.${index}.title`),
    description: t(`problems.${index}.description`),
    icon: icons[index],
  }));

  return (
    <section 
      id={id || "problem-solution"} // ENSURED ID, provided default
      className="bg-gray-900 py-20"
      aria-labelledby="problem-solution-heading" // ADDED: Link section to its main heading
      role="region" // ADDED: Define section as a generic landmark region
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 id="problem-solution-heading" className="text-3xl lg:text-4xl font-bold text-white mb-6">{t('problemTitle')}</h2> {/* ADDED: ID */}
          <ul className="space-y-6"> {/* Good use of unordered list */}
            {problems.map((problem, index) => {
              const IconComponent = problem.icon;
              return (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-gray-800 p-3 rounded-full mr-4" aria-hidden="true"> {/* ADDED aria-hidden="true" to decorative div */}
                    <IconComponent />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{problem.title}</h4> {/* Good use of h4, nested correctly under h2 */}
                    <p className="text-gray-400">{problem.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-3">{t('solutionTitle')}</h3> {/* Good use of h3 */}
          <p className="text-gray-300">
            {t('solutionText')}
          </p>
        </div>
      </div>
    </section>
  );
}