// app/[locale]/privacy/page.tsx
import { metadataStore } from "@/app/config/site";
import PrivacyContent from "@/components/terms/PrivacyContent";

type MetadataProps = {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params
}: MetadataProps) {
  const { locale } = await params;
  const pageMetadata = metadataStore.privacy?.[locale] || metadataStore.privacy?.en || {};

  return {
    title: pageMetadata.title || "Politique de confidentialité - Upmerce",
    description:
      pageMetadata.description ||
      "Découvrez comment Upmerce collecte, utilise et protège vos données conformément aux normes marocaines de confidentialité.",
  };
}

export default async function Page() {
  return (
    <main className="flex justify-center items-center py-20 px-6 bg-gray-900 min-h-screen">
      <article className="max-w-3xl w-full bg-gray-800 text-gray-200 p-10 rounded-2xl shadow-2xl border border-gray-700">
        <PrivacyContent />
      </article>
    </main>
  );
}
