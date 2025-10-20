// src/components/forms/sections/BusinessBrandSection.tsx
import React, { ReactNode } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormData } from '@/components/forms/OnboardingForm';
import { InputField } from '@/components/ui/InputField';
import { SelectField } from '@/components/ui/SelectField';
import { TextareaField } from '@/components/ui/TextareaField';

interface BusinessBrandSectionProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  children?: ReactNode;
}

export const BusinessBrandSection: React.FC<BusinessBrandSectionProps> = ({ control, errors, children }) => {
  const t = useTranslations('Onboarding');

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-4">{t('part1Title')}</h2>
      <div className="space-y-6">
        <InputField
          name="officialName"
          label={t('officialNameLabel')}
          placeholder={t('officialNamePlaceholder')}
          helpText={t('officialNameHelp')}
          control={control}
          error={errors.officialName?.message}
          maxLength={100} // <-- ADDED MAXLENGTH
        />
        <InputField
          name="websiteDisplayName"
          label={t('websiteDisplayNameLabel')}
          placeholder={t('websiteDisplayNamePlaceholder')}
          helpText={t('websiteDisplayNameHelp')}
          control={control}
          error={errors.websiteDisplayName?.message}
          maxLength={60} // <-- ADDED MAXLENGTH
        />
        <InputField
          name="slogan"
          label={t('sloganLabel')}
          placeholder={t('sloganPlaceholder')}
          helpText={t('sloganHelp')}
          control={control}
          error={errors.slogan?.message}
          maxLength={200} // <-- ADDED MAXLENGTH
        />

        <SelectField
          name="businessCategory"
          label={t('businessCategoryLabel')}
          placeholder={t('businessCategoryPlaceholder')}
          helpText={t('businessCategoryHelp')}
          control={control}
          error={errors.businessCategory?.message}
          options={[
            { value: 'touristicTransport', label: t('businessCategoryOptionTouristicTransport') },
            { value: 'tourOperator', label: t('businessCategoryOptionTourOperator') },
            { value: 'hotel', label: t('businessCategoryOptionHotel') },
            { value: 'restaurant', label: t('businessCategoryOptionRestaurant') },
            { value: 'eCommerce', label: t('businessCategoryOptionECommerce') },
            { value: 'other', label: t('businessCategoryOptionOther') },
          ]}
        />

        <TextareaField
          name="industrySpecifics"
          label={t('industrySpecificsLabel')}
          placeholder={t('industrySpecificsPlaceholder')}
          helpText={t('industrySpecificsHelp')}
          control={control}
          error={errors.industrySpecifics?.message}
          rows={4}
          maxLength={500} // <-- ADDED MAXLENGTH
        />

        {children}
      </div>
    </section>
  );
};