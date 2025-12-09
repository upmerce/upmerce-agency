
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
  // ===========================================================================
  // CORE BRAND & NAVIGATION PAGES (Using og-main.webp)
  // ===========================================================================

  // 🏠 HOMEPAGE (/) - The main hook: Independence vs. Renting
  homepage: {
    en: {
      title: "Stop Renting Your Tourism Business to OTAs. Own It. | Upmerce",
      description: "Upmerce builds ultra-fast Next.js direct booking engines for Moroccan Riads & Tour Agencies. 0% commission. 100% ownership. Stop paying Booking.com fees.",
      ogImage: { 
        src: "/images/og/og-main.webp",
        alt: "Upmerce Solutions homepage banner: Digital independence for Moroccan tourism."
      }
    },
    fr: {
      title: "Cessez de louer votre activité aux OTA. Devenez propriétaire. | Upmerce",
      description: "Upmerce crée des moteurs de réservation directe Next.js ultra-rapides pour Riads et Agences au Maroc. 0% de commission. Propriété à 100%. Stoppez les frais Booking.com.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Bannière d'accueil Upmerce Solutions : L'indépendance numérique pour le tourisme marocain."
      }
    },
    ar: {
      title: "توقف عن تأجير مشروعك السياحي لمنصات الحجز. تملّكه الآن. | Upmerce",
      description: "Upmerce تبني محركات حجز مباشر فائقة السرعة (Next.js) للرياضات ووكالات الأسفار المغربية. 0% عمولة. ملكية 100%. توقف عن دفع رسوم Booking.com.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "لافتة الصفحة الرئيسية لـ Upmerce Solutions: الاستقلال الرقمي للسياحة المغربية."
      }
    }
  },

  // 👋 ABOUT US (/about) - The mission: Anti-Agency & Liberation
  about: {
    en: {
      title: "About Upmerce | The 'Anti-Agency' Liberating Moroccan Tourism",
      description: "We are on a mission to free Moroccan hospitality from high-commission platforms and slow WordPress sites through superior technology and total ownership.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Upmerce mission statement: Liberating tourism businesses through technology."
      }
    },
    fr: {
      title: "À propos d'Upmerce | L''Anti-Agence' qui Libère le Tourisme Marocain",
      description: "Notre mission : libérer l'hospitalité marocaine des plateformes à forte commission et des sites WordPress lents grâce à une technologie supérieure et une propriété totale.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Déclaration de mission Upmerce : Libérer les entreprises touristiques grâce à la technologie."
      }
    },
    ar: {
      title: "عن Upmerce | 'ضد الوكالة' التي تحرر السياحة المغربية",
      description: "مهمتنا هي تحرير الضيافة المغربية من المنصات ذات العمولات العالية ومواقع ووردبريس البطيئة من خلال تكنولوجيا متفوقة وملكية كاملة.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "بيان مهمة Upmerce: تحرير الشركات السياحية من خلال التكنولوجيا."
      }
    }
  },

  // ===========================================================================
  // PRODUCT & TECH PAGES (Using og-solutions.webp)
  // ===========================================================================

  // 🛠️ SOLUTIONS (/solutions) - The Tech features: Speed, Mobile, 0% Com
  solutions: {
    en: {
      title: "The Upmerce Engine: Your 0% Commission Digital Operating System",
      description: "Replace slow websites with a high-performance Next.js platform. Includes a mobile 'Pocket Office' admin panel and integrated direct booking engine to keep 100% profit.",
      ogImage: { 
        src: "/images/og/og-solutions.webp",
        alt: "Showcase of the Upmerce mobile admin panel and direct booking technology."
      }
    },
    fr: {
      title: "Le Moteur Upmerce : Votre Système d'Exploitation Digital à 0% Commission",
      description: "Remplacez vos sites lents par une plateforme Next.js haute performance. Inclut un panneau d'admin mobile 'Bureau de Poche' et un moteur de réservation directe pour garder 100% des profits.",
      ogImage: {
        src: "/images/og/og-solutions.webp",
        alt: "Présentation du panneau d'administration mobile Upmerce et de la technologie de réservation directe."
      }
    },
    ar: {
      title: "محرك Upmerce: نظام التشغيل الرقمي الخاص بك بنسبة 0% عمولة",
      description: "استبدل المواقع البطيئة بمنصة Next.js عالية الأداء. تتضمن لوحة إدارة 'مكتب الجيب' للهاتف المحمول ومحرك حجز مباشر مدمج للاحتفاظ بـ 100% من الأرباح.",
      ogImage: {
        src: "/images/og/og-solutions.webp",
        alt: "عرض للوحة إدارة الهاتف المحمول من Upmerce وتكنولوجيا الحجز المباشر."
      }
    }
  },

  // 📈 CASE STUDIES (/case-studies) - The Proof: Real Independence
  "case-studies": {
    en: {
      title: "Real Results: Moroccan Businesses Achieving Digital Independence",
      description: "See how local professionals are using Upmerce to eliminate commissions, own their data, and grow direct bookings faster than ever.",
      ogImage: {
        src: "/images/og/og-solutions.webp",
        alt: "Upmerce client success stories demonstrating digital independence."
      }
    },
    fr: {
      title: "Résultats Réels : Entreprises Marocaines Atteignant l'Indépendance Numérique",
      description: "Découvrez comment les professionnels locaux utilisent Upmerce pour éliminer les commissions, posséder leurs données et augmenter leurs réservations directes.",
      ogImage: {
        src: "/images/og/og-solutions.webp",
        alt: "Histoires de réussite de clients Upmerce démontrant l'indépendance numérique."
      }
    },
    ar: {
      title: "نتائج حقيقية: شركات مغربية تحقق الاستقلال الرقمي",
      description: "شوف كيفاش المهنيين المحليين كيستعملو Upmerce باش يلغيو العمولات، يمتالكو بياناتهم، ويزيدو الحجوزات المباشرة أسرع من أي وقت مضى.",
      ogImage: {
        src: "/images/og/og-solutions.webp",
        alt: "قصص نجاح عملاء Upmerce تظهر الاستقلال الرقمي."
      }
    }
  },

  // ===========================================================================
  // CONVERSION & CAMPAIGN PAGES
  // ===========================================================================

  // 🎁 CAMPAIGN PAGE (/campaign) - High Urgency Offer
  campaign: {
    en: {
      title: "Win Your Digital Independence: Free Booking Engine (Value 1999 DH)",
      description: "Moroccan Tourism Pros: Enter to win a custom Next.js Direct Booking Engine. Stop paying commissions and start owning your future. Limited time offer.",
      ogImage: { 
        src: "/images/og/og-campaign.webp",
        alt: "Launch offer banner: Win a free direct booking engine from Upmerce."
      }
    },
    fr: {
      title: "Gagnez Votre Indépendance Numérique : Moteur de Réservation (Valeur 1999 DH)",
      description: "Pros du tourisme marocain : Participez pour gagner un moteur de réservation directe Next.js sur mesure. Arrêtez les commissions et prenez votre avenir en main. Offre limitée.",
      ogImage: {
        src: "/images/og/og-campaign.webp",
        alt: "Bannière de l'offre de lancement : Gagnez un moteur de réservation directe gratuit avec Upmerce."
      }
    },
    ar: {
      title: "اربح استقلالك الرقمي: محرك حجز مجاني (بقيمة 1999 درهم)",
      description: "مهنيو السياحة المغاربة: شاركوا لربح محرك حجز مباشر Next.js مخصص. توقفوا عن دفع العمولات وابدأوا في امتلاك مستقبلكم. عرض محدود المدة.",
      ogImage: {
        src: "/images/og/og-campaign.webp",
        alt: "لافتة عرض الإطلاق: اربح محرك حجز مباشر مجاني من Upmerce."
      }
    }
  },

  // 🚀 ONBOARDING (/onboarding) - The Start of the Journey
  onboarding: {
    en: {
      title: "Begin Your Digital Transformation | Upmerce Project Intake",
      description: "Tell us about your tourism business. Let's start building your commission-free, high-performance direct booking platform today.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Upmerce project onboarding questionnaire."
      }
    },
    fr: {
      title: "Commencez Votre Transformation Numérique | Questionnaire Projet Upmerce",
      description: "Parlez-nous de votre entreprise touristique. Commençons à construire votre plateforme de réservation directe sans commission et haute performance dès aujourd'hui.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Questionnaire d'intégration de projet Upmerce."
      }
    },
    ar: {
      title: "ابدأ تحولك الرقمي | استبيان مشروع Upmerce",
      description: "أخبرنا عن نشاطك السياحي. لنبدأ في بناء منصة الحجز المباشر عالية الأداء وبدون عمولة اليوم.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "استبيان تأهيل مشروع Upmerce."
      }
    }
  },

  // ===========================================================================
  // CONTENT & LEGAL PAGES
  // ===========================================================================

  // 📰 BLOG (/blog) - Authority & Strategy
  blog: {
    en: {
      title: "The Upmerce Blog | Digital Strategy for Moroccan Tourism Independence",
      description: "Expert insights on escaping OTA dependence, mastering SEO, and growing direct bookings in the Moroccan market. Real strategies for local pros.",
      ogImage: {
        src: "/images/og/og-blog.webp",
        alt: "Upmerce blog: Digital strategies for Moroccan tourism independence."
      }
    },
    fr: {
      title: "Le Blog Upmerce | Stratégie Digitale pour l'Indépendance Touristique Marocaine",
      description: "Avis d'experts pour échapper à la dépendance aux OTA, maîtriser le SEO et augmenter les réservations directes sur le marché marocain. Stratégies réelles pour les pros locaux.",
      ogImage: {
        src: "/images/og/og-blog.webp",
        alt: "Blog Upmerce : Stratégies numériques pour l'indépendance touristique marocaine."
      }
    },
    ar: {
      title: "مدونة Upmerce | الاستراتيجية الرقمية لاستقلال السياحة المغربية",
      description: "رؤى الخبراء حول الهروب من التبعية لمنصات الحجز، وإتقان السيو، وزيادة الحجوزات المباشرة في السوق المغربي. استراتيجيات حقيقية للمهنيين المحليين.",
      ogImage: {
        src: "/images/og/og-blog.webp",
        alt: "مدونة Upmerce: استراتيجيات رقمية لاستقلال السياحة المغربية."
      }
    }
  },

  // ⚖️ TERMS (/terms) - Professionalism
  terms: {
    en: {
      title: "Terms of Service | Upmerce Legal & Ownership Framework",
      description: "Review the terms governing Upmerce services. Clear, transparent policies ensuring you retain full ownership of your digital assets.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Upmerce Terms of Service and ownership framework."
      }
    },
    fr: {
      title: "Conditions d'Utilisation | Cadre Légal et de Propriété Upmerce",
      description: "Consultez les conditions régissant les services Upmerce. Des politiques claires et transparentes garantissant que vous conservez la pleine propriété de vos actifs numériques.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Conditions d'utilisation et cadre de propriété Upmerce."
      }
    },
    ar: {
      title: "شروط الخدمة | الإطار القانوني والملكية لـ Upmerce",
      description: "راجع الشروط التي تحكم خدمات Upmerce. سياسات واضحة وشفافة تضمن احتفاظك بالملكية الكاملة لأصولك الرقمية.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "شروط الخدمة وإطار الملكية لـ Upmerce."
      }
    }
  },

  // 🔒 PRIVACY (/privacy) - Trust
  privacy: {
    en: {
      title: "Privacy Policy | How Upmerce Protects Your Business Data",
      description: "We take data security seriously. Learn how your business and customer information is protected under Moroccan and international law.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Upmerce Privacy Policy and data protection standards."
      }
    },
    fr: {
      title: "Politique de Confidentialité | Comment Upmerce Protège Vos Données",
      description: "Nous prenons la sécurité des données au sérieux. Découvrez comment les informations de votre entreprise et de vos clients sont protégées par le droit marocain et international.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "Politique de confidentialité d'Upmerce et normes de protection des données."
      }
    },
    ar: {
      title: "سياسة الخصوصية | كيف تحمي Upmerce بيانات عملك",
      description: "نحن نأخذ أمن البيانات على محمل الجد. تعرف على كيفية حماية معلومات عملك وعملائك بموجب القانون المغربي والدولي.",
      ogImage: {
        src: "/images/og/og-main.webp",
        alt: "سياسة الخصوصية لـ Upmerce ومعايير حماية البيانات."
      }
    }
  }
};

export type SiteConfig = {
  // Brand & SEO
  brandName: string;
  siteName: string;
  ownerName?: string; // Optional, can be used for SEO
  businessType: string; // e.g., 'Travel Agency', 'Tour Operator'
  // ▼▼▼ ADDED URL PROPERTY ▼▼▼
  url: string; // The public URL of the website
  // ▲▲▲
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
 // colors,

  // Content Specific

  // Add more locations here as needed
};

// --- CONFIGURATION FOR YOUR FIRST CLIENT (YOUR BROTHER) ---
// We will fill this out using the new questionnaire.

export const siteConfig: SiteConfig = {
  // Brand & SEO
  brandName: "Upmerce Solutions", // The official business name
  siteName: "Upmerce Solutions", // The name displayed on the site
  ownerName: "Mustapha Ouazza", // Optional, can be used for SEO
  businessType: "Organization",
  // ▼▼▼ ADDED URL VALUE ▼▼▼
  url: process.env.NEXT_PUBLIC_API_URL || "https://upmerce.com", // Use env var or fallback
  // ▲▲▲
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