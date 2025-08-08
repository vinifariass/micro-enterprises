import { defaultBusinessConfig } from '@/config/business';

export default function FAQ() {
  const { faqs } = defaultBusinessConfig;
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Dúvidas Frequentes</h2>
          <p className="text-gray-600 mt-3">Transparência e clareza em cada etapa</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.id} className="group border border-gray-200 rounded-xl p-4 open:bg-gray-50">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                {f.question}
                <span className="transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-gray-700 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
