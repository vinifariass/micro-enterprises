"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoatContactForm } from "@/components/landing/BoatContactForm";
import { cn } from "@/lib/utils";
import {
  Anchor,
  ArrowUp,
  ArrowUpRight,
  CalendarClock,
  ChevronDown,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Waves,
} from "lucide-react";

type CharterOption = {
  id: string;
  name: string;
  category: string;
  tag: string;
  experienceType: "sunset" | "corporate" | "celebration" | "family";
  image: string;
  pricePerHour: number;
  priceLabel: string;
  capacity: number;
  durationHours: number;
  durationLabel: string;
  route: string[];
  amenities: string[];
  description: string;
  rating: number;
  ratingCount: number;
  isPopular?: boolean;
  availableToday?: boolean;
};

type CartItem = {
  id: string;
  name: string;
  pricePerHour: number;
  priceLabel: string;
  durationLabel: string;
  route: string[];
  quantity: number;
};

type FilterState = {
  capacity: string;
  duration: string;
  experience: string;
  price: string;
  sort: string;
};

type FilterOption = {
  value: string;
  label: string;
  chip: string;
  description?: string;
};
const charterOptions: CharterOption[] = [
  {
    id: "aurora-sunset",
    name: "Aurora 48 Sunset Lounge",
    category: "Lifestyle & Sunset",
    tag: "Experiencia",
    experienceType: "sunset",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 3200,
    priceLabel: "R$ 3.200 / hora",
    capacity: 12,
    durationHours: 4,
    durationLabel: "4 horas",
    route: ["Marina da Gloria", "Ilhas Tijucas", "Pao de Acucar"],
    amenities: [
      "DJ opcional a bordo",
      "Bar de espumantes premium",
      "Stand up paddle para 2 convidados",
      "Registro fotografico",
    ],
    description: "Sunset lounge com mixologia autoral, playlist exclusiva e concierge dedicado para brindar o fim de tarde.",
    rating: 4.9,
    ratingCount: 128,
    isPopular: true,
    availableToday: true,
  },
  {
    id: "elysium-day",
    name: "Elysium 60 Day Charter",
    category: "Corporate & Premium",
    tag: "Corporativo",
    experienceType: "corporate",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 5200,
    priceLabel: "R$ 5.200 / hora",
    capacity: 18,
    durationHours: 6,
    durationLabel: "6 horas",
    route: ["Paraty", "Lagoa Azul", "Praia da Lula"],
    amenities: [
      "Mesa posta gourmet",
      "Equipamentos de snorkel",
      "Traslado black car opcional",
      "Salao climatizado",
    ],
    description: "Day charter de seis horas com gastronomia autoral, briefing corporativo e suporte tecnico multimidia.",
    rating: 4.8,
    ratingCount: 94,
    isPopular: true,
    availableToday: true,
  },
  {
    id: "solstice-celebration",
    name: "Solstice 68 Celebration",
    category: "Celebracao",
    tag: "Mais reservado",
    experienceType: "celebration",
    image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 6800,
    priceLabel: "R$ 6.800 / hora",
    capacity: 26,
    durationHours: 8,
    durationLabel: "8 horas",
    route: ["Marina da Gloria", "Ilhas Cagarras", "Niteroi"],
    amenities: [
      "DJ residente BRBoat",
      "Iluminacao cenario premium",
      "Jacuzzi climatizada",
      "Mixologista exclusivo",
    ],
    description: "Iate festa com oito horas de navegacao, roteiros cinematograficos e todos os diferenciais para grandes celebracoes.",
    rating: 4.9,
    ratingCount: 152,
    isPopular: true,
    availableToday: false,
  },
  {
    id: "odyssey-business",
    name: "Odyssey 50 Business Suite",
    category: "Corporate & Premium",
    tag: "Reunioes",
    experienceType: "corporate",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 4500,
    priceLabel: "R$ 4.500 / hora",
    capacity: 14,
    durationHours: 5,
    durationLabel: "5 horas",
    route: ["Ilhabela", "Praia do Jabaquara", "Enseada das Pedras"],
    amenities: [
      "Sala de reunioes climatizada",
      "Streaming de apresentacoes",
      "Chef executivo a bordo",
      "Equipe bilingue",
    ],
    description: "Sessao executiva com estrutura de sala privada, catering sob medida e roteiros para fortalecer negocios.",
    rating: 4.7,
    ratingCount: 76,
    isPopular: false,
    availableToday: true,
  },
  {
    id: "marisma-family",
    name: "Marisma 44 Family Escape",
    category: "Family & Leisure",
    tag: "Familia",
    experienceType: "family",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 2800,
    priceLabel: "R$ 2.800 / hora",
    capacity: 10,
    durationHours: 4,
    durationLabel: "4 horas",
    route: ["Angra dos Reis", "Ilha Cataguas", "Praia do Dentista"],
    amenities: [
      "Brinquedos aquaticos para criancas",
      "Menu kids assinado",
      "Cabines equipadas com streaming",
      "Time de apoio fotografico",
    ],
    description: "Passeio familiar com foco em conforto, roteiro seguro para todas as idades e amenidades pensadas para criancas.",
    rating: 4.6,
    ratingCount: 63,
    isPopular: false,
    availableToday: true,
  },
];

const charterOrder = charterOptions.reduce<Record<string, number>>((acc, option, index) => {
  acc[option.id] = index;
  return acc;
}, {});

const capacityOptions: FilterOption[] = [
  { value: "all", label: "Qualquer capacidade", chip: "Capacidade" },
  { value: "up-to-10", label: "Ate 10 convidados", chip: "Ate 10" },
  { value: "up-to-18", label: "Ate 18 convidados", chip: "Ate 18" },
  { value: "over-18", label: "20+ convidados", chip: "20+" },
];

const durationOptions: FilterOption[] = [
  { value: "all", label: "Qualquer duracao", chip: "Duracao" },
  { value: "up-to-4", label: "Ate 4 horas", chip: "Ate 4h" },
  { value: "up-to-6", label: "Ate 6 horas", chip: "Ate 6h" },
  { value: "over-6", label: "8+ horas", chip: "8h+" },
];

const experienceOptions: FilterOption[] = [
  { value: "all", label: "Todas as experiencias", chip: "Experiencia" },
  { value: "sunset", label: "Sunset & lifestyle", chip: "Sunset" },
  { value: "corporate", label: "Corporativo & eventos", chip: "Corporativo" },
  { value: "celebration", label: "Celebracoes & festas", chip: "Celebracao" },
  { value: "family", label: "Familia & passeios", chip: "Familia" },
];

const priceOptions: FilterOption[] = [
  { value: "all", label: "Qualquer faixa de preco", chip: "Investimento" },
  { value: "up-to-4000", label: "Ate R$ 4.000 / hora", chip: "Ate 4k" },
  { value: "4000-6000", label: "Entre R$ 4k e R$ 6k", chip: "4k-6k" },
  { value: "over-6000", label: "Acima de R$ 6k", chip: "6k+" },
];

const sortOptions: FilterOption[] = [
  { value: "relevance", label: "Relevancia BRBoat", chip: "Relevancia" },
  { value: "price-asc", label: "Menor preco primeiro", chip: "Menor preco" },
  { value: "price-desc", label: "Maior preco primeiro", chip: "Maior preco" },
  { value: "capacity-desc", label: "Maior capacidade primeiro", chip: "Capacidade" },
  { value: "rating-desc", label: "Melhor avaliacao", chip: "Avaliacoes" },
];

const defaultFilters: FilterState = {
  capacity: "all",
  duration: "all",
  experience: "all",
  price: "all",
  sort: "relevance",
};

const heroHighlights = [
  {
    title: "Horarios flexiveis",
    description: "Personalize janelas de embarque e desembarque com concierge 24h.",
    icon: CalendarClock,
  },
  {
    title: "Experiencias assinadas",
    description: "Sunsets, eventos corporativos e celebracoes cinematograficas.",
    icon: Sparkles,
  },
  {
    title: "Operacao certificada",
    description: "Tripulacao homologada, seguro integral e monitoramento meteorologico.",
    icon: ShieldCheck,
  },
] as const;

const trustSignals = [
  {
    title: "Resposta em ate 1h",
    description: "Concierge premium com sugestoes personalizadas e disponibilidade real.",
    icon: CalendarClock,
  },
  {
    title: "Operacao certificada",
    description: "Tripulacao licenciada, briefing de seguranca e seguro viagem completo.",
    icon: ShieldCheck,
  },
  {
    title: "Satisfacao 4.9/5",
    description: "Mais de 320 eventos em lanchas BRBoat com NPS elevado.",
    icon: Waves,
  },
] as const;

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
type FilterMenuProps = {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
};

function FilterMenu({ label, options, value, onChange }: FilterMenuProps) {
  const selected = options.find((option) => option.value === value) ?? options[0];
  const base = options[0];
  const isActive = selected.value !== base.value;

  return (
    <div className="relative inline-flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "h-11 rounded-full border border-slate-200/70 bg-white px-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50",
              isActive && "border-slate-900/20 bg-slate-100 text-slate-900 shadow-sm"
            )}
          >
            <span>{isActive ? `${label}: ${selected.chip}` : label}</span>
            <ChevronDown className="size-4 text-slate-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="left-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white/95 p-2 text-slate-900 shadow-xl backdrop-blur">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</div>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex flex-col rounded-xl px-3 py-2 text-sm text-slate-600 transition",
                value === option.value ? "bg-slate-100 text-slate-900" : "hover:bg-slate-100/80 hover:text-slate-900"
              )}
            >
              <span className="font-medium text-slate-900">{option.label}</span>
              {option.description && <span className="text-xs text-slate-500">{option.description}</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function RatingStars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((index) => {
        const threshold = index + 1;
        const filled = value >= threshold;
        const isHalf = !filled && value > threshold - 1 && value >= index + 0.3;
        return (
          <Star
            key={threshold}
            className={cn("size-4", filled || isHalf ? "text-[#f4d06f]" : "text-slate-300")}
            fill={filled || isHalf ? "currentColor" : "none"}
            strokeWidth={filled ? 0 : 1.5}
          />
        );
      })}
    </div>
  );
}
export default function BrBoatTestView() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, [filters.capacity, filters.duration, filters.experience, filters.price, filters.sort]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.capacity !== defaultFilters.capacity) count += 1;
    if (filters.duration !== defaultFilters.duration) count += 1;
    if (filters.experience !== defaultFilters.experience) count += 1;
    if (filters.price !== defaultFilters.price) count += 1;
    if (filters.sort !== defaultFilters.sort) count += 1;
    return count;
  }, [filters]);

  const filteredOptions = useMemo(() => {
    return charterOptions.filter((option) => {
      if (filters.capacity === "up-to-10" && option.capacity > 10) return false;
      if (filters.capacity === "up-to-18" && option.capacity > 18) return false;
      if (filters.capacity === "over-18" && option.capacity <= 18) return false;

      if (filters.duration === "up-to-4" && option.durationHours > 4) return false;
      if (filters.duration === "up-to-6" && option.durationHours > 6) return false;
      if (filters.duration === "over-6" && option.durationHours < 7) return false;

      if (filters.experience !== "all" && option.experienceType !== filters.experience) return false;

      if (filters.price === "up-to-4000" && option.pricePerHour > 4000) return false;
      if (filters.price === "4000-6000" && (option.pricePerHour < 4000 || option.pricePerHour > 6000)) return false;
      if (filters.price === "over-6000" && option.pricePerHour < 6000) return false;

      return true;
    });
  }, [filters]);

  const displayedOptions = useMemo(() => {
    const options = [...filteredOptions];

    switch (filters.sort) {
      case "price-asc":
        options.sort((a, b) => a.pricePerHour - b.pricePerHour);
        break;
      case "price-desc":
        options.sort((a, b) => b.pricePerHour - a.pricePerHour);
        break;
      case "capacity-desc":
        options.sort((a, b) => b.capacity - a.capacity);
        break;
      case "rating-desc":
        options.sort((a, b) => b.rating - a.rating);
        break;
      default:
        options.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return charterOrder[a.id] - charterOrder[b.id];
        });
        break;
    }

    return options;
  }, [filteredOptions, filters.sort]);

  const totalResults = displayedOptions.length;
  const skeletonCards = Array.from({ length: 4 });

  const totalValue = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.pricePerHour * item.quantity, 0),
    [cartItems]
  );
  const totalLabel = useMemo(() => formatCurrency(totalValue), [totalValue]);
  const totalGuests = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const handleReserve = (option: CharterOption) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === option.id);
      if (existing) {
        return prev.map((item) => (item.id === option.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [
        ...prev,
        {
          id: option.id,
          name: option.name,
          pricePerHour: option.pricePerHour,
          priceLabel: option.priceLabel,
          durationLabel: option.durationLabel,
          route: option.route,
          quantity: 1,
        },
      ];
    });
    setOpen(true);
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#f5f6f8] text-slate-900">
      <div className="relative flex min-h-screen flex-col">
        <div className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
            <span>Concierge responde em ate 1h</span>
            <Button
              asChild
              className="rounded-full bg-slate-900 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-slate-800"
            >
              <Link href="#contato">Falar com consultor</Link>
            </Button>
          </div>
        </div>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1521540216272-a50305cd4421?auto=format&fit=crop&w=1800&q=80"
              alt="Lanchas BRBoat navegando ao por do sol"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/25 to-slate-900/70" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-24">
            <nav className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
              <Link href="/templates" className="transition hover:text-white">
                Templates
              </Link>
              <span className="text-white/50">/</span>
              <span className="text-white">Teste de reservas</span>
            </nav>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="space-y-12">
                <Badge className="rounded-full border border-white/40 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
                  VIVA O SONHO A BORDO BRBOAT
                </Badge>
                <div className="space-y-6">
                  <h1 className="max-w-2xl text-4xl font-semibold tracking-[0.45em] text-white sm:text-5xl lg:text-6xl">
                    Escolha a experiencia perfeita para sua reserva piloto
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-white/75">
                    Explore lanchas com curadoria BRBoat, filtros intuitivos e detalhes essenciais para validar o fluxo de reservas mantendo o mesmo refinamento da homepage.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    className="rounded-full bg-white px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-900 transition hover:bg-slate-100"
                    onClick={() => {
                      const element = document.getElementById("lista-lanchas");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Ver experiencias
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/70 bg-transparent px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white hover:border-white hover:bg-white/10"
                  >
                    Conhecer diferenciais
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
                {heroHighlights.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="rounded-full bg-white/20 p-3">
                      <item.icon className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/85">{item.title}</p>
                      <p className="mt-2 text-sm text-white/75">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-transparent">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative -mt-12 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Filtros inteligentes</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span id="lista-lanchas">
                      {isLoading
                        ? "Carregando experiencias..."
                        : `${totalResults} experiencia${totalResults === 1 ? "" : "s"} disponivel${totalResults === 1 ? "" : "s"}`}
                    </span>
                    {activeFilterCount > 0 && (
                      <Badge className="rounded-full bg-slate-900 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white">
                        {activeFilterCount} ativo{activeFilterCount > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <FilterMenu label="Capacidade" options={capacityOptions} value={filters.capacity} onChange={(value) => handleFilterChange("capacity", value)} />
                  <FilterMenu label="Duracao" options={durationOptions} value={filters.duration} onChange={(value) => handleFilterChange("duration", value)} />
                  <FilterMenu label="Experiencia" options={experienceOptions} value={filters.experience} onChange={(value) => handleFilterChange("experience", value)} />
                  <FilterMenu label="Investimento" options={priceOptions} value={filters.price} onChange={(value) => handleFilterChange("price", value)} />
                  <FilterMenu label="Ordenar" options={sortOptions} value={filters.sort} onChange={(value) => handleFilterChange("sort", value)} />
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={handleClearFilters}
                    disabled={activeFilterCount === 0}
                  >
                    Limpar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 space-y-16">
            {isLoading ? (
              <div className="grid gap-10 md:grid-cols-2">
                {skeletonCards.map((_, index) => (
                  <div key={index} className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)]">
                    <div className="aspect-[16/9] bg-slate-200/70" />
                    <div className="space-y-4 px-6 py-6">
                      <div className="h-3.5 w-24 rounded-full bg-slate-200/80" />
                      <div className="h-6 w-3/4 rounded-full bg-slate-200/70" />
                      <div className="h-3.5 w-full rounded-full bg-slate-200/60" />
                      <div className="h-10 w-full rounded-full bg-slate-200/60" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedOptions.length === 0 ? (
              <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-lg shadow-slate-900/10">
                <p className="text-lg font-semibold text-slate-900">Nenhuma lancha encontrada</p>
                <p className="mt-3 text-sm text-slate-500">
                  Ajuste os filtros para explorar novas experiencias BRBoat ou fale com nosso concierge para uma recomendacao personalizada.
                </p>
                <div className="mt-6 flex justify-center">
                  <Button
                    className="rounded-full bg-slate-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white hover:bg-slate-800"
                    onClick={handleClearFilters}
                  >
                    Limpar filtros
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-10 md:grid-cols-2">
                {displayedOptions.map((option) => (
                  <article
                    key={option.id}
                    className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-60px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_45px_90px_-60px_rgba(15,23,42,0.5)]"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={option.image}
                        alt={option.name}
                        fill
                        className="h-full w-full object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
                      <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                        <Badge className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white backdrop-blur-md">
                          {option.category}
                        </Badge>
                        {option.isPopular && (
                          <Badge className="rounded-full bg-[#f4d06f]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-900 backdrop-blur">
                            Mais reservado
                          </Badge>
                        )}
                        {option.availableToday && (
                          <Badge className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-900 backdrop-blur">
                            Disponivel hoje
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">{option.tag}</p>
                          <h2 className="mt-2 text-2xl font-semibold text-white">{option.name}</h2>
                        </div>
                        <div className="rounded-xl bg-white/80 px-3 py-2 text-right text-slate-900 backdrop-blur">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">Investimento</span>
                          <span className="mt-1 block text-sm font-semibold text-slate-900">{option.priceLabel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 p-6">
                      <p className="text-sm leading-relaxed text-slate-600">{option.description}</p>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                            <CalendarClock className="size-4 text-slate-700" />
                            Duracao
                          </div>
                          <p className="mt-3 text-base font-semibold text-slate-800">{option.durationLabel}</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                            <Users className="size-4 text-slate-700" />
                            Capacidade
                          </div>
                          <p className="mt-3 text-base font-semibold text-slate-800">{option.capacity} convidados</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                            <MapPin className="size-4 text-slate-700" />
                            Roteiro
                          </div>
                          <p className="mt-3 text-base font-semibold text-slate-800">{option.route.join(" - ")}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {option.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <RatingStars value={option.rating} />
                          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                            {option.rating.toFixed(1)} ({option.ratingCount})
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-slate-700">{option.priceLabel}</div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                          Concierge dedicado para personalizar a bordo
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            className="rounded-full bg-slate-900 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-slate-800"
                            onClick={() => handleReserve(option)}
                          >
                            Reservar agora
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-full border-slate-300 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                          >
                            Ver mais detalhes
                            <ArrowUpRight className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <section className="grid gap-12 rounded-3xl border border-slate-100 bg-white p-10 shadow-xl shadow-slate-900/10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-6">
                <Badge className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white">
                  Elementos de confianca
                </Badge>
                <h2 className="text-3xl font-semibold tracking-[0.3em] text-slate-900 sm:text-4xl">
                  A mesma autoridade e cuidado da homepage BRBoat
                </h2>
                <p className="text-base text-slate-600">
                  Mostre que a versao de teste preserva garantias, comunicacao clara e depoimentos que reforcam o posicionamento premium.
                </p>
                <div className="grid gap-4">
                  {trustSignals.map((item) => (
                    <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                      <div className="rounded-full bg-white p-3 shadow-sm shadow-slate-900/5">
                        <item.icon className="size-5 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">{item.title}</p>
                        <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 rounded-3xl border border-slate-100 bg-slate-50 p-8">
                <div className="space-y-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Depoimento destaque</p>
                  <blockquote className="rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-600">
                    <p>
                      &quot;A BRBoat transformou nosso evento em um filme. Cada detalhe foi antecipado, levando elegancia e tranquilidade do briefing ao brinde final.&quot;
                    </p>
                    <footer className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Renata Martins - CMO Grupo Aurora
                    </footer>
                  </blockquote>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">Resposta</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">Ate 1 hora</p>
                    <p className="mt-1 text-xs text-slate-500">Concierge em tempo real para ajustes e orcamentos.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">Seguranca</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">Operacao certificada</p>
                    <p className="mt-1 text-xs text-slate-500">Seguro integral, monitoramento e tripulacao homologada.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <section
          id="contato"
          className="relative overflow-hidden border-t border-slate-200/60 bg-gradient-to-br from-[#0b1d36] via-[#001934] to-[#0b1d36] py-20 text-white"
        >
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-[#0077BE]/40 blur-3xl" />
            <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-[160px]" />
          </div>
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <Badge className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
                Nao encontrou o que procurava?
              </Badge>
              <h3 className="text-3xl font-semibold tracking-[0.35em] text-white sm:text-4xl">
                Fale com o concierge e receba um roteiro exclusivo
              </h3>
              <p className="text-base text-white/80">
                Conte o momento que deseja celebrar. Respondemos com disponibilidade, valores e sugestoes de diferenciais em ate 1 hora.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/10 p-3">
                    <Anchor className="size-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Operacao certificada</p>
                    <p>Seguro integral, tripulacao homologada e embarques assistidos.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/10 p-3">
                    <CalendarClock className="size-5 text-[#00b4d8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Resposta em ate 1h</p>
                    <p>Concierge premium via WhatsApp, email ou chamada de video.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/95 p-8 text-slate-900 shadow-2xl shadow-slate-900/20">
              <h4 className="text-lg font-semibold text-slate-900">Envie seu briefing</h4>
              <p className="mt-2 text-sm text-slate-600">
                Receba propostas personalizadas para testes com clientes ou equipe interna.
              </p>
              <BoatContactForm className="mt-6" />
            </div>
          </div>
        </section>
      </div>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="flex h-full max-h-screen flex-col bg-white text-slate-900">
          <DrawerHeader className="border-b border-slate-200">
            <DrawerTitle className="text-lg font-semibold text-slate-900">Carrinho de experiencias</DrawerTitle>
            <DrawerDescription className="text-sm text-slate-500">
              {cartItems.length > 0
                ? `${totalGuests} reserva${totalGuests === 1 ? "" : "s"} selecionada${totalGuests === 1 ? "" : "s"}.`
                : "Nenhuma lancha reservada ainda. Escolha um dos cards para adicionar aqui."}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">
                Seu carrinho esta vazio. Use os filtros acima e clique em Reservar agora para experimentar o fluxo completo.
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">Duracao: {item.durationLabel}</p>
                      <p className="text-sm text-slate-500">Roteiro: {item.route.join(" - ")}</p>
                    </div>
                    <div className="text-right text-sm font-semibold text-slate-900">
                      <p>{item.priceLabel}</p>
                      {item.quantity > 1 && <p className="text-xs font-normal text-slate-500">x{item.quantity}</p>}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>Total parcial</span>
                    <span>{formatCurrency(item.pricePerHour * item.quantity)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 self-start text-slate-500 hover:bg-slate-100"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remover
                  </Button>
                </div>
              ))
            )}
          </div>

          <DrawerFooter className="border-t border-slate-200">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
              <span>Total geral</span>
              <span>{totalLabel}</span>
            </div>
            <Button
              disabled={cartItems.length === 0}
              className="w-full rounded-full bg-slate-900 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Ir para checkout
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full rounded-full border-slate-300 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-900">
                Continuar escolhendo
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {showBackToTop && (
        <Button
          type="button"
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 z-30 h-12 w-12 rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
        >
          <ArrowUp className="size-5" />
        </Button>
      )}
    </div>
  );
}



