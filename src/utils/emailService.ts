/**
 * Single-Dispatch High-Availability Form Email Service for SECONDESK
 * Sends exactly one email to info@secondesk.ke per submission via host PHP mail script,
 * falling back to FormSubmit only if host PHP mail is unavailable.
 */

export interface EmailPayload {
  subject: string;
  fields: Record<string, string>;
}

export const dispatchEmail = async (payload: EmailPayload): Promise<void> => {
  const name = payload.fields['Full Name'] || payload.fields['name'] || 'N/A';
  const email = payload.fields['Business Email'] || payload.fields['email'] || '';
  const phone = payload.fields['Phone Number'] || payload.fields['phone'] || 'N/A';
  const company = payload.fields['Company Name'] || payload.fields['company'] || 'N/A';
  const location = payload.fields['Preferred Node'] || payload.fields['location'] || 'N/A';
  const teamSize = payload.fields['Team Footprint'] || payload.fields['teamSize'] || 'N/A';
  const date = payload.fields['Preferred Tour Date'] || payload.fields['date'] || 'N/A';
  const message = payload.fields['Inquiry Details'] || payload.fields['Special Notes'] || payload.fields['message'] || 'N/A';

  // 1. Try host PHP mail endpoint first
  try {
    const res = await fetch('/api/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: payload.subject,
        name,
        email,
        phone,
        company,
        location,
        teamSize,
        date,
        message,
        ...payload.fields,
      }),
    });

    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success) {
        // Successfully sent via host PHP mail! Return immediately to prevent duplicate emails.
        return;
      }
    }
  } catch (err) {
    console.warn('PHP mail gateway unavailable, switching to FormSubmit fallback gateway:', err);
  }

  // 2. Fallback: Send single AJAX POST request to FormSubmit if PHP mail is unavailable
  try {
    const formData = new FormData();
    formData.append('_subject', payload.subject);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    if (email) {
      formData.append('_replyto', email);
      formData.append(
        '_autoresponse',
        `Hello ${name},\n\nThank you for scheduling a visit with SECONDESK. Your request has been received and your spatial tour itinerary pass is confirmed!\n\nItinerary Details:\n- Guest Name: ${name}\n- Preferred Tour Date: ${date}\n- Host Node: ${location}\n- Company: ${company}\n\nOur team is looking forward to hosting you for a 1-on-1 spatial walkthrough, speed diagnostics, and coffee tasting.\n\nFor any inquiries or to reschedule, call or WhatsApp our reception directly at +254 719 688 992.\n\nBest regards,\nSECONDESK Team\nhttps://secondesk.ke`
      );
    }

    Object.entries(payload.fields).forEach(([key, val]) => {
      formData.append(key, val);
    });

    await fetch('https://formsubmit.co/ajax/info@secondesk.ke', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData,
    });
  } catch (err) {
    console.error('FormSubmit fallback error:', err);
  }
};
