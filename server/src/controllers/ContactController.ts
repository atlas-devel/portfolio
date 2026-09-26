import { Request, Response } from "express";
import { sendContactMessage } from "../services/ContactService";

const isText = (value: unknown): value is string => typeof value === "string";

export const submitContactMessage = async (req: Request, res: Response): Promise<void> => {
  const { user_name, user_lastname, email, message, website } = req.body ?? {};
  if (isText(website) && website.trim()) {
    res.status(200).json({ success: true, message: "Message sent." });
    return;
  }
  if (![user_name, user_lastname, email, message].every(isText)) {
    res.status(400).json({ success: false, message: "Please complete all fields." });
    return;
  }
  const firstName = user_name.trim();
  const lastName = user_lastname.trim();
  const senderEmail = email.trim();
  const content = message.trim();
  if (!firstName || !lastName || firstName.length > 100 || lastName.length > 100 || content.length < 5 || content.length > 5000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
    res.status(400).json({ success: false, message: "Please provide valid contact details and a message." });
    return;
  }
  try {
    await sendContactMessage({ firstName, lastName, email: senderEmail, message: content });
    res.status(200).json({ success: true, message: "Your message was sent." });
  } catch (error) {
    console.error("Contact message delivery failed:", error);
    const notConfigured = error instanceof Error && error.message === "Contact email is not configured.";
    res.status(notConfigured ? 503 : 502).json({ success: false, message: notConfigured ? "Contact email is not configured on the server." : "Message delivery failed. Please try again later." });
  }
};
