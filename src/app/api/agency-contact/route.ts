// src/app/api/agency-contact/route.ts
import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer'; // REMOVE THIS LINE
import { getTranslations } from 'next-intl/server';
import { transporter } from '@/lib/nodemailer'; // <--- NEW: Import the centralized transporter

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, locale } = body;

    const t = await getTranslations({ locale, namespace: 'AgencyContact' });

    if (!name || !email || !message) {
      return NextResponse.json({ error: t('errorMissingFields') }, { status: 400 });
    }

    // const transporter = nodemailer.createTransport({ ... }); // REMOVE THIS BLOCK - NOW USING IMPORTED TRANSPORTER

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL, // This might be your admin email
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
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Agency contact email sent successfully!');

    return NextResponse.json({ message: t('alertSuccess') }, { status: 200 });

  } catch (error) {
    console.error(error);
    const t = await getTranslations({ locale: 'en', namespace: 'AgencyContact' });
    return NextResponse.json({ error: t('errorGeneric') }, { status: 500 });
  }
}