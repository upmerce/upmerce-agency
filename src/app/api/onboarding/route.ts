// src/app/api/onboarding/route.ts
import { adminDb } from '@/lib/firebase-admin';
import { transporter } from '@/lib/nodemailer';
import { FieldValue } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';
// Assuming your nodemailer transporter is exported from this path

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // This data will now include questionnaireId and all form fields

    const { questionnaireId, ...formData } = data; // Destructure questionnaireId

    if (!questionnaireId) {
      return NextResponse.json({ message: 'Questionnaire ID is missing in submission.' }, { status: 400 });
    }

    const docRef = adminDb.collection('questionnaires').doc(questionnaireId);

    // Update the document with all form data
    await docRef.set({
      ...formData, // Spread all other form fields (now includes all the new ones!)
      status: 'completed', // Update status
      submittedAt: FieldValue.serverTimestamp(),
    }, { merge: true }); // Use merge: true to avoid overwriting existing fields (like logoStoragePath)

    // Create a readable JSON string of the form data
        const formDataJsonString = JSON.stringify(formData, null, 2); // null, 2 for pretty-printing
    try {
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL, // Your sending email address
            to: process.env.ADMIN_NOTIFICATION_EMAIL, // <--- IMPORTANT: Your admin email to receive notifications
            subject: `New Onboarding Form Submission: ${formData.officialName || 'Untitled Business'}`,
            html: `
                <p>Hello Admin,</p>
                <p>A new onboarding form has been submitted.</p>
                <p><strong>Business Name:</strong> ${formData.officialName || 'N/A'}</p>
                <p><strong>Website Display Name:</strong> ${formData.websiteDisplayName || 'N/A'}</p>
                <p><strong>Contact Email:</strong> ${formData.email || 'N/A'}</p>
                <p><strong>Contact Phone:</strong> ${formData.phone || 'N/A'}</p>
                <p><strong>WhatsApp Number:</strong> ${formData.whatsappNumber || 'N/A'}</p>
                <p><strong>Questionnaire ID:</strong> ${questionnaireId}</p>
                <p>You can review the full details here (requires admin access):</p>
                <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/questionnaire/${questionnaireId}">View Questionnaire Details</a></p>
                <h3>Full Form Data (JSON for direct use in 'site.ts'):</h3>
                <pre style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; overflow-x: auto; font-family: monospace;">
                    <code>${formDataJsonString}</code>
                </pre>
                <p>Best regards,</p>
                <p>Your Onboarding System</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully for questionnaireId:', questionnaireId);
    } catch (emailError) {
        console.error('Error sending notification email:', emailError);
        // It's usually okay for the form submission to succeed even if email notification fails
        // You might want to log this error to a monitoring service
    }
    // --- END NEW: Nodemailer Integration ---

    return NextResponse.json({ message: 'Form submitted successfully!', questionnaireId: questionnaireId }, { status: 200 });

  } catch (error) {
    console.error('Final form submission error:', error);
    return NextResponse.json({ message: 'Failed to submit form.' }, { status: 500 });
  }
}