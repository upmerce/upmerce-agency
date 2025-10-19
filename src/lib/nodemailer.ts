// src/lib/nodemailer.ts
import nodemailer from 'nodemailer';

// Create a single transporter instance
export const transporter = nodemailer.createTransport({
  service: 'gmail', // You can keep 'gmail' if that's what you're using. Or configure with host/port if not gmail.
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_APP_PASSWORD, // Use app password for security
  },
});

// Optional: Verify connection (good for debugging on server start)
transporter.verify(function (error) {
  if (error) {
    console.error("Nodemailer transporter verification failed:", error);
  } else {
    console.log("Nodemailer server is ready to take our messages");
  }
});