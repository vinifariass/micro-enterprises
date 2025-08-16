import { BusinessConfig } from '@/types/business';

// Configuração padrão do negócio - CUSTOMIZE AQUI
export const defaultBusinessConfig: BusinessConfig = {
  name: 'VFS Consultoria – Consultoria em Presença Digital e Sites',
  slogan: 'Excelência em cada detalhe',
  description:
    'Consultoria em presença digital e criação de sites. Falamos simples, entregamos rápido e com foco no resultado do seu negócio.',
  phone: '(21) 99147-9705',
  whatsapp: '5521991479705', // Número no formato internacional sem + e espaços
  email: 'contato@suaempresa.com.br',
  address: 'Rua Exemplo, 123 - Centro, São Paulo - SP',
  socialMedia: {
    facebook: 'https://facebook.com/suaempresa',
    instagram: 'https://instagram.com/suaempresa',
    linkedin: 'https://linkedin.com/in/viniciusfs32',
    github: 'https://github.com/vinifariass',
  },
  calendlyUrl: 'https://calendly.com/suaempresa/30min',
  services: [
    {
      id: '1',
      name: 'Serviço Premium',
      description:
        'Site profissional sob medida, com foco em performance, SEO e conversão. Inclui layout exclusivo, integrações essenciais (WhatsApp, Analytics, formulário), e suporte na publicação.',
      price: 'A partir de R$ 800 por site',
      details: [
        'Você manda sua logo, cores e ideia; nós montamos o layout por você',
        'O site abre rápido e funciona no celular (sem “gargalos” técnicos)',
        'Botão de WhatsApp e formulário para receber pedidos e dúvidas',
        'Configuração básica para aparecer bem no Google (SEO básico)',
        'Publicação assistida: ajudamos a colocar o site no ar',
      ],
    },
    {
      id: '2',
      name: 'Consultoria Especializada (presença digital)',
      description:
        'Reunião 1:1 para entender seu momento, revisar seu site/redes e montar um plano claro do que fazer (sem “tecniquês”).',
      price: 'R$ 199/hora',
      details: [
        'Análise do seu site/redes sociais com olhar de negócio',
        'Lista de melhorias priorizadas (o que fazer primeiro, segundo, etc.)',
        'Sugestões de ferramentas simples e acessíveis',
        'Acompanhamento por e‑mail com os próximos passos',
      ],
    },
    {
      id: '3',
      name: 'Pacote Completo',
      description:
        'Solução completa com tudo que você precisa para ter sucesso.',
      price: 'A partir de R$ 599',
      details: [
        'Site com mais páginas e conteúdo revisado para comunicar melhor',
        'Integrações extras (agenda, CRM, automações, etc.) quando fizer sentido',
        'Relatórios simples de visitas para entender seus resultados',
        'Se necessário, banco de dados básico (ex.: lista de interessados/leads)',
      ],
    },
  ],
  pricing: [
    {
      id: 'basic',
      name: 'Essencial',
      priceMonthly: 'R$ 800',
      priceMonthlyNumber: 800,
      description: 'Página única para apresentar seu negócio e receber contatos',
      features: [
        'Design profissional (visual bonito e limpo)',
        'Funciona bem no celular (mobile-first)',
        'Botão do WhatsApp para falar com você',
        'Formulário simples de contato (vai para seu e‑mail)',
        'Aparece bem no Google (SEO básico)',
      ],
      paymentLink: 'https://pagamento.exemplo/essencial',
    },
    {
      id: 'pro',
      name: 'Profissional',
      priceMonthly: 'R$ 1.500',
      priceMonthlyNumber: 1500,
      description: 'Site com várias seções e otimizado para velocidade e Google',
      features: [
        'Páginas: Home, Sobre, Serviços, Contato (podemos incluir mais)',
        'Site rápido (otimização de performance)',
        'Configurações do Google (OG/Sitemap/Robots) para melhor SEO',
        'Relatórios de visitas (Google Analytics)',
        'Suporte por 30 dias para ajustes simples',
      ],
      highlight: true,
      paymentLink: 'https://pagamento.exemplo/profissional',
    },
    {
      id: 'premium',
      name: 'Premium',
      priceMonthly: 'R$ 2.500',
      priceMonthlyNumber: 2500,
      description: 'Projeto sob medida, integrações e estrutura pronta para crescer',
      features: [
        'Estratégia e layout personalizados conforme seu objetivo',
        'Integrações extras (agenda, CRM, automações, etc.)',
        'Conteúdo revisado/otimizado (textos e chamadas mais claros)',
        'Banco de dados básico quando necessário (ex.: cadastro de leads)',
        'Hospedagem e domínio (opcional) + suporte prioritário',
      ],
      paymentLink: 'https://pagamento.exemplo/premium',
    },
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Ana Souza',
      role: 'Dona de Loja',
      quote:
        'Entrega rápida e um site lindo! Aumentei meus pedidos no WhatsApp.',
    },
    {
      id: 't2',
      name: 'Carlos Lima',
      role: 'Consultor',
      quote:
        'Profissionais, ágeis e atenciosos. Meu site ficou leve e moderno.',
    },
    {
      id: 't3',
      name: 'Mariana Prado',
      role: 'Nutricionista',
      quote: 'Em 3 dias estava no ar! Recebo contatos todos os dias.',
    },
  ],
  faqs: [
    {
      id: 'f1',
      question: 'Qual o prazo de entrega?',
      answer:
        'Landing page em 2-3 dias. Site completo em 5-10 dias, conforme escopo.',
    },
    {
      id: 'f2',
      question: 'O que preciso enviar?',
      answer:
        'Logo, textos, cores e fotos (se tiver). Nós ajudamos com o conteúdo.',
    },
    {
      id: 'f3',
      question: 'Vocês fazem manutenção?',
      answer: 'Sim. Oferecemos planos de manutenção e atualizações mensais.',
    },
  ],
  colors: {
    primary: '#2563eb', // blue-600
    secondary: '#1e40af', // blue-700
    accent: '#f59e0b', // amber-500
  },
};
