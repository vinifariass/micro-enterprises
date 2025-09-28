import { CaretakerDetail } from "./view";
import { CARETAKERS } from "../data";

export function generateStaticParams() {
  return CARETAKERS.map((caretaker) => ({ id: caretaker.id }));
}

export const dynamicParams = false;

export const metadata = {
  title: "Detalhes do cuidador - PetCare",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CaretakerDetail id={id} />;
}
