// src/app/[locale]/campaign/page.tsx
import React from 'react';
import { Metadata } from 'next';

import CampaignClientPage from './CampaignClientPage';
import { metadataStore, siteConfig } from '@/app/config/site';
import { generateCustomMetadata } from '../../../../lib/metadata';

// Define props type for page params
type Props = {
  params: Promise<{ locale: string }>;
};

// ▼▼▼ NEW METADATA FUNCTION ▼▼▼
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get current locale
  const { locale } = await params;
  // Get base URL
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || siteConfig.url;

  // 1. Retrieve specific campaign page metadata based on locale
  // Using 'campaign' key from our store
  const pageMeta = metadataStore['campaign'][locale] || metadataStore['campaign'].en;

  // 2. Generate the final metadata object using utility function
  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}/campaign`, // Specific path for this page
    images: [
      {
        src: pageMeta.ogImage.src, // Will use /images/og/og-campaign.webp
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

// This is a Server Component that renders the Client Component
const CampaignPage = () => {
  return <CampaignClientPage />;
};

export default CampaignPage;