import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export const revalidate = 60; // cache for 1 minute

function getClient() {
  const email = process.env.GA_SERVICE_ACCOUNT_EMAIL;
  let key = process.env.GA_SERVICE_ACCOUNT_KEY;
  const keyB64 = process.env.GA_SERVICE_ACCOUNT_KEY_BASE64;

  if (keyB64 && !key) {
    try {
      key = Buffer.from(keyB64, 'base64').toString('utf8');
    } catch (e) {
      console.error('Failed to decode GA_SERVICE_ACCOUNT_KEY_BASE64');
    }
  }

  if (key) {
    key = key.replace(/\\n/g, '\n');
  }

  if (!email || !key) return { client: null, error: 'Service account email or key missing' } as const;
  if (!key.includes('BEGIN PRIVATE KEY')) {
    return { client: null, error: 'Invalid private key format. Ensure PEM with BEGIN PRIVATE KEY and escaped newlines' } as const;
  }

  const client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: email,
      private_key: key,
    },
  });
  return { client, error: null } as const;
}

export async function GET() {
  try {
    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!propertyId) {
      return NextResponse.json({ ok: false, error: 'GA4_PROPERTY_ID not set (must be the numeric property ID)' }, { status: 500 });
    }
    if (!/^\d+$/.test(propertyId)) {
      return NextResponse.json({ ok: false, error: 'GA4_PROPERTY_ID must be the numeric property ID (not the G- tag)' }, { status: 400 });
    }

    const { client, error } = getClient();
    if (!client) {
      return NextResponse.json({ ok: false, error: error || 'Service account not configured' }, { status: 500 });
    }

    const [resp] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'sessions' }],
    });

    const sessions = Number(resp?.rows?.[0]?.metricValues?.[0]?.value || '0');
    return NextResponse.json({ ok: true, sessions });
  } catch (err) {
    console.error('GA sessions API error', err);
    return NextResponse.json({ ok: false, error: 'Failed to fetch sessions' }, { status: 500 });
  }
}
