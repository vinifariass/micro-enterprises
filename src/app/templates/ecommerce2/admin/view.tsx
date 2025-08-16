"use client";

import Image from "next/image";
import { PRODUCTS } from "../catalog";

const rows = PRODUCTS.map((p, i) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  sku: ("SKU" + (1000 + i)).toUpperCase(),
  stock: (i * 7) % 30,
  rating: 4.6,
  status: (i % 3 === 0 ? "out of stock" : i % 5 === 0 ? "closed for sale" : "active") as
    | "active"
    | "out of stock"
    | "closed for sale",
  image: p.image,
  category: /tee/i.test(p.name) ? "Apparel" : "Electronics",
}));

export default function ProductsTable() {
  return (
    <main className="bg-white text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <a
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-black text-white shadow-xs hover:bg-black/90 h-9 px-4 py-2"
            href="#"
          >
            Add Product
          </a>
        </div>

        <div className="rounded-lg border mt-6 overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-10 px-2 text-left font-medium">Name</th>
                <th className="h-10 px-2 text-left font-medium">Price</th>
                <th className="h-10 px-2 text-left font-medium">Category</th>
                <th className="h-10 px-2 text-left font-medium">Stock</th>
                <th className="h-10 px-2 text-left font-medium">SKU</th>
                <th className="h-10 px-2 text-left font-medium">Rating</th>
                <th className="h-10 px-2 text-left font-medium">Status</th>
                <th className="h-10 px-2 text-left font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {r.image && (
                        <figure className="rounded border overflow-hidden">
                          <Image alt={r.name} src={r.image} width={48} height={48} />
                        </figure>
                      )}
                      <div className="capitalize">{r.name}</div>
                    </div>
                  </td>
                  <td className="p-2 align-middle">${"" + r.price.toFixed(2)}</td>
                  <td className="p-2 align-middle">{r.category}</td>
                  <td className="p-2 align-middle">{r.stock}</td>
                  <td className="p-2 align-middle">{r.sku}</td>
                  <td className="p-2 align-middle">
                    <div className="flex items-center gap-1">★ {r.rating.toFixed(2)}</div>
                  </td>
                  <td className="p-2 align-middle">
                    <span
                      className={
                        "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium border capitalize " +
                        (r.status === "active"
                          ? "border-green-400 bg-green-50 text-green-800"
                          : r.status === "out of stock"
                          ? "border-orange-400 bg-orange-50 text-orange-800"
                          : "border-red-400 bg-red-50 text-red-800")
                      }
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-2 align-middle">
                    <button className="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-gray-100">
                      ⋯
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button className="border rounded-md h-8 px-3 text-sm" disabled>
            Previous
          </button>
          <button className="border rounded-md h-8 px-3 text-sm">Next</button>
        </div>
      </div>
    </main>
  );
}
