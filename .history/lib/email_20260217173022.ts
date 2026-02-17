import { Resend } from "resend";

// Lazy init — avoids throwing at build time when RESEND_API_KEY is not set
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const ADMIN_EMAIL = "oritsfash";
const FROM_EMAIL = "Orit's Fashion < onboarding@resend.dev>";

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

/** Notify admin of a new contact form submission */
export async function sendContactNotification(data: ContactEmailData) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Message: ${data.subject || "General Inquiry"} — ${data.name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1c1917;">
        <h2 style="font-size: 22px; margin-bottom: 4px; color: #1c1917;">New Contact Message</h2>
        <div style="width: 40px; height: 1px; background: #d4951c; margin-bottom: 24px;"></div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #78716c; width: 100px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #d4951c;">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #78716c;">Phone</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ""}
          ${data.subject ? `<tr><td style="padding: 8px 0; color: #78716c;">Subject</td><td style="padding: 8px 0;">${data.subject}</td></tr>` : ""}
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #faf7f2; border-left: 3px solid #d4951c;">
          <p style="font-size: 13px; color: #78716c; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
          <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>

        <p style="margin-top: 24px; font-size: 12px; color: #a8a29e;">
          Reply directly to this email to respond to ${data.name}.
        </p>
      </div>
    `,
    replyTo: data.email,
  });
}

/** Send confirmation to the customer after they submit the contact form */
export async function sendContactConfirmation(data: { name: string; email: string }) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "We received your message — Orit's Fashion",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1c1917;">
        <h2 style="font-size: 22px; margin-bottom: 4px; color: #1c1917;">Thank You, ${data.name}</h2>
        <div style="width: 40px; height: 1px; background: #d4951c; margin-bottom: 24px;"></div>

        <p style="font-size: 14px; line-height: 1.7; color: #44403c;">
          We've received your message and will get back to you within 1–2 business days.
        </p>
        <p style="font-size: 14px; line-height: 1.7; color: #44403c;">
          In the meantime, feel free to browse our catalog or follow us on social media for the latest designs.
        </p>

        <div style="margin-top: 28px; text-align: center;">
          <a href="https://oritsfashion.com/catalog"
             style="display: inline-block; padding: 12px 28px; background: #1c1917; color: #fff; text-decoration: none; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">
            Browse Catalog
          </a>
        </div>

        <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #e7e5e4; font-size: 12px; color: #a8a29e; text-align: center;">
          <p style="margin: 0;">Orit's Fashion &mdash; Elegance in Every Stitch</p>
          <p style="margin: 4px 0 0;">Lagos, Nigeria &middot; hello@oritsfashion.com</p>
        </div>
      </div>
    `,
  });
}
