import { Metadata } from "next";
import BackToTemplates from "@/components/BackToTemplates";
import { getProductById } from "../../streetwear/catalog";
import ProductDetail from "@/app/templates/ecommerce2/[id]/view";
import StorefrontChrome from "../StorefrontChrome";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProductById(id);
  return {
    title: p ? `${p.name} - E-commerce 2.0` : "Produto - E-commerce 2.0",
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProductById(id);
  if (!p)
    return (
      <StorefrontChrome>
        <BackToTemplates />
        <div className="container mx-auto p-6">Produto não encontrado.</div>
      </StorefrontChrome>
    );
  return (
    <StorefrontChrome>
      <BackToTemplates />
      <ProductDetail product={p} />
    </StorefrontChrome>
  );
}
