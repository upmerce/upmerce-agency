// src/app/api/upload-file/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { adminDb, adminStorageBucket, adminSdk } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const questionnaireId = formData.get('questionnaireId') as string | null;
    const storageSubfolder = formData.get('storageSubfolder') as string | null;

    // --- Validation ---
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
    }
    if (!questionnaireId) {
      return NextResponse.json({ message: 'Questionnaire ID is missing.' }, { status: 400 });
    }
    if (!storageSubfolder) {
        return NextResponse.json({ message: 'Storage subfolder is missing.' }, { status: 400 });
    }
    if (storageSubfolder.includes('/') || storageSubfolder.includes('..')) {
        return NextResponse.json({ message: 'Invalid storage subfolder name.' }, { status: 400 });
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ message: `Invalid file type. Only ${ALLOWED_MIME_TYPES.join(', ')} are allowed.` }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ message: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit.` }, { status: 400 });
    }
    // --- End Validation ---

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const originalExtension = path.extname(file.name || '');
    const uniqueFilename = `${uuidv4()}${originalExtension}`;
    
    // Construct storagePath dynamically using storageSubfolder
    const storagePath = `questionnaires/${questionnaireId}/${storageSubfolder}/${uniqueFilename}`;
    const fileRef = adminStorageBucket.file(storagePath);

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });

    // Generate the signed URL for display
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(Date.now() + sevenDaysInMs);

    const [signedUrl] = await fileRef.getSignedUrl({
      action: 'read',
      expires: expiryDate,
      version: 'v4',
    });

    const questionnaireDocRef = adminDb.collection('questionnaires').doc(questionnaireId);
    
    // --- IMPORTANT: Dynamically update Firestore with the SIGNED URL and clean field names ---
  const updateField: Record<string, unknown> = {
    lastUpdatedAt: adminSdk.firestore.FieldValue.serverTimestamp(),
  };

    let firestoreFieldName: string;
    if (storageSubfolder === 'logos') {
      firestoreFieldName = 'logoUrl'; // Now storing the URL directly
    } else if (storageSubfolder === 'social-images') {
      firestoreFieldName = 'socialShareImageUrl'; // Now storing the URL directly
    } else {
      return NextResponse.json({ message: 'Invalid storage subfolder for Firestore update.' }, { status: 400 });
    }
    
    updateField[firestoreFieldName] = signedUrl; // STORE THE SIGNED URL IN FIRESTORE
    // We also return the storagePath in the response for your reference if needed client-side,
    // but the critical part is storing the signedUrl in Firestore.
    updateField[`${firestoreFieldName}StoragePath`] = storagePath; // Store original path if desired, or remove

    await questionnaireDocRef.update(updateField);

    // Return both the storagePath and the signedUrl (displayUrl) to the client
    return NextResponse.json({ storagePath: storagePath, displayUrl: signedUrl }, { status: 200 });

  } catch (error: unknown) {
    console.error('File upload failed:', error);
    let errorMessage = 'Failed to upload file.';
    let statusCode = 500;
    const err = error as { message?: string };

    if (err.message) {
      const msg = err.message;
      if (msg.includes('No file uploaded') || msg.includes('file type') || 
          msg.includes('size exceeds') || msg.includes('Questionnaire ID is missing') ||
          msg.includes('Storage subfolder is missing') || msg.includes('Invalid storage subfolder name')) {
        statusCode = 400;
        errorMessage = msg;
      } else if (msg.includes('Max allowed expiration is seven days')) {
        errorMessage = 'Failed to generate signed URL due to expiration limit. Please try again.';
      }
    }

    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
}