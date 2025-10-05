// src/app/[locale]/blog/[id]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {getAllPostIds, getPostData } from '../../../../../lib/blog';
import mediumStyles from './MediumPost.module.css';
import Image from 'next/image';
import { generateCustomMetadata } from '../../../../../lib/metadata';
import { siteConfig } from '@/app/config/site';

// The type represents the resolved object, which includes locale.
type PostPageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateStaticParams() {
  const paths = getAllPostIds(['en', 'fr', 'ar']);
  // This now correctly returns all combinations of id and locale.
  return paths.map(path => path.params);
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const { id, locale } = await params;
    const postData = await getPostData(id, locale);
    const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'https://upmerce.com';
    // jsonLd can be added here if needed for metadata
     // 2. Create the complete JSON-LD object here
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `${siteUrl}/blog/${id}`, // The canonical URL of the page
      },
      'headline': postData.title,
      'description': postData.description,
      'image': `${siteUrl}${postData.image}`, // Use the absolute URL for the image
      'author': {
        '@type': 'Organization', // Use 'Organization' for your business
        'name': postData.author,
      },
      'publisher': { // Add publisher info to build authority
        '@type': 'Organization',
        'name': siteConfig.brandName,
        'logo': {
          '@type': 'ImageObject',
          'url': `${siteUrl}${siteConfig.logo}`, // Use the logo from your site config
        }
      },
      'datePublished': postData.date,
    };
    // 3. Generate your base metadata using your existing helper
    const baseMetadata = generateCustomMetadata({
      title: postData.title,
      description: postData.description,
      pathname: `/blog/${id}`,
      images: [{ src: postData.image, alt: postData.title }],
      type: 'article',
      publishedTime: postData.date,
      author: { name: postData.author },
      keywords: postData.tags || [],
    });
   // 4. Merge the JSON-LD script into the final metadata object
    return {
      ...baseMetadata,
      other: {
        'script[type="application/ld+json"]': JSON.stringify(jsonLd),
      },
    };
  } catch {
    return {
      title: 'Post not found',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { id, locale } = await params;
    const postData = await getPostData(id, locale);
    {/*
       const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: postData.title,
      description: postData.description,
      image: postData.image,
      author: {
        '@type': 'Person',
        name: postData.author,
      },
      datePublished: postData.date,
    }; 
       */}
   

    return (
      <section className={`${mediumStyles["medium-post-bg"]} min-h-screen flex justify-center items-start py-12 px-4`}>
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /> */}
        
        <article
          className={`${mediumStyles["medium-post-container"]} bg-white shadow-md rounded-lg max-w-2xl w-full mx-auto px-8 py-10`}
          style={{ fontFamily: 'Georgia, Times, serif', boxShadow: '0 2px 32px rgba(0,0,0,0.08)', borderRadius: '8px' }}
        >
          <h1
            className={`${mediumStyles["medium-post-title"]} mb-4`}
            style={{ fontSize: '2.8rem', fontWeight: 700, lineHeight: '1.2', letterSpacing: '-0.02em', color: '#f7f4f4ff' }}
          >
            {postData.title}
          </h1>
          <div
            className={`${mediumStyles["medium-post-meta"]} mb-8 flex items-center text-sm text-gray-500`}
            style={{ gap: '0.5rem' }}
          >
            <span style={{ fontWeight: 500 }}>{postData.author}</span>
            <span style={{ fontSize: '1.2em' }}>·</span>
            <span>{postData.date}</span>
          </div>
          {postData.image && (
           <Image
              src={postData.image}
              alt={postData.title}
              className={`${mediumStyles["medium-post-image"]} mb-8 rounded-md w-full object-cover`}
              style={{ maxHeight: '340px', background: '#f6f6f6' }}
              width={800} // Keep specified width
              height={340} // Keep specified height
              priority // This is good, as it's the main image above the fold
              // ADDED/MODIFIED: The 'sizes' prop is crucial here
              sizes="(max-width: 768px) 100vw, 800px" 
              // Explanation for sizes:
              // (max-width: 768px) 100vw: On screens up to 768px wide (typical mobile/small tablet), 
              //                            the image takes up 100% of the viewport width.
              // 800px: On larger screens, it will be 800px wide (or up to its container max-width, which is 800px here).
            />
          )}
          <div
            className={mediumStyles["medium-post-content"]}
            style={{ fontSize: '1.18rem', color: '#222', lineHeight: '1.8', letterSpacing: '0.01em' }}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
          />
        </article>
      </section>
    );
  } catch {
    notFound();
  }
}