import dynamic from "next/dynamic";

export const metadata = {
  title: "Mapa | Micro Enterprises",
};

export default function MapPage() {
  const MapClient = dynamic(() => import("./view"), { ssr: false });
  return <MapClient />;
}
