
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
      title: "Turn Your Tourism Business into an Online Powerhouse",
      description: "We build professional, multilingual websites for Moroccan tour operators, riads, and local guides, designed to increase your direct bookings and grow your profits.",
      ogImage: { 
        src: "/images/og/og-main.webp",
        alt: "An overview of our web development package prices and included features."
      }
    },
    fr: {
      title: "Faites de votre activité touristique une référence en ligne",
      description: "Nous créons des sites web professionnels et multilingues pour les tours-opérateurs marocains, les riads et les guides locaux, conçus pour augmenter vos réservations directes et accroître vos bénéfices.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Vue d'ensemble des tarifs et fonctionnalités de nos offres de développement web."
      }
    },
    ar: {
      title: "حوّل مشروعك السياحي إلى قوة رقمية مهيمنة على الإنترنت",
      description: "كنصايبو مواقع ويب احترافية ومتعددة اللغات للمقاولين السياحيين، الرياضات، والمرشدين المحليين فالمغرب. مصممة باش تزيد من حجوزاتك المباشرة وتكبر الأرباح ديالك.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "نظرة عامة على أثمنة ومميزات عروض تطوير الويب ديالنا."
      }
    }
  },
  blog: {
    en: {
      title: "The Upmerce Blog | Insights on Web & Tourism in Morocco",
      description: "Explore expert articles on web development, SEO, and digital strategy for the Moroccan tourism industry. From Agadir to the world.",
      ogImage: {
        src: "/images/og/og-blog.webp",
        alt: "A laptop displaying a modern website with a Moroccan-themed background."
      }
    },
    fr: {
      title: "Le Blog Upmerce | Stratégies Web & Tourisme au Maroc",
      description: "Découvrez nos articles d'experts sur le développement web, le SEO et la stratégie digitale pour l'industrie touristique marocaine. D'Agadir au monde entier.",
      ogImage: {
        src: "/images/og/og-blog.webp",
        alt: "Un ordinateur portable affichant un site web moderne avec un arrière-plan sur le thème du Maroc."
      }
    },
    ar: {
      title: "مدونة Upmerce | أفكار حول الويب والسياحة في المغرب",
      description: "اكتشف مقالات الخبراء حول تطوير الويب، السيو، والاستراتيجية الرقمية لقطاع السياحة المغربي. من أكادير إلى العالم.",
      ogImage: {
        src: "/images/og/og-blog.webp",
        alt: "حاسوب محمول يعرض موقع ويب عصري بخلفية ذات طابع مغربي."
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
    },
    ar: {
      title: "المنهجية الاستراتيجية ديالنا لتطوير الويب",
      description: "حنا كنمشيو بعيد على مجرد مواقع ويب باش نبنيو حلول تجارية. المنهجية ديالنا كتبدا بتحليل معمق للسوق وخطة للمميزات، متبوعة بتطوير عالي الأداء، وكتسالي بإطلاق ناجح واستراتيجية لزيادة حجوزاتك المباشرة.",
      ogImage: {
        src: "/images/og/og-process.webp",
        alt: "خطاطة كتبين المراحل الأربعة ديال العملية ديالنا: تحليل السوق، خطة المميزات، تطوير شامل، والإطلاق والنمو."
      }
    }
  },
  // 🆕 TERMS PAGE
  terms: {
    en: {
      title: "Terms of Use | Upmerce",
      description:
        "Read the terms of use governing Upmerce's digital services and website. Transparency and responsibility for all our clients and users.",
      ogImage: {
        src: "/images/og/og-terms.webp",
        alt: "A legal document icon symbolizing website terms and conditions."
      }
    },
    fr: {
      title: "Conditions d'utilisation | Upmerce",
      description:
        "Consultez les conditions d'utilisation régissant les services numériques et le site web d'Upmerce. Transparence et responsabilité envers nos utilisateurs.",
      ogImage: {
        src: "/images/og/og-terms.webp",
        alt: "Icône de document légal symbolisant les conditions générales d'utilisation."
      }
    },
    ar: {
      title: "شروط الاستخدام | Upmerce",
      description:
        "اطّلع على شروط الاستخدام التي تحكم خدمات Upmerce الرقمية وموقعها الإلكتروني. الشفافية والمسؤولية تجاه جميع المستخدمين.",
      ogImage: {
        src: "/images/og/og-terms.webp",
        alt: "رمز وثيقة قانونية تمثل شروط وأحكام الموقع."
      }
    }
  },

  // 🆕 PRIVACY PAGE
  privacy: {
    en: {
      title: "Privacy Policy | Upmerce",
      description:
        "Learn how Upmerce collects, uses, and protects your personal data in compliance with Moroccan and international privacy laws.",
      ogImage: {
        src: "/images/og/og-privacy.webp",
        alt: "A shield icon representing data privacy and user protection."
      }
    },
    fr: {
      title: "Politique de confidentialité | Upmerce",
      description:
        "Découvrez comment Upmerce collecte, utilise et protège vos données personnelles conformément à la loi marocaine sur la protection des données.",
      ogImage: {
        src: "/images/og/og-privacy.webp",
        alt: "Icône de bouclier représentant la confidentialité et la protection des données."
      }
    },
    ar: {
      title: "سياسة الخصوصية | Upmerce",
      description:
        "تعرّف على كيفية جمع Upmerce لبياناتك الشخصية واستخدامها وحمايتها وفقًا لقوانين الخصوصية المغربية والدولية.",
      ogImage: {
        src: "/images/og/og-privacy.webp",
        alt: "رمز درع يمثل الخصوصية وحماية بيانات المستخدم."
      }
    }
  }
}

export type SiteConfig = {
  // Brand & SEO
  brandName: string;
  siteName: string;
  ownerName?: string; // Optional, can be used for SEO
  businessType: string; // e.g., 'Travel Agency', 'Tour Operator'
  addressLocality?: string; // e.g., 'Agadir'
  addressRegion?: string; // e.g., 'Souss-Massa'
  addressCountry?: string; // e.g., 'MA' for Morocco
  logo: string; // Path to the logo image, e.g., "/images/logo.png"
 // siteDescription: string;
  keywords: string[];
  defaultLocale: string; // Default locale for the site, e.g., 'en'
  // Contact & Social
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    twitter: string;
    twitterId: string; // Twitter handle, e.g., '@upmerce'
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
  ownerName: "Mustapha Ouazza", // Optional, can be used for SEO
  businessType: "Organization",
  addressLocality: "Agadir", // Locality for SEO
  addressRegion: "Souss-Massa",
  addressCountry: "MA", // ISO code for Morocco
  logo: "/favicon.ico", // Path to the logo image
  keywords: keywords,
  defaultLocale: "en", // Default locale for the site
 

  // Contact & Social
  contact: {
    email: "contact@upmerce.com",
    phone: "+212 766 910 997",
    address: "Agadir, 80652, Morocco",
  },
  social: {
    twitter: "https://twitter.com/upmerce",
    twitterId: "@upmerce",
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
    description: metadataStore.homepage[locale]?.description || metadataStore.homepage.en.description,
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