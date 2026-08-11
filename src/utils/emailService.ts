/**
 * Multi-Channel High-Availability Form Email Dispatcher for SECONDESK
 * Dispatches form submissions to info@secondesk.ke via multiple parallel gateways.
 */

export interface EmailPayload {
  subject: string;
  fields: Record<string, string>;
}

export const dispatchEmail = async (payload: EmailPayload): Promise<void> => {
  return new Promise<void>((resolve) => {
    try {
      const name = payload.fields['Full Name'] || payload.fields['name'] || 'N/A';
      const email = payload.fields['Business Email'] || payload.fields['email'] || '';
      const phone = payload.fields['Phone Number'] || payload.fields['phone'] || 'N/A';
      const company = payload.fields['Company Name'] || payload.fields['company'] || 'N/A';
      const location = payload.fields['Preferred Node'] || payload.fields['location'] || 'N/A';
      const teamSize = payload.fields['Team Footprint'] || payload.fields['teamSize'] || 'N/A';
      const date = payload.fields['Preferred Tour Date'] || payload.fields['date'] || 'N/A';
      const message = payload.fields['Inquiry Details'] || payload.fields['Special Notes'] || payload.fields['message'] || 'N/A';

      // 1. Prepare FormData for FormSubmit
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

      // 2. Hidden Iframe Form Submit (Native HTML POST to formsubmit.co)
      let iframe = document.getElementById('secondesk_email_iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'secondesk_email_iframe';
        iframe.name = 'secondesk_email_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      const form = document.createElement('form');
      form.action = 'https://formsubmit.co/info@secondesk.ke';
      form.method = 'POST';
      form.target = 'secondesk_email_iframe';

      const hiddenInputs: Array<{ name: string; value: string }> = [
        { name: '_subject', value: payload.subject },
        { name: '_captcha', value: 'false' },
        { name: '_template', value: 'table' },
      ];

      if (email) {
        hiddenInputs.push({ name: '_replyto', value: email });
      }

      Object.entries(payload.fields).forEach(([label, val]) => {
        hiddenInputs.push({ name: label, value: val });
      });

      hiddenInputs.forEach(({ name: inputName, value }) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = inputName;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // 3. Parallel AJAX fetch to FormSubmit
      fetch('https://formsubmit.co/ajax/info@secondesk.ke', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      }).catch(() => null);

      // 4. Parallel fetch to Host PHP script
      fetch('/api/contact.php', {
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
      }).catch(() => null);

      setTimeout(() => {
        if (form.parentNode) {
          document.body.removeChild(form);
        }
        resolve();
      }, 600);
    } catch (err) {
      console.error('Email dispatch error:', err);
      resolve();
    }
  });
};
