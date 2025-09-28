import BackToTemplates from "@/components/BackToTemplates";
import StorefrontChrome from "./StorefrontChrome";
import Storefront from "./view";

export const metadata = {
  title: "E-commerce 2.0",
  description: "Storefront moderno baseado no Shadcn UI kit.",
};

export default function Page() {
  return (
    <StorefrontChrome>
      <BackToTemplates />
      <Storefront />
    </StorefrontChrome>
  );
}
