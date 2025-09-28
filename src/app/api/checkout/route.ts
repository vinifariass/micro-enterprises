import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/app/templates/ecommerce2/catalog";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
  }
  const stripe = new Stripe(secret);

  try {
    const { items, shippingAmount = 0, couponCode } = await req.json();
    if (!Array.isArray(items)) return NextResponse.json({ error: "Invalid items" }, { status: 400 });

    // Recompute line items server-side
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const it of items as Array<{ id: string; qty: number; sku?: string }>) {
      const p = PRODUCTS.find((x) => x.id === it.id);
      if (!p) continue;
      const v = p.variants?.find((vv) => vv.sku === it.sku);
      const unit = Math.round(((v?.priceOverride ?? p.price) || 0) * 100); // cents
      if (unit <= 0 || it.qty <= 0) continue;
      line_items.push({
        quantity: it.qty,
        price_data: {
          currency: "brl",
          unit_amount: unit,
          product_data: {
            name: p.name + (v?.size ? ` • ${v.size}` : "") + (v?.color ? ` • ${v.color}` : ""),
            metadata: { productId: p.id, sku: v?.sku ?? "" },
          },
        },
      });
    }
    if (shippingAmount && shippingAmount > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "brl",
          unit_amount: Math.round(shippingAmount * 100),
          product_data: { name: "Frete" },
        },
      });
    }
    if (line_items.length === 0) return NextResponse.json({ error: "No items" }, { status: 400 });

    const origin = req.headers.get("origin") || req.nextUrl.origin;
    // Try to apply a Stripe promotion code if couponCode provided
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
    if (couponCode) {
      try {
        const promos = await stripe.promotionCodes.list({ code: couponCode, active: true, limit: 1 });
        const promo = promos.data?.[0];
        if (promo) discounts = [{ promotion_code: promo.id }];
      } catch {}
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      discounts,
      // Optionally collect shipping address
      shipping_address_collection: { allowed_countries: ["BR"] },
      // Keep the coupon visible in metadata if present (not redeeming in Stripe by default)
      metadata: couponCode ? { couponCode } : undefined,
      success_url: `${origin}/thank-you`,
      cancel_url: `${origin}/templates/ecommerce2/cart`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Checkout error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
