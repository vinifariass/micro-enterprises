// Tipos para customização do site
export interface BusinessConfig {
  name: string;
  slogan: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  github?: string;
  };
  calendlyUrl?: string;
  services: Service[];
  pricing: PricingPlan[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  image?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: string;
  description: string;
  features: string[];
  highlight?: boolean;
  priceMonthlyNumber?: number; // valor numérico para checkout
  paymentLink?: string; // link direto (PagSeguro, Mercado Pago, Stripe)
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
