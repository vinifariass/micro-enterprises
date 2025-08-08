import { defaultBusinessConfig } from '@/config/business';

export default function Hero() {
  const { name, slogan, description, whatsapp, calendlyUrl } = defaultBusinessConfig;
  
  const whatsappUrl = `https://wa.me/${whatsapp}?text=Olá! Gostaria de mais informações sobre os serviços.`;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {name}
            </h1>
            
            <p className="text-xl sm:text-2xl text-blue-600 font-semibold mb-6">
              {slogan}
            </p>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.69"/>
                </svg>
                Fale Conosco no WhatsApp
              </a>
              
              <a
                href="#services"
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
              >
                Nossos Serviços
              </a>
              {calendlyUrl && (
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                >
                  Agendar Chamada
                </a>
              )}
            </div>
          </div>

          {/* Features Icons */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualidade Garantida</h3>
                <p className="text-gray-600">Excelência em cada projeto entregue</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
                <p className="text-gray-600">Prazos cumpridos rigorosamente</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Suporte Total</h3>
                <p className="text-gray-600">Atendimento personalizado sempre</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
      </div>
    </section>
  );
}
