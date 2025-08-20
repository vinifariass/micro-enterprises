"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Search, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type * as LType from "leaflet";
import { stores, type Store } from "@/app/data/stores";
import Image from "next/image";

// Store type is imported from shared data

type Suggestion = {
  id: string;
  title: string;
  subtitle?: string;
  lat?: number;
  lng?: number;
  kind: "recent" | "nearby" | "city";
  emoji?: string;
};

// Stores imported from shared data

function buildWhatsAppLink(s: Store) {
  const num = s.whatsapp || "";
  const text = encodeURIComponent(`Olá! Encontrei a loja "${s.name}" e gostaria de falar com você.`);
  return num ? `https://wa.me/${num}?text=${text}` : `https://wa.me/?text=${text}`;
}

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371; // km
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const sinDlat = Math.sin(dLat / 2);
  const sinDlon = Math.sin(dLon / 2);
  const aHarv = sinDlat * sinDlat + Math.cos(lat1) * Math.cos(lat2) * sinDlon * sinDlon;
  const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
  return R * c;
}

function chipClass(active: boolean) {
  void active; // reference to satisfy no-unused-vars
  return "chip";
}

export default function StoreLocatorView() {
  const router = useRouter();
  const [center, setCenter] = React.useState<{ lat: number; lng: number }>({ lat: -23.5617, lng: -46.655 });
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<Store["category"] | "all">("all");
  const [radiusKm, setRadiusKm] = React.useState<number>(10);
  const [activeStore, setActiveStore] = React.useState<Store | null>(null);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [recent, setRecent] = React.useState<Suggestion[]>([]);

  const mapRef = React.useRef<LType.Map | null>(null);
  const markersLayerRef = React.useRef<LType.LayerGroup | null>(null);
  const [boundsKey, setBoundsKey] = React.useState<string>("");
  const leafletRef = React.useRef<typeof import("leaflet") | null>(null);

  // Airbnb-like base suggestions
  const baseSuggestions: Suggestion[] = React.useMemo(
    () => [
      { id: "nearby", title: "Perto de você", subtitle: "Descubra o que há perto de você", kind: "nearby", emoji: "📍" },
      { id: "sp", title: "São Paulo, Estado de São Paulo", subtitle: "Por atrações como Parque Ibirapuera", lat: -23.5505, lng: -46.6333, kind: "city", emoji: "🏙️" },
      { id: "arraial", title: "Arraial do Cabo, Rio de Janeiro", subtitle: "Ideal para viagens no fim de semana", lat: -22.966, lng: -42.0279, kind: "city", emoji: "🏖️" },
      { id: "cabofrio", title: "Cabo Frio, Rio de Janeiro", subtitle: "Destino popular por suas praias", lat: -22.879, lng: -42.019, kind: "city", emoji: "🌊" },
      { id: "buzios", title: "Armação dos Búzios, Rio de Janeiro", subtitle: "Viagens no fim de semana", lat: -22.746, lng: -41.887, kind: "city", emoji: "🏝️" },
    ],
    []
  );

  // Load recent from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("locator_recent");
      if (raw) setRecent(JSON.parse(raw));
    } catch {}
  }, []);
  const saveRecent = React.useCallback((s: Suggestion) => {
    const entry: Suggestion = { ...s, kind: "recent" };
    const next = [entry, ...recent.filter((r) => r.title !== s.title)].slice(0, 5);
    setRecent(next);
    try { localStorage.setItem("locator_recent", JSON.stringify(next)); } catch {}
  }, [recent]);

  // Init map
  React.useEffect(() => {
    if (mapRef.current) return;
    let canceled = false;
    (async () => {
      const leaflet = (await import("leaflet")).default;
      if (canceled) return;
      leafletRef.current = (await import("leaflet")).default;
      const map = leaflet.map("store-map", { zoomControl: false }).setView([center.lat, center.lng], 14);
      mapRef.current = map;

      leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      leaflet.control.zoom({ position: "bottomright" }).addTo(map);

      const updateBounds = () => {
        const b = map.getBounds();
        setBoundsKey(`${b.getSouth()}_${b.getWest()}_${b.getNorth()}_${b.getEast()}`);
        const c = map.getCenter();
        setCenter({ lat: c.lat, lng: c.lng });
      };
      map.on("moveend", updateBounds);
      updateBounds();
    })();
    return () => { canceled = true; };
  }, [center.lat, center.lng]);

  // Re-render markers when inputs change
  React.useEffect(() => {
    if (!mapRef.current || !leafletRef.current) return;

    if (markersLayerRef.current) markersLayerRef.current.remove();
    const layer = leafletRef.current.layerGroup();
    markersLayerRef.current = layer;

    const iconByCategory = (cat: Store["category"]) => {
      const emoji = { fashion: "👕", electronics: "📱", groceries: "🛒", home: "🏠", sports: "🏃" }[cat];
      return leafletRef.current!.divIcon({
        className: "",
        html: `<div style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:var(--card);border:1px solid var(--border);box-shadow:0 1px 4px rgba(0,0,0,.15);font-size:16px;">${emoji}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
    };

    const b = mapRef.current.getBounds();

    stores.forEach((s) => {
      const inView = b.contains([s.lat, s.lng]);
      const withinRadius = distanceKm(center, { lat: s.lat, lng: s.lng }) <= radiusKm;
      const eligible = inView && withinRadius && (category === "all" || s.category === category) && (!query || (`${s.name} ${s.tags.join(" ")} ${s.address}`.toLowerCase().includes(query.toLowerCase())));
      if (!eligible) return;
      const marker = leafletRef.current!.marker([s.lat, s.lng], { icon: iconByCategory(s.category) });
      marker.on("click", () => {
        router.push(`/store/${s.id}`);
      });
      marker.addTo(layer);
    });

    layer.addTo(mapRef.current);
  }, [boundsKey, category, query, center, radiusKm, router]);

  const goToMyLocation = React.useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setCenter(c);
      if (mapRef.current) mapRef.current.setView([c.lat, c.lng], 14);
    });
  }, []);

  const results = React.useMemo(() => {
    let list = stores.map((s) => ({ store: s, km: distanceKm(center, { lat: s.lat, lng: s.lng }) }));
    if (mapRef.current) {
      const b = mapRef.current.getBounds();
      list = list.filter(({ store }) => b.contains([store.lat, store.lng]));
    }
    list = list.filter(({ store }) => distanceKm(center, { lat: store.lat, lng: store.lng }) <= radiusKm);
    if (category !== "all") list = list.filter(({ store }) => store.category === category);
    if (query) list = list.filter(({ store }) => (`${store.name} ${store.tags.join(" ")} ${store.address}`.toLowerCase().includes(query.toLowerCase())));
    return list.sort((a, b) => a.km - b.km);
  }, [category, query, center, radiusKm]);

  const onPickSuggestion = React.useCallback((s: Suggestion) => {
    setShowSuggestions(false);
    if (s.id === "nearby") {
      // call the stable callback; not a hook, just a memoized function
      goToMyLocation();
      return;
    }
    if (s.lat && s.lng) {
      setCenter({ lat: s.lat, lng: s.lng });
      if (mapRef.current) mapRef.current.setView([s.lat, s.lng], 13);
      saveRecent(s);
    }
  }, [saveRecent, goToMyLocation]);

  React.useEffect(() => {
    const onDocPointerDown = (e: PointerEvent) => {
      const container = document.getElementById("searchbar-container");
      if (!container) return;
      if (!container.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSuggestions(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="flex-1">
      {/* Top search bar with suggestions */}
  <div className="sticky top-0 z-[1200] p-3 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto max-w-5xl relative" id="searchbar-container">
          <div className="searchbar">
            <Search className="size-4 text-muted-foreground" />
            <input
              placeholder="Buscar destinos, lojas, endereço..."
              value={query}
              onChange={(e) => { setQuery((e.target as HTMLInputElement).value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
            />
            <div className="hidden md:flex items-center gap-2">
              {(["all", "fashion", "electronics", "groceries", "home", "sports"] as const).map((c) => (
                <button key={c} className={chipClass(category === c)} data-active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 pl-2 ml-2 border-l">
              <Button variant="outline" size="sm" onClick={goToMyLocation}><Navigation className="mr-2 size-4" />Minha localização</Button>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Raio</span>
                <select className="rounded-md border bg-background px-2 py-1 text-xs" value={radiusKm}
                  onChange={(e) => setRadiusKm(Number((e.target as HTMLSelectElement).value))}>
                  <option value={2}>2 km</option>
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={20}>20 km</option>
                </select>
              </div>
            </div>
          </div>

          {showSuggestions && (
            <div className="suggestions-panel absolute left-0 right-0 mt-2 rounded-2xl border bg-card text-card-foreground shadow-xl overflow-hidden z-[1300]">
              <div className="max-h-[60vh] overflow-auto p-2">
                {recent.length > 0 && (
                  <div className="px-3 py-2">
                    <div className="mb-2 text-xs font-medium text-muted-foreground">Buscas recentes</div>
                    <div className="space-y-1">
                      {recent.map((s) => (
                        <button key={s.id + s.title} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground" onClick={() => onPickSuggestion(s)}>
                          <div className="inline-flex size-8 items-center justify-center rounded-lg border bg-background">📍</div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{s.title}</div>
                            {s.subtitle && <div className="truncate text-xs text-muted-foreground">{s.subtitle}</div>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-3 py-2">
                  <div className="mb-2 text-xs font-medium text-muted-foreground">Destinos sugeridos</div>
                  <div className="space-y-1">
                    {baseSuggestions.map((s) => (
                      <button key={s.id} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground" onClick={() => onPickSuggestion(s)}>
                        <div className="inline-flex size-8 items-center justify-center rounded-lg border bg-background">{s.emoji ?? "📌"}</div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{s.title}</div>
                          {s.subtitle && <div className="truncate text-xs text-muted-foreground">{s.subtitle}</div>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map + Desktop list */}
      <div className="mx-auto grid max-w-6xl md:grid-cols-12 gap-3 p-3">
        <Card className="map-container relative md:col-span-8 h-[60vh] md:h-[70vh]">
          <div id="store-map" className="map-root rounded-xl" />

          {activeStore && (
            <div className="popup-card-enter popup-card-enter-active absolute left-3 bottom-3 right-3 md:left-3 md:right-auto md:max-w-sm z-20">
              <Card className="p-4 shadow-xl">
                <div className="flex items-start gap-4">
                  {activeStore.image && (
                    <Image src={activeStore.image} alt={activeStore.name} width={80} height={80} className="w-20 h-20 object-cover rounded-lg border" />
                  )}
                  <div className="flex-1">
                    <div className="text-base font-semibold">{activeStore.name}</div>
                    <div className="text-xs text-muted-foreground">{activeStore.address}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="secondary">{activeStore.category}</Badge>
                      {activeStore.tags.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${activeStore.lat},${activeStore.lng}`, "_blank")}> <MapPin className="mr-2 size-4" /> Rotas</Button>
                  <Button size="sm">Ver detalhes</Button>
                  <Button variant="default" size="sm" onClick={() => window.open(buildWhatsAppLink(activeStore), "_blank")}> <MessageCircle className="mr-2 size-4" /> Contato</Button>
                  <Button variant="ghost" size="sm" onClick={() => setActiveStore(null)}>Fechar</Button>
                </div>
              </Card>
            </div>
          )}
        </Card>
        {/* Desktop side list */}
        <div className="hidden md:block md:col-span-4">
          <Card className="p-3 h-[70vh] overflow-auto">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-medium">Lojas nesta área</div>
              <div className="text-xs text-muted-foreground">{results.length} resultados</div>
            </div>
            <div className="space-y-2">
              {results.map(({ store, km }) => (
                <Card key={store.id} className="p-3">
                  <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3">
                    {store.image && (
                      <Image src={store.image} alt={store.name} width={56} height={56} className="w-14 h-14 object-cover rounded-md border" />
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{store.name}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{store.address}</div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        <Badge variant="secondary">{store.category}</Badge>
                        {store.tags.slice(0, 2).map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xs font-medium whitespace-nowrap">{km.toFixed(1)} km</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="shrink-0" onClick={() => window.open(buildWhatsAppLink(store), "_blank")}>
                          <MessageCircle className="mr-1 size-3" /> Contato
                        </Button>
                        <Button size="sm" className="shrink-0" onClick={() => router.push(`/store/${store.id}`)}>Mais detalhes</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {results.length === 0 && (
                <Card className="p-6 text-center text-sm text-muted-foreground">Sem lojas nesta área.</Card>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile bottom sheet results */}
      <div className="md:hidden">
        <div className="bottom-sheet p-2">
          <div className="bottom-sheet__grabber" />
          <div className="max-h-[40vh] overflow-auto space-y-2 p-2">
            {results.map(({ store, km }) => (
              <Card key={store.id} className="p-3" onClick={() => { setActiveStore(store); if (mapRef.current) mapRef.current.setView([store.lat, store.lng], 16); }}>
                <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3">
                  {store.image && (
                    <Image src={store.image} alt={store.name} width={48} height={48} className="w-12 h-12 object-cover rounded-md border" />
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{store.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{store.address}</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      <Badge variant="secondary">{store.category}</Badge>
                      {store.tags.slice(0, 2).map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-xs font-medium whitespace-nowrap">{km.toFixed(1)} km</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="shrink-0" onClick={(e) => { e.stopPropagation(); window.open(buildWhatsAppLink(store), "_blank"); }}>
                        <MessageCircle className="mr-1 size-3" /> Contato
                      </Button>
                      <Button size="sm" className="shrink-0" onClick={(e) => { e.stopPropagation(); router.push(`/store/${store.id}`); }}>Mais detalhes</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {results.length === 0 && (
              <Card className="p-6 text-center text-sm text-muted-foreground">Sem lojas nesta área.</Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
