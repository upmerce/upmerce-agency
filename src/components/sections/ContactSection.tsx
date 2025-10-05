// -------------------------------------------------------------------------
// 1. UPDATED FILE: /src/components/sections/ContactSection.tsx
// This form now sends the current locale to the API.
// -------------------------------------------------------------------------
'use client';

import React, { useState, useRef } from 'react'; // ADDED: useRef
import { useTranslations, useLocale } from 'next-intl';

export default function ContactSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyContact');
  const locale = useLocale();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  // ADDED: State for validation errors per field
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  // ADDED: Ref to explicitly focus the first error field
  const firstErrorFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  // ADDED: Ref for the status message div to make it an ARIA live region
  const statusMessageRef = useRef<HTMLDivElement>(null);

  // ADDED: Client-side validation function
  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = t('validationNameRequired');
    if (!email.trim()) newErrors.email = t('validationEmailRequired');
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t('validationEmailInvalid');
    if (!message.trim()) newErrors.message = t('validationMessageRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors
    setStatus(null); // Clear previous status

    if (!validateForm()) {
      // If validation fails, focus the first invalid field
      const firstErrorField = document.querySelector(
        `[aria-invalid="true"]`
      ) as HTMLInputElement | HTMLTextAreaElement;
      if (firstErrorField) {
        firstErrorField.focus();
        // Set a status message for screen readers about form errors
        setStatus({ type: 'error', message: t('formHasErrors') });
      }
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/agency-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, locale }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t('unexpectedError'));
      }

      setStatus({ type: 'success', message: result.message });
      setName('');
      setEmail('');
      setMessage('');

    } catch (err: unknown) {
      if(err instanceof Error) {
        setStatus({ type: 'error', message: err.message });
      } else {
        setStatus({ type: 'error', message: t('unknownError') });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={id} className="py-20 bg-gray-800" aria-labelledby="contact-title"> {/* ADDED aria-labelledby */}
      <div className="container mx-auto px-6 text-center">
        <h2 id="contact-title" className="text-3xl md:text-4xl font-bold text-white mb-4"> {/* ADDED id="contact-title" */}
          {t('title')}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          {t('subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-start space-y-4" noValidate> {/* ADDED noValidate for client-side control */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              {t('formNameLabel')}
              <span className="text-red-500 ml-1" aria-hidden="true">*</span> {/* Visual indicator for required */}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }} // Clear error on change
              required
              className={`w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500 p-3 ${errors.name ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.name} // ADDED: Indicate invalid state
              aria-describedby={errors.name ? 'name-error' : undefined} // ADDED: Link to error message
              ref={(el) => { if (errors.name && !firstErrorFieldRef.current) firstErrorFieldRef.current = el; }} // Focus helper
            />
            {errors.name && (
              <p id="name-error" className="text-red-400 text-sm mt-1" role="alert"> {/* ADDED role="alert" */}
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              {t('formEmailLabel')}
              <span className="text-red-500 ml-1" aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
              required
              className={`w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500 p-3 ${errors.email ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              ref={(el) => { if (errors.email && !firstErrorFieldRef.current) firstErrorFieldRef.current = el; }}
            />
            {errors.email && (
              <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              {t('formMessageLabel')}
              <span className="text-red-500 ml-1" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => { setMessage(e.target.value); setErrors((prev) => ({ ...prev, message: undefined })); }}
              required
              className={`w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500 p-3 ${errors.message ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              ref={(el) => { if (errors.message && !firstErrorFieldRef.current) firstErrorFieldRef.current = el; }}
            ></textarea>
            {errors.message && (
              <p id="message-error" className="text-red-400 text-sm mt-1" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 disabled:bg-gray-500"
            >
              {loading ? t('loadingButton') : t('ctaButton')}
            </button>
          </div>
        </form>

        {status && (
          <div
            ref={statusMessageRef} // ADDED: Ref to the status div
            className={`mt-6 p-4 rounded-md ${status.type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'}`}
            role={status.type === 'error' ? 'alert' : 'status'} // ADDED: ARIA live region role
            aria-live="polite" // ADDED: Politeness setting
          >
            {status.message}
          </div>
        )}
      </div>
    </section>
  );
}