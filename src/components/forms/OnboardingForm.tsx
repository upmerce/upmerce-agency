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
import { Box, Chip, Container, Paper, Stack, Button, Typography, CircularProgress, Alert } from '@mui/material';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// --- Zod Schema for Validation ---
const schema = z.object({
  questionnaireId: z.string().uuid('Invalid Questionnaire ID').optional(),
  
  // Business & Brand Section
  officialName: z.string().min(1, 'requiredField').max(100, 'maxLengthExceeded'),
  websiteDisplayName: z.string().min(1, 'requiredField').max(60, 'maxLengthExceeded'),
  slogan: z.string().max(200, 'maxLengthExceeded').optional(),
  logoUrl: z.string().optional().or(z.literal('')),
  businessCategory: z.enum(['touristicTransport', 'tourOperator', 'hotel', 'restaurant', 'eCommerce', 'other'] as const, {
    error: 'requiredField',
  }),
  industrySpecifics: z.string().min(1, 'requiredField').max(500, 'maxLengthExceeded'),
  
  // Design & Style Section
  primaryColor: z.string().min(1, 'requiredField'),
  secondaryColor: z.string().optional(),
  templateTheme: z.enum(['default', 'adventure', 'luxury', 'custom'] as const, {
    error: 'requiredField',
  }),
  
  // Website Content Section
  email: z.string().email('invalidUrl').min(1, 'requiredField').max(254, 'maxLengthExceeded'),
  phone: z.string().min(1, 'requiredField').max(25, 'maxLengthExceeded'),
  address: z.string().max(250, 'maxLengthExceeded').optional(),
  whatsappNumber: z.string().max(25, 'maxLengthExceeded').optional(),
  facebook: z.string().url('invalidUrl').max(255, 'maxLengthExceeded').optional().or(z.literal('')),
  instagram: z.string().url('invalidUrl').max(255, 'maxLengthExceeded').optional().or(z.literal('')),
  twitter: z.string().url('invalidUrl').max(255, 'maxLengthExceeded').optional().or(z.literal('')),
  aboutUsContent: z.string().min(1, 'requiredField').max(2500, 'maxLengthExceeded'),
  serviceDescription: z.string().min(1, 'requiredField').max(2500, 'maxLengthExceeded'),
  tourLocationsServed: z.string().max(500, 'maxLengthExceeded').optional(),
  paymentMethodsAccepted: z.array(z.enum(['cash', 'bankTransfer', 'onlinePaymentGateway', 'other'] as const)).optional(),
  websiteLanguageOptions: z.array(z.enum(['ar', 'fr', 'en', 'es', 'de'] as const)).optional(),
  
  // SEO Section
  keywords: z.string().max(500, 'maxLengthExceeded').optional(),
  socialShareImageUrl: z.string().optional().or(z.literal('')),
  
  // Features & Packages Section
  reviewsSystem: z.boolean(),
  blogSystem: z.boolean(),
  bookingEngine: z.boolean(),
  experiencesSection: z.boolean(),
  faqSection: z.boolean(),
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

// --- NEW: Define theme demo links ---
const themeDemos = {
    default: 'https://upmerce-default-demo.vercel.app/', // Replace with your actual URL
    adventure: 'https://upmerce-adventure-demo.vercel.app/', // Replace with your actual URL
    luxury: 'https://upmerce-luxury-demo.vercel.app/', // Replace with your actual URL
};

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
      businessCategory: undefined,
      industrySpecifics: '',
      primaryColor: '',
      secondaryColor: '',
      templateTheme: undefined,
      email: '',
      phone: '',
      address: '',
      whatsappNumber: '',
      facebook: '',
      instagram: '',
      twitter: '',
      aboutUsContent: '',
      serviceDescription: '',
      tourLocationsServed: '',
      paymentMethodsAccepted: [],
      websiteLanguageOptions: [],
      keywords: '',
      socialShareImageUrl: '',
      reviewsSystem: false,
      blogSystem: false,
      bookingEngine: false,
      experiencesSection: false,
      faqSection: false,
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
    } 
    setActiveQuestionnaireId(idToUse);
   
    const fetchAndPopulateForm = async (id: string) => {
      try {
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
        
        const populatedData: FormData = {
            questionnaireId: id, 
            officialName: data.formData?.officialName ?? '',
            websiteDisplayName: data.formData?.websiteDisplayName ?? '',
            slogan: data.formData?.slogan ?? '',
            logoUrl: data.formData?.logoUrl ?? '', 
            businessCategory: (data.formData?.businessCategory as FormData['businessCategory']) ?? undefined, 
            industrySpecifics: data.formData?.industrySpecifics ?? '',
            primaryColor: data.formData?.primaryColor ?? '',
            secondaryColor: data.formData?.secondaryColor ?? '',
            templateTheme: (data.formData?.templateTheme as FormData['templateTheme']) ?? undefined,
            email: data.formData?.email ?? '',
            phone: data.formData?.phone ?? '',
            address: data.formData?.address ?? '',
            whatsappNumber: data.formData?.whatsappNumber ?? '',
            facebook: data.formData?.facebook ?? '',
            instagram: data.formData?.instagram ?? '',
            twitter: data.formData?.twitter ?? '',
            aboutUsContent: data.formData?.aboutUsContent ?? '',
            serviceDescription: data.formData?.serviceDescription ?? '',
            tourLocationsServed: data.formData?.tourLocationsServed ?? '',
            paymentMethodsAccepted: (data.formData?.paymentMethodsAccepted as FormData['paymentMethodsAccepted']) ?? [],
            websiteLanguageOptions: (data.formData?.websiteLanguageOptions as FormData['websiteLanguageOptions']) ?? [],
            keywords: data.formData?.keywords ?? '',
            reviewsSystem: data.formData?.reviewsSystem ?? false,
            blogSystem: data.formData?.blogSystem ?? false,
            bookingEngine: data.formData?.bookingEngine ?? false,
            experiencesSection: data.formData?.experiencesSection ?? false,
            faqSection: data.formData?.faqSection ?? false,
            socialShareImageUrl: data.formData?.socialShareImageUrl ?? '',
        };
        
        reset(populatedData);
        setIsFormReady(true);
      } catch (error) {
        console.error('Error fetching and populating form data:', error);
        setIsFormReady(true);
      }
    };

    if (idToUse) {
      fetchAndPopulateForm(idToUse);
    }
  }, [reset]);

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

  const commonFieldProps = { control, errors, t, questionnaireId: activeQuestionnaireId };
  const commonSectionProps = { control, errors, questionnaireId: activeQuestionnaireId };


  return (
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      
      {/* 1. Header Block */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Chip 
          icon={<AutoModeIcon sx={{ fontSize: '16px !important', color: 'black !important' }} />}
          label="SYSTEM CONFIGURATION" 
          sx={{ 
            mb: 3, 
            bgcolor: '#D97706', // Amber
            color: 'black', 
            fontWeight: 700, 
            border: '1px solid white'
          }} 
        />
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 800, 
            color: 'white', 
            mb: 2,
            letterSpacing: '-0.02em',
            fontSize: { xs: '2rem', md: '3.5rem' }
          }}
        >
          {t('title')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '700px', mx: 'auto' }}>
          {t('introduction')}
        </Typography>
      </Box>

      {/* 2. The Glass Cockpit (Form Container) */}
      <Paper 
        elevation={0}
        sx={{
          p: { xs: 4, md: 8 },
          borderRadius: 4,
          // Obsidian Glass
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 20px 80px -20px rgba(0,0,0,0.5)',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={8}>
            
            <BusinessBrandSection {...commonSectionProps}>
              <FileUploadField
                  name="logoUrl"
                  label={t('logoLabel')}
                  helpText={t('logoHelp')}
                  storageSubfolder="logos"
                  {...commonFieldProps}
              />
            </BusinessBrandSection>
            
            <DesignStyleSection {...commonSectionProps} themeDemos={themeDemos} />
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

            {/* 3. The Launch Button */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RocketLaunchIcon />}
                disabled={loading}
                sx={{
                  py: 1.5, px: 6,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  backgroundColor: 'white',
                  color: 'black',
                  boxShadow: '0 0 20px rgba(255,255,255,0.3)',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0 0 30px rgba(255,255,255,0.5)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {t('submitButton')}
              </Button>
            </Box>

          </Stack>
        </form>
      </Paper>

      {snackbarOpen && (
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)} sx={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          {snackbarMessage}
        </Alert>
      )}

    </Container>
  );
}