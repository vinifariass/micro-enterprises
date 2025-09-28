export const metadata = {
  title: "Mapa | Micro Enterprises",
};

import Client from "./Client";

export default function MapPage() {
  // Render client-only map via a wrapper to keep this page a Server Component
  return <Client />;
}
