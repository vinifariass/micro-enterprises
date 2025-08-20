export type StoreCategory = "fashion" | "electronics" | "groceries" | "home" | "sports";

export type Store = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: StoreCategory;
  tags: string[];
  address: string;
  whatsapp?: string; // E.164 sem +
  image?: string;
  website?: string;
};

export type Review = {
  id: string;
  user: string;
  avatar?: string;
  rating: number; // 1-5
  comment: string;
  date?: string;
};

export const stores: Store[] = [
  { id: "s1", name: "Vini Fashion Hub", lat: -23.561, lng: -46.655, category: "fashion", tags: ["streetwear", "sneakers"], address: "Av. Paulista, 100 - São Paulo", whatsapp: "5521990000001", image: "/images/streetwear/adidas-grey-gum.jpg", website: "https://exemplo-fashion.com" },
  { id: "s2", name: "Tech & Gadgets Center", lat: -23.5625, lng: -46.652, category: "electronics", tags: ["smartphones", "audio"], address: "R. Haddock Lobo, 200 - São Paulo", whatsapp: "5521990000002", image: "/images/streetwear/nb-480-br.jpg", website: "https://exemplo-tech.com" },
  { id: "s3", name: "Green Market Groceries", lat: -23.565, lng: -46.66, category: "groceries", tags: ["organic", "fresh"], address: "Al. Santos, 500 - São Paulo", whatsapp: "5521990000003", image: "/images/streetwear/tee-worldwide.jpg", website: "https://exemplo-groceries.com" },
  { id: "s4", name: "Home Decor Loft", lat: -23.559, lng: -46.649, category: "home", tags: ["furniture", "lighting"], address: "R. Augusta, 1200 - São Paulo", whatsapp: "5521990000004", image: "/images/streetwear/tee-open-mind.jpg", website: "https://exemplo-home.com" },
  { id: "s5", name: "Sports Arena Store", lat: -23.567, lng: -46.658, category: "sports", tags: ["running", "fitness"], address: "Av. Rebouças, 1500 - São Paulo", whatsapp: "5521990000005", image: "/images/streetwear/vans-old-skool.jpg", website: "https://exemplo-sports.com" },
];

export const storeReviews: Record<string, Review[]> = {
  s1: [
    { id: "r1", user: "Ana Souza", rating: 5, comment: "Ótimo atendimento e produtos de qualidade!", avatar: "https://i.pravatar.cc/64?img=1" },
    { id: "r2", user: "Carlos Lima", rating: 4, comment: "Coleção bem atual, recomendo.", avatar: "https://i.pravatar.cc/64?img=2" },
  ],
  s2: [
    { id: "r3", user: "Mariana Costa", rating: 5, comment: "Equipe super atenciosa, variedade top.", avatar: "https://i.pravatar.cc/64?img=3" },
    { id: "r4", user: "João Paulo", rating: 3, comment: "Preço poderia ser melhor, mas tem coisas boas.", avatar: "https://i.pravatar.cc/64?img=4" },
  ],
  s3: [
    { id: "r5", user: "Fernanda", rating: 4, comment: "Produtos frescos e orgânicos, gostei bastante.", avatar: "https://i.pravatar.cc/64?img=5" },
  ],
  s4: [
    { id: "r6", user: "Rafael", rating: 5, comment: "Peças lindas, deu um up na minha sala.", avatar: "https://i.pravatar.cc/64?img=6" },
  ],
  s5: [
    { id: "r7", user: "Beatriz", rating: 4, comment: "Boa variedade de tênis para corrida.", avatar: "https://i.pravatar.cc/64?img=7" },
  ],
};

export function getStoreById(id: string): Store | undefined {
  return stores.find((s) => s.id === id);
}
