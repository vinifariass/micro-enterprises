"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { defaultBusinessConfig } from '@/config/business';

export default function PowitView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const brand = defaultBusinessConfig.name || 'Powit';
  const whatsappUrl = `https://wa.me/${defaultBusinessConfig.whatsapp}?text=Olá! Gostaria de mais informações.`;
  const sqRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sqRef.current) return;
    const el = sqRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('in-view');
        else el.classList.remove('in-view');
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 h-16 bg-white/90 backdrop-blur z-40 border-b">
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="text-2xl font-semibold text-gray-900">{brand}</a>
          <button
            aria-label="Abrir menu"
            className="md:hidden inline-flex flex-col gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`h-0.5 w-7 bg-gray-900 transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-7 bg-gray-900 transition ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-7 bg-gray-900 transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#work" className="hover:text-blue-600">Our work</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-white font-medium hover:bg-green-700">WhatsApp</a>
          </nav>
        </div>
      </header>

      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black/90 text-white transition-opacity ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="container mx-auto px-8 h-full flex flex-col justify-center">
          <a href="#services" className={`text-4xl font-bold mb-4 transition ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>Services</a>
          <a href="#work" className={`text-4xl font-bold mb-4 transition ${menuOpen ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-2 opacity-0'}`}>Our work</a>
          <a href="#contact" className={`text-4xl font-bold mb-10 transition ${menuOpen ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-2 opacity-0'}`}>Contact</a>
          <p className={`text-gray-400 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}>Copyright {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-white" />
        {/* shapes */}
  <div className="absolute left-4 top-8 size-24 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-400 shadow-[0_10px_30px_rgba(56,189,248,0.35)] animate-pulse anim-circle-blue" />
  <div className="absolute right-6 top-10 size-24 rotate-45 bg-gradient-to-br from-rose-600 to-fuchsia-500 shadow-[0_10px_30px_rgba(244,63,94,0.35)] anim-square-red" />
  <svg className="absolute -bottom-6 left-6 w-40 h-40 drop-shadow-[0_10px_30px_rgba(34,197,94,0.35)] anim-triangle-green" viewBox="0 0 100 100" aria-hidden>
          <polygon points="0,100 50,0 100,100" fill="url(#grad)" />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h6 className="uppercase tracking-wider text-gray-400 font-semibold">we do</h6>
          <h1 className="mt-2 text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">Web Design <br className="hidden sm:block" /> & Development</h1>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h6 className="uppercase tracking-wider text-gray-400 font-semibold">what we offer</h6>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">Our services</h2>
          <p className="text-gray-600 mt-4 max-w-3xl leading-8">I am developing these skills from when I was 12 years old. I still love what I do and I would love to share my knowledge with the world.</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {[{t:'Web Development',d:'I create websites and web services.'},{t:'Web Design',d:'I design webpages and web platforms.'},{t:'Branding',d:'I design brand guidelines and styles.'},{t:'Social Media Marketing',d:'I run a social media business.'}].map((c)=> (
              <div key={c.t} className="rounded-lg p-6 bg-gradient-to-br from-neutral-800 to-neutral-900 text-white shadow border border-black/10">
                <h3 className="text-lg font-semibold">{c.t}</h3>
                <p className="text-gray-300 mt-1">{c.d}</p>
              </div>
            ))}
          </div>

          <div ref={sqRef} className="absolute right-8 top-16 size-24 rotate-12 bg-gradient-to-br from-indigo-600 to-cyan-400 sq-blue" />
        </div>
      </section>

      {/* Work placeholder */}
      <section id="work" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Our work</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-white overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="p-4">
                  <div className="font-semibold text-gray-900">Project {i + 1}</div>
                  <div className="text-sm text-gray-600">Short description about the project.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Vamos construir algo incrível?</h2>
          <p className="text-gray-600 mt-2">Fale com nossa equipe e tenha um site profissional em poucos dias.</p>
          <div className="mt-6 flex justify-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">Chamar no WhatsApp</a>
            <Link href="/" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Voltar ao início</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
