'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  tag?: string;
  date: string;
};

const INITIAL: Post[] = [
  { id: 'p1', title: 'Lançamento: novo smartphone dobrável chega ao Brasil', excerpt: 'Tela maior, preço salgado e bateria otimizada.', tag: 'Tecnologia', date: '2025-08-01' },
  { id: 'p2', title: 'Reforma tributária: o que muda para o consumidor', excerpt: 'Entenda impactos no preço de serviços e produtos.', tag: 'Economia', date: '2025-07-20' },
  { id: 'p3', title: 'Streaming esportivo bate recorde de audiência', excerpt: 'Novos acordos e produções originais em alta.', tag: 'Entretenimento', date: '2025-07-11' },
];

export default function NewsblogView() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [draft, setDraft] = useState({ title: '', excerpt: '', tag: '' });

  useEffect(() => {
    const data = localStorage.getItem('newsblog-posts');
    setPosts(data ? JSON.parse(data) : INITIAL);
  }, []);
  useEffect(() => {
    if (posts.length) localStorage.setItem('newsblog-posts', JSON.stringify(posts));
  }, [posts]);

  const filtered = useMemo(() => posts.filter((p) => !filter || p.tag?.toLowerCase() === filter.toLowerCase()), [posts, filter]);

  const addPost = () => {
    if (!draft.title.trim() || !draft.excerpt.trim()) return;
    const np: Post = {
      id: `p${Date.now()}`,
      title: draft.title.trim(),
      excerpt: draft.excerpt.trim(),
      tag: draft.tag.trim() || undefined,
      date: new Date().toISOString().slice(0, 10),
    };
    setPosts((ps) => [np, ...ps]);
    setDraft({ title: '', excerpt: '', tag: '' });
  };

  return (
    <main className="bg-white">
      {/* Header bar with bold brand and sections */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/templates" className="font-extrabold tracking-widest text-green-700">HUFFNEWS</Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-700">
            <button onClick={() => setFilter('')}>Home</button>
            <button onClick={() => setFilter('Tecnologia')}>Tech</button>
            <button onClick={() => setFilter('Economia')}>Economia</button>
            <button onClick={() => setFilter('Entretenimento')}>Entretenimento</button>
          </nav>
        </div>
      </header>

      {/* Top stories rail */}
      <section className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-[11px] uppercase tracking-widest text-pink-600 font-extrabold">Top Stories</div>
          <div className="mt-3 grid md:grid-cols-4 gap-4">
            {posts.slice(0, 8).map((p) => (
              <a key={p.id} href="#" className="flex items-center gap-3 group">
                <div className="size-14 rounded bg-gray-200" />
                <div className="text-sm text-gray-900 group-hover:underline line-clamp-2">{p.title}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Big headline + feature grid */}
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <div className="aspect-[16/9] bg-gray-200 rounded" />
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">{filtered[0]?.title || 'Destaque principal'}</h1>
              <div className="text-sm text-gray-500">{filtered[0]?.date}{filtered[0]?.tag ? ` • ${filtered[0]?.tag}` : ''}</div>
              <p className="mt-2 text-gray-700">{filtered[0]?.excerpt || 'Resumo da matéria principal em destaque.'}</p>
            </div>
            <aside className="space-y-4">
              <div className="text-[11px] uppercase tracking-widest text-pink-600 font-extrabold">Trending</div>
              <div className="space-y-3">
                {posts.slice(1, 8).map((p) => (
                  <a key={p.id} href="#" className="flex items-center gap-3 group">
                    <div className="size-12 rounded bg-gray-200" />
                    <div className="text-sm text-gray-900 group-hover:underline line-clamp-2">{p.title}</div>
                  </a>
                ))}
              </div>
              <div className="rounded border p-3">
                <div className="text-sm font-semibold text-gray-900">Inscreva-se</div>
                <p className="text-xs text-gray-600">Receba notícias por e-mail.</p>
                <button className="mt-2 w-full px-3 py-2 rounded bg-green-700 text-white text-sm font-semibold">Assinar</button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Posts list */}
      <section className="py-6 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {filtered.slice(1).map((p) => (
                <article key={p.id} className="grid sm:grid-cols-[160px_1fr] gap-4 rounded border p-4">
                  <div className="aspect-video bg-gray-200 rounded" />
                  <div>
                    <div className="text-xs text-gray-500">{p.date}{p.tag ? ` • ${p.tag}` : ''}</div>
                    <h3 className="mt-1 text-xl font-bold text-gray-900">{p.title}</h3>
                    <p className="text-gray-700 mt-1">{p.excerpt}</p>
                    <a className="inline-block mt-2 text-green-700 text-sm font-semibold" href="#">Ler mais →</a>
                  </div>
                </article>
              ))}
            </div>
            <aside className="space-y-4">
              <div className="rounded border p-4">
                <div className="text-sm font-semibold text-gray-900">Mais lidas</div>
                <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                  {posts.slice(0, 5).map((p) => (
                    <li key={p.id}>{p.title}</li>
                  ))}
                </ul>
              </div>
              {/* Quick add post */}
              <div className="rounded border p-4 bg-gray-50">
                <div className="font-semibold text-gray-900">Adicionar post</div>
                <input className="mt-3 w-full border rounded px-3 py-2 text-sm" placeholder="Título" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                <input className="mt-2 w-full border rounded px-3 py-2 text-sm" placeholder="Resumo" value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
                <input className="mt-2 w-full border rounded px-3 py-2 text-sm" placeholder="Tag (ex: Tecnologia)" value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} />
                <button onClick={addPost} className="mt-3 w-full px-3 py-2 rounded bg-green-700 text-white text-sm font-semibold">Publicar</button>
                <p className="text-xs text-gray-500 mt-2">Salvo no seu navegador para o demo.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
