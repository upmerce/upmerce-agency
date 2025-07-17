// -------------------------------------------------------------------------
// 2. UPDATED FILE: /src/app/api/agency-contact/route.ts
// This API route is now "locale-aware" and sends back translated messages.
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getTranslations } from 'next-intl/server'; // <-- 1. Import getTranslations

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, locale } = body;

    // 2. Initialize the translation function for the given locale
    const t = await getTranslations({ locale, namespace: 'AgencyContact' });

    if (!name || !email || !message) {
      // 3. Use the t() function to get the translated error message
      return NextResponse.json({ error: t('errorMissingFields') }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: `New Inquiry from upmerce.com - ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New Inquiry from upmerce.com</h2>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Client Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <h3>Message:</h3>
          <p>${message}</p>
        </div>
      `, // Email HTML remains the same
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Agency contact email sent successfully!');

    // 4. Use the t() function to get the translated success message
    return NextResponse.json({ message: t('alertSuccess') }, { status: 200 });

  } catch (error) {
    console.error(error);
    // You can even translate the generic error
    const t = await getTranslations({ locale: 'en', namespace: 'AgencyContact' });
    return NextResponse.json({ error: t('errorGeneric') }, { status: 500 });
  }
}