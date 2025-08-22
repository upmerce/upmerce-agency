// src/app/[locale]/blog/[id]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {getAllPostIds, getPostData } from '../../../../../lib/blog';
import mediumStyles from './MediumPost.module.css';
import Image from 'next/image';
import { generateCustomMetadata } from '../../../../../lib/metadata';

// The type represents the resolved object, which includes locale.
type PostPageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateStaticParams() {
  const paths = getAllPostIds();
  // Ensure the static paths include the locale
  return paths.map((path) => ({
    id: path.params.id,
    locale: 'en', // Assuming 'en' as a default or you can generate for all locales
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const postData = await getPostData(id);

    return generateCustomMetadata({
      title: postData.title,
      description: postData.description,
      pathname: `/blog/${id}`,
      images: [{ src: postData.image, alt: postData.title }],
      type: 'article',
      publishedTime: postData.date,
      author: { name: postData.author },
      keywords: postData.tags || [],
    });
  } catch {
    return {
      title: 'Post not found',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { id } = await params;
    const postData = await getPostData(id);

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

    return (
      <section className={`${mediumStyles["medium-post-bg"]} min-h-screen flex justify-center items-start py-12 px-4`}>
        {/* Add JSON-LD script to the head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
              width={800}
              height={340}
              priority
            />
          )}
          <div
            className={mediumStyles["medium-post-content"]}
            style={{ fontSize: '1.18rem', color: '#222', lineHeight: '1.8', letterSpacing: '0.01em' }}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </article>
      </section>
    );
  } catch {
    notFound();
  }
}