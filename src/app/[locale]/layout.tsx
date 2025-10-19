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
// ...existing code...
import FloatingSocialMenu from "@/components/ui/FloatingSocialMenu";
import BackToTopButton from "@/components/ui/BackToTopButton";

const inter = Inter({ subsets: ["latin"] });

// --- 1. Metadata function is good for SEO, indirectly helps accessibility ---
type MetadataProps = {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps) {
  const { locale } = await params;
  const pageMetadata = metadataStore.homepage[locale] || metadataStore.homepage.en;
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'upmerce.com';

  return generateCustomMetadata({
    title: pageMetadata.title,
    description: pageMetadata.description,
    pathname: `/`,
    images: [
      {
        src: `${siteUrl}/${pageMetadata.ogImage.src}`,
        width: 1200,
        height: 630,
        alt: pageMetadata.ogImage.alt || pageMetadata.title,
      },
    ],
    type: 'website',
    author: AUTHORS,
    keywords: siteConfig.keywords,
  });
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

  return (
    // Accessibility: lang and dir attributes are correctly set based on locale. Excellent!
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Accessibility: Schema.org JSON-LD is great for SEO and context for search engines, indirectly beneficial */}
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      {/* Accessibility: Font and background/text colors set here are a good start for visual accessibility */}
      <body className={`${inter.className} bg-gray-900 text-gray-200`}>
        {/*
          Accessibility: Consider adding a "Skip to Content" link here.
          This is crucial for keyboard and screen reader users to bypass repetitive navigation elements.
          It should be the very first interactive element in the body.
        */}
        <ThemeRegistry>
          <NextIntlClientProvider 
             locale={locale || 'en'} 
             messages={messages}
             >
            <div className="flex flex-col min-h-screen">
              <Header />
              {/* Accessibility: The <main> tag is correctly used as a landmark. */}
              {/* Accessibility: It's good that children content goes here. */}
              <main id="main-content" className="flex-grow"> {/* ADDED id="main-content" for skip link */}
                {children}
              </main>
              <Footer />
            </div>
            {/* Accessibility: Floating elements like these need careful consideration for screen readers and touch users. */}
            {/* Ensure they don't obscure important content or interfere with keyboard navigation. */}
            {/* The WhatsAppButton is imported but not rendered. It might be within FloatingSocialMenu or another component. */}
            <FloatingSocialMenu/>
            <BackToTopButton /> 
          </NextIntlClientProvider>
        </ThemeRegistry>
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