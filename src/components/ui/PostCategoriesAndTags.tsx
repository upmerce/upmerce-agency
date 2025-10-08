// src/components/blog/PostCategoriesAndTags.tsx
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface PostCategoriesAndTagsProps {
  categories: string[];
  tags: string[];
}

export default function PostCategoriesAndTags({ categories, tags }: PostCategoriesAndTagsProps) {
  const t = useTranslations('Blog');

  return (
    <div className="flex flex-wrap gap-2 text-sm"> {/* gap-2 for spacing between individual tags/categories */}
      {categories.map((category) => (
        <Link
          key={`category-${category}`}
          href={`/blog/category/${encodeURIComponent(category.toLowerCase())}`}
          className="bg-purple-800 text-purple-100 px-3 py-1 rounded-full hover:bg-purple-700 transition-colors duration-200 whitespace-nowrap" /* Dark purple background, light text */
          aria-label={t('viewCategory', { category })}
        >
          {category}
        </Link>
      ))}
      {tags.map((tag) => (
        <Link
          key={`tag-${tag}`}
          href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
          className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full hover:bg-gray-600 transition-colors duration-200 whitespace-nowrap" /* Dark gray background, light text */
          aria-label={t('viewTag', { tag })}
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}