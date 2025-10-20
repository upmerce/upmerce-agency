// src/components/forms/sections/SeoSection.tsx
import React, { ReactNode } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormData } from '@/components/forms/OnboardingForm';
import { TextareaField } from '@/components/ui/TextareaField'; // <-- CHANGED to TextareaField for better UX

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
        <TextareaField // <-- CHANGED to TextareaField
          name="keywords" 
          label={t('keywordsLabel')} 
          placeholder={t('keywordsPlaceholder')} 
          helpText={t('keywordsHelp')} 
          control={control} 
          error={errors.keywords?.message} 
          rows={3} // Added for better default sizing
          maxLength={500} // <-- ADDED MAXLENGTH
        />
        
        {children}
      </div>
    </section>
  );
};