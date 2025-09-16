'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const CommissionIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const SlowIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);
const HeadacheIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
  </svg>
);

// CHANGE 1: Store the component types, not the rendered elements.
const icons = [CommissionIcon, SlowIcon, HeadacheIcon];

export default function ProblemSolutionSection() {
  const t = useTranslations('AgencyProblemSolution');
  
  const problems = [0, 1, 2].map(index => ({
    title: t(`problems.${index}.title`),
    description: t(`problems.${index}.description`),
    icon: icons[index],
  }));

  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t('problemTitle')}</h2>
          <ul className="space-y-6">
            {problems.map((problem, index) => {
              // CHANGE 2: Create a variable for the icon component and render it here.
              const IconComponent = problem.icon;
              return (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-gray-800 p-3 rounded-full mr-4">
                    <IconComponent />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{problem.title}</h4>
                    <p className="text-gray-400">{problem.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-3">{t('solutionTitle')}</h3>
          <p className="text-gray-300">
            {t('solutionText')}
          </p>
        </div>
      </div>
    </section>
  );
}