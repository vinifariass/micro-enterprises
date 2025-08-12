'use client';

type Film = { client: string; title: string; kind: string };

const FILMS: Film[] = [
  { client: 'FARFETCH', title: 'FARFETCH X NTS', kind: 'MUSIC VIDEO' },
  { client: 'DOG HOLIDAY RECORDS', title: 'CLUB KURU · RIBBONS', kind: 'MUSIC VIDEO' },
  { client: 'ESCENTRIC MOLECULES', title: 'EM05 · GEZA SCHÖN', kind: 'DOCUMENTARY' },
  { client: 'NINJA TUNE', title: 'JAYDA G · BOTH OF US', kind: 'MUSIC VIDEO' },
  { client: 'UNIVERSAL RECORDS', title: 'IN YOUR HANDS', kind: 'MUSIC VIDEO' },
  { client: 'GRADE ARMADA', title: 'REUNION TOUR', kind: 'TOUR VISUALS' },
];

export default function VideomakerView() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-0 lg:h-screen lg:pr-16 lg:flex lg:flex-col lg:justify-center">
            <header>
              <div className="text-2xl font-serif">l.aragao</div>
              <div className="text-xs text-gray-400">(Leonardo Aragao)</div>
            </header>
            <nav className="mt-8 space-y-2 text-sm">
              <a href="#films" aria-current="page" className="block text-[#ffc93a]">films</a>
              <a href="#stills" className="block text-gray-300 hover:text-white">stills</a>
              <a href="#info" className="block text-gray-300 hover:text-white">info</a>
              <a href="#contact" className="block text-gray-300 hover:text-white">contact</a>
            </nav>
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
              <a href="#" aria-label="Vimeo" className="hover:text-white">
                {/* Vimeo icon */}
                <svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor" aria-hidden="true"><path d="M17.97 3.75c-.08 1.79-1.3 4.25-3.67 7.37-2.44 3.26-4.51 4.88-6.2 4.88-1.05 0-1.94-.99-2.66-2.97-.48-1.82-.97-3.64-1.45-5.45C3.43 3.6 2.85 2.6 2.23 2.6c-.13 0-.6.29-1.41.87L-.03 2.35C.86 1.55 1.73.75 2.6 0 3.79-1.05 4.67-1.6 5.26-1.66 6.66-1.8 7.52-.82 7.84 1.28c.35 2.26.6 3.68.73 4.23.4 1.88.85 2.82 1.33 2.82.38 0 .94-.61 1.7-1.83.75-1.22 1.16-2.15 1.21-2.79.1-1.05-.3-1.58-1.21-1.58-.43 0-.87.1-1.33.3C12.18-.9 13.86-2.34 16.35-2.26c1.85.06 2.72 1.29 2.61 3.68z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                {/* Instagram icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.45c2.14 0 2.39.01 3.23.05.78.04 1.2.17 1.49.28.37.15.64.32.92.6.28.28.45.55.6.92.11.28.24.71.28 1.49.04.85.05 1.1.05 3.23s-.01 2.39-.05 3.23c-.04.78-.17 1.2-.28 1.49-.15.37-.32.64-.6.92-.28.28-.55.45-.92.6-.28.11-.71.24-1.49.28-.85.04-1.1.05-3.23.05s-2.39-.01-3.23-.05c-.78-.04-1.2-.17-1.49-.28-.37-.15-.64-.32-.92-.6-.28-.28-.45-.55-.6-.92-.11-.28-.24-.71-.28-1.49C1.46 10.4 1.45 10.15 1.45 8s.01-2.39.05-3.23c.04-.78.17-1.2.28-1.49.15-.37.32-.64.6-.92.28-.28.55-.45.92-.6.28-.11.71-.24 1.49-.28C5.61 1.46 5.86 1.45 8 1.45zm0 2.43A3.12 3.12 0 1 0 8 10.12 3.12 3.12 0 0 0 8 3.88zm4.19-.16a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z"/></svg>
              </a>
            </div>
          </aside>

          {/* Films grid */}
          <section id="films" className="lg:col-span-9">
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
              {FILMS.map((f, i) => (
                <article key={i} className="group">
                  <div className="aspect-[16/9] bg-white/5 rounded overflow-hidden ring-1 ring-white/10" />
                  <div className="mt-2 text-[10px] tracking-widest text-amber-400 uppercase">{f.client}</div>
                  <h3 className="mt-1 font-semibold uppercase">{f.title}</h3>
                  <div className="text-[10px] tracking-widest text-gray-400 uppercase">{f.kind}</div>
                </article>
              ))}
            </div>

            {/* Stills placeholder */}
            <div id="stills" className="mt-16 grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 rounded" />
              ))}
            </div>

            {/* Info + Contact */}
            <div id="info" className="mt-16 grid md:grid-cols-2 gap-10">
              <div>
                <h4 className="font-semibold">Info</h4>
                <p className="mt-2 text-sm text-gray-300">Diretor e editor baseado em SP. Trabalho com videoclipes, comerciais e conteúdo autoral.</p>
              </div>
              <div id="contact">
                <h4 className="font-semibold">Contato</h4>
                <p className="mt-2 text-sm text-gray-300">contato@laragao.com</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
