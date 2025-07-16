import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "upmerce - Professional Websites for Tourism Businesses",
  description: "We build professional, multilingual websites for Moroccan tour operators, riads, and local guides, designed to increase your direct bookings and grow your profits.",
};

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