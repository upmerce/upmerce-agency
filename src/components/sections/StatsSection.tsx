'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

// Configuration for each stat circle
const stats = [
  { value: 87, labelKey: 'performance' },
  { value: 96, labelKey: 'accessibility' },
  { value: 100, labelKey: 'bestPractices' },
  { value: 100, labelKey: 'seo' },
];

// Individual circle component for animation
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
          const duration = 1500; // Animation duration in ms
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
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
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
              transition: 'stroke-dashoffset 1.5s ease-out',
            }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className="text-3xl md:text-4xl font-bold text-white">{count}</span>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-300">{label}</p>
    </div>
  );
}

// Main section component
export default function StatsSection() {
  const t = useTranslations('StatsSection');

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCircle key={stat.labelKey} value={stat.value} label={t(stat.labelKey)} />
          ))}
        </div>
      </div>
    </section>
  );
}