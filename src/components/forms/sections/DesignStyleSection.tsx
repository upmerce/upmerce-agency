// src/components/forms/sections/DesignStyleSection.tsx
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormData } from '@/components/forms/OnboardingForm';
import { ColorInput } from '../ColorInput';
import { SelectField } from '@/components/ui/SelectField';

// --- UPDATED: Define the structure for themeDemos prop ---
interface DesignStyleSectionProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  themeDemos?: {
    default: string;
    adventure: string;
    luxury: string;
  };
}

export const DesignStyleSection: React.FC<DesignStyleSectionProps> = ({ control, errors, themeDemos }) => {
  const t = useTranslations('Onboarding');

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-4">{t('part2Title')}</h2>
      <div className="space-y-6">
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

        {/* --- NEW: Display Theme Demo Links --- */}
        {themeDemos && (
          <div className="bg-gray-700/50 p-4 rounded-md border border-gray-600">
            <h4 className="text-sm font-medium text-gray-200 mb-2">{t('themeDemosTitle')}</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {(Object.keys(themeDemos) as Array<keyof typeof themeDemos>).map((themeKey) => (
                <a
                  key={themeKey}
                  href={themeDemos[themeKey]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-300 hover:underline text-sm capitalize"
                >
                  {t(`templateThemeOption${themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}`)}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
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