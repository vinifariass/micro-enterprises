import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, consent, source } = body || {};

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'Missing email' }, { status: 400 });
    }

    const subscribeWebhook = process.env.SUBSCRIBE_WEBHOOK_URL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    // 1) Send to webhook, if configured
    if (subscribeWebhook) {
      await fetch(subscribeWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, consent: !!consent, source: source || 'lead-magnet' }),
      });
    }

    // 2) Add to Resend Audience, if configured
    if (resendApiKey && audienceId) {
      try {
        await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, first_name: name || undefined, unsubscribed: false }),
        });
      } catch (e) {
        // Log and continue
        console.error('Resend audience error', e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Subscribe API error', err);
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
