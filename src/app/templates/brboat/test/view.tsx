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
};type Language = "pt" | "en" | "es";

const LANGUAGE_STORAGE_KEY = "brboat-language";

const LANGUAGE_OPTIONS: Array<{
  code: Language;
  flag: string;
  label: string;
  nativeLabel: string;
}> = [
  { code: "pt", flag: "🇧🇷", label: "Portugues", nativeLabel: "Portugues" },
  { code: "en", flag: "🇺🇸", label: "English", nativeLabel: "English" },
  { code: "es", flag: "🇪🇸", label: "Espanol", nativeLabel: "Espanol" },
];

const LANGUAGE_LOCALES: Record<Language, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};
type CharterOptionConfig = {
  id: string;
  experienceType: "sunset" | "corporate" | "celebration" | "family";
  image: string;
  pricePerHour: number;
  capacity: number;
  durationHours: number;
  rating: number;
  ratingCount: number;
  isPopular?: boolean;
  availableToday?: boolean;
  copy: Record<
    Language,
    {
      name: string;
      category: string;
      tag: string;
      description: string;
      amenities: string[];
      route: string[];
    }
  >;
};

const CHARTER_OPTIONS_CONFIG: CharterOptionConfig[] = [
  {
    id: "aurora-sunset",
    experienceType: "sunset",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 3200,
    capacity: 12,
    durationHours: 4,
    rating: 4.9,
    ratingCount: 128,
    isPopular: true,
    availableToday: true,
    copy: {
      pt: {
        name: "Aurora 48 Sunset Lounge",
        category: "Lifestyle & Sunset",
        tag: "Experiencia",
        description: "Sunset lounge com mixologia autoral, playlist exclusiva e concierge dedicado para brindar o fim de tarde.",
        amenities: [
          "DJ opcional a bordo",
          "Bar de espumantes premium",
          "Stand up paddle para 2 convidados",
          "Registro fotografico",
        ],
        route: ["Marina da Gloria", "Ilhas Tijucas", "Pao de Acucar"],
      },
      en: {
        name: "Aurora 48 Sunset Lounge",
        category: "Lifestyle & Sunset",
        tag: "Experience",
        description: "Sunset lounge with signature mixology, exclusive playlist, and dedicated concierge to toast the evening.",
        amenities: [
          "Optional DJ on board",
          "Premium sparkling wine bar",
          "Stand-up paddle for 2 guests",
          "Professional photo coverage",
        ],
        route: ["Marina da Gloria", "Ilhas Tijucas", "Pao de Acucar"],
      },
      es: {
        name: "Aurora 48 Sunset Lounge",
        category: "Lifestyle & Sunset",
        tag: "Experiencia",
        description: "Sunset lounge con mixologia de autor, playlist exclusiva y concierge dedicado para brindar al atardecer.",
        amenities: [
          "DJ opcional a bordo",
          "Bar de espumantes premium",
          "Stand up paddle para 2 invitados",
          "Registro fotografico",
        ],
        route: ["Marina da Gloria", "Ilhas Tijucas", "Pao de Acucar"],
      },
    },
  },
  {
    id: "elysium-day",
    experienceType: "corporate",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 5200,
    capacity: 18,
    durationHours: 6,
    rating: 4.8,
    ratingCount: 94,
    isPopular: true,
    availableToday: true,
    copy: {
      pt: {
        name: "Elysium 60 Day Charter",
        category: "Corporate & Premium",
        tag: "Corporativo",
        description: "Day charter de seis horas com gastronomia autoral, briefing corporativo e suporte tecnico multimidia.",
        amenities: [
          "Mesa posta gourmet",
          "Equipamentos de snorkel",
          "Traslado black car opcional",
          "Salao climatizado",
        ],
        route: ["Paraty", "Lagoa Azul", "Praia da Lula"],
      },
      en: {
        name: "Elysium 60 Day Charter",
        category: "Corporate & Premium",
        tag: "Corporate",
        description: "Six-hour day charter with signature cuisine, corporate briefing, and full multimedia support.",
        amenities: [
          "Gourmet table setting",
          "Snorkeling equipment",
          "Optional black car transfer",
          "Climate-controlled lounge",
        ],
        route: ["Paraty", "Lagoa Azul", "Praia da Lula"],
      },
      es: {
        name: "Elysium 60 Day Charter",
        category: "Corporate & Premium",
        tag: "Corporativo",
        description: "Day charter de seis horas con gastronomia de autor, briefing corporativo y soporte tecnico multimedia.",
        amenities: [
          "Mesa posta gourmet",
          "Equipo de snorkel",
          "Traslado black car opcional",
          "Salon climatizado",
        ],
        route: ["Paraty", "Lagoa Azul", "Praia da Lula"],
      },
    },
  },
  {
    id: "solstice-celebration",
    experienceType: "celebration",
    image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 6800,
    capacity: 26,
    durationHours: 8,
    rating: 4.9,
    ratingCount: 152,
    isPopular: true,
    copy: {
      pt: {
        name: "Solstice 68 Celebration",
        category: "Celebracao",
        tag: "{copy.cards.badges.popular}",
        description: "Iate festa com oito horas de navegacao, roteiros cinematograficos e todos os diferenciais para grandes celebracoes.",
        amenities: [
          "DJ residente BRBoat",
          "Iluminacao cenario premium",
          "Jacuzzi climatizada",
          "Mixologista exclusivo",
        ],
        route: ["Marina da Gloria", "Ilhas Cagarras", "Niteroi"],
      },
      en: {
        name: "Solstice 68 Celebration",
        category: "Celebration",
        tag: "Most booked",
        description: "Party yacht with eight hours of cruising, cinematic routes, and every differentiator for grand celebrations.",
        amenities: [
          "Resident BRBoat DJ",
          "Premium stage lighting",
          "Heated jacuzzi",
          "Exclusive mixologist",
        ],
        route: ["Marina da Gloria", "Ilhas Cagarras", "Niteroi"],
      },
      es: {
        name: "Solstice 68 Celebration",
        category: "Celebracion",
        tag: "Mas reservado",
        description: "Yate de fiesta con ocho horas de navegacion, rutas cinematograficas y todos los diferenciales para grandes celebraciones.",
        amenities: [
          "DJ residente BRBoat",
          "Iluminacion escenica premium",
          "Jacuzzi climatizada",
          "Mixologo exclusivo",
        ],
        route: ["Marina da Gloria", "Ilhas Cagarras", "Niteroi"],
      },
    },
  },
  {
    id: "odyssey-business",
    experienceType: "corporate",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 4500,
    capacity: 14,
    durationHours: 5,
    rating: 4.7,
    ratingCount: 76,
    availableToday: true,
    copy: {
      pt: {
        name: "Odyssey 50 Business Suite",
        category: "Corporate & Premium",
        tag: "Reunioes",
        description: "Sessao executiva com estrutura de sala privada, catering sob medida e roteiros para fortalecer negocios.",
        amenities: [
          "Sala de reunioes climatizada",
          "Streaming de apresentacoes",
          "Chef executivo a bordo",
          "Equipe bilingue",
        ],
        route: ["Ilhabela", "Praia do Jabaquara", "Enseada das Pedras"],
      },
      en: {
        name: "Odyssey 50 Business Suite",
        category: "Corporate & Premium",
        tag: "Meetings",
        description: "Executive session with a private room setup, bespoke catering, and routes that strengthen business relationships.",
        amenities: [
          "Climate-controlled meeting room",
          "Presentation streaming",
          "Executive chef on board",
          "Bilingual crew",
        ],
        route: ["Ilhabela", "Praia do Jabaquara", "Enseada das Pedras"],
      },
      es: {
        name: "Odyssey 50 Business Suite",
        category: "Corporate & Premium",
        tag: "Reuniones",
        description: "Sesion ejecutiva con sala privada, catering a medida y rutas que fortalecen los negocios.",
        amenities: [
          "Sala de reuniones climatizada",
          "Transmision de presentaciones",
          "Chef ejecutivo a bordo",
          "Equipo bilingue",
        ],
        route: ["Ilhabela", "Praia do Jabaquara", "Enseada das Pedras"],
      },
    },
  },
  {
    id: "marisma-family",
    experienceType: "family",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    pricePerHour: 2800,
    capacity: 10,
    durationHours: 4,
    rating: 4.6,
    ratingCount: 63,
    availableToday: true,
    copy: {
      pt: {
        name: "Marisma 44 Family Escape",
        category: "Family & Leisure",
        tag: "Familia",
        description: "Passeio familiar com foco em conforto, roteiro seguro para todas as idades e amenidades pensadas para criancas.",
        amenities: [
          "Brinquedos aquaticos para criancas",
          "Menu kids assinado",
          "Cabines equipadas com streaming",
          "Time de apoio fotografico",
        ],
        route: ["Angra dos Reis", "Ilha Cataguas", "Praia do Dentista"],
      },
      en: {
        name: "Marisma 44 Family Escape",
        category: "Family & Leisure",
        tag: "Family",
        description: "Family getaway focused on comfort, safe routes for all ages, and amenities tailored for children.",
        amenities: [
          "Water toys for children",
          "Signature kids menu",
          "Cabins equipped with streaming",
          "Support photo crew",
        ],
        route: ["Angra dos Reis", "Ilha Cataguas", "Praia do Dentista"],
      },
      es: {
        name: "Marisma 44 Family Escape",
        category: "Family & Leisure",
        tag: "Familia",
        description: "Paseo familiar enfocado en el confort, rutas seguras para todas las edades y amenidades pensadas para los ninos.",
        amenities: [
          "Juguetes acuaticos para ninos",
          "Menu infantil firmado",
          "Cabinas con streaming",
          "Equipo de apoyo fotografico",
        ],
        route: ["Angra dos Reis", "Ilha Cataguas", "Praia do Dentista"],
      },
    },
  },
];

const charterOrder = CHARTER_OPTIONS_CONFIG.reduce<Record<string, number>>((acc, option, index) => {
  acc[option.id] = index;
  return acc;
}, {});

type FilterOptionConfig = {
  value: string;
  labels: Record<Language, string>;
  chips: Record<Language, string>;
  description?: Record<Language, string>;
};

const CAPACITY_OPTION_CONFIG: FilterOptionConfig[] = [
  {
    value: "all",
    labels: { pt: "Qualquer capacidade", en: "Any capacity", es: "Cualquier capacidad" },
    chips: { pt: "Capacidade", en: "Capacity", es: "Capacidad" },
  },
  {
    value: "up-to-10",
    labels: { pt: "Ate 10 convidados", en: "Up to 10 guests", es: "Hasta 10 invitados" },
    chips: { pt: "Ate 10", en: "Up to 10", es: "Hasta 10" },
  },
  {
    value: "up-to-18",
    labels: { pt: "Ate 18 convidados", en: "Up to 18 guests", es: "Hasta 18 invitados" },
    chips: { pt: "Ate 18", en: "Up to 18", es: "Hasta 18" },
  },
  {
    value: "over-18",
    labels: { pt: "20+ convidados", en: "20+ guests", es: "20+ invitados" },
    chips: { pt: "20+", en: "20+", es: "20+" },
  },
];const DURATION_OPTION_CONFIG: FilterOptionConfig[] = [
  {
    value: "all",
    labels: { pt: "Qualquer duracao", en: "Any duration", es: "Cualquier duracion" },
    chips: { pt: "Duracao", en: "Duration", es: "Duracion" },
  },
  {
    value: "up-to-4",
    labels: { pt: "Ate 4 horas", en: "Up to 4 hours", es: "Hasta 4 horas" },
    chips: { pt: "Ate 4h", en: "Up to 4h", es: "Hasta 4h" },
  },
  {
    value: "up-to-6",
    labels: { pt: "Ate 6 horas", en: "Up to 6 hours", es: "Hasta 6 horas" },
    chips: { pt: "Ate 6h", en: "Up to 6h", es: "Hasta 6h" },
  },
  {
    value: "over-6",
    labels: { pt: "8+ horas", en: "8+ hours", es: "8+ horas" },
    chips: { pt: "8h+", en: "8h+", es: "8h+" },
  },
];const EXPERIENCE_OPTION_CONFIG: FilterOptionConfig[] = [
  {
    value: "all",
    labels: { pt: "Todas as experiencias", en: "All experiences", es: "Todas las experiencias" },
    chips: { pt: "Experiencia", en: "Experience", es: "Experiencia" },
  },
  {
    value: "sunset",
    labels: { pt: "Sunset & lifestyle", en: "Sunset & lifestyle", es: "Sunset y estilo de vida" },
    chips: { pt: "Sunset", en: "Sunset", es: "Sunset" },
  },
  {
    value: "corporate",
    labels: { pt: "Corporativo & eventos", en: "Corporate & events", es: "Corporativo y eventos" },
    chips: { pt: "Corporativo", en: "Corporate", es: "Corporativo" },
  },
  {
    value: "celebration",
    labels: { pt: "Celebracoes & festas", en: "Celebrations & parties", es: "Celebraciones y fiestas" },
    chips: { pt: "Celebracao", en: "Celebration", es: "Celebracion" },
  },
  {
    value: "family",
    labels: { pt: "Familia & passeios", en: "Family & leisure", es: "Familia y paseos" },
    chips: { pt: "Familia", en: "Family", es: "Familia" },
  },
];

const PRICE_OPTION_CONFIG: FilterOptionConfig[] = [
  {
    value: "all",
    labels: { pt: "Qualquer faixa de preco", en: "Any price range", es: "Cualquier rango de precio" },
    chips: { pt: "Investimento", en: "Budget", es: "Inversion" },
  },
  {
    value: "up-to-4000",
    labels: { pt: "Ate R$ 4.000 / hora", en: "Up to R$ 4,000 / hour", es: "Hasta R$ 4.000 / hora" },
    chips: { pt: "Ate 4k", en: "Up to 4k", es: "Hasta 4k" },
  },
  {
    value: "4000-6000",
    labels: { pt: "Entre R$ 4k e R$ 6k", en: "Between R$ 4k and R$ 6k", es: "Entre R$ 4k y R$ 6k" },
    chips: { pt: "4k-6k", en: "4k-6k", es: "4k-6k" },
  },
  {
    value: "over-6000",
    labels: { pt: "Acima de R$ 6k", en: "Above R$ 6k", es: "Mas de R$ 6k" },
    chips: { pt: "6k+", en: "6k+", es: "6k+" },
  },
];

const SORT_OPTION_CONFIG: FilterOptionConfig[] = [
  {
    value: "relevance",
    labels: { pt: "Relevancia BRBoat", en: "BRBoat relevance", es: "Relevancia BRBoat" },
    chips: { pt: "Relevancia", en: "Relevance", es: "Relevancia" },
  },
  {
    value: "price-asc",
    labels: { pt: "Menor preco primeiro", en: "Lowest price first", es: "Menor precio primero" },
    chips: { pt: "Menor preco", en: "Lowest price", es: "Menor precio" },
  },
  {
    value: "price-desc",
    labels: { pt: "Maior preco primeiro", en: "Highest price first", es: "Mayor precio primero" },
    chips: { pt: "Maior preco", en: "Highest price", es: "Mayor precio" },
  },
  {
    value: "capacity-desc",
    labels: { pt: "Maior capacidade primeiro", en: "Highest capacity first", es: "Mayor capacidad primero" },
    chips: { pt: "Capacidade", en: "Capacity", es: "Capacidad" },
  },
  {
    value: "rating-desc",
    labels: { pt: "Melhor avaliacao", en: "Best rating", es: "Mejor calificacion" },
    chips: { pt: "Avaliacoes", en: "Ratings", es: "Calificaciones" },
  },
];

const defaultFilters: FilterState = {
  capacity: "all",
  duration: "all",
  experience: "all",
  price: "all",
  sort: "relevance",
};

const HERO_HIGHLIGHTS_CONFIG = [
  {
    icon: CalendarClock,
    copy: {
      pt: {
        title: "Horarios flexiveis",
        description: "Personalize janelas de embarque e desembarque com concierge 24h.",
      },
      en: {
        title: "Flexible schedules",
        description: "Customize boarding and disembark windows with 24h concierge support.",
      },
      es: {
        title: "Horarios flexibles",
        description: "Personaliza horarios de embarque y desembarque con concierge 24h.",
      },
    },
  },
  {
    icon: Sparkles,
    copy: {
      pt: {
        title: "Experiencias assinadas",
        description: "Sunsets, eventos corporativos e celebracoes cinematograficas.",
      },
      en: {
        title: "Signature experiences",
        description: "Sunsets, corporate events, and cinematic celebrations.",
      },
      es: {
        title: "Experiencias firmadas",
        description: "Sunsets, eventos corporativos y celebraciones cinematograficas.",
      },
    },
  },
  {
    icon: ShieldCheck,
    copy: {
      pt: {
        title: "Operacao certificada",
        description: "Tripulacao homologada, seguro integral e monitoramento meteorologico.",
      },
      en: {
        title: "Certified operation",
        description: "Certified crew, full insurance, and weather monitoring.",
      },
      es: {
        title: "Operacion certificada",
        description: "Tripulacion homologada, seguro integral y monitoreo meteorologico.",
      },
    },
  },
] as const;

const TRUST_SIGNALS_CONFIG = [
  {
    icon: CalendarClock,
    copy: {
      pt: {
        title: "Resposta em ate 1h",
        description: "Concierge premium com sugestoes personalizadas e disponibilidade real.",
      },
      en: {
        title: "Response within 1h",
        description: "Premium concierge with tailored suggestions and real availability.",
      },
      es: {
        title: "Respuesta en hasta 1h",
        description: "Concierge premium con sugerencias personalizadas y disponibilidad real.",
      },
    },
  },
  {
    icon: ShieldCheck,
    copy: {
      pt: {
        title: "Operacao certificada",
        description: "Tripulacao licenciada, briefing de seguranca e seguro viagem completo.",
      },
      en: {
        title: "Certified operation",
        description: "Licensed crew, safety briefing, and comprehensive travel insurance.",
      },
      es: {
        title: "Operacion certificada",
        description: "Tripulacion licenciada, briefing de seguridad y seguro de viaje completo.",
      },
    },
  },
  {
    icon: Waves,
    copy: {
      pt: {
        title: "Satisfacao 4.9/5",
        description: "Mais de 320 eventos em lanchas BRBoat com NPS elevado.",
      },
      en: {
        title: "Satisfaction 4.9/5",
        description: "Over 320 events on BRBoat yachts with a top-tier NPS.",
      },
      es: {
        title: "Satisfaccion 4.9/5",
        description: "Mas de 320 eventos en lanchas BRBoat con NPS elevado.",
      },
    },
  },
] as const;

const COPY = {
  pt: {
    sticky: {
      message: "Concierge responde em ate 1h",
      cta: "Falar com consultor",
    },
    breadcrumb: {
      root: "Templates",
      current: "Teste de reservas",
    },
    hero: {
      badge: "VIVA O SONHO A BORDO BRBOAT",
      title: "Escolha a experiencia perfeita para sua reserva piloto",
      description:
        "Explore lanchas com curadoria BRBoat, filtros intuitivos e detalhes essenciais para validar o fluxo de reservas mantendo o mesmo refinamento da homepage.",
      primaryCta: "Ver experiencias",
      secondaryCta: "Conhecer diferenciais",
    },
    filters: {
      heading: "Filtros inteligentes",
      loading: "Carregando experiencias...",
      clear: "Limpar",
      clearAll: "Limpar filtros",
      menus: {
        capacity: "Capacidade",
        duration: "Duracao",
        experience: "Experiencia",
        price: "Investimento",
        sort: "Ordenar",
      },
      empty: {
        title: "Nenhuma lancha encontrada",
        description:
          "Ajuste os filtros para explorar novas experiencias BRBoat ou fale com nosso concierge para uma recomendacao personalizada.",
        cta: "Limpar filtros",
      },
    },
    cards: {
      badges: {
        popular: "Mais reservado",
        availableToday: "Disponivel hoje",
      },
      labels: {
        investment: "Investimento",
        duration: "Duracao",
        capacity: "Capacidade",
        route: "Roteiro",
        concierge: "Concierge dedicado para personalizar a bordo",
        reserve: "Reservar agora",
        details: "Ver mais detalhes",
      },
    },
    trust: {
      badge: "{copy.trust.badge}",
      title: "{copy.trust.title}",
      description:
        "{copy.trust.description}",
      testimonial: {
        label: "{copy.trust.testimonial.label}",
        quote:
          "\"A BRBoat transformou nosso evento em um filme. Cada detalhe foi antecipado, levando elegancia e tranquilidade do briefing ao brinde final.\"",
        cite: "{copy.trust.testimonial.cite}",
      },
      stats: [
        {
          label: "Resposta",
          value: "Ate 1 hora",
          description: "Concierge em tempo real para ajustes e orcamentos.",
        },
        {
          label: "Seguranca",
          value: "Operacao certificada",
          description: "Seguro integral, monitoramento e tripulacao homologada.",
        },
      ],
    },
    concierge: {
      badge: "{copy.concierge.badge}",
      title: "{copy.concierge.title}",
      description:
        "{copy.concierge.description}",
      highlights: [
        {
          title: "Operacao certificada",
          description: "Seguro integral, tripulacao homologada e embarques assistidos.",
        },
        {
          title: "Resposta em ate 1h",
          description: "Concierge premium via WhatsApp, email ou chamada de video.",
        },
      ],
      form: {
        title: "Envie seu briefing",
        description: "Receba propostas personalizadas para testes com clientes ou equipe interna.",
      },
    },
    drawer: {
      title: "Carrinho de experiencias",
      emptySelection: "Nenhuma lancha reservada ainda. Escolha um dos cards para adicionar aqui.",
      emptyCart:
        "{copy.drawer.emptyCart}",
      durationLabel: "Duracao",
      routeLabel: "Roteiro",
      partialLabel: "Total parcial",
      remove: "Remover",
      totalLabel: "Total geral",
      checkout: "Ir para checkout",
      continue: "Continuar escolhendo",
    },
  },
  en: {
    sticky: {
      message: "Concierge replies within 1h",
      cta: "Talk to concierge",
    },
    breadcrumb: {
      root: "Templates",
      current: "Reservation test",
    },
    hero: {
      badge: "LIVE THE BRBOAT DREAM",
      title: "Choose the perfect experience for your pilot booking",
      description:
        "Explore BRBoat-curated yachts, intuitive filters, and essential details to validate your booking flow with the same refined feeling as the homepage.",
      primaryCta: "View experiences",
      secondaryCta: "Discover differentiators",
    },
    filters: {
      heading: "Smart filters",
      loading: "Loading experiences...",
      clear: "Clear",
      clearAll: "Clear filters",
      menus: {
        capacity: "Capacity",
        duration: "Duration",
        experience: "Experience",
        price: "Budget",
        sort: "Sort",
      },
      empty: {
        title: "No boats found",
        description:
          "Adjust the filters to explore more BRBoat experiences or chat with our concierge for a tailored recommendation.",
        cta: "Clear filters",
      },
    },
    cards: {
      badges: {
        popular: "Most booked",
        availableToday: "Available today",
      },
      labels: {
        investment: "Investment",
        duration: "Duration",
        capacity: "Capacity",
        route: "Route",
        concierge: "Dedicated concierge to personalize every detail on board",
        reserve: "Book now",
        details: "View more details",
      },
    },
    trust: {
      badge: "Trust elements",
      title: "The same authority and care as the BRBoat homepage",
      description:
        "Show that the test version keeps guarantees, clear communication, and testimonials that reinforce the premium positioning.",
      testimonial: {
        label: "Featured testimonial",
        quote:
          "\"BRBoat turned our event into a movie. Every detail was anticipated, bringing elegance and peace of mind from the briefing to the final toast.\"",
        cite: "{copy.trust.testimonial.cite}",
      },
      stats: [
        {
          label: "Response",
          value: "Up to 1 hour",
          description: "Real-time concierge for adjustments and budgets.",
        },
        {
          label: "Safety",
          value: "Certified operation",
          description: "Full insurance, monitoring, and certified crew.",
        },
      ],
    },
    concierge: {
      badge: "Didnt find what you were looking for?",
      title: "Talk to the concierge and receive an exclusive itinerary",
      description:
        "Tell us about the moment you want to celebrate. We reply with availability, pricing, and tailored differentiators within 1 hour.",
      highlights: [
        {
          title: "Certified operation",
          description: "Full insurance, certified crew, and assisted boarding.",
        },
        {
          title: "Response within 1h",
          description: "Premium concierge via WhatsApp, email, or video call.",
        },
      ],
      form: {
        title: "Send your briefing",
        description: "Receive tailored proposals for client pilots or internal teams.",
      },
    },
    drawer: {
      title: "Experiences cart",
      emptySelection: "No boats booked yet. Choose one of the cards to add here.",
      emptyCart:
        "Your cart is empty. Use the filters above and click Book now to experience the full flow.",
      durationLabel: "Duration",
      routeLabel: "Route",
      partialLabel: "Partial total",
      remove: "Remove",
      totalLabel: "Grand total",
      checkout: "Go to checkout",
      continue: "Keep browsing",
    },
  },
  es: {
    sticky: {
      message: "Concierge responde en hasta 1h",
      cta: "Hablar con el concierge",
    },
    breadcrumb: {
      root: "Plantillas",
      current: "Prueba de reservas",
    },
    hero: {
      badge: "VIVE EL SUENO BRBOAT",
      title: "Elige la experiencia perfecta para tu reserva piloto",
      description:
        "Explora lanchas curadas por BRBoat, filtros intuitivos y detalles esenciales para validar el flujo de reservas con el mismo refinamiento de la homepage.",
      primaryCta: "Ver experiencias",
      secondaryCta: "Conocer diferenciales",
    },
    filters: {
      heading: "Filtros inteligentes",
      loading: "Cargando experiencias...",
      clear: "Limpiar",
      clearAll: "Limpiar filtros",
      menus: {
        capacity: "Capacidad",
        duration: "Duracion",
        experience: "Experiencia",
        price: "Inversion",
        sort: "Ordenar",
      },
      empty: {
        title: "No se encontraron lanchas",
        description:
          "Ajusta los filtros para explorar nuevas experiencias BRBoat o habla con nuestro concierge para una recomendacion personalizada.",
        cta: "Limpiar filtros",
      },
    },
    cards: {
      badges: {
        popular: "Mas reservado",
        availableToday: "Disponible hoy",
      },
      labels: {
        investment: "Inversion",
        duration: "Duracion",
        capacity: "Capacidad",
        route: "Ruta",
        concierge: "Concierge dedicado para personalizar cada detalle a bordo",
        reserve: "Reservar ahora",
        details: "Ver mas detalles",
      },
    },
    trust: {
      badge: "Elementos de confianza",
      title: "La misma autoridad y cuidado que la homepage de BRBoat",
      description:
        "Muestra que la version de prueba preserva garantias, comunicacion clara y testimonios que refuerzan el posicionamiento premium.",
      testimonial: {
        label: "Testimonio destacado",
        quote:
          "\"BRBoat transformo nuestro evento en una pelicula. Cada detalle fue anticipado, aportando elegancia y tranquilidad desde el briefing hasta el brindis final.\"",
        cite: "{copy.trust.testimonial.cite}",
      },
      stats: [
        {
          label: "Respuesta",
          value: "Hasta 1 hora",
          description: "Concierge en tiempo real para ajustes y presupuestos.",
        },
        {
          label: "Seguridad",
          value: "Operacion certificada",
          description: "Seguro integral, monitoreo y tripulacion homologada.",
        },
      ],
    },
    concierge: {
      badge: "No encontraste lo que buscabas?",
      title: "Habla con el concierge y recibe un itinerario exclusivo",
      description:
        "Cuentanos el momento que deseas celebrar. Respondemos con disponibilidad, valores y diferenciales en hasta 1 hora.",
      highlights: [
        {
          title: "Operacion certificada",
          description: "Seguro integral, tripulacion homologada y embarques asistidos.",
        },
        {
          title: "Respuesta en hasta 1h",
          description: "Concierge premium por WhatsApp, email o videollamada.",
        },
      ],
      form: {
        title: "Envia tu briefing",
        description: "Recibe propuestas personalizadas para pruebas con clientes o equipo interno.",
      },
    },
    drawer: {
      title: "Carrito de experiencias",
      emptySelection: "Aun no hay lanchas reservadas. Elige una de las tarjetas para agregarla aqui.",
      emptyCart:
        "Tu carrito esta vacio. Usa los filtros y haz clic en Reservar ahora para vivir el flujo completo.",
      durationLabel: "Duracion",
      routeLabel: "Ruta",
      partialLabel: "Total parcial",
      remove: "Eliminar",
      totalLabel: "Total general",
      checkout: "Ir al checkout",
      continue: "Seguir eligiendo",
    },
  },
} as const;


function formatCurrency(value: number, language: Language) {
  return value.toLocaleString(LANGUAGE_LOCALES[language], {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

const PER_HOUR_SUFFIX: Record<Language, string> = {
  pt: "/ hora",
  en: "/ hour",
  es: "/ hora",
};

function formatPriceLabel(value: number, language: Language) {
  return `${formatCurrency(value, language)} ${PER_HOUR_SUFFIX[language]}`;
}

function formatDurationLabel(hours: number, language: Language) {
  const unit = {
    pt: hours === 1 ? "hora" : "horas",
    en: hours === 1 ? "hour" : "hours",
    es: hours === 1 ? "hora" : "horas",
  }[language];

  return `${hours} ${unit}`;
}

function formatGuestsLabel(value: number, language: Language) {
  const suffix = {
    pt: value === 1 ? "convidado" : "convidados",
    en: value === 1 ? "guest" : "guests",
    es: value === 1 ? "invitado" : "invitados",
  }[language];

  return `${value} ${suffix}`;
}

function formatExperienceCount(value: number, language: Language) {
  switch (language) {
    case "en":
      return `${value} experience${value === 1 ? "" : "s"} available`;
    case "es":
      return `${value} experiencia${value === 1 ? "" : "s"} disponible${value === 1 ? "" : "s"}`;
    default:
      return `${value} experiencia${value === 1 ? "" : "s"} disponivel${value === 1 ? "" : "s"}`;
  }
}

function formatActiveFilters(value: number, language: Language) {
  switch (language) {
    case "en":
      return `${value} active filter${value === 1 ? "" : "s"}`;
    case "es":
      return `${value} filtro${value === 1 ? "" : "s"} activo${value === 1 ? "" : "s"}`;
    default:
      return `${value} ativo${value === 1 ? "" : "s"}`;
  }
}

function formatCartSummary(value: number, language: Language) {
  switch (language) {
    case "en":
      return `${value} booking${value === 1 ? "" : "s"} selected.`;
    case "es":
      return `${value} reserva${value === 1 ? "" : "s"} seleccionada${value === 1 ? "" : "s"}.`;
    default:
      return `${value} reserva${value === 1 ? "" : "s"} selecionada${value === 1 ? "" : "s"}.`;
  }
}
\r\n\r\ntype FilterMenuProps = {
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
  const [language, setLanguage] = useState<Language>("pt");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (storedLanguage && LANGUAGE_OPTIONS.some((option) => option.code === storedLanguage)) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", LANGUAGE_LOCALES[language]);
    }
  }, [language]);

  const activeLanguage = useMemo(
    () => LANGUAGE_OPTIONS.find((option) => option.code === language) ?? LANGUAGE_OPTIONS[0],
    [language]
  );

  const copy = COPY[language];

  const capacityOptions = useMemo(
    () =>
      CAPACITY_OPTION_CONFIG.map((option) => ({
        value: option.value,
        label: option.labels[language],
        chip: option.chips[language],
        description: option.description?.[language],
      })),
    [language]
  );

  const durationOptions = useMemo(
    () =>
      DURATION_OPTION_CONFIG.map((option) => ({
        value: option.value,
        label: option.labels[language],
        chip: option.chips[language],
        description: option.description?.[language],
      })),
    [language]
  );

  const experienceOptions = useMemo(
    () =>
      EXPERIENCE_OPTION_CONFIG.map((option) => ({
        value: option.value,
        label: option.labels[language],
        chip: option.chips[language],
        description: option.description?.[language],
      })),
    [language]
  );

  const priceOptions = useMemo(
    () =>
      PRICE_OPTION_CONFIG.map((option) => ({
        value: option.value,
        label: option.labels[language],
        chip: option.chips[language],
        description: option.description?.[language],
      })),
    [language]
  );

  const sortOptions = useMemo(
    () =>
      SORT_OPTION_CONFIG.map((option) => ({
        value: option.value,
        label: option.labels[language],
        chip: option.chips[language],
        description: option.description?.[language],
      })),
    [language]
  );

  const heroHighlights = useMemo(
    () =>
      HERO_HIGHLIGHTS_CONFIG.map((item) => ({
        icon: item.icon,
        title: item.copy[language].title,
        description: item.copy[language].description,
      })),
    [language]
  );

  const trustSignals = useMemo(
    () =>
      TRUST_SIGNALS_CONFIG.map((item) => ({
        icon: item.icon,
        title: item.copy[language].title,
        description: item.copy[language].description,
      })),
    [language]
  );

  const charterOptions = useMemo<CharterOption[]>(
    () =>
      CHARTER_OPTIONS_CONFIG.map((option) => {
        const localized = option.copy[language];
        return {
          id: option.id,
          experienceType: option.experienceType,
          image: option.image,
          pricePerHour: option.pricePerHour,
          priceLabel: formatPriceLabel(option.pricePerHour, language),
          capacity: option.capacity,
          durationHours: option.durationHours,
          durationLabel: formatDurationLabel(option.durationHours, language),
          name: localized.name,
          category: localized.category,
          tag: localized.tag,
          description: localized.description,
          amenities: localized.amenities,
          route: localized.route,
          rating: option.rating,
          ratingCount: option.ratingCount,
          isPopular: option.isPopular,
          availableToday: option.availableToday,
        };
      }),
    [language]
  );

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

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
  };

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
  const totalLabel = useMemo(() => formatCurrency(totalValue, language), [language, totalValue]);
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
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
            <span>{copy.sticky.message}</span>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex items-center gap-2 rounded-full border border-slate-300/60 bg-white/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-600 backdrop-blur transition hover:border-slate-400 hover:bg-white/50 hover:text-slate-900"
                  >
                    <span className="text-base leading-none">{activeLanguage.flag}</span>
                    <span>{activeLanguage.label}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 w-48 rounded-2xl border border-slate-200 bg-white/95 p-2 text-slate-900 shadow-xl backdrop-blur">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <DropdownMenuItem
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                        option.code === language ? "bg-slate-100 text-slate-900" : "hover:bg-slate-100/80 hover:text-slate-900"
                      )}
                    >
                      <span className="text-base leading-none">{option.flag}</span>
                      <div className="flex flex-col leading-tight">
                        <span className="font-semibold">{option.label}</span>
                        <span className="text-xs text-slate-500">{option.nativeLabel}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                asChild
                className="rounded-full bg-slate-900 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-slate-800"
              >
                <Link href="#contato">{copy.sticky.cta}</Link>
              </Button>
            </div>
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
              <span className="text-white">{copy.breadcrumb.current}</span>
            </nav>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="space-y-12">
                <Badge className="rounded-full border border-white/40 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
                  {copy.hero.badge}
                </Badge>
                <div className="space-y-6">
                  <h1 className="max-w-2xl text-4xl font-semibold tracking-[0.45em] text-white sm:text-5xl lg:text-6xl">
                    {copy.hero.title}
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-white/75">
                    {copy.hero.description}
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
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">{copy.filters.heading}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span id="lista-lanchas">{experienceLabel}</span>
                    {activeFilterCount > 0 && (
                      <Badge className="rounded-full bg-slate-900 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white">
                        {activeFilterLabel}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <FilterMenu label={copy.filters.menus.capacity} options={capacityOptions} value={filters.capacity} onChange={(value) => handleFilterChange("capacity", value)} />
                  <FilterMenu label={copy.filters.menus.duration} options={durationOptions} value={filters.duration} onChange={(value) => handleFilterChange("duration", value)} />
                  <FilterMenu label={copy.filters.menus.experience} options={experienceOptions} value={filters.experience} onChange={(value) => handleFilterChange("experience", value)} />
                  <FilterMenu label={copy.filters.menus.price} options={priceOptions} value={filters.price} onChange={(value) => handleFilterChange("price", value)} />
                  <FilterMenu label={copy.filters.menus.sort} options={sortOptions} value={filters.sort} onChange={(value) => handleFilterChange("sort", value)} />
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={handleClearFilters}
                    disabled={activeFilterCount === 0}
                  >
                    {copy.filters.clear}
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
                <p className="text-lg font-semibold text-slate-900">{copy.filters.empty.title}</p>
                <p className="mt-3 text-sm text-slate-500">{copy.filters.empty.description}</p>
                <div className="mt-6 flex justify-center">
                  <Button
                    className="rounded-full bg-slate-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white hover:bg-slate-800"
                    onClick={handleClearFilters}
                  >
                    {copy.filters.empty.cta}
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
                            {copy.cards.badges.popular}
                          </Badge>
                        )}
                        {option.availableToday && (
                          <Badge className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-900 backdrop-blur">
                            {copy.cards.badges.availableToday}
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">{option.tag}</p>
                          <h2 className="mt-2 text-2xl font-semibold text-white">{option.name}</h2>
                        </div>
                        <div className="rounded-xl bg-white/80 px-3 py-2 text-right text-slate-900 backdrop-blur">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">{copy.cards.labels.investment}</span>
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
                            {copy.cards.labels.duration}
                          </div>
                          <p className="mt-3 text-base font-semibold text-slate-800">{option.durationLabel}</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                            <Users className="size-4 text-slate-700" />
                            {copy.cards.labels.capacity}
                          </div>
                          <p className="mt-3 text-base font-semibold text-slate-800">{formatGuestsLabel(option.capacity, language)}</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                            <MapPin className="size-4 text-slate-700" />
                            {copy.cards.labels.route}
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
                          {copy.cards.labels.concierge}
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            className="rounded-full bg-slate-900 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-slate-800"
                            onClick={() => handleReserve(option)}
                          >
                            {copy.cards.labels.reserve}
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-full border-slate-300 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                          >
                            {copy.cards.labels.details}
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
                  {copy.trust.badge}
                </Badge>
                <h2 className="text-3xl font-semibold tracking-[0.3em] text-slate-900 sm:text-4xl">
                  {copy.trust.title}
                </h2>
                <p className="text-base text-slate-600">
                  {copy.trust.description}
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.trust.testimonial.label}</p>
                  <blockquote className="rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-600">
                    <p>
                      {copy.trust.testimonial.quote}
                    </p>
                    <footer className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {copy.trust.testimonial.cite}
                    </footer>
                  </blockquote>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {copy.trust.stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">{stat.label}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{stat.value}</p>
                      <p className="mt-1 text-xs text-slate-500">{stat.description}</p>
                    </div>
                  ))}
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
                {copy.concierge.badge}
              </Badge>
              <h3 className="text-3xl font-semibold tracking-[0.35em] text-white sm:text-4xl">
                {copy.concierge.title}
              </h3>
              <p className="text-base text-white/80">
                {copy.concierge.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/10 p-3">
                    <Anchor className="size-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{copy.concierge.highlights[0].title}</p>
                    <p>{copy.concierge.highlights[0].description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/10 p-3">
                    <CalendarClock className="size-5 text-[#00b4d8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{copy.concierge.highlights[1].title}</p>
                    <p>{copy.concierge.highlights[1].description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/95 p-8 text-slate-900 shadow-2xl shadow-slate-900/20">
              <h4 className="text-lg font-semibold text-slate-900">{copy.concierge.form.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{copy.concierge.form.description}</p>
              <BoatContactForm className="mt-6" />
            </div>
          </div>
        </section>
      </div>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="flex h-full max-h-screen flex-col bg-white text-slate-900">
          <DrawerHeader className="border-b border-slate-200">
            <DrawerTitle className="text-lg font-semibold text-slate-900">{copy.drawer.title}</DrawerTitle>
            <DrawerDescription className="text-sm text-slate-500">{cartSummary}</DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">
                {copy.drawer.emptyCart}
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{copy.drawer.durationLabel}: {item.durationLabel}</p>
                      <p className="text-sm text-slate-500">{copy.drawer.routeLabel}: {item.route.join(" - ")}</p>
                    </div>
                    <div className="text-right text-sm font-semibold text-slate-900">
                      <p>{item.priceLabel}</p>
                      {item.quantity > 1 && <p className="text-xs font-normal text-slate-500">x{item.quantity}</p>}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{copy.drawer.partialLabel}</span>
                    <span>{formatCurrency(item.pricePerHour * item.quantity, language)}</span>
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
              <span>{copy.drawer.totalLabel}</span>
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







