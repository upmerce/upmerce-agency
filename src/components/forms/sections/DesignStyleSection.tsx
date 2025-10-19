// src/components/forms/sections/DesignStyleSection.tsx
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormData } from '@/components/forms/OnboardingForm';
import { ColorInput } from '../ColorInput'; // Keep this import
import { SelectField } from '@/components/ui/SelectField'; // <-- NEW IMPORT

interface DesignStyleSectionProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export const DesignStyleSection: React.FC<DesignStyleSectionProps> = ({ control, errors }) => {
  const t = useTranslations('Onboarding');

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-4">{t('part2Title')}</h2>
      <div className="space-y-6">
        {/* --- NEW: Template Theme SelectField --- */}
        <SelectField
          name="templateTheme"
          label={t('templateThemeLabel')}
          placeholder={t('templateThemePlaceholder')}
          helpText={t('templateThemeHelp')}
          control={control}
          error={errors.templateTheme?.message}
          options={[
            { value: 'default', label: t('templateThemeOptionDefault') },
            { value: 'adventure', label: t('templateThemeOptionAdventure') },
            { value: 'luxury', label: t('templateThemeOptionLuxury') },
            { value: 'custom', label: t('templateThemeOptionCustom') },
          ]}
        />
        {/* --- END NEW --- */}

        <ColorInput
          name="primaryColor"
          label={t('primaryColorLabel')}
          helpText={t('primaryColorHelp')}
          control={control}
          error={errors.primaryColor?.message}
        />
        <ColorInput
          name="secondaryColor"
          label={t('secondaryColorLabel')}
          helpText={t('secondaryColorHelp')}
          control={control}
          error={errors.secondaryColor?.message}
        />
      </div>
    </section>
  );
};