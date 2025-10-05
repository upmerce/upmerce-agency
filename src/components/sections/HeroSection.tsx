// src/components/sections/HeroSection.tsx

'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import AnimatedSection from '../ui/AnimatedSection';

export default function HeroSection() {
  const t = useTranslations('AgencyHero');

  return (
    // Accessibility: Correct use of <section> as a landmark.
    // Accessibility: id="hero" is good for direct linking (e.g., skip link).
    // Accessibility: aria-labelledby="hero-title" correctly links to the h1 for a programmatic name.
    // Accessibility: role="region" explicitly defines it as a landmark. While <section> is often a landmark,
    // when aria-labelledby is present, it explicitly makes it a named region, which is excellent.
    <section
      id="hero"
      className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
      role="region"
    >

      {/* Accessibility: alt text is crucial for images conveying meaning. */}
      {/* If this image is purely decorative and the text fully conveys the message, */}
      {/* an empty alt="" would be appropriate with aria-hidden="true" on the Image component. */}
      {/* However, a descriptive alt is generally safer and better for background hero images if they contribute to the meaning. */}
      {/* Using t('heroImageAlt') is perfect, ensuring it's translatable. */}
      <Image
        src="/images/hero-background.webp"
        alt={t('heroImageAlt')}
        fill
        style={{
          objectFit: 'cover',
          animation: 'kenburns 25s ease-out infinite alternate',
        }}
        priority
        sizes="100vw"
      />

      {/* Accessibility: The overlay is purely visual. aria-hidden="true" is correctly used */}
      {/* to prevent screen readers from announcing this element. */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <AnimatedSection> {/* Assuming AnimatedSection itself doesn't introduce accessibility barriers */}
        <div className="relative container mx-auto px-6 text-center z-10">
          {/* Accessibility: Using <h1> for the main heading of the page is semantically correct. */}
          {/* Accessibility: id="hero-title" is correctly used to be referenced by the section's aria-labelledby. */}
          {/* The visual styling with text-transparent and gradient is fine, just ensure enough contrast. */}
          <h1 id="hero-title" className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            {t('title_part1')}
            <span className="block bg-gradient-to-r from-purple-300 to-indigo-400 bg-clip-text text-transparent">
              {t('title_part2')}
            </span>
          </h1>
          {/* Accessibility: This is descriptive text, good contrast, clear. */}
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>
          {/* Accessibility: Link with clear text and an added aria-label for even more context. Excellent! */}
          {/* The visual styling ensures good contrast for the text against the background. */}
          <Link
            href="#portfolio"
            className="bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300 text-lg"
            aria-label={t('ctaButtonAriaLabel')}
          >
            {t('ctaButton')}
          </Link>
        </div>
      </AnimatedSection>

    </section>
  );
}