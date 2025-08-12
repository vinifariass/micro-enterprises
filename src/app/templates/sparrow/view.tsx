'use client';
import Link from 'next/link';

export default function SparrowView() {
  return (
    <main className="bg-white text-neutral-900 min-h-[100dvh]">
      <section className="relative min-h-[100dvh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-xs">Portfolio</span>
              <h1 className="mt-4 text-[40px] sm:text-[56px] leading-[1.05] font-extrabold tracking-tight text-black">Matthew<br />Farrell</h1>
              <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full border text-xs text-neutral-800">Brand Identity Design</div>
              <div className="mt-8">
                <Link href="/templates/sparrow/table" className="inline-flex items-center px-4 py-2 rounded-full border text-sm hover:bg-neutral-50 text-neutral-900">Table of Contents ↗</Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border bg-gradient-to-br from-neutral-50 to-neutral-200">
                <div className="aspect-[4/3]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
