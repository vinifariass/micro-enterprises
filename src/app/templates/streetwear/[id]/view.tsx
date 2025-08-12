'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '../catalog';

const SIZES = ['P','M','G','GG','GGG'];

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>('P');
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  // total price could be used later; keeping it simple for now

  const isShoe = /adidas|vans|nb-480/.test(product.id);
  const gallery = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li>/</li>
            <li><a href="#" className="hover:underline">Roupas</a></li>
            <li>/</li>
            <li className="text-gray-700">Camisetas</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* gallery */}
          <div>
            <div className="grid grid-cols-6 gap-4">
              {/* thumbs (desktop) */}
              <div className="hidden lg:flex lg:flex-col gap-3 col-span-1">
                {gallery.map((src, i) => (
                  <button key={src} onClick={() => setActive(i)} className={"relative aspect-square rounded border overflow-hidden bg-white " + (active===i ? 'ring-2 ring-black' : '')}>
                    <Image src={src} alt={product.name} fill sizes="120px" className="object-contain p-2" />
                  </button>
                ))}
              </div>
              {/* main image */}
              <div className="col-span-6 lg:col-span-5">
                <div className={(isShoe ? 'aspect-[4/3]' : 'aspect-[1]') + ' bg-white rounded-lg overflow-hidden border grid place-items-center'}>
                  {gallery[active] && (
                    <Image
                      src={gallery[active]}
                      alt={product.name}
                      width={isShoe ? 1200 : 1000}
                      height={isShoe ? 900 : 1000}
                      className={'w-full h-full ' + (isShoe ? 'object-contain p-6' : 'object-contain p-6')}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* thumbs (mobile) */}
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2 lg:hidden">
                {gallery.map((src, i) => (
                  <button key={src} onClick={() => setActive(i)} className={"relative aspect-square rounded border overflow-hidden bg-white " + (active===i ? 'ring-2 ring-black' : '')}>
                    <Image src={src} alt={product.name} fill sizes="100px" className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{product.name}</h1>
            <div className="mt-2 text-xl font-bold">R$ {product.price.toFixed(2)}</div>
            {/* rating placeholder */}
            <div className="mt-1 text-sm text-gray-500">★★★★★ <span className="align-middle">(2 avaliações)</span></div>

            {/* color placeholder (single) */}
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-gray-500">Cor</div>
              <div className="mt-2 inline-flex items-center gap-3">
                <span className="inline-block size-6 rounded-full border bg-white" title="Cor única" />
              </div>
            </div>

            {/* sizes */}
            <div className="mt-6">
              <div className="flex items-center gap-3 text-sm">
                <div className="text-xs uppercase tracking-widest text-gray-500">Tamanho</div>
                <a className="underline text-gray-600" href="#">Tabela de medidas</a>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {SIZES.map((s)=> (
                  <button key={s} onClick={()=>setSize(s)} className={(size===s? 'bg-black text-white ' : '') + 'px-3 py-2 rounded-full border text-sm'}>{s}</button>
                ))}
              </div>
            </div>

            {/* qty */}
            <div className="mt-6 flex items-center gap-3">
              <div className="text-xs uppercase tracking-widest text-gray-500">Quantidade</div>
              <div className="inline-flex items-center border rounded-lg">
                <button onClick={()=>setQty(Math.max(1, qty-1))} className="px-3 py-2">-</button>
                <div className="w-10 text-center">{qty}</div>
                <button onClick={()=>setQty(qty+1)} className="px-3 py-2">+</button>
              </div>
            </div>

            {/* add to bag */}
            <button className="mt-6 w-full h-12 rounded-full bg-black text-white font-semibold text-sm">ADICIONAR À SACOLA</button>

            {/* shipping calc placeholder */}
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-gray-500">Calcular frete</div>
              <div className="mt-2 flex gap-2">
                <input placeholder="00000-000" className="flex-1 border rounded-lg px-3 py-2" />
                <button className="px-4 rounded-lg border">OK</button>
              </div>
            </div>

            {/* description tabs placeholder */}
            <div className="mt-8">
              <div className="flex gap-6 text-sm border-b">
                <button className="py-3 border-b-2 border-black font-semibold">DESCRIÇÃO</button>
                <button className="py-3 text-gray-500">COMPOSIÇÃO</button>
                <button className="py-3 text-gray-500">TABELA DE MEDIDAS</button>
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Peça inspirada em streetwear com caimento confortável. Imagens meramente ilustrativas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
