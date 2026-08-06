/**
 * Multi-Channel High-Availability Form Email Dispatcher for Secondesk
 * Dispatches form submissions to info@secondesk.ke via multiple parallel gateways.
 */

export interface EmailPayload {
  subject: string;
  fields: Record<string, string>;
}

export const dispatchEmail = async (payload: EmailPayload): Promise<void> => {
  return new Promise<void>((resolve) => {
    try {
      // 1. Prepare FormData for FormSubmit & Web3Forms
      const formData = new FormData();
      formData.append('_subject', payload.subject);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      Object.entries(payload.fields).forEach(([key, val]) => {
        formData.append(key, val);
      });

      // 2. Hidden Iframe Form Submit (Native HTML POST)
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

      Object.entries(payload.fields).forEach(([label, val]) => {
        hiddenInputs.push({ name: label, value: val });
      });

      hiddenInputs.forEach(({ name, value }) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // 3. Parallel AJAX fetch to FormSubmit
      fetch('https://formsubmit.co/ajax/info@secondesk.ke', {
        method: 'POST',
        body: formData,
      }).catch(() => null);

      // 4. Parallel fetch to Web3Forms API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '00000000-0000-0000-0000-000000000000', // Web3Forms endpoint handler
          subject: payload.subject,
          to_email: 'info@secondesk.ke',
          from_name: 'Secondesk Web',
          ...payload.fields,
        }),
      }).catch(() => null);

      // 5. Parallel fetch to Host PHP script
      fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: payload.subject,
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
