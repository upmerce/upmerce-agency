// src/app/[locale]/onboarding/page.tsx
import React from 'react';
import OnboardingForm from '@/components/forms/OnboardingForm'; // Adjust path as needed
import { getMessages } from 'next-intl/server'; // Needed for metadata, as it's a server component

// Optional: Metadata for the page
type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const {locale} = await params;
  const messages = await getMessages({ locale: locale });
  return {
    title: messages.Onboarding.title,
    description: messages.Onboarding.introduction,
  };
}

export default async function OnboardingPage() {
  // No explicit NextIntlClientProvider here.
  // We rely on the root layout to provide translations to client components.
  // Ensure your root layout's `NextIntlClientProvider` loads the 'Onboarding' namespace.

  return (
    <section className="min-h-screen py-12 px-4 md:px-6 bg-gray-900 dark:bg-gray-900 flex flex-col justify-center items-center">
      <OnboardingForm />
    </section>
  );
}