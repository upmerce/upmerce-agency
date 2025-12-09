// src/app/[locale]/onboarding/page.tsx
import React from 'react';
import { Metadata } from 'next';
// ▼▼▼ REMOVED getMessages IMPORT ▼▼▼
// import { getMessages } from 'next-intl/server';

import OnboardingForm from '@/components/forms/OnboardingForm';
import { metadataStore, siteConfig } from '@/app/config/site';
import { generateCustomMetadata } from '../../../../lib/metadata';

// Define props type for page params
type Props = {
  params: Promise<{ locale: string }>;
};

// ▼▼▼ UPDATED METADATA FUNCTION ▼▼▼
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get current locale
  const { locale } = await params;
  // Get base URL
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || siteConfig.url;

  // 1. Retrieve specific onboarding page metadata based on locale
  // Using 'onboarding' key from our store
  const pageMeta = metadataStore['onboarding'][locale] || metadataStore['onboarding'].en;

  // 2. Generate the final metadata object using utility function
  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}/onboarding`, // Specific path for this page
    images: [
      {
        src: pageMeta.ogImage.src, // Will use /images/og/og-main.webp as defined in store
        alt: pageMeta.ogImage.alt,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    locale: locale,
    baseUrl: siteUrl
  });
}
// ▲▲▲

export default async function OnboardingPage() {
  // No explicit NextIntlClientProvider here.
  // We rely on the root layout to provide translations to client components.

  return (
    <section className="min-h-screen py-12 px-4 md:px-6 bg-gray-900 dark:bg-gray-900 flex flex-col justify-center items-center">
      <OnboardingForm />
    </section>
  );
}