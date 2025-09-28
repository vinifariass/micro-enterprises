export const metadata = {
  title: "Mapa | Micro Enterprises",
};

export default function MapPage() {
  // Render client-only map via a wrapper to keep this page a Server Component
  const Client = require("./Client").default;
  return <Client />;
}
