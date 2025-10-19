// src/components/forms/sections/FeaturesPackagesSection.tsx
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormData } from '@/components/forms/OnboardingForm';
import { CheckboxInput } from '../CheckboxInput'; // Keep this import

interface FeaturesPackagesSectionProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export const FeaturesPackagesSection: React.FC<FeaturesPackagesSectionProps> = ({ control, errors }) => {
  const t = useTranslations('Onboarding');

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-4">{t('part5Title')}</h2>
      <div className="space-y-6">
        <CheckboxInput
          name="reviewsSystem"
          label={t('reviewsSystemLabel')}
          helpText={t('reviewsSystemHelp')}
          control={control}
          error={errors.reviewsSystem?.message}
        />
        <CheckboxInput
          name="blogSystem"
          label={t('blogSystemLabel')}
          helpText={t('blogSystemHelp')}
          control={control}
          error={errors.blogSystem?.message}
        />
        <CheckboxInput
          name="bookingEngine"
          label={t('bookingEngineLabel')}
          helpText={t('bookingEngineHelp')}
          control={control}
          error={errors.bookingEngine?.message}
        />

        {/* --- NEW: Experiences Section Checkbox --- */}
        <CheckboxInput
          name="experiencesSection"
          label={t('experiencesSectionLabel')}
          helpText={t('experiencesSectionHelp')}
          control={control}
          error={errors.experiencesSection?.message}
        />
        {/* --- END NEW --- */}

        {/* --- NEW: FAQ Section Checkbox --- */}
        <CheckboxInput
          name="faqSection"
          label={t('faqSectionLabel')}
          helpText={t('faqSectionHelp')}
          control={control}
          error={errors.faqSection?.message}
        />
        {/* --- END NEW --- */}
      </div>
    </section>
  );
};