"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import type { Caretaker } from "./data";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconAnchor: [12, 41],
});

if (typeof window !== "undefined") {
  (L.Marker.prototype as unknown as { options: { icon: L.Icon } }).options.icon = DefaultIcon;
}

type LeafletMapProps = {
  caretakers: Caretaker[];
  center: [number, number];
  onSelectCaretaker: (id: string) => void;
};

export function LeafletMap({ caretakers, center, onSelectCaretaker }: LeafletMapProps) {
  useEffect(() => {
    return () => undefined;
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", borderRadius: "1.5rem" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {caretakers.map((caretaker) => (
        <Marker
          key={caretaker.id}
          position={[caretaker.latitude, caretaker.longitude]}
          eventHandlers={{ click: () => onSelectCaretaker(caretaker.id) }}
        >
          <Popup>
            <div className="space-y-1">
              <p className="text-sm font-semibold">{caretaker.name}</p>
              <p className="text-xs text-muted-foreground">R$ {caretaker.hourlyRate}/hora - {caretaker.rating.toFixed(1)}*</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

