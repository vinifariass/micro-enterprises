"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { getStoreById, storeReviews, type Review } from "@/app/data/stores";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Globe } from "lucide-react";
import Image from "next/image";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < value ? "text-yellow-500" : "text-muted-foreground"}>★</span>
      ))}
    </div>
  );
}

export default function StoreDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const store = getStoreById(id);
  if (!store) return notFound();

  const reviews: Review[] = storeReviews[id] ?? [];
  const avg = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) : 0;

  return (
    <main className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-8 space-y-4">
        <Card className="p-5">
          <div className="flex items-start gap-4">
            {store.image && (
              <Image
                src={store.image}
                alt={store.name}
                width={96}
                height={96}
                className="h-24 w-24 rounded-lg object-cover border"
              />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold truncate">{store.name}</h1>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                <span className="truncate">{store.address}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">{store.category}</Badge>
                {store.tags.map((t) => (
                  <Badge key={t} variant="outline">{t}</Badge>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Stars value={Math.round(avg)} />
                <div className="text-sm text-muted-foreground">{avg.toFixed(1)} • {reviews.length} avaliações</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            {store.website && (
              <Button onClick={() => window.open(store.website!, "_blank")}> <Globe className="mr-2 size-4" /> Visitar site da loja</Button>
            )}
          </div>
        </Card>

        <section>
          <div className="mb-2 text-sm font-medium">Avaliações</div>
          <div className="space-y-3">
            {reviews.map((r) => (
              <Card key={r.id} className="p-4">
                <div className="flex items-start gap-3">
                  {r.avatar ? (
                    <Image
                      src={r.avatar}
                      alt={r.user}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full border bg-muted" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium truncate">{r.user}</div>
                      <Stars value={r.rating} />
                    </div>
                    <p className="mt-1 text-sm text-foreground/90">{r.comment}</p>
                  </div>
                </div>
              </Card>
            ))}
            {reviews.length === 0 && (
              <Card className="p-6 text-center text-sm text-muted-foreground">Sem avaliações ainda.</Card>
            )}
          </div>
        </section>
      </div>

      <aside className="md:col-span-4 space-y-3">
        <Card className="p-4">
          <div className="text-sm font-medium mb-2">Informações</div>
          <div className="text-sm text-muted-foreground">Endereço</div>
          <div className="text-sm">{store.address}</div>
        </Card>
      </aside>
    </main>
  );
}
