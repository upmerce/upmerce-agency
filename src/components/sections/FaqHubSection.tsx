'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// UPDATED: This list now consists ONLY of real search queries you found.
const hubData = {
  en: [
    { question: "What is the best alternative to WordPress?", slug: "/blog/badil-wordpress-haloul-asriya" },
    { question: "How much does it cost to create a website in Morocco?", slug: "/blog/thaman-inshaa-mawqi-electroni-bil-maghrib-dalil" },
    { question: "What is a direct booking website?", slug: "/blog/ma-hwa-mawqi-alhajz-al-mubashir" },
    { question: "Why is my WordPress website so slow?", slug: "/blog/limaza-mawqie-wordpress-batee-wal-hal" },
    { question: "How can I increase my Booking.com reservations?", slug: "/blog/ziadat-hujuzat-booking-com-wal-sir" },
    { question: "What is the best hotel booking strategy?", slug: "/blog/meilleure-strategie-reservation-hotel" },
    { question: "Can I get a professional website for free?", slug: "/blog/template-site-web-agence-de-voyage-gratuit" },
    { question: "How do I take better photos of my hotel rooms?", slug: "/blog/comment-prendre-photo-chambre-hotel-riad" },
    { question: "How can I make my riad more profitable?", slug: "/blog/comment-rendre-riad-rentable-maroc" },
    { question: "Why is website speed so important for tourism?", slug: "/blog/pourquoi-vitesse-site-web-importante" },
  ],
  fr: [
    { question: "Quelle est la meilleure stratégie de réservation d’hôtel ?", slug: "/blog/meilleure-strategie-reservation-hotel" },
    { question: "Comment trouver un template de site web gratuit pour agence de voyage ?", slug: "/blog/template-site-web-agence-de-voyage-gratuit" },
    { question: "Mon site WordPress est lent, que faire ?", slug: "/blog/site-wordpress-lent-solution" },
    { question: "Comment prendre en photo une chambre d'hôtel pour un riad ?", slug: "/blog/comment-prendre-photo-chambre-hotel-riad" },
    { question: "Comment rendre un riad rentable au Maroc ?", slug: "/blog/comment-rendre-riad-rentable-maroc" },
    { question: "Pourquoi la vitesse est-elle si importante sur un site Web ?", slug: "/blog/pourquoi-vitesse-site-web-importante" },
    { question: "Quel est le montant de la commission sur Booking.com ?", slug: "/blog/calcul-commission-booking-alternative" },
    { question: "Comment améliorer le SEO d'un site web à Agadir ?", slug: "/blog/creation-site-web-agadir-secrets-hotel-pro" },
    { question: "Quel est le meilleur site pour créer un site web pour un hôtel ?", slug: "/blog" }, // Article to be written
    { question: "Comment répondre à un avis client (positif ou négatif) ?", slug: "/blog" } // Article to be written
  ],
  ar: [
    { question: "ما هو بديل ووردبريس لموقع احترافي؟", slug: "/blog/badil-wordpress-haloul-asriya" },
    { question: "كم تكلفة عمل موقع إلكتروني بالمغرب؟", slug: "/blog/thaman-inshaa-mawqi-electroni-bil-maghrib-dalil" },
    { question: "ما هو موقع الحجز المباشر وكيف يعمل؟", slug: "/blog/ma-hwa-mawqi-alhajz-al-mubashir" },
    { question: "لماذا موقع الووردبريس الخاص بي بطيء جدًا؟", slug: "/blog/limaza-mawqie-wordpress-batee-wal-hal" },
    { question: "كيفية زيادة حجوزات Booking.com ؟", slug: "/blog/ziadat-hujuzat-booking-com-wal-sir" },
    { question: "كيفية تسريع موقع ووردبريس؟", slug: "/blog/limaza-mawqie-wordpress-batee-wal-hal" },
    { question: "ما هي عيوب ووردبريس؟", slug: "/blog/badil-wordpress-haloul-asriya" },
    { question: "هل يمكن إنشاء موقع الكتروني مجاني واحترافي؟", slug: "/blog/thaman-inshaa-mawqi-electroni-bil-maghrib-dalil" },
    { question: "كيف يتم تسويق الفنادق عبر الإنترنت؟", slug: "/blog" }, // Article to be written
    { question: "ما هي أنواع الحجوزات في الفنادق؟", slug: "/blog" } // Article to be written
  ]
};

export default function FaqHubSection() {
  const t = useTranslations('FaqHub');
  const locale = useLocale() as 'en' | 'fr' | 'ar';

  const questions = hubData[locale] || hubData.en;

 return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.slug} 
                  className="block w-full h-full text-start p-6 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-purple-500 transition-all duration-300"
                >
                  <span className="text-lg font-semibold text-white">{item.question}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* --- NEW BUTTON ADDED HERE --- */}
          <div className="text-center mt-12">
            <Link 
              href="/blog"
              className="inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              {t('browseAllButton')}
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}