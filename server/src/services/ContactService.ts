import nodemailer from "nodemailer";
import { createContactEmail } from "./ContactEmailTemplate";

export interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (contact: ContactMessage): Promise<void> => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!host || !user || !pass || !to) throw new Error("Contact email is not configured.");

  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });
  const name = `${contact.firstName} ${contact.lastName}`.replace(/[\r\n]/g, " ");
  const content = createContactEmail(contact);
  await transport.sendMail({
    from: process.env.CONTACT_FROM_EMAIL || user,
    to,
    replyTo: contact.email,
    subject: `Portfolio message from ${name}`,
    text: content.text,
    html: content.html,
  });
};
