// /src/app/api/campaign/submit-lead/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming data from the client form
    const body = await request.json();
    const { uid, email, displayName, websiteUrl, tourCount, isOwner } = body;

    // 2. Basic validation on the server side
    if (!uid || !email || !websiteUrl) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // 3. Define the data payload to save to Firestore
    const leadData = {
      uid,
      email,
      displayName: displayName || 'Anonymous',
      websiteUrl,
      tourCount,
      isOwner,
      // Use server-side timestamp for accuracy
      submittedAt: FieldValue.serverTimestamp(),
      // Add status fields for your internal tracking later
      status: 'new', // new, qualified, disqualified, contacted
      notes: '',
    };

    // 4. Save to Firestore
    // We use .doc(uid).set() so that each Google user only gets ONE entry.
    // If they submit again, it just updates their existing entry.
    await adminDb.collection('campaign_leads').doc(uid).set(leadData);

    console.log(`Lead successfully saved for user: ${uid}`);

    // 5. Return success response
    return NextResponse.json(
      { message: 'Lead submitted successfully', leadId: uid },
      { status: 200 }
    );

  } catch (err: unknown) {
    console.error('Error saving campaign lead:', err);
    const message = err instanceof Error ? err.message : 'Internal server error failed to save data.';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}