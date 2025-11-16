import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = null;

export function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 587),
      secure: false,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });
  }
  return transporter;
}

export async function enviarMail({ to, subject, html }) {
  const tx = getTransporter();
  const from = process.env.MAIL_FROM || "no-reply@example.com";
  await tx.sendMail({ from, to, subject, html });
}
