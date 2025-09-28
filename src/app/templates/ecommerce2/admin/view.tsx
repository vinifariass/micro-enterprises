"use client";

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "../catalog";

const ROWS = PRODUCTS.map((product, index) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  sku: `SKU${(1000 + index).toString()}`,
  stock: (index * 7) % 32,
  status: index % 4 === 0 ? "Esgotado" : index % 5 === 0 ? "Pausado" : "Ativo",
  image: product.image,
  category: /tee/i.test(product.name) ? "Apparel" : "Sneakers",
  rating: 4.6,
}));

const STATUS_STYLES: Record<string, string> = {
  Ativo: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Esgotado: "border-amber-200 bg-amber-50 text-amber-700",
  Pausado: "border-gray-200 bg-gray-50 text-gray-600",
};

export default function ProductsTable() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Catálogo de produtos</h1>
          <p className="text-xs text-gray-500">Gerencie estoque, preços e status antes de publicar novos drops.</p>
        </div>
        <Link
          href="/templates/ecommerce2/admin/new"
          className="inline-flex items-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
        >
          Novo produto
        </Link>
      </header>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-gray-50/80 text-left text-xs uppercase tracking-[0.2em] text-gray-500">
            <tr>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Estoque</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ROWS.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/80">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {row.image && (
                      <figure className="size-12 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                        <Image src={row.image} alt={row.name} width={96} height={96} className="h-full w-full object-cover" />
                      </figure>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{row.name}</p>
                      <p className="text-xs text-gray-500">Rating {row.rating.toFixed(1)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 font-medium text-gray-900">R$ {row.price.toFixed(2)}</td>
                <td className="px-4 py-4 text-gray-700">{row.category}</td>
                <td className="px-4 py-4 text-gray-700">{row.stock}</td>
                <td className="px-4 py-4 text-gray-700">{row.sku}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 transition hover:border-black hover:text-black">
                      Editar
                    </button>
                    <button className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:border-red-400">
                      Arquivar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

