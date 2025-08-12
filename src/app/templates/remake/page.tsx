export const metadata = {
  title: 'Remake (inspirado)',
};

import Link from 'next/link';
import BackToTemplates from '@/components/BackToTemplates';

export default function RemakeTemplate() {
  return (
    <main className="min-h-[60vh] bg-white">
      <BackToTemplates />
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs uppercase tracking-wider text-blue-600 font-semibold">Template</span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">Mostre seu trabalho com um portfólio elegante</h1>
              <p className="mt-4 text-gray-600 max-w-xl">Hero visual, seções de destaque para projetos, depoimentos e CTA de contato. Inspirado no estilo do Remake, porém 100% reimplementado com Tailwind.</p>
              <div className="mt-6 flex gap-3">
                <a href="#projects" className="px-5 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black">Ver Projetos</a>
                <a href="#contact" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Fale conosco</a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gray-100 border" />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Projetos</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border overflow-hidden group">
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Projeto {i + 1}</h3>
                  <p className="text-sm text-gray-600 mt-1">Descrição breve do projeto com foco nos resultados e tecnologias.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Depoimentos</h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {['Excelente trabalho', 'Profissional e ágil', 'Visual incrível'].map((q, i) => (
              <div key={i} className="rounded-xl border p-6 bg-white">
                <p className="text-gray-700">“{q}.”</p>
                <div className="mt-3 text-sm text-gray-500">Cliente {i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Pronto para começar?</h2>
          <p className="text-gray-600 mt-2">Entre em contato e vamos construir seu portfólio de alto impacto.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Voltar ao início</Link>
        </div>
      </section>
    </main>
  );
}
