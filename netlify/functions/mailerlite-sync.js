// Netlify Forms sends every form submission here as an "Outgoing webhook"
// notification (configured in the Netlify dashboard, not in code — see
// Site configuration > Forms > Form notifications). We only forward the
// forms we actually want feeding MailerLite; everything else is ignored.
//
// Custom fields used below (tour, trip, wpath_interests) must exist in
// MailerLite first — Subscribers > Fields > add a field with that exact
// key — otherwise MailerLite will reject or silently drop unknown fields.
const SYNCED_FORMS = new Set(['contact', 'camp-queerness-waitlist', 'work-with-me', 'wpath-2026']);

// Group IDs each form's subscribers get added to, so MailerLite automations
// (triggered on "subscriber joins group") can send the right thank-you email.
const FORM_GROUPS = {
  contact: ['197907418221380958'], // Tour Inquiries
  'camp-queerness-waitlist': ['198417408306709811'], // Camp Queerness Waitlist
  'wpath-2026': ['197907562547381585'], // WPATH Inquiries
};

function wpathInterests(data) {
  const labels = {
    'date-cooking-class': 'Cooking class',
    'date-roma-condesa': 'Roma/Condesa',
    'date-san-angel': 'San Ángel',
    'date-mezcal': 'Mezcal',
    'date-sapphic-shopping': 'Sapphic shopping tour',
  };
  return Object.entries(labels)
    .filter(([key]) => data[key])
    .map(([key, label]) => `${label}: ${data[key]}`)
    .join(' | ');
}

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

  // Which tour/trip this person wants, so you can filter MailerLite's
  // subscriber list down to just the people interested in one tour and
  // send them a targeted confirmation + deposit-link email.
  let interest;
  if (formName === 'contact') {
    interest = Array.isArray(data.tour) ? data.tour.join(', ') : data.tour;
  } else if (formName === 'wpath-2026') {
    interest = wpathInterests(data);
  }

  const fields = { name: name || undefined, last_name: data['last-name'] || undefined };
  if (formName === 'contact') fields.tour = interest || undefined;
  if (formName === 'wpath-2026') fields.wpath_interests = interest || undefined;
  if (formName === 'camp-queerness-waitlist') {
    fields.phone = data.phone || undefined;
    fields.camp_group_size = data['group-size'] || undefined;
    fields.camp_reason = data.reason || undefined;
  }

  const groups = FORM_GROUPS[formName];

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ email, fields, groups }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('MailerLite sync failed:', res.status, errText);
    return { statusCode: 502, body: 'MailerLite sync failed' };
  }

  return { statusCode: 200, body: 'Synced' };
}
