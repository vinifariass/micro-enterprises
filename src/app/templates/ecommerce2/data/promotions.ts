import type { Coupon, PromotionRule } from "../types";

export const COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    percentOff: 10,
    minSubtotal: 100,
    startsAt: "2024-01-01",
    endsAt: "2030-01-01",
  },
  {
    code: "FRETEGRATIS",
    amountOff: 20, // use to simulate shipping off
    minSubtotal: 150,
  },
  {
    code: "APPAREL15",
    percentOff: 15,
    categories: ["Apparel"],
  },
];

export const PROMOTIONS: PromotionRule[] = [
  {
    id: "buy-more-sneakers",
    description: "5% off Sneakers collection",
    categories: ["Sneakers"],
    percentOff: 5,
    active: true,
  },
];
