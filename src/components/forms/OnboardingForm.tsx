// src/components/forms/OnboardingForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

// Import ALL section components
import { BusinessBrandSection } from './sections/BusinessBrandSection';
import { DesignStyleSection } from './sections/DesignStyleSection';
import { WebsiteContentSection } from './sections/WebsiteContentSection';
import { SeoSection } from './sections/SeoSection';
import { FeaturesPackagesSection } from './sections/FeaturesPackagesSection';

// IMPORTANT: Import the generic FileUploadField
import { FileUploadField } from '@/components/forms/FileUploadField';
// IMPORTANT: Use YOUR InputField component (commented out as it's not directly used here)
// import { InputField } from '@/components/ui/InputField'; 


// --- Zod Schema for Validation ---
// --- Zod Schema for Validation ---
const schema = z.object({
  questionnaireId: z.string().uuid('Invalid Questionnaire ID').optional(),
  officialName: z.string().min(1, 'requiredField'),
  websiteDisplayName: z.string().min(1, 'requiredField'),
  slogan: z.string().optional(),
  logoUrl: z.string().optional().or(z.literal('')),
  
  // --- NEW FIELDS: Business Category & Specifics ---
  businessCategory: z.enum(['touristicTransport', 'tourOperator', 'hotel', 'restaurant', 'eCommerce', 'other'] as const, {
    error: 'requiredField',
  }),
  industrySpecifics: z.string().min(1, 'requiredField'), // Making this required for detailed info
  // --- END NEW FIELDS ---

  primaryColor: z.string().min(1, 'requiredField'),
  secondaryColor: z.string().optional(),
  // --- NEW FIELD: Template Theme ---
  templateTheme: z.enum(['default', 'adventure', 'luxury', 'custom'] as const, {
    error: 'requiredField',
  }),
  // --- END NEW FIELD ---

  email: z.string().email('invalidUrl').min(1, 'requiredField'), // Using invalidUrl for email error too for consistency
  phone: z.string().min(1, 'requiredField'),
  address: z.string().optional(),
  // --- NEW FIELD: WhatsApp Number ---
  whatsappNumber: z.string().optional(),
  // --- END NEW FIELD ---

  facebook: z.string().url('invalidUrl').optional().or(z.literal('')),
  instagram: z.string().url('invalidUrl').optional().or(z.literal('')),
  twitter: z.string().url('invalidUrl').optional().or(z.literal('')),

  // --- NEW FIELDS: About Us, Service Description, Tour Locations Served (replaces tourLocations) ---
  aboutUsContent: z.string().min(1, 'requiredField'), // Making About Us required
  serviceDescription: z.string().min(1, 'requiredField'), // Making Service Description required
  tourLocationsServed: z.string().optional(), // Now specific for tour businesses
  // --- END NEW FIELDS ---

  // --- NEW FIELDS: Payment Methods & Languages ---
  paymentMethodsAccepted: z.array(z.enum(['cash', 'bankTransfer', 'onlinePaymentGateway', 'other'] as const)).optional(),
  websiteLanguageOptions: z.array(z.enum(['ar', 'fr', 'en', 'es', 'de'] as const)).optional(),
  // --- END NEW FIELDS ---

  keywords: z.string().optional(),
  socialShareImageUrl: z.string().optional().or(z.literal('')),
  
  reviewsSystem: z.boolean(),
  blogSystem: z.boolean(),
  bookingEngine: z.boolean(),
  // --- NEW FIELDS: Experiences & FAQ ---
  experiencesSection: z.boolean(),
  faqSection: z.boolean(),
  // --- END NEW FIELDS ---
});

export type FormData = z.infer<typeof schema>;

const CustomAlert: React.FC<{
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}> = ({ message, severity, onClose }) => {
  const bgColor = severity === 'success' ? 'bg-green-600' : 'bg-red-600';
  const textColor = 'text-white';

  return (
    <div className={`relative p-4 rounded-md shadow-lg ${bgColor} ${textColor} flex items-center justify-between`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

const QUESTIONNAIRE_ID_STORAGE_KEY = 'user_questionnaire_id';

export default function OnboardingForm() {
  const t = useTranslations('Onboarding');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [activeQuestionnaireId, setActiveQuestionnaireId] = useState<string | null>(null);
  const [isFormReady, setIsFormReady] = useState(false);

const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      questionnaireId: undefined,
      officialName: '',
      websiteDisplayName: '',
      slogan: '',
      logoUrl: '',
      // --- NEW DEFAULTS: Business Category & Specifics ---
      businessCategory: undefined, // Or a default like 'other' if you prefer
      industrySpecifics: '',
      // --- END NEW DEFAULTS ---
      primaryColor: '',
      secondaryColor: '',
      // --- NEW DEFAULT: Template Theme ---
      templateTheme: undefined, // Or a default like 'default'
      // --- END NEW DEFAULT ---
      email: '',
      phone: '',
      address: '',
      // --- NEW DEFAULT: WhatsApp Number ---
      whatsappNumber: '',
      // --- END NEW DEFAULT ---
      facebook: '',
      instagram: '',
      twitter: '',
      // --- NEW DEFAULTS: About Us, Service Description, Tour Locations Served ---
      aboutUsContent: '',
      serviceDescription: '',
      tourLocationsServed: '', // New specific field
      // --- END NEW DEFAULTS ---
      // --- NEW DEFAULTS: Payment Methods & Languages ---
      paymentMethodsAccepted: [], // Initialize as empty array
      websiteLanguageOptions: [], // Initialize as empty array
      // --- END NEW DEFAULTS ---
      keywords: '',
      socialShareImageUrl: '',
      reviewsSystem: false,
      blogSystem: false,
      bookingEngine: false,
      // --- NEW DEFAULTS: Experiences & FAQ ---
      experiencesSection: false,
      faqSection: false,
      // --- END NEW DEFAULTS ---
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    const storedId = localStorage.getItem(QUESTIONNAIRE_ID_STORAGE_KEY);
    const idToUse = storedId || uuidv4();

    if (!storedId) {
      localStorage.setItem(QUESTIONNAIRE_ID_STORAGE_KEY, idToUse);
      console.log('Generated and stored new questionnaireId:', idToUse);
    } else {
      console.log('Retrieved existing questionnaireId from localStorage:', idToUse);
    }

    setActiveQuestionnaireId(idToUse);

    // src/components/forms/OnboardingForm.tsx - inside useEffect

    const fetchAndPopulateForm = async (id: string) => {
      try {
        console.log('Calling /api/start-questionnaire to fetch data for ID:', id);
        const response = await fetch('/api/start-questionnaire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questionnaireId: id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch existing questionnaire data.');
        }

        const data = await response.json();
        console.log('Backend response with formData:', data); // <--- IMPORTANT: CHECK THIS LOG IN YOUR CONSOLE
        
        // Construct populatedData directly from fetched data, prioritizing fetched values
        const populatedData: FormData = {
            questionnaireId: id, 

            officialName: data.formData?.officialName ?? '',
            websiteDisplayName: data.formData?.websiteDisplayName ?? '',
            slogan: data.formData?.slogan ?? '',
            logoUrl: data.formData?.logoUrl ?? '', 
            
            // --- NEW MAPPING: Business Category & Specifics ---
            // Ensure these are correctly cast as Zod enum expects specific string types
            // If data.formData?.businessCategory is null/undefined, it becomes undefined (correct for enum default)
            businessCategory: (data.formData?.businessCategory as FormData['businessCategory']) ?? undefined, 
            industrySpecifics: data.formData?.industrySpecifics ?? '',
            // --- END NEW MAPPING ---

            primaryColor: data.formData?.primaryColor ?? '',
            secondaryColor: data.formData?.secondaryColor ?? '',
            
            // --- NEW MAPPING: Template Theme ---
            templateTheme: (data.formData?.templateTheme as FormData['templateTheme']) ?? undefined,
            // --- END NEW MAPPING ---

            email: data.formData?.email ?? '',
            phone: data.formData?.phone ?? '',
            address: data.formData?.address ?? '',
            
            // --- NEW MAPPING: WhatsApp Number ---
            whatsappNumber: data.formData?.whatsappNumber ?? '',
            // --- END NEW MAPPING ---

            facebook: data.formData?.facebook ?? '',
            instagram: data.formData?.instagram ?? '',
            twitter: data.formData?.twitter ?? '',
            
            // --- NEW MAPPING: About Us, Service Description, Tour Locations Served ---
            aboutUsContent: data.formData?.aboutUsContent ?? '',
            serviceDescription: data.formData?.serviceDescription ?? '',
            tourLocationsServed: data.formData?.tourLocationsServed ?? '', // Maps new field
            // --- END NEW MAPPING ---

            // --- NEW MAPPING: Payment Methods & Languages ---
            // Ensure these are cast to string arrays correctly or defaulted to empty array
            paymentMethodsAccepted: (data.formData?.paymentMethodsAccepted as FormData['paymentMethodsAccepted']) ?? [],
            websiteLanguageOptions: (data.formData?.websiteLanguageOptions as FormData['websiteLanguageOptions']) ?? [],
            // --- END NEW MAPPING ---

            keywords: data.formData?.keywords ?? '',
            reviewsSystem: data.formData?.reviewsSystem ?? false,
            blogSystem: data.formData?.blogSystem ?? false,
            bookingEngine: data.formData?.bookingEngine ?? false,
            
            // --- NEW MAPPING: Experiences & FAQ ---
            experiencesSection: data.formData?.experiencesSection ?? false,
            faqSection: data.formData?.faqSection ?? false,
            // --- END NEW MAPPING ---

            socialShareImageUrl: data.formData?.socialShareImageUrl ?? '',
        };
        
        // --- CONSOLE LOGS FOR DEBUGGING ---
        console.log('Populated data for socialShareImageUrl (after mapping):', populatedData.socialShareImageUrl);
        console.log('Populated data for logoUrl (after mapping):', populatedData.logoUrl);
        // ADD MORE SPECIFIC LOGS FOR NEW FIELDS
        console.log('Populated data for businessCategory:', populatedData.businessCategory);
        console.log('Populated data for industrySpecifics:', populatedData.industrySpecifics);
        console.log('Populated data for templateTheme:', populatedData.templateTheme);
        console.log('Populated data for whatsappNumber:', populatedData.whatsappNumber);
        console.log('Populated data for aboutUsContent:', populatedData.aboutUsContent);
        console.log('Populated data for serviceDescription:', populatedData.serviceDescription);
        console.log('Populated data for tourLocationsServed:', populatedData.tourLocationsServed);
        console.log('Populated data for paymentMethodsAccepted:', populatedData.paymentMethodsAccepted);
        console.log('Populated data for websiteLanguageOptions:', populatedData.websiteLanguageOptions);
        console.log('Populated data for experiencesSection:', populatedData.experiencesSection);
        console.log('Populated data for faqSection:', populatedData.faqSection);
        // --- END CONSOLE LOGS ---

        reset(populatedData);
        console.log('Form reset with data:', populatedData); // Keep this for overall check
        setIsFormReady(true);

      } catch (error) {
        console.error('Error fetching and populating form data:', error);
        setIsFormReady(true);
      }
    };

    if (idToUse) {
      fetchAndPopulateForm(idToUse);
    }
  }, [reset, methods, setActiveQuestionnaireId]); // `methods` is needed if using `methods.getValues()`

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSnackbarOpen(false);

    if (!activeQuestionnaireId) {
        console.error("No questionnaireId available for submission.");
        setSnackbarMessage(t('formError'));
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setLoading(false);
        return;
    }
    data.questionnaireId = activeQuestionnaireId;

    try {
      console.log('Submitting form data:', data);
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Form submission failed.');
      }

      setSnackbarMessage(t('formSuccess'));
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSnackbarMessage(t('formError'));
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!isFormReady || !activeQuestionnaireId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 lg:px-8 text-center text-gray-400">
        Loading questionnaire...
        <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mt-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  // Define commonFieldProps for individual fields (they still need 't')
  const commonFieldProps = { control, errors, t, questionnaireId: activeQuestionnaireId };
  // Define commonSectionProps for sections (they don't need 't')
  const commonSectionProps = { control, errors, questionnaireId: activeQuestionnaireId };


  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
        {t('title')}
      </h1>
      <p className="text-gray-300 text-center mb-8 md:mb-10 leading-relaxed">
        {t('introduction')}
      </p>

      <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-xl border border-gray-700">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Business & Brand Section */}
          <BusinessBrandSection {...commonSectionProps}>
            <FileUploadField
                name="logoUrl"
                label={t('logoLabel')}
                helpText={t('logoHelp')}
                storageSubfolder="logos"
                {...commonFieldProps}
            />
          </BusinessBrandSection>
          
          <DesignStyleSection {...commonSectionProps} />
          <WebsiteContentSection {...commonSectionProps} />
          
          <SeoSection {...commonSectionProps}>
            <FileUploadField
              name="socialShareImageUrl"
              label={t('socialShareImageLabel')}
              helpText={t('socialShareImageHelp')}
              storageSubfolder="social-images"
              {...commonFieldProps}
            />
          </SeoSection>

          <FeaturesPackagesSection {...commonSectionProps} />

          <input type="hidden" {...methods.register('questionnaireId')} />

          <div className="text-center mt-10">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200"
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {t('submitButton')}
            </button>
          </div>
        </form>
      </div>

      {snackbarOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <CustomAlert
            message={snackbarMessage}
            severity={snackbarSeverity}
            onClose={handleSnackbarClose}
          />
        </div>
      )}
    </div>
  );
}