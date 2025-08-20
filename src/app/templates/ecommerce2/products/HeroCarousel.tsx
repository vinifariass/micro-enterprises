"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type HeroSlide = {
  title: string;
  subtitle: string;
  rating: number; // 0-5
  reviews: number;
  products: number;
  tags: string[];
  imageUrl: string;
};

type Props = {
  slides?: HeroSlide[];
  className?: string;
};

export default function HeroCarousel({ slides: _slides, className }: Props) {
  const slides = _slides ?? defaultSlides;
  const [index, setIndex] = React.useState(1); // start on middle like screenshot

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className={"bg-card relative overflow-hidden rounded-xl border " + (className ?? "")}> 
      <div className="relative aspect-[21/9]">
        {/* Slides */}
        <div
          className="absolute inset-0 z-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <Slide key={i} slide={s} />
          ))}
        </div>

        {/* Controls */}
        <div className="absolute right-6 bottom-6 z-10 flex items-center gap-2">
          <button
            onClick={prev}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border shadow-xs size-9 bg-background/60 hover:bg-background/80 backdrop-blur-sm text-foreground"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border shadow-xs size-9 bg-background/60 hover:bg-background/80 backdrop-blur-sm text-foreground"
            aria-label="Next slide"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={
                "h-2 rounded-full transition-all shadow-sm " +
                (i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide({ slide }: { slide: HeroSlide }) {
  return (
    <div className="relative inset-0 min-w-full">
      <div className="absolute inset-0 pointer-events-none">
        {/* Using <img> to avoid Next/Image remote config */}
        <img alt={slide.title} src={slide.imageUrl} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      </div>
      <div className="relative flex h-full items-center">
        <div className="w-full max-w-2xl space-y-6 p-8 lg:p-12">
          {slide.title && (
            <div className="mb-4">
              <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit bg-primary/10 text-primary">Featured Collection</span>
            </div>
          )}
          <h2 className="text-4xl font-semibold tracking-tight">{slide.title}</h2>
          <p className="text-accent-foreground/80 text-lg">{slide.subtitle}</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Stars rating={slide.rating} />
              <span className="ml-2 font-medium">{slide.rating.toFixed(1)}</span>
              <span className="text-accent-foreground/80">({slide.reviews})</span>
            </div>
            <div className="text-accent-foreground/80">{slide.products} products</div>
          </div>

          <div className="flex flex-wrap gap-2">
            {slide.tags.map((t) => (
              <span key={t} className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit bg-background/50 backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>

          <div className="pt-4">
            <Button className="group h-10 px-6">
              Explore Collection
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={"h-5 w-5 " + (i < full ? "fill-primary text-primary" : "fill-muted text-muted")}
          aria-hidden="true"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      ))}
    </div>
  );
}

const defaultSlides: HeroSlide[] = [
  {
    title: "Luxury Watches",
    subtitle:
      "Discover our collection of premium timepieces crafted with exceptional materials and precision engineering.",
    rating: 4.9,
    reviews: 1250,
    products: 156,
    tags: ["Luxury", "Premium", "Investment Pieces"],
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    title: "Smart Watches",
    subtitle:
      "Stay connected with cutting-edge technology. Advanced features meet sophisticated design.",
    rating: 4.7,
    reviews: 890,
    products: 89,
    tags: ["Tech", "Fitness", "Connectivity"],
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    title: "Classic Collection",
    subtitle:
      "Timeless designs that never go out of style. Perfect for any occasion.",
    rating: 4.8,
    reviews: 965,
    products: 112,
    tags: ["Classic", "Elegant", "Versatile"],
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
];
