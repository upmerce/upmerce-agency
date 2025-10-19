// src/app/api/admin/get-questionnaire/route.ts
import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { questionnaireId } = await req.json();
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Authorization token not provided.' }, { status: 401 });
    }

    if (!questionnaireId) {
      return NextResponse.json({ error: 'Questionnaire ID is required' }, { status: 400 });
    }

    // --- Verify ID token and check custom claim on the server ---
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (!decodedToken.admin) { // Check for the 'admin: true' claim
      return NextResponse.json({ error: 'Access Denied: Not an administrator.' }, { status: 403 });
    }
    // --- End of server-side claim verification ---

    const docRef = adminDb.collection('questionnaires').doc(questionnaireId);
    const doc = await docRef.get();

    if (doc.exists) {
      const formData = doc.data(); // Fetch the full data
      return NextResponse.json({ message: 'Questionnaire data retrieved.', questionnaireId, formData }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Questionnaire not found.' }, { status: 404 });
    }
  } catch (error: unknown) {
    console.error('Error fetching admin questionnaire data:', error);
    // Safely extract code/message when possible
    const err = error as { code?: string; message?: string };
    if (err.code === 'auth/argument-error' || err.code === 'auth/id-token-expired') {
        return NextResponse.json({ error: 'Invalid or expired authorization token.' }, { status: 401});
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}