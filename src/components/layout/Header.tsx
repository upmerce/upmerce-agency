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
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
                <Image src="/icons/logo.webp" alt="Logo" width={32} height={32} />
                <Link href="/">{SITE_NAME}</Link>
            </div>
            <div>
                <Link href="#contact" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    {t('ctaButton')}
                </Link>
            </div>
        </nav>
    </header>
  );
}