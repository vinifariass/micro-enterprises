"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { templates } from "@/app/data/templates";

function useHorizontalScroll<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const scrollBy = (dx: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };
  return { ref, scrollBy } as const;
}

export default function TemplatesCarousel() {
  const { ref, scrollBy } = useHorizontalScroll<HTMLDivElement>();
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const onScroll = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, [ref]);

  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return (
    <section className="py-12 md:py-20 lg:py-24">
      <div className="container mx-auto space-y-6 px-4 md:space-y-8 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-md space-y-1">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Templates em destaque</h2>
            <p className="text-muted-foreground text-sm md:text-base">Veja alguns modelos antes de abrir a página de templates</p>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <button aria-label="Anterior" disabled={atStart} onClick={() => scrollBy(-400)}
              className="inline-flex items-center justify-center size-9 rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button aria-label="Próximo" disabled={atEnd} onClick={() => scrollBy(400)}
              className="inline-flex items-center justify-center size-9 rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div ref={ref} onScroll={onScroll}
            className="scrollbar-hide -mx-4 flex touch-pan-x snap-x snap-mandatory overflow-x-auto px-4 pt-1 pb-2 md:pb-4"
            style={{ scrollbarWidth: "none" }}>
            {templates.map((t) => (
              <div key={t.slug} className="carousel-item w-full flex-none snap-start px-2 sm:w-1/2 sm:px-4 lg:w-1/3">
                <div className="bg-card text-card-foreground gap-6 rounded-xl border flex h-full flex-col overflow-hidden p-0 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-40 overflow-hidden sm:h-48 md:h-52">
                    <Image alt={t.title} className="object-cover transition-transform duration-300 hover:scale-105 w-full h-full" src={t.image || "/images/streetwear/tee-worldwide.jpg"} fill sizes="(max-width: 1024px) 100vw, 33vw" />
                  
                  </div>
                  <div className="px-6 flex-grow">
                    <div className="text-muted-foreground mb-2 flex items-center text-xs sm:mb-3 sm:text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <h3 className="mb-2 line-clamp-2 text-base font-semibold sm:text-lg">{t.title}</h3>
                    <p className="text-muted-foreground line-clamp-2 text-xs sm:line-clamp-3 sm:text-sm">{t.desc}</p>
                  </div>
                  <div className="flex items-center px-6 pb-6 pt-6">
                    <Link href={`/templates/${t.slug}`} className="inline-flex h-8 w-full items-center justify-center rounded-md px-3 text-sm gap-1.5 hover:bg-accent hover:text-accent-foreground">
                      Ver Template
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sm:hidden mt-6 flex items-center justify-between">
            <button className="inline-flex h-9 flex-1 items-center justify-center rounded-md border bg-background px-3 text-xs shadow-xs disabled:opacity-50 mr-2" disabled>
              <ChevronLeft className="mr-1 h-4 w-4" /> Prev
            </button>
            <button className="inline-flex h-9 flex-1 items-center justify-center rounded-md border bg-background px-3 text-xs shadow-xs ml-2" onClick={() => scrollBy(400)}>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 flex justify-center sm:mt-8">
            <Link href="/templates" className="inline-flex h-9 max-w-sm w-full items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm shadow-xs hover:bg-accent hover:text-accent-foreground">
              Ver todos os Templates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
