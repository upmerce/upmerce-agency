// src/app/[locale]/layout.tsx

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getMainJsonLd, metadataStore, siteConfig } from "../config/site";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ThemeRegistry from "@/components/ThemeRegistry";
import { generateCustomMetadata } from "../../../lib/metadata";
import { AUTHORS } from "@/config/site";
import MetaPixel from "@/components/analytics/MetaPixel";
const inter = Inter({ subsets: ["latin"] });

// --- 1. This is the new, advanced metadata function ---
type MetadataProps = {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps) {
  const { locale } = await params;
  const pageMetadata = metadataStore.homepage[locale] || metadataStore.homepage.en;
 // const t = await getTranslations({ locale, namespace: 'AgencyMetadata' });
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'upmerce.com'; // IMPORTANT: Use your live Vercel URL
  
    return generateCustomMetadata({
    title: pageMetadata.title,
    description: pageMetadata.description,
    pathname: `/`,
    // Pass specific images for this blog post
    images: [
        {
          src: `${siteUrl}/${pageMetadata.ogImage.src}`, // IMPORTANT: Create this image
          width: 1200,
          height: 630,
          alt: pageMetadata.ogImage.alt || pageMetadata.title,
        },
      ],
    // Add article-specific details
    type: 'website',
  //  publishedTime: post.date,
    author: AUTHORS, // Assuming your post data includes author info
    keywords: siteConfig.keywords, // Add post-specific tags to the default keywords
  });
  /* return {
    title: {
      default: pageMetadata.title,
      template: `%s | ${siteName}`,
    },
    description:pageMetadata.description,
    
    // --- Open Graph (for social media cards) ---
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      url: siteUrl,
      siteName: siteName,
      images: [
        {
          url: `${siteUrl}/${pageMetadata.ogImage.src}`, // IMPORTANT: Create this image
          width: 1200,
          height: 630,
          alt: pageMetadata.ogImage.alt || pageMetadata.title,
        },
      ],
      locale: locale,
      type: 'website',
    },

    // --- Twitter Card ---
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.title,
      description: pageMetadata.description,
      images: [`${siteUrl}/${pageMetadata.ogImage.src}`], // Must be an absolute URL
    },

    // --- JSON-LD Structured Data (for Google Brand Presence) ---
    other: {
      'script[type="application/ld+json"]': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': siteName,
        'url': siteUrl,
        'logo': `${siteUrl}/icons/logo.webp`, // IMPORTANT: Use your real logo URL
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'support@upmerce.com', // IMPORTANT: Use your real email
          'contactType': 'Customer Service'
        }
      })
    }
  }; */
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {

  const messages = await getMessages();
  const {locale} = await params;
  const jsonLd = getMainJsonLd({ url: process.env.NEXT_PUBLIC_API_URL || 'https://upmerce.com', locale });
 // console.log('--- MESSAGES LOADED ---', messages);
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} bg-gray-900 text-gray-200`}>
          <ThemeRegistry>
             <NextIntlClientProvider locale={locale || 'en'} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
          </ThemeRegistry>
         {/* --- 2. Add the Google Analytics component here --- */}
         {/* It will only render in production if the ID is set */}
         {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
           <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
           
        )}
         {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
            <MetaPixel />
          )}
      </body>
    </html>
  );
}