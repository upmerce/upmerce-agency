'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface WhatsAppButtonProps {
  phoneNumber: string; // Your business WhatsApp number (e.g., "212600000000")
  message?: string; // Optional: Pre-filled message (e.g., "Hello, I'm interested in your services.")
}

export default function WhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    setDirection(document.documentElement.dir || 'ltr');
  }, []);

  // Construct the WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-50 p-3 bg-green-500 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-400
        ${direction === 'rtl' ? 'left-4' : 'right-4'} bottom-4 md:${direction === 'rtl' ? 'left-6' : 'right-6'} md:bottom-6`}
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/icons/whatsapp.svg" // Correct path to your WhatsApp icon (assuming /public/icons/)
        alt="WhatsApp"
        width={36}
        height={36}
        className="w-9 h-9" // Removed `text-white` for same reasons as before
        priority={true} // <<< ADD THIS PROP: This button is always above the fold
        sizes="36px" // <<< ADD THIS PROP: Fixed size for this icon
      />
    </a>
  );
}