// src/components/blog/AuthorBio.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface AuthorBioProps {
  authorName: string;
  locale: string;
}

export default function AuthorBio({ authorName, locale }: AuthorBioProps) {
  const t = useTranslations('Blog');

  // Assuming 'Upmerce Solutions' is the consistent author for your blog
  // You can extend this to pull specific author data if you have multiple authors
  const authorProfileUrl = `/${locale}/about`; // Link to your About Us page

  return (
    <div className="mt-8 pt-6 border-t border-gray-700 flex items-center gap-4"> {/* Darker border */}
      <Image
        src="/icons/logo.webp" // Example author image/logo
        alt={authorName}
        width={60}
        height={60}
        className="rounded-full object-cover bg-gray-700 p-2" // Added dark background and padding to logo for visibility
      />
      <div>
        <h3 className="text-xl font-semibold text-gray-50">{authorName}</h3> {/* Light text for author name */}
        <p className="text-gray-300 mb-1">{t('authorBioShort')}</p> {/* Lighter gray for bio description */}
        <Link href={authorProfileUrl} className="text-purple-400 hover:underline"> {/* Lighter purple for link */}
          {t('readMoreAboutUs')}
        </Link>
      </div>
    </div>
  );
}