
import { keywords } from "./keywords";

type OgImage = {
  src: string;
  alt: string;
};

type MetadataLocale = {
  title: string;
  description: string;
  ogImage: OgImage;
};

type MetadataStore = {
  [section: string]: {
    [locale: string]: MetadataLocale;
  };
};

export const metadataStore: MetadataStore = {
  homepage: {
    en: {
      title: "Turn Your Tourism Business into an <span>Online Powerhouse</span>",
      description: "We build professional, multilingual websites for Moroccan tour operators, riads, and local guides, designed to increase your direct bookings and grow your profits.",
      ogImage: { 
        src: "/images/og/og-main.webp",
        alt: "An overview of our web development package prices and included features."
      }
    },
    fr: {
      title: "Faites de votre activité touristique une <span>référence en ligne</span>",
      description: "Nous créons des sites web professionnels et multilingues pour les tours-opérateurs marocains, les riads et les guides locaux, conçus pour augmenter vos réservations directes et accroître vos bénéfices.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Vue d'ensemble des tarifs et fonctionnalités de nos offres de développement web."
      }
}
  },
  process: {
  en: {
    title: "Our Strategic Web Development Process",
    description: "We go beyond websites to build business solutions. Our process begins with in-depth market analysis and a feature blueprint, followed by high-performance development, and ends with a successful launch and a strategy to grow your direct bookings.",
    ogImage: {
      src: "/images/og/og-process.webp",
      alt: "A flowchart showing the 4 stages of our process: Market Analysis, Feature Blueprint, Full-Stack Development, and Launch & Grow."
    }
  },
  fr: {
    title: "Notre Processus Stratégique de Développement Web",
    description: "Nous allons au-delà des sites web pour bâtir des solutions commerciales. Notre processus débute par une analyse de marché et un plan fonctionnel, suivi d'un développement haute performance, et se termine par un lancement réussi et une stratégie pour accroître vos réservations directes.",
    ogImage: {
      src: "/images/og/og-process.webp",
      alt: "Organigramme montrant les 4 étapes de notre processus : Analyse de Marché, Plan Fonctionnel, Développement Full-Stack, et Lancement & Croissance."
    }
  }
}
}

export type SiteConfig = {
  // Brand & SEO
  brandName: string;
  siteName: string;
  businessType: string; // e.g., 'Travel Agency', 'Tour Operator'
  addressLocality?: string; // e.g., 'Agadir'
  addressRegion?: string; // e.g., 'Souss-Massa'
  addressCountry?: string; // e.g., 'MA' for Morocco
  logo: string; // Path to the logo image, e.g., "/images/logo.png"
 // siteDescription: string;
  keywords: string[];
  
  // Contact & Social
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    twitter: string;
    instagram: string;
    facebook: string;
  };

  // Theme & Visuals
 
  // The theme property now just holds the name of the chosen palette.
  
};

// --- CONFIGURATION FOR YOUR FIRST CLIENT (YOUR BROTHER) ---
// We will fill this out using the new questionnaire.

export const siteConfig: SiteConfig = {
  // Brand & SEO
  brandName: "Upmerce Solutions", // The official business name
  siteName: "Upmerce Solutions", // The name displayed on the site
  businessType: "Organization",
  addressLocality: "Agadir", // Locality for SEO
  addressRegion: "Souss-Massa",
  addressCountry: "MA", // ISO code for Morocco
  logo: "/favicon.ico", // Path to the logo image
  keywords: keywords,
  
 

  // Contact & Social
  contact: {
    email: "upmerce.io@gmail.com",
    phone: "+212 766 910 997",
    address: "Agadir, 80652, Morocco",
  },
  social: {
    twitter: "https://twitter.com/upmerce",
    instagram: "https://instagram.com/upmerce",
    facebook: "https://facebook.com/upmerce",
  },

  // Theme & Visuals
 // colors,

  // Content Specific

  // Add more locations here as needed
};
export function getMainJsonLd({url, locale}: { url: string, locale: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': siteConfig.businessType,
    name: siteConfig.brandName,
    description: metadataStore.homepage[locale].description || metadataStore.homepage.en.description,
    url: url,
    logo: `${url}${siteConfig.logo}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'Customer Service',
      email: siteConfig.contact.email,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.addressLocality || 'Agadir', // This can be made dynamic in siteConfig later
      addressRegion: siteConfig.addressRegion || 'Souss-Massa',
      addressCountry: siteConfig.addressCountry || 'MA'
    },
     offers: {
      '@type': 'Offer',
      price: '0', // Default price, can be updated dynamically
      priceCurrency: 'MAD', // Moroccan Dirham
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
    
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8', // Example rating, can be updated dynamically
        bestRating: '5',
        worstRating: '4',
        reviewCount: '150', // Example review count, can be updated dynamically
      },
    
  };
}