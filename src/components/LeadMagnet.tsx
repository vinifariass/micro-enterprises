'use client';

import { useState } from 'react';
import { gaSubscribe } from '@/lib/analytics';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, consent: true, source: 'lead-magnet' }),
      });
  if (!res.ok) throw new Error('Failed');
  setStatus('success');
  gaSubscribe(email);
      setEmail('');
      setName('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center">Baixe o Guia Grátis</h3>
          <p className="text-gray-600 text-center mt-2">Checklist prático para dobrar conversões do seu site</p>
          <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="sm:col-span-1 col-span-3 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="sm:col-span-1 col-span-3 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="sm:col-span-1 col-span-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold rounded-lg px-4 py-3"
            >
              {status === 'loading' ? 'Enviando…' : 'Quero o PDF'}
            </button>
          </form>
          {status === 'success' && (
            <div className="text-green-600 mt-3 text-sm text-center">Enviado! Verifique seu e-mail em instantes.</div>
          )}
          {status === 'error' && (
            <div className="text-red-600 mt-3 text-sm text-center">Erro ao enviar. Tente novamente.</div>
          )}
          <p className="text-xs text-gray-500 mt-4 text-center">Ao enviar, você concorda em receber conteúdos ocasionais. Sem spam.</p>
        </div>
      </div>
    </section>
  );
}
