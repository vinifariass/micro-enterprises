import type { Metadata } from "next";
import ProductsView from ".";

export const metadata: Metadata = {
  title: "E-commerce 2.0 — Products",
  description: "Lista de produtos com cards estilo Shadcn UI e seleção.",
};

export default function ProductsPage() {
  return <ProductsView />;
}
