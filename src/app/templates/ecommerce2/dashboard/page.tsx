import type { Metadata } from "next";
import DashboardView from "./view";

export const metadata: Metadata = {
  title: "E-commerce 2.0 — Dashboard Products",
  description: "Tela administrativa com sidebar, cards e tabela de produtos (estilo Shadcn UI).",
};

export default function DashboardPage() {
  return <DashboardView />;
}
