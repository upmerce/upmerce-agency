// src/components/blog/ShareButtons.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ShareButtonsProps {
  postUrl: string;
  postTitle: string;
}

export default function ShareButtons({ postUrl, postTitle }: ShareButtonsProps) {
  const t = useTranslations('Blog');

  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(postTitle);
  const encodedText = encodeURIComponent(`${postTitle} - ${postUrl}`); // Changed for better share text

  const shareLinks = [
    {
      name: 'Facebook',
      icon: '/icons/facebook.svg',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bgColor: 'bg-blue-600',
    },
    {
      name: 'Twitter/X',
      icon: '/icons/x-logo.svg',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      bgColor: 'bg-gray-800',
    },
    {
      name: 'LinkedIn',
      icon: '/icons/linkedin.svg',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`, // Added summary
      bgColor: 'bg-blue-700',
    },
    {
      name: 'WhatsApp',
      icon: '/icons/whatsapp.svg',
      href: `https://api.whatsapp.com/send?text=${encodedText}`, // Uses encodedText directly
      bgColor: 'bg-green-500',
    },
    {
      name: 'Pinterest',
      icon: '/icons/pinterest.svg',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      bgColor: 'bg-red-700',
    },
    {
      name: 'Email',
      icon: '/icons/mail.svg',
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
      bgColor: 'bg-gray-500',
    },
    {
      name: 'Copy Link',
      icon: '/icons/link.svg',
      action: () => {
        navigator.clipboard.writeText(postUrl);
        alert(t('linkCopied'));
      },
      bgColor: 'bg-gray-400',
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-4"> {/* Changed to flex-col, added vertical gap */}
      <span className="text-gray-300 font-semibold text-lg whitespace-nowrap">{t('shareThisPost')}:</span> {/* Dark theme text, larger, no wrap */}
      <div className="flex flex-wrap justify-center gap-3 w-full"> {/* Container for buttons, flex-wrap to handle overflow */}
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={link.action || (() => window.open(link.href, '_blank', 'noopener,noreferrer'))}
            className={`p-3 rounded-full text-white transition-transform duration-200 hover:scale-110 active:scale-95 ${link.bgColor}`} /* Increased padding for buttons */
            aria-label={t(`shareOn_${link.name.replace(/[^a-zA-Z0-9]/g, '')}`)}
          >
            <Image src={link.icon} alt={link.name} width={24} height={24} className="w-6 h-6" /> {/* Increased icon size */}
          </button>
        ))}
      </div>
    </div>
  );
}