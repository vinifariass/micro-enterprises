import { BusinessConfig } from "@/types/business";

// Configuracao padrao do negocio - customize aqui
export const defaultBusinessConfig: BusinessConfig = {
  name: "VFS Consultoria - Presenca Digital e Sites",
  slogan: "Excelencia em cada detalhe",
  description:
    "Consultoria em presenca digital e criacao de sites. Falamos simples, entregamos rapido e com foco no resultado do seu negocio.",
  phone: "(21) 99147-9705",
  whatsapp: "5521991479705",
  email: "contato@suaempresa.com.br",
  address: "Rua Exemplo, 123 - Centro, Sao Paulo - SP",
  socialMedia: {
    facebook: "https://facebook.com/suaempresa",
    instagram: "https://instagram.com/suaempresa",
    linkedin: "https://linkedin.com/in/viniciusfs32",
    github: "https://github.com/vinifariass",
  },
  calendlyUrl: "https://calendly.com/suaempresa/30min",
  services: [
    {
      id: "1",
      name: "Site Premium sob medida",
      description:
        "Site profissional focado em performance, SEO basico e conversao. Inclui layout exclusivo, integracoes essenciais (WhatsApp, analytics, formulario) e suporte na publicacao.",
      price: "A partir de R$ 800 por site",
      details: [
        "Voce envia logo, cores e ideia; nos montamos o layout por voce",
        "Site rapido que funciona bem no celular",
        "Botao de WhatsApp e formulario para receber pedidos e duvidas",
        "Configuracao basica para aparecer no Google",
        "Acompanhamos a publicacao para deixar tudo no ar",
      ],
    },
    {
      id: "2",
      name: "Consultoria de presenca digital",
      description:
        "Reuniao individual para entender sua fase, revisar site e redes e montar um plano claro de proximos passos (sem palavroes tecnicos).",
      price: "R$ 199 por hora",
      details: [
        "Analise do site e redes com olhar de negocio",
        "Lista de melhorias priorizadas",
        "Sugestoes de ferramentas simples",
        "Resumo por e-mail com o passo a passo",
      ],
    },
    {
      id: "3",
      name: "Pacote completo",
      description: "Solucao com tudo o que voce precisa para vender online sem complicacao.",
      price: "A partir de R$ 1.200",
      details: [
        "Site com mais paginas e conteudo revisado",
        "Integracoes extras (agenda, CRM, automacoes) quando fizer sentido",
        "Relatorios simples de visitas",
        "Cadastro basico de leads quando necessario",
      ],
    },
  ],
  pricing: [
    {
      id: "basic",
      name: "Essencial",
      priceMonthly: "R$ 800",
      priceMonthlyNumber: 800,
      description: "Pagina unica para apresentar seu negocio e captar contatos",
      features: [
        "Design profissional",
        "Mobile-first",
        "Botao do WhatsApp",
        "Formulario simples de contato",
        "SEO basico",
      ],
      paymentLink: "https://pagamento.exemplo/essencial",
    },
    {
      id: "pro",
      name: "Profissional",
      priceMonthly: "R$ 1.500",
      priceMonthlyNumber: 1500,
      description: "Site com varias secoes otimizado para velocidade e Google",
      features: [
        "Paginas Home, Sobre, Servicos e Contato",
        "Performance otimizada",
        "Configuracoes completas de Google",
        "Relatorios via Google Analytics",
        "Suporte por 30 dias",
      ],
      highlight: true,
      paymentLink: "https://pagamento.exemplo/profissional",
    },
    {
      id: "premium",
      name: "Premium",
      priceMonthly: "R$ 2.500",
      priceMonthlyNumber: 2500,
      description: "Projeto sob medida com integracoes e estrutura pronta para crescer",
      features: [
        "Estrategia e layout personalizados",
        "Integracoes extras (agenda, CRM, automacoes)",
        "Conteudo revisado",
        "Cadastro de leads",
        "Suporte prioritario",
      ],
      paymentLink: "https://pagamento.exemplo/premium",
    },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Ana Souza",
      role: "Dona de loja",
      quote: "Entrega rapida e site bonito. Aumentei pedidos no WhatsApp em poucos dias.",
    },
    {
      id: "t2",
      name: "Carlos Lima",
      role: "Consultor",
      quote: "Profissionais, ageis e atenciosos. Meu site ficou leve e moderno.",
    },
    {
      id: "t3",
      name: "Mariana Prado",
      role: "Nutricionista",
      quote: "Em menos de uma semana estava tudo no ar. Hoje recebo contatos todos os dias.",
    },
  ],
  faqs: [
    {
      id: "f1",
      question: "Qual o prazo de entrega?",
      answer: "Landing page em 2 a 3 dias. Site completo em ate 10 dias, conforme escopo.",
    },
    {
      id: "f2",
      question: "O que preciso enviar?",
      answer: "Logo, textos base, cores e fotos se tiver. Ajudamos a transformar em conteudo claro.",
    },
    {
      id: "f3",
      question: "Vocês fazem manutencao?",
      answer: "Sim. Oferecemos planos mensais para atualizar e cuidar do site.",
    },
  ],
  colors: {
    primary: "#2563eb",
    secondary: "#1e40af",
    accent: "#f59e0b",
  },
};

