// src/components/layout/Footer.tsx

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image'; // Assuming we'll use images for social icons
import { Link } from '@/i18n/navigation'; // For internal navigation links
import { contactConfig } from '@/config/site'; // For contact details and social links

export default function Footer() {
  const t = useTranslations('AgencyFooter');
  const tNav = useTranslations('AgencyNavigation'); // For common navigation links

  const currentYear = new Date().getFullYear();

  // Define footer navigation categories and links
  // UPDATED: Points to new dedicated pages for About, Solutions, and Case Studies
  const footerNavs = [
    {
      title: t('footerNavs.companyTitle'),
      links: [
        // These point to dedicated pages
        { name: tNav('home'), href: '/', type: 'link' },
        { name: tNav('about'), href: '/about', type: 'link' },
        { name: tNav('solutions'), href: '/solutions', type: 'link' },
        { name: tNav('caseStudies'), href: '/case-studies', type: 'link' },
      ],
    },
    {
      title: t('footerNavs.resourcesTitle'),
      links: [
        // Blog is a separate page
        { name: tNav('blog'), href: '/blog', type: 'link' },
        // FAQ and Contact are sections on the homepage -> use scroll anchors
        { name: tNav('faq'), href: '/#faq', type: 'scroll' },
        // ▼▼▼ FIX: Changed from '/contact' to '/#contact' and type to 'scroll' ▼▼▼
        { name: t('footerNavs.support'), href: '/#contact', type: 'scroll' },
        // Legal pages are separate
        { name: t('footerNavs.termsOfService'), href: '/terms', type: 'link' },
        { name: t('footerNavs.privacyPolicy'), href: '/privacy', type: 'link' },
      ],
    },
  ];

  // Map social links from contactConfig
  const socialLinks: { name: string; href: string; iconSrc: string }[] = [
    contactConfig.linkedin
      ? {
          name: 'LinkedIn',
          href: contactConfig.linkedin,
          iconSrc: '/icons/linkedin.svg',
        }
      : null,
    contactConfig.facebook
      ? {
          name: 'Facebook',
          href: contactConfig.facebook,
          iconSrc: '/icons/facebook.svg',
        }
      : null,
    contactConfig.twitter
      ? {
          name: 'X', // Previously Twitter
          href: contactConfig.twitter,
          iconSrc: '/icons/x-logo.svg', // Assuming you have an X logo
        }
      : null,
    contactConfig.instagram
      ? {
          name: 'Instagram',
          href: contactConfig.instagram,
          iconSrc: '/icons/instagram.svg',
        }
      : null,
    // Add more social media as needed from contactConfig
  ].filter((link): link is { name: string; href: string; iconSrc: string } => Boolean(link)); // Filter out any null links if config properties are missing

  return (
    <footer className="bg-gray-800 border-t border-gray-700 pt-12 pb-6" role="contentinfo"> {/* ADDED role="contentinfo" */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
          {/* Logo and About/Description */}
          <div className="md:col-span-2 text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 text-white hover:text-purple-400 transition-colors duration-300 mb-4" aria-label={tNav('siteTitle') + " home"}>
              <Image
                src="/icons/logo.webp"
                alt={tNav('siteTitle')}
                width={32}
                height={32}
                priority={false} // Not critical for LCP, will be lazy-loaded
                sizes="32px"
              />
              <span className="text-2xl font-bold">{tNav('siteTitle')}</span>
            </Link>
            <p className="text-gray-400 max-w-sm mx-auto md:mx-0 leading-relaxed mb-4">
              {t('shortDescription')}
            </p>
            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  aria-label={`${link.name} (opens in new tab)`} 
                >
                  <Image
                    src={link.iconSrc}
                    alt={`${link.name} icon`}
                    width={24}
                    height={24}
                    priority={false} // Not critical for LCP
                    sizes="24px"
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {footerNavs.map((nav, index) => (
            <nav key={index} className="text-center md:text-left" aria-labelledby={`footer-nav-title-${index}`}> {/* ADDED aria-labelledby */}
              <h3 id={`footer-nav-title-${index}`} className="text-xl font-semibold text-white mb-4">{nav.title}</h3> {/* ADDED id */}
              <ul className="space-y-2">
                {nav.links.map((link) => (
                  <li key={link.name}>
                    {link.type === 'scroll' ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-white mb-4">{t('footerNavs.contactTitle')}</h3>
            <ul className="space-y-2 text-gray-400">
              {/* Address removed because contactConfig.address does not exist */}
              {contactConfig.phoneNumber.formatted && (
                <li>
                  <a href={`tel:${contactConfig.phoneNumber.raw}`} className="hover:text-purple-400 flex items-center justify-center md:justify-start">
                    <Image src="/icons/phone.svg" alt="Phone icon" width={20} height={20} className="w-5 h-5 mr-2" priority={false} sizes="20px" />
                    {contactConfig.phoneNumber.formatted}
                  </a>
                </li>
              )}
              {contactConfig.email && (
                <li>
                  <a href={`mailto:${contactConfig.email}`} className="hover:text-purple-400 flex items-center justify-center md:justify-start">
                    <Image src="/icons/mail.svg" alt="Email icon" width={20} height={20} className="w-5 h-5 mr-2" priority={false} sizes="20px" />
                    {contactConfig.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}