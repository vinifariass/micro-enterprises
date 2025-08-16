import BackToTemplates from "@/components/BackToTemplates";
import ProductsTable from "@/app/templates/ecommerce2/admin/view";

export const metadata = {
  title: "E-commerce 2.0 — Admin",
  description: "Tabela de produtos no estilo Shadcn UI kit.",
};

export default function AdminPage() {
  return (
    <div>
      <BackToTemplates />
      <ProductsTable />
    </div>
  );
}
