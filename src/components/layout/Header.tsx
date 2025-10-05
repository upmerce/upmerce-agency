// src/components/layout/Header.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('AgencyNavigation');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [direction, setDirection] = useState('ltr');
  const [currentHash, setCurrentHash] = useState(''); // ADDED: New state for current hash

  useEffect(() => {
    setDirection(document.documentElement.dir || 'ltr');
    // ADDED: Capture hash on client-side mount
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash);
    }
  }, []);

  // ADDED: Update hash if URL changes (e.g., hash navigation on same page)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleHashChange = () => setCurrentHash(window.location.hash);
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);


  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const focusFirstMenuItem = () => {
    if (mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll<
        HTMLElement
      >(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
      );
      const visibleFocusableElements = Array.from(focusableElements).filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0
      );
      if (visibleFocusableElements.length > 0) {
        visibleFocusableElements[0].focus();
      }
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      focusFirstMenuItem();
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsMobileMenuOpen(false);
        } else if (event.key === 'Tab' && mobileMenuRef.current) {
          const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
          );
          const firstFocusableEl = focusableElements[0];
          const lastFocusableEl = focusableElements[focusableElements.length - 1];

          if (focusableElements.length === 0) return;

          if (event.shiftKey) {
            if (document.activeElement === firstFocusableEl || !mobileMenuRef.current.contains(document.activeElement)) {
              lastFocusableEl.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableEl || !mobileMenuRef.current.contains(document.activeElement)) {
              firstFocusableEl.focus();
              event.preventDefault();
            }
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      if (menuButtonRef.current && document.activeElement !== menuButtonRef.current) {
         menuButtonRef.current.focus();
      }
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  const handleNavLinkClick = (target: string, type: 'scroll' | 'link') => {
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      if (type === 'link') {
        router.push(target);
      } else if (target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (pathname !== '/') {
        router.push(`/#${target}`);
        const element = document.getElementById(target);
        if (element) {
          setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 50);
        }
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  useEffect(() => {
    // This useEffect handles initial load with hash, and `router.push` also triggers hash change
    if (pathname === '/' && typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 0);
        }
      }
    }
  }, [pathname]); // Depend on pathname, also triggers if hash changes *without* pathname changing

  type NavLink = {
    name: string;
    target: string;
    type: 'scroll' | 'link';
  };

  const navLinks: NavLink[] = [
    { name: t('home'), target: 'top', type: 'scroll' },
    { name: t('ourProcess'), target: 'problem-solution', type: 'scroll' },
    { name: t('features'), target: 'features', type: 'scroll' },
    { name: t('portfolio'), target: 'portfolio', type: 'scroll' },
    { name: t('pricing'), target: 'pricing', type: 'scroll' },
    { name: t('faq'), target: 'faq', type: 'scroll' },
    { name: t('blog'), target: '/blog', type: 'link' },
  ];

  const drawerVariants = {
    hidden: { x: direction === 'rtl' ? '-100%' : '100%' },
    visible: { x: 0 },
    exit: { x: direction === 'rtl' ? '-100%' : '100%' },
  };

  const currentPathWithoutHash = pathname.split('#')[0];

  return (
    <header className="bg-gray-900 sticky top-0 z-50 shadow-lg" role="banner">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo (Image + Text) */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors duration-300" 
          aria-label={t('siteTitle') + " home"}
          aria-current={currentPathWithoutHash === '/' ? 'page' : undefined}
        >
          <Image
            src="/icons/logo.webp"
            alt={t('siteTitle')}
            width={32}
            height={32}
            className="w-8 h-8"
            priority={true}
            sizes="32px"
          />
          <span className="text-xl font-bold">{t('siteTitle')}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center" aria-label={t('mainNavigation')}>
          <ul role="menubar" className="flex items-center space-x-4"> 
            {navLinks.map((link) => (
              <li key={link.target} role="none">
                {link.type === 'scroll' ? (
                  <button
                    onClick={() => handleNavLinkClick(link.target, link.type)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-base font-medium relative group"
                    aria-current={
                      (pathname === '/' && link.target === 'top' && !currentHash) || // Use currentHash here
                      (pathname === '/' && currentHash === `#${link.target}`) // Use currentHash here
                      ? 'page' : undefined
                    }
                    role="menuitem"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </button>
                ) : (
                  <Link
                    href={link.target}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-base font-medium relative group"
                    aria-current={currentPathWithoutHash === link.target ? 'page' : undefined}
                    role="menuitem"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                )}
              </li>
            ))}
            <li role="none" className="ml-4">
              <LanguageSwitcher />
            </li>
            {/* CTA Button for Desktop */}
            <li role="none">
              <Link
                href="#contact"
                onClick={() => handleNavLinkClick('contact', 'scroll')}
                className="ml-6 bg-purple-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-base"
                role="menuitem"
              >
                {t('ctaButton')}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Button & Language Switcher */}
        <div className="lg:hidden flex items-center">
          <LanguageSwitcher />
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-4 text-gray-300 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md p-2 transition-colors duration-300"
            aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer (Animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            id="mobile-menu-drawer"
            ref={mobileMenuRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed top-0 h-screen w-64 bg-gray-800 shadow-xl z-40 p-6 lg:hidden flex flex-col pt-4 ${
              direction === 'rtl' ? 'left-0' : 'right-0'
            }`}
            aria-label={t('mobileNavigation')}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button INSIDE the drawer */}
            <div className={`flex ${direction === 'rtl' ? 'justify-start' : 'justify-end'} mb-6`}>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md p-2"
                aria-label={t('closeMenu')}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul role="list">
              {navLinks.map((link) => (
                <li key={link.target} role="listitem">
                  {link.type === 'scroll' ? (
                    <button
                      onClick={() => handleNavLinkClick(link.target, link.type)}
                      className={`block text-white text-xl font-medium py-3 hover:text-purple-400 transition-colors duration-300 ${
                        direction === 'rtl' ? 'text-right' : 'text-left'
                      }`}
                      aria-current={
                        (pathname === '/' && link.target === 'top' && !currentHash) ||
                        (pathname === '/' && currentHash === `#${link.target}`)
                        ? 'page' : undefined
                      }
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.target}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-white text-xl font-medium py-3 hover:text-purple-400 transition-colors duration-300 ${
                        direction === 'rtl' ? 'text-right' : 'text-left'
                      }`}
                      aria-current={currentPathWithoutHash === link.target ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
              {/* CTA Button for Mobile */}
              <li role="listitem">
                <Link
                  href="#contact"
                  onClick={() => handleNavLinkClick('contact', 'scroll')}
                  className={`mt-8 bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-lg ${
                    direction === 'rtl' ? 'text-right' : 'text-center'
                  }`}
                  aria-label={t('ctaButton') + " - " + t('contactUsDescription')}
                >
                  {t('ctaButton')}
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}