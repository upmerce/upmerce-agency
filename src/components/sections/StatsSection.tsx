// src/components/sections/StatsSection.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const stats = [
  { value: 95, labelKey: 'performance' },
  { value: 98, labelKey: 'accessibility' },
  { value: 100, labelKey: 'bestPractices' },
  { value: 100, labelKey: 'seo' },
];

function StatCircle({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1500;
          const end = value;
          const stepTime = Math.abs(Math.floor(duration / end));

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [value]);

  return (
    // IMPROVED: Added role and aria-labelledby for better semantic grouping for each stat
    <div 
      ref={ref} 
      className="flex flex-col items-center text-center"
      role="group" 
      aria-labelledby={`stat-label-${label.replace(/\s/g, '-')}`} // Create a valid ID from label
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
        {/* ADDED aria-hidden="true" to SVG as it's purely decorative, its value is in the span */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            className="text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-indigo-400"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: 283,
              strokeDashoffset: 283 - (283 * count) / 100,
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        {/* ADDED aria-live="polite" to announce the final count */}
        {/* Also added role="status" for the live region */}
        <span 
          className="text-3xl md:text-4xl font-bold text-white"
          aria-live="polite" 
          role="status"
        >
          {count}%
        </span> {/* ADDED % sign */}
      </div>
      {/* ADDED ID to the label so it can be referenced by aria-labelledby on the parent div */}
      <p id={`stat-label-${label.replace(/\s/g, '-')}`} className="mt-4 text-lg font-semibold text-gray-300">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const t = useTranslations('StatsSection');

  return (
    <section 
      id="stats" // ADDED: ID for potential future linking
      className="py-20 bg-gray-900"
      aria-labelledby="stats-heading" // ADDED: Link section to its main heading
      role="region" // ADDED: Define section as a generic landmark region
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="stats-heading" className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t('title')}</h2> {/* ADDED: ID */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
        {/* Using ul/li for a list of stats is more semantic */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8"> {/* CHANGED to <ul> */}
          {stats.map((stat) => (
            <li key={stat.labelKey}> {/* CHANGED to <li> */}
              <StatCircle value={stat.value} label={t(stat.labelKey)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}