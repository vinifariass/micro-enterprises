import { defaultBusinessConfig } from '@/config/business';

export default function About() {
  const { name } = defaultBusinessConfig;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sobre a {name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conheça nossa história, valores e compromisso com a excelência
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Nossa História e Missão
              </h3>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Há anos no mercado, a <strong className="text-gray-900">{name}</strong> tem 
                  se dedicado a oferecer soluções de alta qualidade que realmente fazem a diferença 
                  na vida dos nossos clientes.
                </p>
                
                <p>
                  Nossa missão é simples: entregar excelência em cada projeto, superando expectativas 
                  e construindo relacionamentos duradouros baseados na confiança e no profissionalismo.
                </p>
                
                <p>
                  Acreditamos que cada cliente é único, por isso personalizamos nossos serviços 
                  para atender às necessidades específicas de cada projeto, garantindo resultados 
                  que realmente importam.
                </p>
              </div>

              {/* Valores */}
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Nossos Valores</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Qualidade</h5>
                      <p className="text-sm text-gray-600">Excelência em cada detalhe</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Confiança</h5>
                      <p className="text-sm text-gray-600">Transparência total</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Inovação</h5>
                      <p className="text-sm text-gray-600">Sempre evoluindo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Agilidade</h5>
                      <p className="text-sm text-gray-600">Prazos respeitados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagem/Ilustração */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                {/* Placeholder para imagem - substitua pela imagem da empresa */}
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m-4 0h2m2 0h2m5 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Experiência Comprovada</h4>
                    <p className="text-gray-600 mb-6">Anos de mercado atendendo clientes satisfeitos</p>
                    
                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">100+</div>
                        <div className="text-sm text-gray-600">Projetos</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">98%</div>
                        <div className="text-sm text-gray-600">Satisfação</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
