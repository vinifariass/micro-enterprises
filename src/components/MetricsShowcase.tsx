'use client';

import { useEffect, useState } from 'react';

type Metric = { label: string; value: number; target: number };
type SessionsResponse = { ok: boolean; sessions?: number; error?: string };

export default function MetricsShowcase() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'Visitas recentes (7 dias)', value: 0, target: 0 },
    { label: 'Leads gerados', value: 0, target: 32 },
    { label: 'Cliques no WhatsApp', value: 0, target: 54 },
    { label: 'Conversões (sites)', value: 0, target: 7 },
  ]);

  useEffect(() => {
    let raf = requestAnimationFrame(step);
    function step() {
      setMetrics((ms) =>
        ms.map((m) => {
          if (m.value < m.target) {
            const inc = Math.ceil((m.target - m.value) / 12);
            return { ...m, value: Math.min(m.target, m.value + inc) };
          }
          return m;
        })
      );
      raf = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(raf);
  }, []);

  // Fetch GA4 sessions for last 7 days
  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        const res = await fetch('/api/metrics/ga-sessions', { cache: 'no-store' });
        const data: SessionsResponse = await res.json();
        if (!aborted && data) {
          const sessions = Number(data.sessions ?? 0);
          setMetrics((ms) => {
            if (!Array.isArray(ms) || ms.length === 0) return ms;
            const copy = [...ms];
            copy[0] = { ...copy[0], target: Number.isFinite(sessions) ? sessions : 0 };
            return copy;
          });
        }
      } catch (err) {
        // keep mocked 0 if request fails
        console.error('Metrics fetch error', err);
      }
    })();
    return () => {
      aborted = true;
    };
  }, []);

  const dashboard = process.env.NEXT_PUBLIC_DASHBOARD_EMBED_URL;

  return (
    <section className="py-16 bg-white" id="metrics">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Resultados em números</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          {metrics.map((m) => (
            <div key={m.label} className="text-center p-5 rounded-xl bg-gray-50 border">
              <div className="text-3xl font-extrabold text-gray-900">
                {m.value.toLocaleString('pt-BR')}
              </div>
              <div className="mt-1 text-sm text-gray-600">{m.label}</div>
            </div>
          ))}
        </div>
        {dashboard ? (
          <div className="rounded-lg overflow-hidden border">
            <iframe
              src={dashboard}
              className="w-full h-[420px]"
              loading="lazy"
              title="Dashboard de métricas"
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Configure NEXT_PUBLIC_DASHBOARD_EMBED_URL no .env para embutir um painel real (Looker Studio).
          </p>
        )}
      </div>
    </section>
  );
}
