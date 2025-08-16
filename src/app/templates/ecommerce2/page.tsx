import BackToTemplates from "@/components/BackToTemplates";
import Storefront from "./view";

export const metadata = {
  title: "E-commerce 2.0",
  description: "Storefront moderno baseado no Shadcn UI kit.",
};

export default function Page() {
  return (
    <div>
      <BackToTemplates />
      <Storefront />
    </div>
  );
}
