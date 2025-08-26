// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../../lib/blog';
import { locales } from '@/i18n/routing';
import { metadataStore } from './config/site';

const escapeXml = (url: string) => {
  return url.replace(/&/g, '&amp;');
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://upmerce.com';


  const allUrls = locales.flatMap((locale) => {
     // --- THIS IS THE KEY FIX ---
    // Fetch the posts specifically for the current locale in the loop.
    const posts = getSortedPostsData(locale);
    const staticPages = [
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        priority: 1.0,
        // Correct format: An array of strings
        images: [`${baseUrl}${metadataStore.homepage.en.ogImage.src}`],
      },
      {
        url: `${baseUrl}/${locale}/blog`,
        lastModified: new Date(),
        priority: 0.8,
        // Correct format: An array of strings
        images: [`${baseUrl}${metadataStore.blog.en.ogImage.src}`],
      },
      {
        url: `${baseUrl}/${locale}/process`,
        lastModified: new Date(),
        priority: 0.6,
        // Correct format: An array of strings
        images: [`${baseUrl}${metadataStore.process.en.ogImage.src}`],
      },
    ];

    const postPages = posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.id}`,
      lastModified: new Date(post.date),
      priority: 0.7,
      // Correct format: An array of strings
      images: [escapeXml(post.image)],
    }));

    return [...staticPages, ...postPages];
  });

  return allUrls;
}