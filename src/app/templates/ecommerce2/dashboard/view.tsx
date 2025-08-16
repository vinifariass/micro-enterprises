"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// NOTE: This is a static, Shadcn-like admin screen composed with Tailwind utility classes only.
// It mirrors the structure you provided: sidebar (collapsed on mobile), sticky header, cards, filters, and a products table.

function StatCard({ label, value, delta, deltaColor }: { label: string; value: string; delta: string; deltaColor: "green" | "red" }) {
  const color = deltaColor === "green" ? "text-green-600" : "text-red-600";
  return (
  <div className="bg-white text-gray-900 flex flex-col gap-6 rounded-xl border py-6">
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
        <div className="text-muted-foreground text-sm">{label}</div>
        <div className="font-semibold text-2xl lg:text-3xl">{value}</div>
        <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
          <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit`}> 
            <span className={color}>{delta}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

const rows = [
  { id: "p1", name: "New Balance 480 Brown", price: 349.9, sku: "NB480BR", stock: 5, rating: 4.9, status: "active", image: "/images/streetwear/nb-480-br.jpg", category: "Sneakers" },
  { id: "p2", name: "Vans Old Skool Black", price: 299.9, sku: "VANS-OS-BLK", stock: 25, rating: 4.65, status: "active", image: "/images/streetwear/vans-old-skool.jpg", category: "Sneakers" },
  { id: "p3", name: "Batman Graphic Tee", price: 129.9, sku: "TEE-BAT-01", stock: 0, rating: 4.65, status: "out of stock", image: "/images/streetwear/tee-batman.jpg", category: "Apparel" },
];

export default function DashboardView() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="group/sidebar-wrapper flex min-h-svh w-full bg-white text-gray-900">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:block w-64 border-r bg-gray-50 transition-[left,right,width] duration-200 ease-linear">
        <div className="h-14 flex items-center px-3 border-b">
          <Image alt="logo" src="/vercel.svg" width={24} height={24} className="rounded" />
          <span className="ml-2 font-semibold">Shadcn UI Kit</span>
        </div>
        <nav className="p-2 text-sm">
          <div className="px-2 text-gray-500 text-xs font-medium mt-3 mb-1">Dashboards</div>
          <ul className="space-y-1">
            <li>
              <Link className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100" href="#">Default</Link>
            </li>
            <li>
              <Link className="flex items-center gap-2 px-2 py-2 rounded bg-gray-100 font-medium" href="#">E-commerce</Link>
            </li>
            <li className="pt-2 border-t">
              <Link className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100" href="/templates/ecommerce2/products">Products</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile sidebar (drawer) */}
      <aside
        className={
          "md:hidden fixed inset-y-0 z-50 w-64 border-r bg-gray-50 shadow-lg transition-[left,right,width] duration-200 ease-linear " +
          (mobileOpen ? "left-0" : "-left-64")
        }
        aria-hidden={!mobileOpen}
      >
        <div className="h-14 flex items-center px-3 border-b">
          <button
            className="mr-2 size-9 rounded hover:bg-gray-100 grid place-items-center"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
          <Image alt="logo" src="/vercel.svg" width={24} height={24} className="rounded" />
          <span className="ml-2 font-semibold">Shadcn UI Kit</span>
        </div>
        <nav className="p-2 text-sm">
          <div className="px-2 text-gray-500 text-xs font-medium mt-3 mb-1">Dashboards</div>
          <ul className="space-y-1">
            <li>
              <Link className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100" href="#" onClick={() => setMobileOpen(false)}>Default</Link>
            </li>
            <li>
              <Link className="flex items-center gap-2 px-2 py-2 rounded bg-gray-100 font-medium" href="#" onClick={() => setMobileOpen(false)}>E-commerce</Link>
            </li>
            <li className="pt-2 border-t">
              <Link className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100" href="/templates/ecommerce2/products" onClick={() => setMobileOpen(false)}>Products</Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Backdrop */}
      <div
        className={
          "md:hidden fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ease-linear " +
          (mobileOpen ? "opacity-100" : "pointer-events-none opacity-0")
        }
        onClick={() => setMobileOpen(false)}
      />

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-50 h-14 border-b bg-white/70 backdrop-blur flex items-center px-4">
          <button
            className="md:hidden mr-2 size-9 rounded hover:bg-gray-100 grid place-items-center"
            aria-label="Abrir menu"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
          <div className="hidden lg:block max-w-sm w-full">
            <div className="relative">
              <input className="h-9 w-full rounded-md border pl-10 pr-3 text-sm" placeholder="Search..." />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="size-9 rounded hover:bg-gray-100 grid place-items-center" aria-label="notifications">🔔</button>
            <button className="size-9 rounded hover:bg-gray-100 grid place-items-center" aria-label="theme">🌞</button>
            <button className="size-9 rounded hover:bg-gray-100 grid place-items-center" aria-label="settings">⚙️</button>
            <Image alt="avatar" src="/next.svg" width={28} height={28} className="rounded-full" />
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <a className="inline-flex items-center gap-2 h-9 px-4 py-2 rounded-md bg-black text-white text-sm" href="#">Add Product</a>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Sales" value="$30,230" delta="+20.1%" deltaColor="green" />
            <StatCard label="Number of Sales" value="982" delta="+5.02" deltaColor="green" />
            <StatCard label="Affiliate" value="$4,530" delta="+3.1%" deltaColor="green" />
            <StatCard label="Discounts" value="$2,230" delta="-3.58%" deltaColor="red" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <input className="h-9 rounded-md border px-3 text-sm max-w-sm" placeholder="Search products..." />
            <div className="hidden md:flex gap-2">
              <button
                data-slot="popover-trigger"
                type="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
                aria-haspopup="dialog"
                aria-expanded="false"
                data-state="closed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
                Status
              </button>
              <button
                data-slot="popover-trigger"
                type="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
                aria-haspopup="dialog"
                aria-expanded="false"
                data-state="closed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
                Category
              </button>
              <button
                data-slot="popover-trigger"
                type="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
                aria-haspopup="dialog"
                aria-expanded="false"
                data-state="closed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
                Price
              </button>
            </div>
            <div className="md:hidden">
              <button className="size-9 rounded border grid place-items-center" aria-label="Filters">⎇</button>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="h-9 px-4 rounded border text-sm hidden lg:inline">Columns</button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b">
                  <th className="h-10 px-2 text-left font-medium w-8"><input type="checkbox" /></th>
                  <th className="h-10 px-2 text-left font-medium">Product Name</th>
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
                    <td className="p-2 align-middle"><input type="checkbox" /></td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <figure className="rounded-lg border overflow-hidden">
                          <Image alt={r.name} src={r.image} width={48} height={48} unoptimized />
                        </figure>
                        <div className="capitalize">{r.name}</div>
                      </div>
                    </td>
                    <td className="p-2 align-middle">${r.price.toFixed(2)}</td>
                    <td className="p-2 align-middle">{r.category}</td>
                    <td className="p-2 align-middle">{r.stock}</td>
                    <td className="p-2 align-middle">{r.sku}</td>
                    <td className="p-2 align-middle">
                      <div className="flex items-center gap-1">★ {r.rating.toFixed(2)}</div>
                    </td>
                    <td className="p-2 align-middle">
                      <span className={
                        "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium border capitalize " +
                        (r.status === "active"
                          ? "border-green-400 bg-green-50 text-green-800"
                          : r.status === "out of stock"
                          ? "border-orange-400 bg-orange-50 text-orange-800"
                          : "border-red-400 bg-red-50 text-red-800")
                      }>{r.status}</span>
                    </td>
                    <td className="p-2 align-middle">
                      <button className="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-gray-100">⋯</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button className="border rounded-md h-8 px-3 text-sm" disabled>Previous</button>
            <button className="border rounded-md h-8 px-3 text-sm">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}
