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
