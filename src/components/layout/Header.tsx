// 1. UPDATED FILE: /src/components/Header.tsx
// This component now uses the `useTranslations` hook.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { Link } from '@/i18n/navigation'; // <-- 1. Use the special Link from next-intl
import { useTranslations } from 'next-intl'; // <-- 2. Import the translation hook
import { SITE_NAME } from '@/config/site'; // <-- Import the site name constant
import Image from 'next/image'; // <-- Import Next.js Image component

export default function Header() {
  const t = useTranslations('AgencyHeader'); // <-- 3. Initialize the hook

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
            <div className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                <Image src="/icons/logo.webp" alt="Logo" width={32} height={32} />
                <Link href="/">{SITE_NAME}</Link>
            </div>
                {/* --- NEW: Add navigation links --- */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors">{t('home')} </Link>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">{t('blog')}</Link>
                <Link href="/process" className="text-gray-300 hover:text-white transition-colors">{t('our-process')}</Link>
                <Link href="#contact" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    {t('ctaButton')}
                </Link>
            </div>
            {/* Mobile menu button can be added here later if needed */}
        </nav>
    </header>
  );
}