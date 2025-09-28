"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { CARETAKERS } from "../data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type CaretakerDetailProps = {
  id: string;
};

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={cn("size-4", index < Math.round(value) ? "fill-current" : "fill-slate-200 text-slate-300") } />
      ))}
      <span className="ml-2 text-sm font-semibold text-slate-700">{value.toFixed(1)}</span>
    </div>
  );
}

export function CaretakerDetail({ id }: CaretakerDetailProps) {
  const caretaker = CARETAKERS.find((item) => item.id === id);
  if (!caretaker) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-50">
        <div className="container mx-auto max-w-4xl space-y-6 px-4 py-16 sm:px-6 lg:px-10">
          <Link href="/templates/pet-care" className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900">
            <ArrowLeft className="size-4" /> Voltar para a busca
          </Link>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">{caretaker.name}</h1>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-600">R$ {caretaker.hourlyRate}/hora</span>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-600">{caretaker.distanceKm.toFixed(1)} km</span>
              </div>
              <Rating value={caretaker.rating} />
              <p className="text-sm leading-relaxed text-slate-600">{caretaker.description}</p>
              <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                {caretaker.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-300 bg-white px-3 py-1">{tag}</span>
                ))}
              </div>
            </div>
            <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-slate-200">
              <img src={caretaker.photo} alt={caretaker.name} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800">Reservar cuidador</Button>
            <Button variant="outline" className="rounded-full border-slate-400 px-6 text-sm text-slate-700">Enviar mensagem</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-10">
        <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Card className="border-slate-200 bg-white/90">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Disponibilidade</h2>
              <p className="text-sm text-slate-600">A agenda e flexivel. Horarios mais disputados sao reservados com pelo menos 48h de antecedencia.</p>
              <div className="flex flex-wrap gap-2">
                {caretaker.availability.map((slot) => (
                  <span key={slot} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">
                    {slot}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Politicas e extras</h2>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>- Atualizacoes diarias com fotos e videos via WhatsApp</li>
                <li>- Inclusao de passeio ou brincadeiras personalizadas</li>
                <li>- Medicacao administrada conforme prescricao</li>
                <li>- Cancelamentos gratuitos ate 24h antes da hospedagem</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Comentarios de outros tutores</h2>
          <div className="space-y-4">
            {caretaker.reviews.map((review, index) => (
              <Card key={index} className="border-slate-200 bg-white/90">
                <CardContent className="flex flex-col gap-2 p-6">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">{review.author}</span>
                    <span>{review.date}</span>
                  </div>
                  <Rating value={review.rating} />
                  <p className="text-sm text-slate-600">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-slate-200 bg-white/90">
            <CardContent className="space-y-3 p-6">
              <h3 className="text-sm font-semibold text-slate-900">Deixe um comentario</h3>
              <textarea
                className="h-24 w-full rounded-2xl border border-slate-300 p-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-300"
                placeholder="Conte como foi a experiencia com este cuidador"
              />
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span>Avaliacao rapida:</span>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-slate-200 text-slate-300" />
                  ))}
                </div>
              </div>
              <Button className="rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800">Enviar comentario</Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}



