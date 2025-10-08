// src/components/blog/BlogCallToAction.tsx
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface BlogCallToActionProps {
  locale: string;
}

export default function BlogCallToAction({ locale }: BlogCallToActionProps) {
  const t = useTranslations('Blog');

  return (
    <div className="mt-12 p-8 bg-purple-700 rounded-lg shadow-xl text-center"> {/* Darker purple background, stronger shadow */}
      <h2 className="text-3xl font-extrabold text-white mb-4">{t('blogCtaTitle')}</h2> {/* White text for title */}
      <p className="text-purple-100 mb-6 text-lg">{t('blogCtaDescription')}</p> {/* Lighter purple text for description */}
      <Link
        href={`/${locale}#contact`}
        className="inline-block bg-white text-purple-800 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg shadow-md" // White button with purple text, rounded
      >
        {t('blogCtaButton')}
      </Link>
    </div>
  );
}