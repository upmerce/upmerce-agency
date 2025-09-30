// -------------------------------------------------------------------------
// 1. UPDATED FILE: /src/components/sections/ContactSection.tsx
// This form now sends the current locale to the API.
// -------------------------------------------------------------------------
'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl'; // <-- 1. Import useLocale

export default function ContactSection() {
  const t = useTranslations('AgencyContact');
  const locale = useLocale(); // <-- 2. Get the current language ('en' or 'fr')
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/agency-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // --- 3. Send the locale along with the form data ---
        body: JSON.stringify({ name, email, message, locale }),
      });

      const result = await response.json();

      if (!response.ok) {
        // The error message now comes directly from the API, already translated.
        throw new Error(result.error || 'An unexpected error occurred.');
      }

      // The success message also comes directly from the API.
      setStatus({ type: 'success', message: result.message });
      setName('');
      setEmail('');
      setMessage('');

    } catch (err: unknown) {
      if(err instanceof Error) {
        setStatus({ type: 'error', message: err.message });
      } else {
        setStatus({ type: 'error', message: 'An unknown error occurred.' });
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
       <div className="container mx-auto px-6 text-center">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('title')}
             </h2>
             <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                {t('subtitle')}
             </p>
             
             <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-start space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{t('formNameLabel')}</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500 p-3" />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t('formEmailLabel')}</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500 p-3" />
                </div>
                 <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">{t('formMessageLabel')}</label>
                    <textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500 p-3"></textarea>
                </div>
                <div className="text-right">
                    <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 disabled:bg-gray-500">
                        {loading ? t('loadingButton') : t('ctaButton')}
                    </button>
                </div>
             </form>

            {status && (
                <div className={`mt-6 p-4 rounded-md ${status.type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'}`}>
                    {status.message}
                </div>
            )}

        </div>
    </section>
  );
}