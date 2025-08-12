export type Product = {
  id: string;
  name: string;
  price: number;
  tag?: string;
  image?: string; // primary image
  images?: string[]; // gallery images
};

// Expect images to exist under /public/images/streetwear with these filenames
export const PRODUCTS: Product[] = [
  {
    id: 'tee-worldwide',
    name: 'Worldwide Tee – Black',
    price: 149,
    tag: 'New',
    image: '/images/streetwear/tee-worldwide.jpg',
    images: [
      '/images/streetwear/tee-worldwide.jpg',
    ],
  },
  {
    id: 'tee-open-mind',
    name: 'Open Your Mind Tee – Washed Black',
    price: 159,
    image: '/images/streetwear/tee-open-mind.jpg',
    images: [
      '/images/streetwear/tee-open-mind.jpg',
    ],
  },
  {
    id: 'tee-batman',
    name: 'Batman Tee – Black',
    price: 139,
    image: '/images/streetwear/tee-batman.jpg',
    images: [
      '/images/streetwear/tee-batman.jpg',
    ],
  },
  {
    id: 'adidas-grey-gum',
    name: 'Adidas Sneaker – Grey/Gum',
    price: 699,
    image: '/images/streetwear/adidas-grey-gum.jpg',
    images: [
      '/images/streetwear/adidas-grey-gum.jpg',
    ],
  },
  {
    id: 'vans-old-skool',
    name: 'Vans Old Skool – Black/White',
    price: 459,
    image: '/images/streetwear/vans-old-skool.jpg',
    images: [
      '/images/streetwear/vans-old-skool.jpg',
    ],
  },
  {
    id: 'nb-480-bw',
    name: 'New Balance 480 – Black/White',
    price: 579,
    image: '/images/streetwear/nb-480-bw.jpg',
    images: [
      '/images/streetwear/nb-480-bw.jpg',
    ],
  },
  {
    id: 'nb-480-br',
    name: 'New Balance 480 – Brown/White',
    price: 579,
    image: '/images/streetwear/nb-480-br.jpg',
    images: [
      '/images/streetwear/nb-480-br.jpg',
    ],
  },
];

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
