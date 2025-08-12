import { Metadata } from 'next';
import BackToTemplates from '@/components/BackToTemplates';
import { getProductById } from '../catalog';
import ProductDetail from './view';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getProductById(id);
  return {
    title: p ? `${p.name} — Streetwear Shop` : 'Produto — Streetwear Shop',
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProductById(id);
  if (!p) return <div className="container mx-auto p-6">Produto não encontrado.</div>;
  return (
    <div>
      <BackToTemplates />
      <ProductDetail product={p} />
    </div>
  );
}
