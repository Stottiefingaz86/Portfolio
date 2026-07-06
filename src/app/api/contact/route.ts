import { Resend } from 'resend';

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? 'christopher.hunt86@gmail.com';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return Response.json(
      {
        error:
          'Contact form is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL to the environment.',
      },
      { status: 503 },
    );
  }

  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (body.company?.trim()) {
    return Response.json({ ok: true });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (!name || name.length > 120) {
    return Response.json({ error: 'Please enter your name.' }, { status: 400 });
  }

  if (!email || !isValidEmail(email) || email.length > 254) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return Response.json(
      { error: 'Please enter a message of at least 10 characters.' },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

  const { error } = await resend.emails.send({
    from,
    to: CONTACT_TO,
    replyTo: email,
    subject: `Portfolio contact — ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, '', message].join('\n'),
    html: `
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  });

  if (error) {
    console.error('Resend contact error:', error);
    return Response.json(
      { error: 'Could not send your message right now. Please try again shortly.' },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
