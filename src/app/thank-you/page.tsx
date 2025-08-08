"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { gaEvent } from '@/lib/analytics';

export default function ThankYouPage() {
  useEffect(() => {
    gaEvent('purchase', {
      value: 1,
      currency: 'BRL',
      method: 'external_link',
    });
  }, []);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold text-gray-900">Obrigado pela compra!</h1>
        <p className="text-gray-600 mt-3">Seu pedido foi recebido. Em breve entraremos em contato por WhatsApp/E-mail.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link href="/" className="px-5 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black">Voltar para o início</Link>
          <Link href="#contact" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Falar com atendimento</Link>
        </div>
      </div>
    </main>
  );
}
