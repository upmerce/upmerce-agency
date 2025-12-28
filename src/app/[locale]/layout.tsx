// src/app/[locale]/layout.tsx

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getMainJsonLd, metadataStore, siteConfig } from "../config/site";
import ThemeRegistry from "@/components/ThemeRegistry";
import { generateCustomMetadata } from "../../../lib/metadata";
import { AUTHORS } from "@/config/site";
import FloatingSocialMenu from "@/components/ui/FloatingSocialMenu";
import BackToTopButton from "@/components/ui/BackToTopButton";
import { CookieConsentProvider } from "@/components/context/CookieConsentContext";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      {/* UPDATED: Removed 'bg-gray-900 text-gray-200'. 
        We let the ThemeRegistry -> CssBaseline handle the Obsidian background now.
      */}
      <body className={inter.className}>
        <ThemeRegistry>
          <NextIntlClientProvider 
             locale={locale || 'en'} 
             messages={messages}
             >
            <AuthProvider>
               <CookieConsentProvider>
                <div className="flex flex-col min-h-screen">
                  {/* Note: We will need to update Header later to match the dark theme */}
                  <Header />
                  <main id="main-content" className="flex-grow"> 
                     {children}
                  </main>
                  <Footer />
                </div>
            
              <FloatingSocialMenu/>
              <BackToTopButton /> 
              <AnalyticsScripts />
              </CookieConsentProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}