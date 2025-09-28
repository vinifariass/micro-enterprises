import { CaretakerDetail } from "./view";
import { CARETAKERS } from "../data";

export function generateStaticParams() {
  return CARETAKERS.map((caretaker) => ({ id: caretaker.id }));
}

export const dynamicParams = false;

export const metadata = {
  title: "Detalhes do cuidador - PetCare",
};

export default function Page({ params }: { params: { id: string } }) {
  return <CaretakerDetail id={params.id} />;
}
