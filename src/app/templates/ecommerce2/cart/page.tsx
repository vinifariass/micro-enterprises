"use client";

import Image from "next/image";
import { useCart } from "../CartContext";
import { PRODUCTS } from "../catalog";
import { CreditCard, Minus, Package, Plus, Shield, Trash2, Truck } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { items, add, dec, remove, totals, applyCoupon, coupon } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  const shipping = items.length > 0 ? 5.99 : 0;
  const finalTotal = totals.total + shipping;

  return (
    <main className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
          </div>

          <div className="space-y-4">
            {items.map((it) => {
              const p = PRODUCTS.find((x) => x.id === it.id)!;
              const v = p.variants?.find((vv) => vv.sku === it.sku);
              const unitPrice = (v?.priceOverride ?? p.price);
              return (
                <div key={`${it.id}:${it.sku ?? ""}`} data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm overflow-hidden p-0">
                  <div data-slot="card-content" className="p-0">
                    <div className="flex h-full flex-col md:flex-row">
                      <div className="relative h-auto w-full md:w-32">
                        {p.image && (
                          <Image alt={p.name} width={500} height={500} className="h-full w-full object-cover md:w-32" src={p.image} />
                        )}
                      </div>
                      <div className="flex-1 p-6 pb-3">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{p.name}</h3>
                            {v ? (
                              <p className="text-muted-foreground text-sm">SKU: {v.sku}{v.size ? ` • Size ${v.size}` : ""}{v.color ? ` • ${v.color}` : ""}</p>
                            ) : (
                              <p className="text-muted-foreground text-sm">Standard</p>
                            )}
                          </div>
                          <button onClick={() => remove(it.id, it.sku)} data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={() => dec(it.id, it.sku)} data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center">{it.qty}</span>
                            <button onClick={() => add(it.id, 1, it.sku)} data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${(unitPrice * it.qty).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
            <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
              <div data-slot="card-title" className="leading-none font-semibold">Order Summary</div>
              <div data-slot="card-description" className="text-muted-foreground text-sm">Review your order details and shipping information</div>
            </div>
            <div data-slot="card-content" className="px-6 space-y-6">
              <div className="space-y-2">
                <label data-slot="label" className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">Shipping Method</label>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex flex-col text-start">
                    <div className="font-medium">Standard Shipping</div>
                    <div className="text-muted-foreground text-sm">3-5 days</div>
                    <div className="font-medium">$5.99</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label data-slot="label" className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    data-slot="input"
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    placeholder="Enter promo code"
                  />
                  <button
                    onClick={() => {
                      const ok = applyCoupon(promoCode);
                      setPromoFeedback(ok ? `Applied ${promoCode.toUpperCase()}` : "Invalid or ineligible code");
                    }}
                    data-slot="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
                  >
                    Apply
                  </button>
                </div>
                {promoFeedback && (
                  <p className={`text-xs ${coupon ? "text-green-600" : "text-red-600"}`}>{promoFeedback}</p>
                )}
                {coupon && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Applied: <span className="font-medium">{coupon.code}</span></span>
                    <button
                      onClick={() => {
                        setPromoCode("");
                        applyCoupon("");
                        setPromoFeedback(null);
                      }}
                      className="underline hover:no-underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600"><span>Discount{totals.appliedCoupon ? ` (${totals.appliedCoupon})` : ""}</span><span>- ${totals.discount.toFixed(2)}</span></div>
                )}
                <div className="flex justify-between text-sm"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between font-medium"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2 text-sm"><Package className="text-primary h-4 w-4" /><span>Free returns within 30 days</span></div>
                <div className="flex items-center gap-2 text-sm"><Shield className="text-primary h-4 w-4" /><span>Secure payment</span></div>
                <div className="flex items-center gap-2 text-sm"><Truck className="text-primary h-4 w-4" /><span>Fast delivery</span></div>
              </div>

              <button data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
