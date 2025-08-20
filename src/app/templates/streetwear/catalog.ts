import type { Variant } from "../ecommerce2/types";

export type Product = {
  id: string;
  name: string;
  price: number;
  tag?: string;
  image?: string; // primary image
  images?: string[]; // gallery images
  category?: "Apparel" | "Sneakers";
  variants?: Variant[]; // size/color SKUs
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
    category: 'Apparel',
    variants: [
      { sku: 'TEE-WORLD-BLK-P', size: 'P', color: 'Black', stock: 8 },
      { sku: 'TEE-WORLD-BLK-M', size: 'M', color: 'Black', stock: 4 },
      { sku: 'TEE-WORLD-BLK-G', size: 'G', color: 'Black', stock: 0 },
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
    category: 'Apparel',
    variants: [
      { sku: 'TEE-OPEN-BLK-P', size: 'P', color: 'Black', stock: 12 },
      { sku: 'TEE-OPEN-BLK-M', size: 'M', color: 'Black', stock: 6 },
      { sku: 'TEE-OPEN-BLK-G', size: 'G', color: 'Black', stock: 1 },
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
    category: 'Apparel',
    variants: [
      { sku: 'TEE-BAT-BLK-P', size: 'P', color: 'Black', stock: 2 },
      { sku: 'TEE-BAT-BLK-M', size: 'M', color: 'Black', stock: 0 },
      { sku: 'TEE-BAT-BLK-G', size: 'G', color: 'Black', stock: 5 },
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
    category: 'Sneakers',
    variants: [
      { sku: 'ADI-GREY-39', size: '39', color: 'Grey/Gum', stock: 1 },
      { sku: 'ADI-GREY-40', size: '40', color: 'Grey/Gum', stock: 7 },
      { sku: 'ADI-GREY-41', size: '41', color: 'Grey/Gum', stock: 0 },
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
    category: 'Sneakers',
    variants: [
      { sku: 'VANS-OLD-39', size: '39', color: 'Black/White', stock: 3 },
      { sku: 'VANS-OLD-40', size: '40', color: 'Black/White', stock: 2 },
      { sku: 'VANS-OLD-41', size: '41', color: 'Black/White', stock: 0 },
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
    category: 'Sneakers',
    variants: [
      { sku: 'NB-480-BW-39', size: '39', color: 'Black/White', stock: 4 },
      { sku: 'NB-480-BW-40', size: '40', color: 'Black/White', stock: 4 },
      { sku: 'NB-480-BW-41', size: '41', color: 'Black/White', stock: 2 },
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
    category: 'Sneakers',
    variants: [
      { sku: 'NB-480-BR-39', size: '39', color: 'Brown/White', stock: 0 },
      { sku: 'NB-480-BR-40', size: '40', color: 'Brown/White', stock: 3 },
      { sku: 'NB-480-BR-41', size: '41', color: 'Brown/White', stock: 5 },
    ],
  },
];

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
