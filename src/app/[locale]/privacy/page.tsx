// src/app/[locale]/privacy/page.tsx

import { Metadata } from 'next';
import PrivacyContent from "@/components/terms/PrivacyContent";
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

  // 1. Retrieve specific privacy page metadata based on locale
  // Using 'privacy' key from our store, with a safe fallback
  const pageMeta = metadataStore['privacy']?.[locale] || metadataStore['privacy']?.en;

  // Safety check in case metadata is missing
  if (!pageMeta) {
    return {
      title: "Privacy Policy | Upmerce",
      description: "Learn how Upmerce collects, uses, and protects your data.",
    };
  }

  // 2. Generate the final metadata object using utility function
  return generateCustomMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${locale}/privacy`, // Specific path for this page
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

export default async function Page() {
  return (
    <main className="flex justify-center items-center py-20 px-6 bg-gray-900 min-h-screen">
      <article className="max-w-3xl w-full bg-gray-800 text-gray-200 p-10 rounded-2xl shadow-2xl border border-gray-700">
        <PrivacyContent />
      </article>
    </main>
  );
}