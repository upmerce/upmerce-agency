// app/[locale]/terms/page.tsx
import { metadataStore } from "@/app/config/site";
import TermsContent from "@/components/terms/TermsContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props){
  const { locale } = await params;
  const pageMetadata = metadataStore.terms?.[locale] || metadataStore.terms?.en || {};

  return {
    title: pageMetadata.title || "Conditions d'utilisation - Upmerce",
    description:
      pageMetadata.description ||
      "Lisez les conditions d'utilisation du projet Upmerce, plateforme indépendante développée par Mustapha Ouazza.",
  };
}

export default async function Page() {
  return (
    <main className="flex justify-center items-center py-20 px-6 bg-gray-900 min-h-screen">
      <article className="max-w-3xl w-full bg-gray-800 text-gray-200 p-10 rounded-2xl shadow-2xl border border-gray-700">
        <TermsContent />
      </article>
    </main>
  );
}
