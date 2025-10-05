// src/components/layout/LanguageSwitcher.tsx

'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition, useState, useEffect, useRef, useCallback } from 'react'; // ADDED useCallback
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for closing dropdown on outside click
  const toggleButtonRef = useRef<HTMLButtonElement>(null); // ADDED Ref for the toggle button
  const currentLocaleItemRef = useRef<HTMLButtonElement>(null); // ADDED Ref for the currently selected locale button

  const languageNames: { [key: string]: string } = {
    en: 'English',
    fr: 'Français',
    ar: 'العربية',
  };

  // Helper to close the dropdown and manage focus
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    toggleButtonRef.current?.focus(); // Return focus to the toggle button
  }, []);

  function onSelectLocale(nextLocale: string) {
    if (nextLocale === locale) {
      closeDropdown();
      return;
    }
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
      closeDropdown();
    });
  }

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, closeDropdown]);

  // ADDED: Effect to manage focus when dropdown opens/closes
  useEffect(() => {
    if (isOpen) {
      // Focus on the currently selected locale when the dropdown opens
      // Fallback to the first item if current is not found (e.g., initially)
      currentLocaleItemRef.current?.focus();
    }
  }, [isOpen]);

  // ADDED: Keyboard navigation handler for the dropdown
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const focusableItems = Array.from(
      dropdownRef.current?.querySelectorAll('[role="menuitem"]') || []
    ) as HTMLButtonElement[];
    if (focusableItems.length === 0) return;

    const currentActiveElement = document.activeElement as HTMLButtonElement;
    const currentIndex = focusableItems.indexOf(currentActiveElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableItems.length;
        focusableItems[nextIndex].focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + focusableItems.length) % focusableItems.length;
        focusableItems[prevIndex].focus();
        break;
      case 'Home':
        event.preventDefault();
        focusableItems[0].focus();
        break;
      case 'End':
        event.preventDefault();
        focusableItems[focusableItems.length - 1].focus();
        break;
      case 'Escape':
      case 'Tab': // Allow Tab to close the menu if focus moves out
        closeDropdown();
        break;
      // No default action for other keys
    }
  }, [closeDropdown]);

  // Determine current direction (ltr/rtl) for dropdown positioning
  const [direction, setDirection] = useState('ltr');
  useEffect(() => {
    setDirection(document.documentElement.dir || 'ltr');
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={toggleButtonRef} // ATTACHED Ref
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-gray-700 transition-colors duration-200"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="menu" // ADDED ARIA: Indicates a popup menu is available
        aria-controls="language-menu" // ADDED ARIA: Links to the menu's ID
      >
        <Image
          src="/globe.svg" // Correct path as previously established
          alt="Language"
          width={24}
          height={24}
          className="w-6 h-6"
          priority={true}
          sizes="24px"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="language-menu" // ADDED ID: Matches aria-controls
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-10 mt-2 w-32 bg-gray-700 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none ${
              direction === 'rtl' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
            }`}
            role="menu" // ADDED ARIA: Defines this as a menu
            aria-orientation="vertical" // ADDED ARIA: Specifies vertical orientation
            tabIndex={-1} // Makes the menu itself focusable, but not part of tab order
            onKeyDown={handleKeyDown} // ADDED: Keyboard navigation handler
          >
            {Object.entries(languageNames).map(([code, name]) => (
              <button
                key={code}
                role="menuitem" // ADDED ARIA: Defines each button as a menu item
                onClick={() => onSelectLocale(code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  code === locale ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                } ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                disabled={isPending}
                // ADDED: Ref for the currently active locale, and initial focus management
                ref={code === locale ? currentLocaleItemRef : null}
                tabIndex={code === locale ? 0 : -1} // Only active item is in tab order when menu opens
              >
                {name}
                {code === locale && <span className="sr-only"> (current)</span>} {/* ADDED: Screen reader text for current locale */}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}