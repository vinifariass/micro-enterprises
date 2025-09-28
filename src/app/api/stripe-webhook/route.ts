import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/app/templates/ecommerce2/catalog";

export const runtime = "nodejs"; // ensure Node runtime for webhooks

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const sigSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !sigSecret) return NextResponse.json({ error: "Missing Stripe env" }, { status: 500 });

  const stripe = new Stripe(secret);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, sigSecret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;
      // Expand line items to get products metadata we set earlier
      const li = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      for (const item of li.data) {
        const name = item.description || "";
        // We stored productId and sku in product_data.metadata on creation,
        // but Stripe does not return that metadata here; fallback by matching name.
        // Best approach is to store needed identifiers in session metadata or use webhooks with your DB IDs.
        const match = PRODUCTS.find(p => name.startsWith(p.name));
        if (match && match.variants && item.quantity) {
          // naive decrement: find any variant that appears in the name
          const v = match.variants.find(vv => name.includes(vv.sku) || (vv.size && name.includes(vv.size)) || (vv.color && name.includes(vv.color)));
          if (v) v.stock = Math.max(0, (v.stock ?? 0) - item.quantity);
        }
      }
    } catch (e) {
      // swallow errors to avoid retries storms in this demo
    }
  }

  return NextResponse.json({ received: true });
}
