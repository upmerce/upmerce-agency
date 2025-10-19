// src/components/forms/sections/WebsiteContentSection.tsx
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormData } from '@/components/forms/OnboardingForm';
import { InputField } from '@/components/ui/InputField';
import { MultiCheckboxField } from '@/components/ui/MultiCheckboxField'; // <-- NEW IMPORT
import { TextareaField } from '@/components/ui/TextareaField';

interface WebsiteContentSectionProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export const WebsiteContentSection: React.FC<WebsiteContentSectionProps> = ({ control, errors }) => {
  const t = useTranslations('Onboarding');

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-4">{t('part3Title')}</h2>
      <div className="space-y-6">
        <InputField
          name="email"
          label={t('emailLabel')}
          placeholder={t('emailPlaceholder')}
          helpText={t('emailHelp')}
          type="email"
          control={control}
          error={errors.email?.message}
        />
        <InputField
          name="phone"
          label={t('phoneLabel')}
          placeholder={t('phonePlaceholder')}
          helpText={t('phoneHelp')}
          type="tel"
          control={control}
          error={errors.phone?.message}
        />
        {/* --- NEW: WhatsApp Number InputField --- */}
        <InputField
          name="whatsappNumber"
          label={t('whatsappNumberLabel')}
          placeholder={t('whatsappNumberPlaceholder')}
          helpText={t('whatsappNumberHelp')}
          type="tel"
          control={control}
          error={errors.whatsappNumber?.message}
        />
        {/* --- END NEW --- */}
        <InputField
          name="address"
          label={t('addressLabel')}
          placeholder={t('addressPlaceholder')}
          helpText={t('addressHelp')}
          control={control}
          error={errors.address?.message}
        />
        <InputField
          name="facebook"
          label={t('facebookLabel')}
          placeholder={t('facebookPlaceholder')}
          helpText={t('facebookHelp')}
          type="url"
          control={control}
          error={errors.facebook?.message}
        />
        <InputField
          name="instagram"
          label={t('instagramLabel')}
          placeholder={t('instagramPlaceholder')}
          helpText={t('instagramHelp')}
          type="url"
          control={control}
          error={errors.instagram?.message}
        />
        <InputField
          name="twitter"
          label={t('twitterLabel')}
          placeholder={t('twitterPlaceholder')}
          helpText={t('twitterHelp')}
          type="url"
          control={control}
          error={errors.twitter?.message}
        />

        {/* --- NEW: About Us Content TextAreaField --- */}
        <TextareaField
          name="aboutUsContent"
          label={t('aboutUsContentLabel')}
          placeholder={t('aboutUsContentPlaceholder')}
          helpText={t('aboutUsContentHelp')}
          control={control}
          error={errors.aboutUsContent?.message}
          rows={6}
        />
        {/* --- END NEW --- */}

        {/* --- NEW: Service Description TextAreaField --- */}
        <TextareaField
          name="serviceDescription"
          label={t('serviceDescriptionLabel')}
          placeholder={t('serviceDescriptionPlaceholder')}
          helpText={t('serviceDescriptionHelp')}
          control={control}
          error={errors.serviceDescription?.message}
          rows={6}
        />
        {/* --- END NEW --- */}

        {/* --- REPLACED: tourLocations with tourLocationsServed InputField --- */}
        <InputField
          name="tourLocationsServed" // Changed name
          label={t('tourLocationsServedLabel')} // Changed label
          placeholder={t('tourLocationsServedPlaceholder')} // Changed placeholder
          helpText={t('tourLocationsServedHelp')} // Changed help text
          control={control}
          error={errors.tourLocationsServed?.message} // Changed error
        />
        {/* --- END REPLACED --- */}

        {/* --- NEW: Payment Methods MultiCheckboxField --- */}
        <MultiCheckboxField
          name="paymentMethodsAccepted"
          label={t('paymentMethodsAcceptedLabel')}
          helpText={t('paymentMethodsAcceptedHelp')}
          control={control}
          error={errors.paymentMethodsAccepted?.message}
          options={[
            { value: 'cash', label: t('paymentMethodsAcceptedOptionCash') },
            { value: 'bankTransfer', label: t('paymentMethodsAcceptedOptionBankTransfer') },
            { value: 'onlinePaymentGateway', label: t('paymentMethodsAcceptedOptionOnlinePaymentGateway') },
            { value: 'other', label: t('paymentMethodsAcceptedOptionOther') },
          ]}
        />
        {/* --- END NEW --- */}

        {/* --- NEW: Website Language Options MultiCheckboxField --- */}
        <MultiCheckboxField
          name="websiteLanguageOptions"
          label={t('websiteLanguageOptionsLabel')}
          helpText={t('websiteLanguageOptionsHelp')}
          control={control}
          error={errors.websiteLanguageOptions?.message}
          options={[
            { value: 'ar', label: t('websiteLanguageOptionAR') },
            { value: 'fr', label: t('websiteLanguageOptionFR') },
            { value: 'en', label: t('websiteLanguageOptionEN') },
            { value: 'es', label: t('websiteLanguageOptionES') },
            { value: 'de', label: t('websiteLanguageOptionDE') },
          ]}
        />
        {/* --- END NEW --- */}
      </div>
    </section>
  );
};