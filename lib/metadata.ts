// /lib/metadata.ts

import { Metadata } from 'next';
import { ARCHIVES, BOOKMARKS, CATEGORY, FORMAT_DETECTION, ICONS, ITUNES, OTHER } from "@/config";
import { siteConfig } from '@/app/config/site';
import { AUTHORS, getAppLinks, getVerification, ROBOTS } from '@/config/site';

// --- TYPE DEFINITIONS ---

/** Represents a standard image object for SEO purposes. */
type SeoImage = {
  src: string; // Should be a relative path from the base URL
  alt: string;
  width?: number;
  height?: number;
};

/**
 * Defines the required and optional options for generating page metadata.
 * This is the single source of truth for all page-specific SEO data.
 */
export type MetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  images?: SeoImage[];
  locale?: string;
  keywords?: string[];
  // Add any other dynamic props you might need, e.g., for blog posts
  author?: (typeof AUTHORS);
  publishedTime?: string;
  type?: 'website' | 'article';
  baseUrl?: string; // Base URL for generating absolute URLs
};

// --- CORE METADATA GENERATION FUNCTION ---

/**
 * Generates a comprehensive metadata object for any page in your Next.js application.
 * It intelligently combines default configurations with page-specific options.
 *
 * @param options - Page-specific metadata options.
 * @returns A complete Next.js Metadata object.
 */
export function generateCustomMetadata({
  title,
  description,
  pathname,
  images = [],
  locale = siteConfig.defaultLocale,
  keywords = [],
  author = AUTHORS,
  publishedTime,
  type = 'website',
  baseUrl,
}: MetadataOptions): Metadata {

  // Ensure there's at least a default image if none are provided
  const seoImages = images.length > 0 ? images : [{
    // ▼▼▼ UPDATED DEFAULT IMAGE PATH ▼▼▼
    src: '/images/og/og-main.webp', // Your new branded fallback image
    alt: 'Upmerce Solutions - Digital Independence for Moroccan Tourism', // More descriptive alt text
    // ▲▲▲
    width: 1200,
    height: 630
  }];

  // Construct absolute URLs for images
  const absoluteImageUrls = seoImages.map(image => ({
    url: new URL(image.src, process.env.NEXT_PUBLIC_API_URL!).toString(),
    alt: image.alt,
    width: image.width || 1200,
    height: image.height || 630,
  }));

  const canonicalUrl = new URL(pathname, process.env.NEXT_PUBLIC_API_URL!).toString();

  return {
    // --- Core Metadata ---
    metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL!),
    title,
    description,
    applicationName: siteConfig.siteName,
    generator: siteConfig.brandName,
    creator: siteConfig.brandName,
    publisher: siteConfig.ownerName,
    referrer: 'origin-when-cross-origin',
    keywords: [...siteConfig.keywords, ...keywords].join(', '),
    authors: [author],
    manifest: '/manifest.webmanifest',
    category: CATEGORY,

    // --- URLs & Linking ---
    alternates: {
      canonical: canonicalUrl,
      // You can add language alternates here if you have multiple locales
      // languages: {
      //   'en-US': '/en-US' + pathname,
      //   'fr-FR': '/fr-FR' + pathname,
      // },
    },
    appLinks: getAppLinks(baseUrl ||  ''),

    // --- Social & Rich Previews (Open Graph) ---
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      images: absoluteImageUrls,
      locale,
      type,
      // Article specific OG data
      ...(type === 'article' && {
        publishedTime: publishedTime,
        authors: author.url,
      }),
    },

    // --- Twitter Card ---
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      siteId: siteConfig.social.twitterId,
      creator: siteConfig.ownerName,
      creatorId: siteConfig.social.twitterId,
      images: absoluteImageUrls.map(img => img.url),
    },

    // --- Icons & Appearance ---
    icons: ICONS,
    appleWebApp: {
      title: siteConfig.siteName,
      statusBarStyle: 'default',
      capable: true,
    },

    // --- Verification & Robots ---
    verification: getVerification(baseUrl ||  ''),
    robots: ROBOTS,
    
    // --- Other Metadata ---
    itunes: ITUNES,
    archives: ARCHIVES,
    bookmarks: BOOKMARKS,
    formatDetection: FORMAT_DETECTION,
    other: OTHER,
  };
}