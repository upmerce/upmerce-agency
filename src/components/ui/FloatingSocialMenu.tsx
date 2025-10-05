'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { contactConfig } from '@/config/site'; // Import contactConfig
import { useTranslations } from 'next-intl'; // Import useTranslations

export default function FloatingSocialMenu() {
  const t = useTranslations('AgencyNavigation'); // Initialize useTranslations
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    setDirection(document.documentElement.dir || 'ltr');
  }, []);

  const commonIconProps = {
    width: 24,
    height: 24,
    className: "w-6 h-6",
  };

  // Get the localized WhatsApp message
  const localizedWhatsappMessage = t('whatsappMessage');

  const socialLinks = [
    {
      name: 'WhatsApp',
      iconSrc: 'icons/whatsapp.svg', // Ensure this path is correct
      // Use the localized message in the URL
      href: `https://wa.me/${contactConfig.phoneNumber.raw}?text=${encodeURIComponent(localizedWhatsappMessage)}`,
      bgColor: 'bg-green-500',
    },
    {
      name: 'Email',
      iconSrc: '/icons/mail.svg', // Ensure this path is correct
      href: `mailto:${contactConfig.email}`,
      bgColor: 'bg-red-500', // Common for email icons
    },
    ...(contactConfig.linkedin ? [{ // Only include if LinkedIn URL exists
      name: 'LinkedIn',
      iconSrc: 'icons/linkedin.svg', // Ensure this path is correct
      href: contactConfig.linkedin,
      bgColor: 'bg-blue-600',
    }] : []),
  ];

  // Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger children appearance
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`fixed z-50 bottom-4 md:bottom-6 group ${
        direction === 'rtl' ? 'left-4 md:left-6' : 'right-4 md:right-6'
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400
          ${isOpen ? 'bg-purple-600' : 'bg-gray-700 bg-opacity-60 hover:bg-opacity-100'}
          ${isOpen ? 'scale-110' : 'scale-100'}`}
        aria-label="Toggle social menu"
        aria-expanded={isOpen}
      >
       <Image
          src="/icons/chat.svg" // Main trigger icon (ensure path is correct)
          alt="Chat"
          width={30}
          height={30}
          className="w-7 h-7" // Removed `text-white` as it's not usually effective for SVGs via next/image
          priority={true} // <<< ADD THIS PROP: The main trigger is always above the fold
          sizes="30px" // <<< ADD THIS PROP: Fixed size for this icon
        />
      </button>

      {/* Expanded Social Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute mb-2 flex flex-col items-center space-y-3 ${
              direction === 'rtl' ? 'left-0' : 'right-0'
            } bottom-full`} // Position above the trigger button
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className={`p-3 rounded-full shadow-md ${link.bgColor} text-white transition-transform duration-200 hover:scale-110 active:scale-95`}
                aria-label={`Open ${link.name}`}
              >
                <Image
                  src={link.iconSrc}
                  alt={link.name}
                  {...commonIconProps} // Applies width, height, className, and now sizes
                  // priority is NOT added here as these icons only appear on interaction
                />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}