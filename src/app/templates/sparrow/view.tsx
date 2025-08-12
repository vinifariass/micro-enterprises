'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

function useReveal() {
  const refs = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const items = refs.current;
    if (!items?.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('in-view');
      });
    }, { threshold: 0.2 });
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return refs;
}

export default function SparrowView() {
  const revealRefs = useReveal();
  const setRef: (el: HTMLElement | null) => void = (el) => {
    if (!el) return;
    revealRefs.current.push(el);
  };

  const photos = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    color: i % 3 === 0 ? '#e5e7eb' : i % 3 === 1 ? '#dbeafe' : '#fee2e2',
  }));

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block text-xs uppercase tracking-wider text-blue-600 font-semibold fade-up">Portfólio</span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight fade-up" style={{ animationDelay: '80ms' }}>
                Fotografia Autoral e Comercial que conta histórias
              </h1>
              <p className="mt-4 text-gray-600 max-w-xl fade-up" style={{ animationDelay: '140ms' }}>
                Olá, sou Ana Souza, fotógrafa baseada em São Paulo. Retratos, editoriais e marcas.
              </p>
              <div className="mt-6 flex gap-3 fade-up" style={{ animationDelay: '200ms' }}>
                <a href="#galeria" className="px-5 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black">Ver Galeria</a>
                <a href="#sobre" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Sobre mim</a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border shadow-lg float-slow">
                {/* Portrait placeholder */}
                <svg viewBox="0 0 300 300" className="w-full h-full" aria-hidden>
                  <defs>
                    <linearGradient id="p" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#dbeafe" />
                      <stop offset="100%" stopColor="#e5e7eb" />
                    </linearGradient>
                  </defs>
                  <rect width="300" height="300" fill="url(#p)" />
                  <circle cx="150" cy="110" r="46" fill="#9ca3af" />
                  <rect x="76" y="168" width="148" height="86" rx="32" fill="#9ca3af" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={setRef} className="reveal">
            <h2 className="text-2xl font-bold text-gray-900">Galeria</h2>
            <p className="text-gray-600 mt-1">Seleção de trabalhos recentes.</p>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {photos.map((p, idx) => (
              <div
                key={p.id}
        ref={setRef}
                className="reveal rounded-xl border overflow-hidden group"
                style={{ transitionDelay: `${(idx % 6) * 40}ms` }}
              >
                <div className="aspect-[4/3]" style={{ background: p.color }} />
                <div className="p-3">
                  <div className="text-sm text-gray-500">Série {p.id}</div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Título do trabalho</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div ref={setRef} className="reveal">
                <h2 className="text-2xl font-bold text-gray-900">Sobre Ana</h2>
                <p className="text-gray-600 mt-3">
                  Trabalho com fotografia há 8 anos. Meu foco é capturar a essência das pessoas e marcas, criando imagens
                  que conectam e comunicam.
                </p>
                <div className="mt-4 text-sm text-gray-600">
                  • Retratos profissionais, editoriais e branding
                  <br />• Produção e direção de ensaios
                  <br />• Edição e tratamento com fluxo profissional
                </div>
              </div>
              <div ref={setRef} className="reveal mt-6">
                <a href="#contato" className="inline-block px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Solicitar orçamento</a>
              </div>
            </div>
            <div>
              <div ref={setRef} className="reveal rounded-2xl border overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={setRef} className="reveal">
            <h2 className="text-2xl font-bold text-gray-900">Depoimentos</h2>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {['Profissional incrível e atenciosa', 'A direção no ensaio fez toda diferença', 'Fotos que contam nossa história'].map((q, i) => (
        <div key={i} ref={setRef} className="reveal rounded-2xl border bg-white p-6">
                <p className="text-gray-700">“{q}.”</p>
                <div className="mt-3 text-sm text-gray-500">Cliente {i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div ref={setRef} className="reveal">
            <h2 className="text-3xl font-bold text-gray-900">Vamos fotografar?</h2>
            <p className="text-gray-600 mt-2">Envie sua ideia e receba um orçamento rápido.</p>
          </div>
          <div ref={setRef} className="reveal mt-6">
            <a href="#galeria" className="inline-block px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black">Ver galeria</a>
            <Link href="/" className="inline-block ml-3 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Voltar ao início</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
