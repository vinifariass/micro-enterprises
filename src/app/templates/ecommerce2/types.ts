export type Variant = {
  sku: string;
  size?: string; // e.g., P, M, G, 38, 40
  color?: string; // e.g., Black, White
  stock: number;
  priceOverride?: number; // optional price for this variant
};

export type Category =
  | "Apparel"
  | "Sneakers"
  | "Accessories"
  | "Electronics";

export type Coupon = {
  code: string; // e.g., WELCOME10
  // flat or percent discount; if both provided, apply percent first then flat
  percentOff?: number; // 10 means 10%
  amountOff?: number; // in BRL
  // Optional scoping: by category or product ids
  categories?: Category[];
  productIds?: string[];
  minSubtotal?: number; // apply only if subtotal >= min
  startsAt?: string; // ISO date
  endsAt?: string; // ISO date
  maxRedemptions?: number; // demo only, non-persistent
};

export type PromotionRule = {
  id: string;
  description: string;
  categories?: Category[];
  productIds?: string[];
  percentOff?: number;
  amountOff?: number;
  active?: boolean;
};
