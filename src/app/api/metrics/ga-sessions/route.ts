import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export const revalidate = 60; // cache for 1 minute

function getClient() {
  const email = process.env.GA_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GA_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
  if (!email || !key) return null;
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: email,
      private_key: key,
    },
  });
}

export async function GET() {
  try {
    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!propertyId) {
      return NextResponse.json({ ok: false, error: 'GA4_PROPERTY_ID not set' }, { status: 500 });
    }

    const client = getClient();
    if (!client) {
      return NextResponse.json({ ok: false, error: 'Service account not configured' }, { status: 500 });
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
