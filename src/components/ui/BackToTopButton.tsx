// src/components/ui/BackToTopButton.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react'; // ADDED useRef
import { useTranslations } from 'next-intl';

export default function BackToTopButton() {
  const t = useTranslations('Common');
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0); // Store previous scroll position

  const toggleVisibility = () => {
    const currentScrollY = window.scrollY;

    // Only show if user has scrolled down past an initial threshold (e.g., 300px)
    // AND is currently scrolling UP.
    if (currentScrollY > 300 && currentScrollY < lastScrollY.current) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    lastScrollY.current = currentScrollY; // Update last scroll position for next check
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      // UPDATED CLASSES: bottom-8, left-1/2, transform, -translate-x-1/2 for center alignment
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2
                  bg-purple-600 text-white p-3 rounded-full shadow-lg
                  hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75
                  transition-opacity duration-300 z-50
                  ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      aria-label={t('backToTop')}
      title={t('backToTop')}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}