// Netlify Forms sends every form submission here as an "Outgoing webhook"
// notification (configured in the Netlify dashboard, not in code — see
// Site configuration > Forms > Form notifications). We only forward the
// forms we actually want feeding MailerLite; everything else is ignored.
const SYNCED_FORMS = new Set(['contact', 'waitlist', 'work-with-me']);

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error('MAILERLITE_API_KEY is not set');
    return { statusCode: 500, body: 'Missing MailerLite API key' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const formName = payload.form_name || payload.data?.['form-name'];
  if (!SYNCED_FORMS.has(formName)) {
    return { statusCode: 200, body: 'Skipped (form not synced)' };
  }

  const data = payload.data || {};
  const email = data.email;
  if (!email) {
    return { statusCode: 200, body: 'Skipped (no email)' };
  }

  const name = [data['first-name'], data['last-name']].filter(Boolean).join(' ');

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      fields: {
        name: name || undefined,
        last_name: data['last-name'] || undefined,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('MailerLite sync failed:', res.status, errText);
    return { statusCode: 502, body: 'MailerLite sync failed' };
  }

  return { statusCode: 200, body: 'Synced' };
}
