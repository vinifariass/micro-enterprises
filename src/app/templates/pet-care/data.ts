export type Caretaker = {
  id: string;
  name: string;
  photo: string;
  description: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  tags: string[];
  latitude: number;
  longitude: number;
  distanceKm: number;
  priceLevel: "budget" | "standard" | "premium";
  availability: string[];
  reviews: Array<{
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
};

export const CARETAKERS: Caretaker[] = [
  {
    id: "sofia-silva",
    name: "Sofia Silva",
    photo: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=60",
    description:
      "Cuidadora certificada, mora em apartamento amplo com sacada e faz duas caminhadas por dia. Atualiza os tutores com fotos e videos.",
    hourlyRate: 45,
    rating: 4.9,
    totalReviews: 68,
    tags: ["gatos", "caes pequenos", "banho"],
    latitude: -23.5589,
    longitude: -46.6625,
    distanceKm: 1.2,
    priceLevel: "standard",
    availability: ["Seg a Sex", "Sabados"],
    reviews: [
      {
        author: "Julia M.",
        rating: 5,
        comment: "Recebi atualizacoes todos os dias e meu gato voltou super tranquilo.",
        date: "Mar 2025",
      },
      {
        author: "Carlos P.",
        rating: 5,
        comment: "Atenciosa e pontual, recomendo para quem precisa viajar sem preocupacao.",
        date: "Fev 2025",
      },
    ],
  },
  {
    id: "marcos-rocha",
    name: "Marcos Rocha",
    photo: "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&fit=crop&w=400&q=60",
    description:
      "Dog walker e sitter com experiencia em adestramento basico. Recebe caes de porte medio em casa com quintal.",
    hourlyRate: 60,
    rating: 4.8,
    totalReviews: 52,
    tags: ["adestramento", "caes medios", "passeios"],
    latitude: -23.5632,
    longitude: -46.6451,
    distanceKm: 2.4,
    priceLevel: "premium",
    availability: ["Todos os dias", "Plantao feriados"],
    reviews: [
      {
        author: "Renata L.",
        rating: 5,
        comment: "Meu husky voltou obediente e bem cansado dos passeios, perfeito!",
        date: "Abr 2025",
      },
      {
        author: "Diego F.",
        rating: 4,
        comment: "Espaco amplo e limpo, so senti falta de mais fotos durante o dia.",
        date: "Jan 2025",
      },
    ],
  },
  {
    id: "aline-castro",
    name: "Aline Castro",
    photo: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=60",
    description:
      "Especialista em felinos, oferece ambiente calmo e enriquecido com arranhadores e prateleiras. Possui curso de primeiros socorros pet.",
    hourlyRate: 40,
    rating: 5,
    totalReviews: 33,
    tags: ["gatos", "primeiros socorros"],
    latitude: -23.5478,
    longitude: -46.6346,
    distanceKm: 0.9,
    priceLevel: "budget",
    availability: ["Seg a Sex", "Domingos"],
    reviews: [
      {
        author: "Mariana V.",
        rating: 5,
        comment: "Minha gata precisa de medicacoes e a Aline cuidou perfeitamente.",
        date: "Dez 2024",
      },
      {
        author: "Lucas A.",
        rating: 5,
        comment: "Atencao aos detalhes e muita paciencia com gatos mais timidos.",
        date: "Nov 2024",
      },
    ],
  },
  {
    id: "thiago-alves",
    name: "Thiago Alves",
    photo: "https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=400&q=60",
    description:
      "Cuidados personalizados para caes idosos e com necessidades especiais. Permanece na casa do tutor se necessario.",
    hourlyRate: 55,
    rating: 4.7,
    totalReviews: 41,
    tags: ["idosos", "medicacao", "hospedagem em domicilio"],
    latitude: -23.5412,
    longitude: -46.6201,
    distanceKm: 3.1,
    priceLevel: "standard",
    availability: ["Plantao 24h", "Finais de semana"],
    reviews: [
      {
        author: "Elaine G.",
        rating: 5,
        comment: "Confiamos ao Thiago o nosso labrador senior, ele seguiu todas as orientacoes medicas.",
        date: "Fev 2025",
      },
      {
        author: "Paulo H.",
        rating: 4,
        comment: "Resposta rapida e boas atualizacoes, so os horarios que esgotam rapido.",
        date: "Jan 2025",
      },
    ],
  },
];
