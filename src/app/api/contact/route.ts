import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'no-reply@suaempresa.com.br';
    const webhook = process.env.CONTACT_WEBHOOK_URL;

    if (webhook) {
      await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, message }) });
    }

    if (resendApiKey && toEmail) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `Novo contato do site: ${name}`,
        replyTo: email,
        text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone || '-'}\n\nMensagem:\n${message}`,
      });
    } else {
      console.log('Contact message (no email provider configured):', { name, email, phone, message });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
