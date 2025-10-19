// src/app/api/start-questionnaire/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminSdk } from '@/lib/firebase-admin'; // Assuming adminDb and adminSdk are from firebase-admin

export async function POST(req: NextRequest) {
  try {
    const { questionnaireId } = await req.json();

    if (!questionnaireId) {
      return NextResponse.json({ error: 'Questionnaire ID is required' }, { status: 400 });
    }

    const docRef = adminDb.collection('questionnaires').doc(questionnaireId);
    const doc = await docRef.get();

  let formData: Record<string, unknown> = {}; // Use Record for more explicit typing

    if (doc.exists) {
      const data = doc.data();
      
      // IMPORTANT: Ensure data is not undefined before accessing its properties
      if (data) {
        formData = {
          officialName: data.officialName || '',
          websiteDisplayName: data.websiteDisplayName || '',
          slogan: data.slogan || '',
          
          logoUrl: data.logoUrl || '', 
          
          // --- NEW FIELDS: Business & Brand Section ---
          businessCategory: data.businessCategory || null, // Enum field, can be undefined
          industrySpecifics: data.industrySpecifics || '',
          // --- END NEW FIELDS ---

          primaryColor: data.primaryColor || '',
          secondaryColor: data.secondaryColor || '',
          
          // --- NEW FIELDS: Design & Style Section ---
          templateTheme: data.templateTheme || null, // Enum field, can be undefined
          // --- END NEW FIELDS ---

          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          
          // --- NEW FIELDS: Website Content Section ---
          whatsappNumber: data.whatsappNumber || '',
          aboutUsContent: data.aboutUsContent || '',
          serviceDescription: data.serviceDescription || '',
          tourLocationsServed: data.tourLocationsServed || '', // Corrected from tourLocations
          paymentMethodsAccepted: data.paymentMethodsAccepted || [], // Array field, default to empty array
          websiteLanguageOptions: data.websiteLanguageOptions || [], // Array field, default to empty array
          // --- END NEW FIELDS ---

          facebook: data.facebook || '',
          instagram: data.instagram || '',
          twitter: data.twitter || '',
          
          keywords: data.keywords || '',
          socialShareImageUrl: data.socialShareImageUrl || '', 

          reviewsSystem: data.reviewsSystem ?? false,
          blogSystem: data.blogSystem ?? false,
          bookingEngine: data.bookingEngine ?? false,
          
          // --- NEW FIELDS: Features & Packages Section ---
          experiencesSection: data.experiencesSection ?? false, // Boolean field, default to false
          faqSection: data.faqSection ?? false, // Boolean field, default to false
          // --- END NEW FIELDS ---

          status: data.status || 'started',
          createdAt: data.createdAt,
          lastUpdatedAt: data.lastUpdatedAt,
        };
      }
      return NextResponse.json({ message: 'Questionnaire session resumed.', questionnaireId, formData }, { status: 200 });
    } else {
      // Document does not exist, create a new one
      // Initialize with default values for ALL fields if creating new
      formData = {
        officialName: '',
        websiteDisplayName: '',
        slogan: '',
        logoUrl: '',
        businessCategory: null, 
        industrySpecifics: '',
        primaryColor: '',
        secondaryColor: '',
        templateTheme: null,
        email: '',
        phone: '',
        address: '',
        whatsappNumber: '',
        aboutUsContent: '',
        serviceDescription: '',
        tourLocationsServed: '',
        paymentMethodsAccepted: [],
        externalLinks: [], // Assuming this might be another array for the future if not already defined elsewhere
        websiteLanguageOptions: [],
        facebook: '',
        instagram: '',
        twitter: '',
        keywords: '',
        socialShareImageUrl: '',
        reviewsSystem: false,
        blogSystem: false,
        bookingEngine: false,
        experiencesSection: false,
        faqSection: false,
        status: 'started',
        createdAt: adminSdk.firestore.FieldValue.serverTimestamp(),
        lastUpdatedAt: adminSdk.firestore.FieldValue.serverTimestamp(),
      };
      await docRef.set(formData);
      return NextResponse.json({ message: 'New questionnaire session started.', questionnaireId, formData }, { status: 200 });
    }
  } catch (error: unknown) {
    console.error('Error starting/resuming questionnaire:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}