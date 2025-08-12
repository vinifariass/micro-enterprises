export const metadata = { title: 'Sparrow – Table of Contents' };
import Link from 'next/link';
import BackToTemplates from '@/components/BackToTemplates';

export default function TableOfContents() {
  return (
    <main className="bg-white text-neutral-900 min-h-[100dvh]">
      <BackToTemplates />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 min-h-[100dvh] flex items-center">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border bg-neutral-100">
              <div className="aspect-[4/3]" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">Table of Contents.</h1>
            <div className="mt-6 p-4 rounded-2xl border bg-neutral-50 text-neutral-900">
              <ol className="list-decimal ml-6 leading-8">
                <li><Link className="underline text-neutral-900" href="/templates/sparrow/vibrant">Vibrant Solutions</Link></li>
                <li><Link className="underline text-neutral-900" href="/templates/sparrow/organic">Organic Essence</Link></li>
                <li><Link className="underline text-neutral-900" href="/templates/sparrow/timeless">Timeless Elegance</Link></li>
                <li><Link className="underline text-neutral-900" href="/templates/sparrow/urban">Urban Wanderlust</Link></li>
                <li><Link className="underline text-neutral-900" href="/templates/sparrow/artisanal">Artisanal Flavors</Link></li>
                <li><Link className="underline text-neutral-900" href="/templates/sparrow/contact">Get in touch</Link></li>
              </ol>
            </div>
            <div className="mt-6 flex gap-3 text-sm">
              <Link href="/templates/sparrow" className="px-4 py-2 rounded-full border text-neutral-900">← Intro</Link>
              <Link href="/templates/sparrow/vibrant" className="px-4 py-2 rounded-full border text-neutral-900">Próximo →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
