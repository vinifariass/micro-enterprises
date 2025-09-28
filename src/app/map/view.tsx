"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";

// Default marker icons fix
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon as any;

export default function MapView() {
  const [query, setQuery] = React.useState("");
  const [center, setCenter] = React.useState<[number, number]>([-23.5505, -46.6333]);
  const [results, setResults] = React.useState<{ display_name: string; lat: string; lon: string }[]>([]);
  const mapRef = React.useRef<L.Map | null>(null);

  async function searchAddress(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const resp = await fetch(url, { headers: { "Accept-Language": "pt-BR" } });
    const data = await resp.json();
    setResults(data);
    if (data[0]) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setCenter([lat, lon]);
      mapRef.current?.setView([lat, lon], 14);
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form onSubmit={searchAddress} className="mx-auto max-w-2xl p-4 flex gap-2">
          <input
            className="flex-1 px-4 py-2 rounded-md border bg-background text-foreground outline-none focus:ring-2 ring-ring/40"
            placeholder="Buscar lugar, rua, bairro..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Buscar</button>
        </form>
      </div>

      <div className="h-[calc(100dvh-72px)]">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center as [number, number]}>
            <Popup>Centro</Popup>
          </Marker>
        </MapContainer>
      </div>

      {results.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[min(90vw,700px)] rounded-lg border bg-popover text-popover-foreground shadow p-3">
          <div className="max-h-60 overflow-auto space-y-1">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => {
                  const lat = parseFloat(r.lat);
                  const lon = parseFloat(r.lon);
                  setCenter([lat, lon]);
                  mapRef.current?.setView([lat, lon], 15);
                }}
                className="block w-full text-left rounded px-2 py-1 hover:bg-accent hover:text-accent-foreground"
              >
                {r.display_name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
