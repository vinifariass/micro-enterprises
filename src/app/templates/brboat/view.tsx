"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BoatContactForm } from "@/components/landing/BoatContactForm";
import { Users, Gauge, Anchor as AnchorIcon, MapPin, Compass, Sparkles, ShieldCheck, Waves, CalendarClock } from "lucide-react";

type Boat = {
  id: string;
  name: string;
  category: string;
  status: "Disponível" | "Reservada";
  image: string;
  price: string;
  capacity: number;
  speed: string;
  size: string;
  location: string;
};

const boats: Boat[] = [
  {
    id: "aurora-55",
    name: "Aurora 55",
    category: "Luxo Premium",
    status: "Disponível",
    image: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600&q=80",
    price: "R$ 2.800 / hora",
    capacity: 12,
    speed: "38 nós",
    size: "55 pés",
    location: "Angra dos Reis, RJ",
  },
  {
    id: "odyssey-40",
    name: "Odyssey 40",
    category: "Esporte & Performance",
    status: "Disponível",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1600&q=80",
    price: "R$ 1.750 / hora",
    capacity: 8,
    speed: "45 nós",
    size: "40 pés",
    location: "Ilhabela, SP",
  },
  {
    id: "solstice-68",
    name: "Solstice 68",
    category: "Iate Festa",
    status: "Reservada",
    image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1600&q=80",
    price: "R$ 4.900 / hora",
    capacity: 28,
    speed: "32 nós",
    size: "68 pés",
    location: "Marina da Glória, RJ",
  },
  {
    id: "vogue-35",
    name: "Vogue 35",
    category: "Lifestyle & Sunset",
    status: "Disponível",
    image: "https://images.unsplash.com/photo-1471316487927-8013c028b937?auto=format&fit=crop&w=1600&q=80",
    price: "R$ 1.380 / hora",
    capacity: 10,
    speed: "33 nós",
    size: "35 pés",
    location: "Búzios, RJ",
  },
  {
    id: "horizon-52",
    name: "Horizon 52",
    category: "Pesca & Explorer",
    status: "Disponível",
    image: "https://images.unsplash.com/photo-1465479423260-c4afc24172c6?auto=format&fit=crop&w=1600&q=80",
    price: "R$ 2.050 / hora",
    capacity: 14,
    speed: "29 nós",
    size: "52 pés",
    location: "Paraty, RJ",
  },
  {
    id: "elysium-72",
    name: "Elysium 72",
    category: "Super Iate",
    status: "Disponível",
    image: "https://images.unsplash.com/photo-1520695626805-683c0de173d0?auto=format&fit=crop&w=1600&q=80",
    price: "R$ 6.700 / hora",
    capacity: 36,
    speed: "28 nós",
    size: "72 pés",
    location: "Balneário Camboriú, SC",
  },
];

const steps = [
  {
    title: "Encontre o barco ideal",
    description: "Categorias exclusivas e curadoria especialista para cada ocasião.",
    icon: Compass,
    gradient: "from-[#00B4D8] to-[#0077BE]",
  },
  {
    title: "Personalize a bordo",
    description: "Gastronomia, música, fotografia e concierge dedicado ao seu roteiro.",
    icon: Sparkles,
    gradient: "from-[#D4AF37] to-[#f4d06f]",
  },
  {
    title: "Segurança certificada",
    description: "Tripulação homologada, seguro completo e monitoramento meteorológico.",
    icon: ShieldCheck,
    gradient: "from-[#00B4D8] to-[#6dd5ed]",
  },
  {
    title: "Viva o momento",
    description: "Experiências cinematográficas, do pôr do sol a celebrações no mar.",
    icon: Waves,
    gradient: "from-[#0077BE] to-[#00B4D8]",
  },
];

type BoatCardProps = {
  boat: Boat;
  index: number;
};

function BoatCard({ boat, index }: BoatCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHover, setIsHover] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
    }

    frame.current = requestAnimationFrame(() => {
      setTilt({ rotateX, rotateY });
      frame.current = null;
    });
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      className="group relative h-full w-full"
      style={{
        animation: "fade-in-up 0.9s ease forwards",
        animationDelay: `${index * 120}ms`,
        opacity: 0,
      }}
    >
      <div
        className="relative min-h-[400px] w-full overflow-hidden rounded-3xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHover ? 1.05 : 1})`,
          transition: isHover ? "transform 0.2s ease-out" : "transform 0.6s ease",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 -z-10 rounded-3xl bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${boat.image})` }}
        />
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-transparent via-black/40 to-black/90" />
        <div
          className={cn(
            "pointer-events-none absolute inset-6 rounded-2xl border border-white/20 bg-white/10 opacity-0 backdrop-blur-none transition-all duration-500",
            "group-hover:opacity-100 group-hover:backdrop-blur-md group-hover:bg-white/15"
          )}
          style={{ transform: "translateZ(0)" }}
        />
        <span
          className="pointer-events-none absolute inset-y-0 -left-full w-32 bg-gradient-to-r from-white/5 via-white/60 to-white/5 opacity-0"
          style={{
            animation: isHover ? "card-shine 1.2s forwards" : "none",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-8 text-white">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white">
                {boat.category}
              </Badge>
              <Badge
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase",
                  boat.status === "Disponível"
                    ? "bg-emerald-500/80 text-white"
                    : "bg-amber-500/80 text-white"
                )}
              >
                {boat.status}
              </Badge>
            </div>
            <div>
              <h3 className="text-3xl font-semibold tracking-tight drop-shadow-lg">{boat.name}</h3>
              <p className="mt-2 max-w-md text-sm text-white/80">
                Experiência exclusiva com concierge integrado, playlist personalizada e serviços sob demanda.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <dl className="grid grid-cols-2 gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Users className="size-4" />
                <span>{boat.capacity} passageiros</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="size-4" />
                <span>{boat.speed}</span>
              </div>
              <div className="flex items-center gap-2">
                <AnchorIcon className="size-4" />
                <span>{boat.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <span>{boat.location}</span>
              </div>
            </dl>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Preço por hora</p>
                <p className="text-2xl font-semibold text-white">{boat.price}</p>
              </div>
              <Button
                className="rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-slate-900 transition duration-500 ease-out hover:bg-[#f2d16f] focus-visible:ring-[#D4AF37]/40"
                asChild
              >
                <Link href="#contato">Reservar agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const highlightDestinations = [
  {
    id: "mediterraneo",
    title: "Mediterrâneo Cinematográfico",
    description: "De Mônaco a Santorini com beach clubs privados e serviço de bordo Michelin.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "rio",
    title: "Rio Lifestyle BrBoat",
    description: "Clássicos do Rio, ancoragem em ilhas e festas sunset na Marina da Glória.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "grecia",
    title: "Ilhas Gregas Private",
    description: "Roteiro em veleiros de luxo com spa a bordo e guias locais bilíngues.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BrBoatView() {
  return (
    <div className="bg-white text-slate-900">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=1600&q=80"
          >
            <source src="https://rentayacht.wprentals.org/wp-content/uploads/2022/05/video_yacht_optimized.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-[#0b1d36]/40 to-[#061223]/80" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-24 pt-12 text-white">
          <nav className="flex flex-col items-center justify-between gap-4 rounded-full border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md sm:flex-row">
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80">MarAzul Experiences</span>
            <div className="flex flex-wrap items-center gap-5 text-xs uppercase tracking-[0.3em] text-white/70">
              <Link href="#explore" className="transition hover:text-white">
                Explore
              </Link>
              <Link href="#experiencias" className="transition hover:text-white">
                Experiências
              </Link>
              <Link href="#galeria" className="transition hover:text-white">
                Galeria
              </Link>
              <Link href="#contato" className="transition hover:text-white">
                Contato
              </Link>
            </div>
            <Button
              variant="ghost"
              className="rounded-full border border-white/40 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#0b1d36] transition hover:border-white/60 hover:bg-white/90 hover:text-[#005b8f]"
              asChild
            >
              <Link href="#contato">Planejar experiência</Link>
            </Button>
          </nav>
          <div className="flex flex-col items-center gap-6 text-center">
            <Badge className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
              Viva experiências inesquecíveis
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[0.45em] text-white sm:text-5xl">
              VIVA O SONHO A BORDO BRBOAT
            </h1>
            <p className="max-w-2xl text-base text-white/80 sm:text-lg">
              Roteiros exclusivos com concierge 24h, tripulação homologada e produção completa para momentos que merecem assinatura de luxo.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="rounded-full bg-[#00B4D8] px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#48CAE4]" asChild>
                <Link href="#galeria">Ver embarcações</Link>
              </Button>
              <Button className="rounded-full border border-white/40 bg-transparent px-8 py-3 text-sm font-semibold text-white hover:bg-white/10" asChild>
                <Link href="#experiencias">Conhecer experiências</Link>
              </Button>
              <Button className="rounded-full bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20" asChild>
                <Link href="/templates/brboat/test">Testar reservas</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="explore" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <Badge className="rounded-full bg-[#E0F4FF] px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-[#005b8f]">
                  A forma mais elegante de navegar
                </Badge>
                <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Experiências sob medida em ambientes cinematográficos
                </h2>
                <p className="text-base leading-relaxed text-slate-600">
                  Crie memórias entre ilhas privativas, festas sunset e expedições gourmet. Nossa equipe cuida da curadoria completa: roteiro, transfer, fotografia, música e hospitalidade. O objetivo é que você apenas viva o momento.
                </p>
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/40 backdrop-blur">
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-700">
                    <div className="flex items-center gap-3">
                      <CalendarClock className="size-5 text-[#0077BE]" />
                      <div>
                        <p className="font-semibold text-slate-900">Resposta em até 1h</p>
                        <p>Concierge humano disponível todos os dias.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="size-5 text-[#00B4D8]" />
                      <div>
                        <p className="font-semibold text-slate-900">Operação certificada</p>
                        <p>Seguro viagem, equipamentos e rotas aprovadas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {highlightDestinations.map((item) => (
                  <div key={item.id} className="relative overflow-hidden rounded-3xl border border-white shadow-lg shadow-slate-200/60">
                    <Image src={item.image} alt={item.title} width={640} height={480} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/80">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experiencias" className="bg-gradient-to-b from-white via-[#f1f5f9] to-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Badge className="rounded-full bg-[#0077BE]/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-[#005b8f]">
                Como funciona
              </Badge>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Do briefing ao brinde final</h2>
              <p className="max-w-3xl text-base text-slate-600">
                Processos claros e tecnologia discreta para que você e seus convidados vivam apenas o melhor do mar.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex h-full flex-col gap-5 rounded-3xl border border-transparent bg-white p-6 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    animation: "fade-in-up 0.8s ease forwards",
                    animationDelay: `${index * 90}ms`,
                    opacity: 0,
                  }}
                >
                  <div
                    className={cn(
                      "inline-flex size-14 items-center justify-center rounded-2xl text-white",
                      `bg-gradient-to-br ${step.gradient}`
                    )}
                  >
                    <step.icon className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="galeria" className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Badge className="rounded-full bg-[#D4AF37]/20 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-[#9a7a1d]">
                Galeria Boutique
              </Badge>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Coleção curada de lanchas e iates</h2>
              <p className="max-w-3xl text-base text-slate-600">
                Escolha a embarcação ideal e customize todo o roteiro. Cada card traz especificações completas e disponibilidade em tempo real.
              </p>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {boats.map((boat, index) => (
                <BoatCard key={boat.id} boat={boat} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="relative overflow-hidden bg-gradient-to-br from-[#0b1d36] via-[#001934] to-[#0b1d36] py-24 text-white">
          <div className="absolute inset-0 opacity-40" aria-hidden />
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Badge className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white/80">
                Concierge dedicado
              </Badge>
              <h2 className="text-3xl font-semibold sm:text-4xl">Planeje sua próxima experiência em minutos</h2>
              <p className="text-base text-white/80">
                Conte-nos sobre o momento que deseja celebrar. Responderemos com disponibilidade, valores e sugestões de diferenciais para tornar tudo memorável.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/10 p-3">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Marina da Glória</p>
                    <p>Rio de Janeiro — Operação em todo o litoral brasileiro</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/10 p-3">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Mais de 320 eventos</p>
                    <p>Wedding, corporate, filmes e experiências sob medida</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl border border-white/40 bg-white/95 p-8 text-slate-900 shadow-2xl shadow-slate-900/10">
              <h3 className="text-lg font-semibold text-slate-900">Envie sua mensagem</h3>
              <p className="mt-2 text-sm text-slate-600">Retorno com disponibilidade e concierge dedicado em até 1 hora.</p>
              <BoatContactForm className="mt-8" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


