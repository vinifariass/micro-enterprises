"use client";

import Image from "next/image";
import { useState } from "react";
import { CreditCard, Minus, Package, Plus, Shield, Trash2, Truck } from "lucide-react";
import { useCart } from "../CartContext";
import { PRODUCTS } from "../catalog";
import { useToast } from "../Toast";
import StorefrontChrome from "../StorefrontChrome";

export default function Page() {
  const { items, add, dec, remove, totals, applyCoupon, coupon } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shipping = items.length > 0 ? 5.99 : 0;
  const finalTotal = totals.total + shipping;

  const handleApplyCoupon = () => {
    const applied = applyCoupon(promoCode);
    setPromoFeedback(
      applied ? `Cupom ${promoCode.toUpperCase()} aplicado` : "Cupom inválido ou inelegível"
    );
  };

  async function handleCheckout() {
    if (items.length === 0) return;
    try {
      setIsCheckingOut(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shippingAmount: shipping, couponCode: coupon?.code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout error");
      if (data?.url) window.location.href = data.url as string;
    } catch (error) {
      console.error(error);
      toast({ title: "Não foi possível iniciar o checkout", description: "Verifique as credenciais da Stripe" });
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <StorefrontChrome>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h1 className="text-2xl font-semibold">Sua sacola</h1>
              <p className="text-sm text-muted-foreground">
                {items.length} item{items.length !== 1 ? "s" : ""} na sacola
              </p>
            </div>

            <div className="space-y-4">
              {items.map((cartItem) => {
                const product = PRODUCTS.find((p) => p.id === cartItem.id)!;
                const variant = product.variants?.find((v) => v.sku === cartItem.sku);
                const unitPrice = variant?.priceOverride ?? product.price;
                const maxStock = variant?.stock ?? null;

                return (
                  <div
                    key={`${cartItem.id}:${cartItem.sku ?? ""}`}
                    className="flex flex-col gap-6 overflow-hidden rounded-xl border bg-white shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-auto w-full bg-gray-50 md:w-32">
                        {product.image && (
                          <Image
                            alt={product.name}
                            width={500}
                            height={500}
                            src={product.image}
                            className="h-full w-full object-cover md:w-32"
                          />
                        )}
                      </div>
                      <div className="flex-1 p-6 pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">
                              {variant ? (
                                <>
                                  SKU {variant.sku}
                                  {variant.size ? ` · Tamanho ${variant.size}` : ""}
                                  {variant.color ? ` · ${variant.color}` : ""}
                                </>
                              ) : (
                                "SKU padrão"
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => remove(cartItem.id, cartItem.sku)}
                            className="inline-flex size-9 items-center justify-center rounded-md text-sm hover:bg-gray-100"
                            aria-label="Remover item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => dec(cartItem.id, cartItem.sku)}
                              className="inline-flex size-9 items-center justify-center rounded-md border bg-white text-sm shadow-xs transition-colors hover:bg-gray-100"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{cartItem.qty}</span>
                            <button
                              onClick={() => add(cartItem.id, 1, cartItem.sku)}
                              disabled={maxStock !== null && cartItem.qty >= maxStock}
                              className="inline-flex size-9 items-center justify-center rounded-md border bg-white text-sm shadow-xs transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-right text-sm font-semibold text-gray-900">
                            R$ {(unitPrice * cartItem.qty).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {items.length === 0 && (
                <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
                  Sua sacola está vazia. Explore a coleção para adicionar produtos.
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Resumo</h2>
              <p className="text-sm text-muted-foreground">
                Calcule descontos e finalize com Stripe quando estiver pronto.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground" htmlFor="promo">
                Cupom ou gift card
              </label>
              <div className="flex gap-2">
                <input
                  id="promo"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                  placeholder="DIGITE SEU CUPOM"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="inline-flex h-9 items-center justify-center rounded-md border bg-white px-4 text-sm font-medium transition-colors hover:bg-gray-100"
                >
                  Aplicar
                </button>
              </div>
              {promoFeedback && (
                <p className={`text-xs ${coupon ? "text-emerald-600" : "text-red-500"}`}>{promoFeedback}</p>
              )}
              {coupon && (
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Cupom ativo: <span className="font-medium">{coupon.code}</span>
                  </span>
                  <button
                    onClick={() => {
                      setPromoCode("");
                      applyCoupon("");
                      setPromoFeedback(null);
                    }}
                    className="underline hover:no-underline"
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between"><span>Subtotal</span><span>R$ {totals.subtotal.toFixed(2)}</span></div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Descontos{totals.appliedCoupon ? ` (${totals.appliedCoupon})` : ""}</span>
                  <span>- R$ {totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between"><span>Envio estimado</span><span>R$ {shipping.toFixed(2)}</span></div>
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>R$ {finalTotal.toFixed(2)}</span></div>
            </div>

            <div className="space-y-3 border-t pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Package className="h-4 w-4 text-primary" /><span>Troca fácil em até 30 dias</span></div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /><span>Pagamento seguro</span></div>
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /><span>Envio rápido para todo o Brasil</span></div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || items.length === 0}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
            >
              <CreditCard className="h-4 w-4" />
              {isCheckingOut ? "Conectando com Stripe…" : "Pagamento seguro"}
            </button>
            {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
              <p className="text-xs text-muted-foreground">
                Configure as chaves da Stripe em <code>.env.local</code> para ativar o checkout.
              </p>
            )}
          </aside>
        </div>
      </main>
    </StorefrontChrome>
  );
}

