export const metadata = { title: 'Sparrow – Vibrant Solutions' };
import Link from 'next/link';
import BackToTemplates from '@/components/BackToTemplates';

export default function Vibrant() {
  return (
    <main className="bg-white text-neutral-900 min-h-[100dvh]">
      <BackToTemplates />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[100dvh] flex items-center">
        <div className="rounded-3xl border bg-gradient-to-b from-white to-neutral-50 p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-black">Vibrant-Solutions.</h1>
              <span className="mt-2 inline-flex px-3 py-1 rounded-full bg-black text-white text-xs">Brand Identity Design</span>
              <div className="mt-4 p-4 rounded-2xl bg-neutral-100/70 border text-sm text-neutral-700">
                <div className="font-semibold mb-1">Description</div>
                We created a vibrant and dynamic brand identity for TechnoTech Inc., incorporating bold colors and modern typography. The logo represents innovation and technological advancement, aligning with the company&#39;s cutting-edge solutions.
              </div>
              <div className="mt-4">
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm hover:bg-neutral-50" href="#">Design Process ↗</a>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border bg-neutral-100"><div className="aspect-[16/9] md:aspect-[4/3]" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden border bg-neutral-100"><div className="aspect-[4/3]" /></div>
                <div className="rounded-2xl overflow-hidden border bg-neutral-100"><div className="aspect-[4/3]" /></div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 text-xs md:text-sm text-neutral-600">
            <div>
              <div className="uppercase tracking-wider">Client</div>
              <div className="font-semibold text-neutral-800">TechnoTech Inc.</div>
            </div>
            <div />
            <div className="text-right">
              <div className="uppercase tracking-wider">Date</div>
              <div className="font-semibold text-neutral-800">01.01.2022</div>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-sm">
            <Link href="/templates/sparrow/table" className="px-4 py-2 rounded-full border">← Conteúdo</Link>
            <Link href="/templates/sparrow/organic" className="px-4 py-2 rounded-full border">Próximo →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
