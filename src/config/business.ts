import { BusinessConfig } from '@/types/business';

// Configuração padrão do negócio - CUSTOMIZE AQUI
export const defaultBusinessConfig: BusinessConfig = {
  name: 'VFS Consultoria',
  slogan: 'Excelência em cada detalhe',
  description:
    'Oferecemos soluções profissionais de alta qualidade para seu negócio crescer e se destacar no mercado.',
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
        'Nosso serviço de maior qualidade, personalizado para suas necessidades específicas.',
      price: 'A partir de R$ 299',
    },
    {
      id: '2',
      name: 'Consultoria Especializada',
      description:
        'Análise completa e orientação profissional para otimizar seus resultados.',
      price: 'R$ 199/hora',
    },
    {
      id: '3',
      name: 'Pacote Completo',
      description:
        'Solução completa com tudo que você precisa para ter sucesso.',
      price: 'A partir de R$ 599',
    },
  ],
  pricing: [
    {
      id: 'basic',
      name: 'Essencial',
      priceMonthly: 'R$ 800',
      priceMonthlyNumber: 800,
      description: 'Site de 1 página (landing) com WhatsApp e contato',
      features: [
        'Design profissional',
        'Responsivo (mobile-first)',
        'WhatsApp integrado',
        'Formulário de contato',
        'SEO básico',
      ],
      paymentLink: 'https://pagamento.exemplo/essencial',
    },
    {
      id: 'pro',
      name: 'Profissional',
      priceMonthly: 'R$ 1.500',
      priceMonthlyNumber: 1500,
      description: 'Site completo com 4-6 seções e otimizações',
      features: [
        'Home, Sobre, Serviços, Contato',
        'Otimização de performance',
        'SEO avançado (OG/Sitemap/Robots)',
        'Integração Google Analytics',
        'Suporte de 30 dias',
      ],
      highlight: true,
      paymentLink: 'https://pagamento.exemplo/profissional',
    },
    {
      id: 'premium',
      name: 'Premium',
      priceMonthly: 'R$ 2.500',
      priceMonthlyNumber: 2500,
      description: 'Site sob medida com integrações extras',
      features: [
        'Páginas/Seções adicionais',
        'Integrações (agenda, CRM, etc.)',
        'Conteúdo otimizado',
        'Hospedagem e domínio (opcional)',
        'Suporte prioritário',
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
