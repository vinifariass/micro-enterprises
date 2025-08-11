'use client'
"use client";

import { defaultBusinessConfig } from '@/config/business';
import { useEffect, useRef } from 'react';
import { gaViewPricing, gaBeginCheckout, gaWhatsApp } from '@/lib/analytics';

export default function Pricing() {
  const { pricing, whatsapp } = defaultBusinessConfig;
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gaViewPricing();
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const wa = (plan: string) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Olá! Quero o plano ${plan}.`
  )}`;

  return (
    <section ref={sectionRef} id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Planos e Preços</h2>
          <p className="text-gray-600 mt-3">Escolha o plano ideal para o seu momento</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {pricing.map((p) => (
            <div key={p.id} className={`rounded-2xl border ${p.highlight ? 'border-blue-600 shadow-xl' : 'border-gray-200 shadow'} p-6`}>
              {p.highlight && (
                <div className="inline-block px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full mb-4">Mais Vendido</div>
              )}
              <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
              <p className="text-3xl font-extrabold text-blue-600 mt-2">{p.priceMonthly}</p>
              <p className="text-gray-600 mt-2">{p.description}</p>
              <ul className="mt-4 space-y-2">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <a href={wa(p.name)} onClick={() => gaWhatsApp(`pricing_${p.id}`)} target="_blank" rel="noopener noreferrer" className={`inline-flex w-full items-center justify-center rounded-lg px-4 py-3 font-semibold ${p.highlight ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Falar no WhatsApp
                </a>
                {p.paymentLink && (
                  <a href={p.paymentLink} onClick={() => gaBeginCheckout(p.id)} target="_blank" rel="noopener noreferrer" className={`inline-flex w-full items-center justify-center rounded-lg px-4 py-3 font-semibold ${p.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-900 text-white hover:bg-black'}`}>
                    Comprar agora
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
