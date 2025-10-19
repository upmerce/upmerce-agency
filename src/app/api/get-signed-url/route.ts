// src/app/api/get-signed-url/route.ts
import { adminStorageBucket } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get('path');
  const questionnaireId = searchParams.get('questionnaireId'); // Get questionnaireId

  if (!filePath) {
    return NextResponse.json({ message: 'Missing file path parameter.' }, { status: 400 });
  }
  if (!questionnaireId) { // NEW: Validate questionnaireId is provided
    return NextResponse.json({ message: 'Missing questionnaire ID parameter.' }, { status: 400 });
  }

  // NEW: Crucial validation: Ensure the filePath actually contains the provided questionnaireId
  // This prevents requesting a logo for a different questionnaire ID using a valid path
  // E.g., if a user for QID 'abc' tries to fetch a logo from 'questionnaires/xyz/logos/123.webp'
  if (!filePath.includes(`questionnaires/${questionnaireId}/`)) {
    return NextResponse.json({ message: 'Unauthorized: File path does not match provided questionnaire ID.' }, { status: 403 });
  }

  try {
    const fileRef = adminStorageBucket.file(filePath);

    // Check if the file actually exists before generating a URL
    const [exists] = await fileRef.exists();
    if (!exists) {
      return NextResponse.json({ message: 'File not found in storage.' }, { status: 404 });
    }

    // Generate a long-lived signed URL for read access
    // --- FIX START ---
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const expiryDate = new Date(Date.now() + sevenDaysInMs); // Set expiration to 7 days from now
    // --- FIX END ---

    const [signedUrl] = await fileRef.getSignedUrl({
      action: 'read',
      expires: expiryDate,
      version: 'v4',
    });

    return NextResponse.json({ url: signedUrl }, { status: 200 });

  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json({ message: 'Failed to generate signed URL.' }, { status: 500 });
  }
}