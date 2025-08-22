// src/config/site.ts

import { Author, Robots } from "next/dist/lib/metadata/types/metadata-types";

export const SITE_NAME = "Upmerce Solutions";

// Other true constants could go here, for example:
export const COMPANY_FOUNDER = "Mustapha Ouazza";
export const SUPPORT_EMAIL = "support@upmercesolutions.com";
export const TOURISM_DEMO = "https://tourism-agency-snowy.vercel.app";
export const EMAIL = "upmerce.io.gmail.com";

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