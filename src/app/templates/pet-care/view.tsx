"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CARETAKERS, type Caretaker } from "./data";
import { cn } from "@/lib/utils";
import { MapPin, Star, Filter, CalendarRange, Search } from "lucide-react";
import Link from "next/link";

const DynamicMap = dynamic(() => import("./LeafletMap").then((mod) => mod.LeafletMap), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-[320px] place-items-center rounded-3xl border border-slate-200 bg-slate-100 text-sm text-slate-500">
      Carregando mapa...
    </div>
  ),
});

function Text({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-relaxed text-slate-600", className)} {...props} />;
}

const PRICE_OPTIONS = [
  { label: "Todos os valores", value: "all" },
  { label: "Ate R$ 45/h", value: "budget" },
  { label: "R$ 46 a R$ 60/h", value: "standard" },
  { label: "Acima de R$ 60/h", value: "premium" },
];

type DateRangePickerProps = {
  value?: DateRange;
  onChange: (range?: DateRange) => void;
};

function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const displayValue = value?.from && value?.to
    ? `${format(value.from, "dd/MM/yyyy")} - ${format(value.to, "dd/MM/yyyy")}`
    : "Selecionar periodo";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between rounded-full border-slate-300 bg-white px-4 py-2 text-sm font-normal text-slate-700"
        >
          <span>{displayValue}</span>
          <CalendarRange className="size-4 text-slate-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={1}
          selected={value}
          onSelect={(range) => onChange(range)}
        />
        <div className="border-t border-slate-200 p-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-full"
            onClick={() => onChange(undefined)}
          >
            Limpar periodo
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function formatPriceLevel(level: Caretaker["priceLevel"]) {
  switch (level) {
    case "budget":
      return "Ate R$ 45/h";
    case "standard":
      return "R$ 46 a R$ 60/h";
    case "premium":
      return "Acima de R$ 60/h";
    default:
      return "Sob consulta";
  }
}

function RatingBadge({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
      <Star className="size-3" /> {rating.toFixed(1)}
    </span>
  );
}

function SelectField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <select
      className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-300"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {PRICE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default function PetCareView() {
  const [query, setQuery] = React.useState("");
  const [radius, setRadius] = React.useState<number>(5);
  const [priceFilter, setPriceFilter] = React.useState<string>("all");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [selectedCaretaker, setSelectedCaretaker] = React.useState<string | null>(null);

  const wantsWeekend = hasWeekend(dateRange);
  const wantsWeekday = hasWeekday(dateRange);

  const filteredCaretakers = useMemo(() => {
    return CARETAKERS.filter((caretaker) => {
      const matchesQuery = caretaker.name.toLowerCase().includes(query.toLowerCase()) ||
        caretaker.tags.some((tag) => tag.includes(query.toLowerCase()));
      const matchesDistance = caretaker.distanceKm <= radius;
      const matchesPrice =
        priceFilter === "all" ||
        caretaker.priceLevel === priceFilter;
      const matchesDate = !dateRange?.from || !dateRange?.to || caretakerMatchesAvailability(caretaker, wantsWeekend, wantsWeekday);
      return matchesQuery && matchesDistance && matchesPrice && matchesDate;
    });
  }, [query, radius, priceFilter, dateRange, wantsWeekend, wantsWeekday]);

  const center: [number, number] = [-23.5558, -46.6396];
  const activeCaretaker = filteredCaretakers.find((caretaker) => caretaker.id === selectedCaretaker) ?? filteredCaretakers[0] ?? null;
  const formattedRange = dateRange?.from && dateRange?.to
    ? `${format(dateRange.from, "dd/MM/yyyy")} ate ${format(dateRange.to, "dd/MM/yyyy")}`
    : null;

  return (
    <div className="space-y-16">
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-50">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <Filter className="size-3" /> Buscar cuidador
            </span>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Encontre o cuidador ideal para seu pet</h1>
            <Text className="max-w-xl">
              Filtre por bairro, raio, periodo e faixa de preco. Visualize cuidadores em um mapa interativo e confira os detalhes antes de reservar.
            </Text>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Localizacao</label>
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Digite bairro, rua ou servico"
                  className="w-full rounded-full border-slate-300 px-5 py-3 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Raio (km)</label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <Slider
                    value={radius}
                    max={10}
                    min={1}
                    step={0.5}
                    onValueChange={(v) => setRadius(v)}
                  />
                  <p className="mt-3 text-sm font-medium text-slate-700">Ate {radius.toFixed(1)} km de distancia</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Periodo</label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <DateRangePicker value={dateRange} onChange={setDateRange} />
                  <p className="mt-3 text-xs text-slate-500">Escolha inicio e fim para priorizar quem atende nos dias desejados.</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Faixa de preco</label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <SelectField value={priceFilter} onChange={setPriceFilter} />
                  <p className="mt-3 text-xs text-slate-500">Valores por hora de hospedagem ou passeio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="min-h-[360px] rounded-3xl border border-slate-200 bg-white/70 p-3">
            <DynamicMap caretakers={filteredCaretakers} center={center} onSelectCaretaker={setSelectedCaretaker} />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Resumo selecionado</h2>
            {activeCaretaker ? (
              <Card className="border-slate-200 bg-white/90">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 size-4 text-slate-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{activeCaretaker.name}</h3>
                      <Text className="text-slate-500">{activeCaretaker.description}</Text>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="rounded-full border border-slate-300 px-3 py-1">R$ {activeCaretaker.hourlyRate}/hora</span>
                    <RatingBadge rating={activeCaretaker.rating} />
                    <span className="rounded-full border border-slate-300 px-3 py-1">{formatPriceLevel(activeCaretaker.priceLevel)}</span>
                    <span className="rounded-full border border-slate-300 px-3 py-1">{activeCaretaker.distanceKm.toFixed(1)} km</span>
                  </div>
                  <Button asChild className="rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800">
                    <Link href={`/templates/pet-care/${activeCaretaker.id}`}>Ver detalhes</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-500">
                Ajuste os filtros ou busque por um bairro para ver cuidadores disponiveis.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Cuidadores proximos</h2>
              <Text>Resultados ordenados por avaliacao e distancia. Clique para abrir a pagina completa do cuidador.</Text>
            </div>
            <div className="flex flex-col items-end gap-1 text-xs text-slate-500">
              <span className="rounded-full border border-slate-300 bg-white px-4 py-1 font-semibold uppercase tracking-[0.3em] text-slate-500">
                {filteredCaretakers.length} encontrados
              </span>
              {formattedRange && <span>{formattedRange}</span>}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCaretakers.map((caretaker) => (
              <Card key={caretaker.id} className="flex flex-col overflow-hidden border-slate-200 bg-white/90">
                <div className="relative h-48 w-full">
                  <img src={caretaker.photo} alt={caretaker.name} className="h-full w-full object-cover" />
                </div>
                <CardContent className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{caretaker.name}</h3>
                      <Text className="mt-1 text-slate-600">{caretaker.description}</Text>
                    </div>
                    <RatingBadge rating={caretaker.rating} />
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="rounded-full border border-slate-300 px-3 py-1">R$ {caretaker.hourlyRate}/hora</span>
                    <span className="rounded-full border border-slate-300 px-3 py-1">{caretaker.distanceKm.toFixed(1)} km</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                    <span>{caretaker.totalReviews} avaliacoes</span>
                    <Button size="sm" className="rounded-full bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800" asChild>
                      <Link href={`/templates/pet-care/${caretaker.id}`}>Ver detalhes</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function hasWeekend(range?: DateRange) {
  if (!range?.from || !range?.to) return false;
  const start = new Date(range.from.getFullYear(), range.from.getMonth(), range.from.getDate());
  const end = new Date(range.to.getFullYear(), range.to.getMonth(), range.to.getDate());
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const day = date.getDay();
    if (day === 0 || day === 6) return true;
  }
  return false;
}

function hasWeekday(range?: DateRange) {
  if (!range?.from || !range?.to) return false;
  const start = new Date(range.from.getFullYear(), range.from.getMonth(), range.from.getDate());
  const end = new Date(range.to.getFullYear(), range.to.getMonth(), range.to.getDate());
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const day = date.getDay();
    if (day >= 1 && day <= 5) return true;
  }
  return false;
}

function caretakerMatchesAvailability(caretaker: Caretaker, wantsWeekend: boolean, wantsWeekday: boolean) {
  if (!wantsWeekend && !wantsWeekday) return true;
  const tokens = caretaker.availability.join(" ").toLowerCase();
  if (wantsWeekend && !(tokens.includes("final") || tokens.includes("sab") || tokens.includes("dom") || tokens.includes("plantao"))) {
    return false;
  }
  if (wantsWeekday && !(tokens.includes("seg") || tokens.includes("todos") || tokens.includes("plantao"))) {
    return false;
  }
  return true;
}



