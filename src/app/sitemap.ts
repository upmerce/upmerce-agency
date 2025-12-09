// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../../lib/blog'; // Verify this path is correct for your project
import { locales } from '@/i18n/routing';
import { metadataStore } from './config/site';
import { Locale } from 'next-intl';
 

const escapeXml = (url: string) => {
  return url.replace(/&/g, '&amp;');
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://upmerce.com';
  
  // Get all page keys defined in the store (homepage, about, solutions, etc.)
  const pageKeys = Object.keys(metadataStore);

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Loop through every supported locale (en, fr, ar)
  for (const locale of locales) {
    const localeKey = locale as Locale;

    // --- 1. Generate entries for all static pages defined in metadataStore ---
    for (const key of pageKeys) {
       // Safely get metadata for current locale, fallback to 'en' if missing
       const metaData = metadataStore[key][localeKey] || metadataStore[key].en;

       if (!metaData) continue; // Skip if absolutely no metadata found

       // Determine path: homepage is /locale, others are /locale/key
       let path = `/${locale}/${key}`;
       if (key === 'homepage') {
           path = `/${locale}`;
       }

       // Set priority based on page importance
       let priority = 0.8; // Default
       if (key === 'homepage') priority = 1.0;
       if (key === 'campaign') priority = 0.9;
       if (key === 'solutions') priority = 0.9;

       sitemapEntries.push({
         url: `${baseUrl}${path}`,
         lastModified: new Date(),
         priority: priority,
         // Construct full image URL
         images: [`${baseUrl}${metaData.ogImage.src}`],
       });
    }

    // --- 2. Generate entries for blog posts (Your existing logic) ---
    // Fetch posts specifically for the current locale
    const posts = getSortedPostsData(locale);
    const postPages = posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.id}`,
      lastModified: new Date(post.date),
      priority: 0.7,
      images: [escapeXml(post.image)],
    }));

    // Add blog posts to the main list
    sitemapEntries.push(...postPages);
  }

  return sitemapEntries;
}