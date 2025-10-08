// src/config/site.ts

import { Author, Robots } from "next/dist/lib/metadata/types/metadata-types";

export const SITE_NAME = "Upmerce Solutions";

// Other true constants could go here, for example:
export const COMPANY_FOUNDER = "Mustapha Ouazza";
export const TOURISM_DEMO = "https://tourism-agency-snowy.vercel.app";

// You can add more constants as needed for your site configuration
export const COPYRIGHT_YEAR = new Date().getFullYear();
export const TERMS_OF_SERVICE_URL = "https://www.upmercesolutions.com/terms";
export const PRIVACY_POLICY_URL = "https://www.upmercesolutions.com/privacy";
export const AUTHORS: Author = { name: "Mustapha Ouazza", url: "https://upmerce.com" };

export const ROBOTS: Robots = {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
// --- CENTRALIZED CONTACT INFORMATION ---
// This new 'contact' object consolidates all primary communication channels.
export const contactConfig = {
  // Primary email for general inquiries (replaces or is used by EMAIL/SUPPORT_EMAIL)
  email: "contact@upmerce.com", // Changed from contact@upmerce.com to a more professional domain email
  supportEmail: "contact@upmerce.com", // Specific support email if different from general contact
  
  phoneNumber: {
    raw: "212766910997", // Your WhatsApp Business number (e.g., "212600000000" for Morocco)
    formatted: "+212 766910997", // How you want it displayed (e.g., in a footer)
   // whatsappMessage: "Hello, I'm interested in Upmerce Solutions for my business.", // Pre-filled WhatsApp message
  },
  linkedin: "https://www.linkedin.com/in/mustapha-ouazza-b98a14244", // Your company LinkedIn profile
  // Add other social media links here if needed
   facebook: "https://www.facebook.com/upmercesolutions",
   instagram: "https://www.instagram.com/upmercesolutions",
   twitter: "",
};

// Re-export EMAIL and SUPPORT_EMAIL for backward compatibility if other files rely on them,
// but ideally, they should transition to using contactConfig.email/supportEmail
export const EMAIL = contactConfig.email; // Now references the centralized contact config
export const SUPPORT_EMAIL = contactConfig.supportEmail; // Now references the centralized contact config  
// --- METADATA GENERATOR FUNCTIONS (Depend on baseUrl) ---

/**
 * Generates the verification metadata object.
 * @param baseUrl - The base URL of the website.
 */
export const getVerification = (baseUrl: string) => ({
    google: 'google', // Replace with your actual verification codes
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
        me: [EMAIL, `${baseUrl}/contact`],
    },
});

/**
 * Generates the media metadata object for responsive images.
 * @param baseUrl - The base URL of the website.
 */
export const getMedia = (baseUrl: string) => ({
    'only screen and (max-width: 600px)': `${baseUrl}/mobile-startup.png`, // Example path
});
/**
 * Generates the appLinks metadata object.
 * @param baseUrl - The base URL of the website.
 */
export const getAppLinks = (baseUrl: string) => ({
    /*
    ios: {
        url: 'https://nextjs.org/ios',
        app_store_id: 'app_store_id',
    },
    android: {
        package: 'com.newsoftroid.market',
        app_name: 'miftah vendre et acheter',
    },
    */
    web: {
        url: baseUrl,
        should_fallback: true,
    },
});  