// src/app/[locale]/campaign/page.tsx
import React from 'react';
import { Metadata } from 'next';
import CampaignClientPage from './CampaignClientPage';
import { metadataStore, siteConfig } from '@/app/config/site';
import { generateCustomMetadata } from '../../../../lib/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || siteConfig.url;
  const pageMeta = metadataStore['campaign'][locale] || metadataStore['campaign'].en;

  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}/campaign`,
    images: [{
        src: pageMeta.ogImage.src,
        alt: pageMeta.ogImage.alt,
        width: 1200,
        height: 630,
      }],
    type: 'website',
    locale: locale,
    baseUrl: siteUrl
  });
}

const CampaignPage = () => {
  return <CampaignClientPage />;
};

export default CampaignPage;