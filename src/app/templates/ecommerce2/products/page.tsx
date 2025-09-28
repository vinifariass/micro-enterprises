import type { Metadata } from "next";
import ProductsView from ".";
import BackToTemplates from "@/components/BackToTemplates";
import StorefrontChrome from "../StorefrontChrome";

export const metadata: Metadata = {
  title: "E-commerce 2.0 - Products",
  description: "Lista de produtos com cards estilo Shadcn UI e seleção.",
};

export default function ProductsPage() {
  return (
    <StorefrontChrome>
      <BackToTemplates />
      <ProductsView />
    </StorefrontChrome>
  );
}
