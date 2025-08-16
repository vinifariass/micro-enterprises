import type { Metadata } from "next";
import { getProductById } from "../../catalog";
import ProductDetailView from "./view";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProductById(id);
  return {
    title: p ? `${p.name} — E-commerce 2.0` : "Produto — E-commerce 2.0",
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProductById(id);
  if (!p) return <div className="container mx-auto p-6">Produto não encontrado.</div>;
  return <ProductDetailView product={p} />;
}
