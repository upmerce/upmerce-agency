// src/components/forms/sections/WebsiteContentSection.tsx
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormData } from '@/components/forms/OnboardingForm';
import { InputField } from '@/components/ui/InputField';
import { MultiCheckboxField } from '@/components/ui/MultiCheckboxField';
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
          maxLength={254} // <-- ADDED MAXLENGTH
        />
        <InputField
          name="phone"
          label={t('phoneLabel')}
          placeholder={t('phonePlaceholder')}
          helpText={t('phoneHelp')}
          type="tel"
          control={control}
          error={errors.phone?.message}
          maxLength={25} // <-- ADDED MAXLENGTH
        />
        <InputField
          name="whatsappNumber"
          label={t('whatsappNumberLabel')}
          placeholder={t('whatsappNumberPlaceholder')}
          helpText={t('whatsappNumberHelp')}
          type="tel"
          control={control}
          error={errors.whatsappNumber?.message}
          maxLength={25} // <-- ADDED MAXLENGTH
        />
        <InputField
          name="address"
          label={t('addressLabel')}
          placeholder={t('addressPlaceholder')}
          helpText={t('addressHelp')}
          control={control}
          error={errors.address?.message}
          maxLength={250} // <-- ADDED MAXLENGTH
        />
        <InputField
          name="facebook"
          label={t('facebookLabel')}
          placeholder={t('facebookPlaceholder')}
          helpText={t('facebookHelp')}
          type="url"
          control={control}
          error={errors.facebook?.message}
          maxLength={255} // <-- ADDED MAXLENGTH
        />
        <InputField
          name="instagram"
          label={t('instagramLabel')}
          placeholder={t('instagramPlaceholder')}
          helpText={t('instagramHelp')}
          type="url"
          control={control}
          error={errors.instagram?.message}
          maxLength={255} // <-- ADDED MAXLENGTH
        />
        <InputField
          name="twitter"
          label={t('twitterLabel')}
          placeholder={t('twitterPlaceholder')}
          helpText={t('twitterHelp')}
          type="url"
          control={control}
          error={errors.twitter?.message}
          maxLength={255} // <-- ADDED MAXLENGTH
        />
        <TextareaField
          name="aboutUsContent"
          label={t('aboutUsContentLabel')}
          placeholder={t('aboutUsContentPlaceholder')}
          helpText={t('aboutUsContentHelp')}
          control={control}
          error={errors.aboutUsContent?.message}
          rows={6}
          maxLength={2500} // <-- ADDED MAXLENGTH
        />
        <TextareaField
          name="serviceDescription"
          label={t('serviceDescriptionLabel')}
          placeholder={t('serviceDescriptionPlaceholder')}
          helpText={t('serviceDescriptionHelp')}
          control={control}
          error={errors.serviceDescription?.message}
          rows={6}
          maxLength={2500} // <-- ADDED MAXLENGTH
        />
        <InputField
          name="tourLocationsServed"
          label={t('tourLocationsServedLabel')}
          placeholder={t('tourLocationsServedPlaceholder')}
          helpText={t('tourLocationsServedHelp')}
          control={control}
          error={errors.tourLocationsServed?.message}
          maxLength={500} // <-- ADDED MAXLENGTH
        />
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
      </div>
    </section>
  );
};