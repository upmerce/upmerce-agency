import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_NAME } from "@/config/site";
const inter = Inter({ subsets: ["latin"] });

// --- 1. This is the new, advanced metadata function ---
type MetadataProps = {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({
  params,
}: MetadataProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AgencyMetadata' });
  const siteName = SITE_NAME;
  const siteUrl = 'https://upmerce-agency.vercel.app'; // IMPORTANT: Use your live Vercel URL

  return {
    title: {
      default: t('title'),
      template: `%s | ${siteName}`,
    },
    description: t('description'),
    
    // --- Open Graph (for social media cards) ---
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: siteUrl,
      siteName: siteName,
      images: [
        {
          url: `${siteUrl}/images/homepage-desktop.png`, // IMPORTANT: Create this image
          width: 1200,
          height: 630,
          alt: 'upmerce.com - Professional Websites for Tourism',
        },
      ],
      locale: locale,
      type: 'website',
    },

    // --- Twitter Card ---
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${siteUrl}/images/homepage-desktop.png`], // Must be an absolute URL
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
  };
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {

  const messages = await getMessages();
  const {locale} = params;

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-gray-900 text-gray-200`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer /> {/* <-- 2. Add the Footer component here */}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}