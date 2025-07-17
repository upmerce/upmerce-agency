// -------------------------------------------------------------------------
// 3. NEW FILE: /src/app/api/agency-contact/route.ts
// This new API route handles sending the email for your agency website.
// -------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Agency contact email sent successfully!');

    return NextResponse.json({ message: 'Thank you for your message! I will get back to you shortly.' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
