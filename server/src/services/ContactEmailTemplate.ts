import type { ContactMessage } from "./ContactService";

const htmlEntities: Record<string, string> = {
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
};

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => htmlEntities[char]);

export const createContactEmail = (contact: ContactMessage) => {
  const name = escapeHtml(`${contact.firstName} ${contact.lastName}`);
  const email = escapeHtml(contact.email);
  const message = escapeHtml(contact.message);
  return {
    text: `New portfolio message\n\nFrom: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}\n\n${contact.message}`,
    html: `<!doctype html>
<html><body style="margin:0;background:#eef4f1;font-family:Arial,Helvetica,sans-serif;color:#10201c;padding:32px 12px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 12px 36px rgba(0,32,22,.12)">
<tr><td style="background:#001012;padding:30px 34px;border-bottom:4px solid #02a94c">
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#65dda3;font-weight:bold">Portfolio contact</div>
<h1 style="margin:10px 0 0;color:#fff;font-size:25px;line-height:1.3">You have a new message</h1>
</td></tr>
<tr><td style="padding:30px 34px">
<p style="margin:0 0 20px;color:#50615b;font-size:15px;line-height:1.6">Someone reached out through your portfolio contact form.</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f8f5;border:1px solid #dcebe2;border-radius:12px">
<tr><td style="padding:16px 18px;border-bottom:1px solid #dcebe2">
<div style="font-size:11px;color:#628074;text-transform:uppercase;letter-spacing:1px">From</div>
<div style="margin-top:5px;font-size:16px;font-weight:bold;color:#10201c">${name}</div>
</td></tr>
<tr><td style="padding:16px 18px">
<div style="font-size:11px;color:#628074;text-transform:uppercase;letter-spacing:1px">Email</div>
<div style="margin-top:5px;font-size:15px"><a href="mailto:${email}" style="color:#087b42;text-decoration:none">${email}</a></div>
</td></tr>
</table>
<h2 style="margin:26px 0 10px;font-size:13px;color:#628074;text-transform:uppercase;letter-spacing:1px">Message</h2>
<div style="padding:18px;background:#fff;border:1px solid #e4ece7;border-left:4px solid #02a94c;border-radius:8px;color:#263b33;font-size:15px;line-height:1.7;white-space:pre-wrap;overflow-wrap:anywhere">${message}</div>
<p style="margin:24px 0 0;color:#718078;font-size:12px;line-height:1.6">You can reply directly to this email to respond to ${name}.</p>
</td></tr>
<tr><td style="background:#f7faf8;padding:16px 34px;color:#87938d;font-size:11px">Sent from your portfolio contact form</td></tr>
</table></td></tr></table>
</body></html>`,
  };
};
