// -------------------------------------------------------------------------
// 1. NEW FILE: /src/components/sections/FeaturesSection.tsx
// This component should be placed in your 'sections' sub-folder.
// -------------------------------------------------------------------------
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

// A reusable checkmark icon component
const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

// A reusable plugin icon component
const PluginIcon = () => (
    <svg className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 8v-4m0 8v-2m0 8v-2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);

export default function FeaturesSection() {
  const t = useTranslations('AgencyFeatures');

  const coreFeatures = [
    t('coreFeature1'),
    t('coreFeature2'),
    t('coreFeature3'),
    t('coreFeature4'),
  ];

  const plugins = [
    t('plugin1'),
    t('plugin2'),
    t('plugin3'),
    t('plugin4'),
  ];

  return (
    <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
                {t('title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
                {/* Core Features Column */}
                <div className="bg-gray-700 p-8 rounded-lg text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">{t('coreTitle')}</h3>
                    <p className="text-gray-400 mb-6">{t('coreSubtitle')}</p>
                    <ul className="space-y-3 text-gray-300">
                        {coreFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <CheckIcon />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Optional Plugins Column */}
                <div className="bg-gray-700 p-8 rounded-lg text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">{t('pluginsTitle')}</h3>
                    <p className="text-gray-400 mb-6">{t('pluginsSubtitle')}</p>
                    <ul className="space-y-3 text-gray-300">
                        {plugins.map((plugin, index) => (
                            <li key={index} className="flex items-center">
                                <PluginIcon />
                                <span>{plugin}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
  );
}