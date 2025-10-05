// src/app/[locale]/loading.tsx
import React from 'react';
import Image from 'next/image'; // Import Image component
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('Loading'); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      {/* Animated Logo Icon */}
      <div 
        className="animate-pulse" // Simple pulse animation
        role="status" // For accessibility
        aria-label={t('loadingMessage')} // For accessibility
      >
        <Image
          src="/icons/logo.webp" // Your logo icon path
          alt={t('loadingMessage')} // Alt text for accessibility
          width={80} // Adjust size as needed
          height={80} // Adjust size as needed
          className="w-20 h-20 text-purple-500" // Tailwind classes for sizing and color if it's an SVG
        />
      </div>
      <p className="mt-4 text-xl font-semibold text-purple-300">{t('loadingText')}</p>
    </div>
  );
}