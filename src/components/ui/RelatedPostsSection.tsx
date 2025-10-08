// src/components/blog/RelatedPostsSection.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Assuming your post data structure
interface PostListItem {
  id: string;
  title: string;
  image: string;
  categories?: string[];
  tags?: string[];
  date: string;
}

interface RelatedPostsSectionProps {
  currentPostId: string;
  currentPostCategories: string[];
  currentPostTags: string[];
  allPosts: PostListItem[];
  locale: string;
}

export default function RelatedPostsSection({
  currentPostId,
  currentPostCategories,
  currentPostTags,
  allPosts,
  locale,
}: RelatedPostsSectionProps) {
  const t = useTranslations('Blog');

  const filteredPosts = allPosts.filter(post => post.id !== currentPostId);

  const scoredPosts = filteredPosts.map(post => {
    let score = 0;
    currentPostCategories.forEach(cat => {
      if (post.categories?.includes(cat)) {
        score += 2;
      }
    });
    currentPostTags.forEach(tag => {
      if (post.tags?.includes(tag)) {
        score += 1;
      }
    });
    return { ...post, score };
  });

  const relatedPosts = scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-6 border-t border-gray-700"> {/* Darker border for dark theme */}
      <h2 className="text-2xl font-bold mb-6 text-gray-100">{t('relatedPostsTitle')}</h2> {/* Light text for title */}
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/${locale}/blog/${post.id}`}
            className="block rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-gray-800" // Dark background for cards
          >
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-36 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-50 mb-2">{post.title}</h3> {/* Light text for post title */}
              <p className="text-sm text-gray-400">{post.date}</p> {/* Lighter gray for date */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}