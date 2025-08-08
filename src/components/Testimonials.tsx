import { defaultBusinessConfig } from '@/config/business';

export default function Testimonials() {
  const { testimonials } = defaultBusinessConfig;
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Clientes Felizes</h2>
          <p className="text-gray-600 mt-3">Resultados que falam por si</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-700 italic">“{t.quote}”</p>
              <div className="mt-4 text-sm text-gray-900 font-semibold">{t.name}</div>
              {t.role && <div className="text-xs text-gray-500">{t.role}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
