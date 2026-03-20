import { siteContent } from "@/data/site-content";
import type { LeadRecord } from "@/types/lead";

/**
 * Sends an email notification to the site administrators when a new lead is received.
 * Uses the Resend API if configured, otherwise logs a professional advisory.
 */
export async function sendLeadNotification(lead: LeadRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const receiverEmail = process.env.NOTIFICATIONS_RECEIVER_EMAIL || siteContent.email;

  if (!apiKey) {
    console.info(`[Lead Advisory] A new inquiry from ${lead.name} has been received. Configure RESEND_API_KEY to receive real-time email alerts.`);
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Alexiant Real Estate <notifications@alexiantrealestate.co.ke>",
        to: [receiverEmail],
        subject: `New ${lead.intent.toUpperCase()} Inquiry: ${lead.name}`,
        html: `
          <div style="font-family: sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #111827; padding: 32px; text-align: center;">
              <h1 style="color: #D4AF37; margin: 0; font-size: 24px; letter-spacing: 2px;">ALEXIANT REAL ESTATE</h1>
              <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">New Lead Inquiry Received</p>
            </div>
            
            <div style="padding: 40px;">
              <p style="font-size: 16px; margin-bottom: 24px;">Hello Admin,</p>
              <p style="font-size: 16px; line-height: 1.6; color: #444;">
                A new inquiry has been submitted via the <strong>${lead.source === 'property-page' ? 'Property Detail Page' : 'Homepage'}</strong>.
              </p>
              
              <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin: 32px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding-bottom: 12px; font-size: 13px; color: #666; width: 120px;">Client Name</td>
                    <td style="padding-bottom: 12px; font-size: 14px; font-weight: bold;">${lead.name}</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 12px; font-size: 13px; color: #666;">Intent</td>
                    <td style="padding-bottom: 12px; font-size: 14px;">
                      <span style="background-color: #046A38; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase; font-weight: bold;">${lead.intent}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 12px; font-size: 13px; color: #666;">Phone</td>
                    <td style="padding-bottom: 12px; font-size: 14px;"><a href="tel:${lead.phone}" style="color: #046A38; text-decoration: none;">${lead.phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 12px; font-size: 13px; color: #666;">Email</td>
                    <td style="padding-bottom: 12px; font-size: 14px;"><a href="mailto:${lead.email}" style="color: #046A38; text-decoration: none;">${lead.email}</a></td>
                  </tr>
                  ${lead.propertySlug ? `
                  <tr>
                    <td style="padding-bottom: 12px; font-size: 13px; color: #666;">Property Slug</td>
                    <td style="padding-bottom: 12px; font-size: 14px; color: #046A38; font-weight: bold;">${lead.propertySlug}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              
              <p style="font-size: 13px; color: #666; margin-bottom: 8px; font-weight: bold; text-transform: uppercase;">Message from client:</p>
              <div style="font-size: 15px; background-color: #fff; border-left: 3px solid #D4AF37; padding: 16px; margin-bottom: 32px; line-height: 1.6; font-style: italic; color: #444;">
                "${lead.message}"
              </div>
              
              <div style="text-align: center; margin-top: 40px;">
                <a href="https://alexiantrealestate.co.ke/admin/leads" style="background-color: #111827; color: #D4AF37; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #D4AF37;">
                  View Inquiry in Admin
                </a>
              </div>
            </div>
            
            <div style="background-color: #f8fafc; padding: 24px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eee;">
              This is an automated notification from Alexiant Real Estate. Please do not reply directly.
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Resend API error:", error);
    }
  } catch (error) {
    console.error("Failed to send lead notification:", error);
  }
}
