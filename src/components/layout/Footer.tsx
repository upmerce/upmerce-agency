// -------------------------------------------------------------------------
// 1. NEW FILE: /src/components/layout/Footer.tsx
// Create this file in your 'src/components/layout/' sub-folder.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('AgencyFooter');

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-6 py-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
        </div>
    </footer>
  );
}