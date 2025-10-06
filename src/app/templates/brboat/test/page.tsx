export const metadata = {
  title: "MarAzul Teste de Reservas",
  description: "Versao resumida do template MarAzul focada em testar reservas com drawer lateral.",
};

import BackToTemplates from "@/components/BackToTemplates";
import BrBoatTestView from "./view";

export default function BrBoatTestPage() {
  return (
    <>
      <BackToTemplates />
      <BrBoatTestView />
    </>
  );
}
