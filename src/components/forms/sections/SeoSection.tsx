// src/components/forms/sections/SeoSection.tsx
import React, { ReactNode } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormData } from '@/components/forms/OnboardingForm';
// Correct import for your UI component
import { InputField } from '@/components/ui/InputField'; // <-- Use YOUR InputField

interface SeoSectionProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  children?: ReactNode;
}

export const SeoSection: React.FC<SeoSectionProps> = ({ control, errors, children }) => {
  const t = useTranslations('Onboarding');

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-4">{t('part4Title')}</h2>
      <div className="space-y-6">
        <InputField // Use InputField
          name="keywords" 
          label={t('keywordsLabel')} 
          placeholder={t('keywordsPlaceholder')} 
          helpText={t('keywordsHelp')} 
          control={control} 
          error={errors.keywords?.message} 
        />
        
        {children}
      </div>
    </section>
  );
};