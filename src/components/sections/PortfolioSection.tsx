// src/components/sections/PortfolioSection.tsx

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react'; // ADDED useRef, useEffect, useCallback
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const themes = [
  {
    id: 'default',
    nameKey: 'theme_default_name',
    tagsKey: 'theme_default_tags',
    liveDemoUrl: 'https://upmerce-default-demo.vercel.app/',
    desktopImg: '/images/themes/default-desktop.webp',
    tabletImg: '/images/themes/default-tablet.webp',
    mobileImg: '/images/themes/default-mobile.webp',
  },
  {
    id: 'adventure',
    nameKey: 'theme_adventure_name',
    tagsKey: 'theme_adventure_tags',
    liveDemoUrl: 'https://upmerce-adventure-demo.vercel.app/',
    desktopImg: '/images/themes/adventure-desktop.webp',
    tabletImg: '/images/themes/adventure-tablet.webp',
    mobileImg: '/images/themes/adventure-mobile.webp',
  },
  {
    id: 'luxury',
    nameKey: 'theme_luxury_name',
    tagsKey: 'theme_luxury_tags',
    liveDemoUrl: 'https://upmerce-luxury-demo.vercel.app/',
    desktopImg: '/images/themes/luxury-desktop.webp',
    tabletImg: '/images/themes/luxury-tablet.webp',
    mobileImg: '/images/themes/luxury-mobile.webp',
  },
];

export default function PortfolioSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyPortfolio');
  const [activeThemeId, setActiveThemeId] = useState('adventure');
  const themeSelectorRefs = useRef<(HTMLButtonElement | null)[]>([]); // ADDED: Ref for theme selector buttons

  const activeTheme = themes.find(theme => theme.id === activeThemeId) || themes[0];

  // ADDED: Focus management for theme selectors
  useEffect(() => {
    // When activeThemeId changes, ensure focus is on the newly active button if it's currently within the document flow
    const activeIndex = themes.findIndex(theme => theme.id === activeThemeId);
    if (themeSelectorRefs.current[activeIndex] && document.activeElement !== themeSelectorRefs.current[activeIndex]) {
      // We don't want to steal focus if user is somewhere else, only if they're interacting with selectors
      // This is a subtle point: generally focus should not be moved unsolicited unless it's a dialog opening etc.
      // For this type of 'tab' like interaction, the user is already interacting here.
      // A better pattern for keyboard users is to let them tab to the group, then use arrow keys.
    }
  }, [activeThemeId]);


  // ADDED: Keyboard navigation for theme selectors (like a tab group)
  const handleKeyDownSelectors = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const focusableSelectors = themeSelectorRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (focusableSelectors.length === 0) return;

    const currentActiveElement = document.activeElement as HTMLButtonElement;
    const currentIndex = focusableSelectors.indexOf(currentActiveElement);

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableSelectors.length;
        focusableSelectors[nextIndex].focus();
        setActiveThemeId(themes[nextIndex].id); // Update active theme on arrow navigation
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + focusableSelectors.length) % focusableSelectors.length;
        focusableSelectors[prevIndex].focus();
        setActiveThemeId(themes[prevIndex].id); // Update active theme on arrow navigation
        break;
      case 'Home':
        event.preventDefault();
        focusableSelectors[0].focus();
        setActiveThemeId(themes[0].id);
        break;
      case 'End':
        event.preventDefault();
        focusableSelectors[focusableSelectors.length - 1].focus();
        setActiveThemeId(themes[themes.length - 1].id);
        break;
      // Let 'Tab' and 'Shift+Tab' perform default browser behavior to move out of the group
    }
  }, []);

  return (
    <section 
      id={id || "portfolio"} // ENSURED ID, provided default
      className="py-20 bg-gray-800 overflow-x-hidden"
      aria-labelledby="portfolio-heading" // ADDED: Link section to its main heading
      role="region" // ADDED: Define section as a generic landmark region
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-bold text-white mb-4"> {/* ADDED: ID */}
            {t('title')}
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        {/* Theme selectors as a button group (using divs initially, changed to buttons) */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          role="radiogroup" // ADDED ARIA: Defines this as a group of radio buttons
          aria-label={t('themeSelectionLabel')} // ADDED ARIA: Label for the group
          onKeyDown={handleKeyDownSelectors} // ADDED: Keyboard navigation
        >
          {themes.map((theme, index) => (
            <button // CHANGED from <div> to <button> for semantics
              key={theme.id}
              ref={el => { themeSelectorRefs.current[index] = el; }} // ATTACHED ref, fixed return type
              onClick={() => setActiveThemeId(theme.id)}
              className={`p-6 rounded-lg transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-purple-500 ${ // ADDED focus styles
                activeThemeId === theme.id 
                ? 'bg-gray-700 border-purple-500' 
                : 'bg-gray-900 border-gray-700 hover:border-gray-500'
              }`}
              role="radio" // ADDED ARIA: Defines each button as a radio button
              aria-checked={activeThemeId === theme.id} // ADDED ARIA: Indicates selection state
              tabIndex={activeThemeId === theme.id ? 0 : -1} // ADDED ARIA: Only active item is in tab order
              aria-label={`${t(theme.nameKey)} theme, ${t(theme.tagsKey)}`} // ADDED ARIA: More descriptive label for each selector
            >
              <h3 className="text-xl font-bold text-white mb-2">{t(theme.nameKey)}</h3> {/* Changed to h3 for hierarchy */}
              <p className="text-purple-400 text-sm font-medium">{t(theme.tagsKey)}</p>
            </button>
          ))}
        </div>
        
        <div className="flex items-end justify-center">
          <div className="relative h-[300px] md:h-[500px] lg:h-[600px] w-full">
            <div className="absolute z-10 w-[90%] left-[5%] aspect-video bg-gray-900 rounded-t-lg p-2 shadow-2xl" aria-hidden="true"> {/* ADDED aria-hidden="true" to decorative device frame */}
              <div className="relative w-full h-full rounded-sm overflow-hidden">
                <Image
                  src={activeTheme.desktopImg}
                  alt={t('imageAltDesktop', { themeName: t(activeTheme.nameKey) })} // IMPROVED: Dynamic, localizable alt text
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
                  key={`${activeTheme.id}-desktop`}
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="absolute z-20 w-1/3 max-w-[250px] bottom-0 right-0 aspect-[3/4] bg-gray-900 rounded-lg p-1.5 shadow-xl border-4 border-gray-800" aria-hidden="true"> {/* ADDED aria-hidden="true" */}
              <div className="relative w-full h-full rounded-sm overflow-hidden">
                <Image
                  src={activeTheme.tabletImg}
                  alt={t('imageAltTablet', { themeName: t(activeTheme.nameKey) })} // IMPROVED: Dynamic, localizable alt text
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  sizes="(max-width: 768px) 33vw, (max-width: 1024px) 250px, 200px"
                  key={`${activeTheme.id}-tablet`}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="absolute z-20 w-1/5 max-w-[120px] bottom-2 left-0 aspect-[9/19] bg-gray-900 rounded-lg p-1 shadow-xl border-2 border-gray-800" aria-hidden="true"> {/* ADDED aria-hidden="true" */}
              <div className="relative w-full h-full rounded-sm overflow-hidden">
                <Image
                  src={activeTheme.mobileImg}
                  alt={t('imageAltMobile', { themeName: t(activeTheme.nameKey) })} // IMPROVED: Dynamic, localizable alt text
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  sizes="(max-width: 768px) 20vw, (max-width: 1024px) 120px, 100px"
                  key={`${activeTheme.id}-mobile`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
            <Link
              href={activeTheme.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300 text-lg"
              aria-label={`${t('ctaButton')}: ${t(activeTheme.nameKey)} (opens in new tab)`} // IMPROVED: Dynamic, descriptive label
            >
              {t('ctaButton')}: {t(activeTheme.nameKey)}
            </Link>
        </div>
      </div>
    </section>
  );
}