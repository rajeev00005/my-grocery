type Tier = { threshold: number; percent: number };

const DISCOUNT_TIERS: Tier[] = [
  { threshold: 500, percent: 20 },
  { threshold: 300, percent: 15 },
  { threshold: 150, percent: 10 },
];

export function getTierDiscountPercent(subtotal: number) {
  for (const tier of DISCOUNT_TIERS) {
    if (subtotal >= tier.threshold) return tier.percent;
  }
  return 0;
}

export function computeTotals(
  items: { price: number; qty: number }[],
  coupon?: { percent?: number; amount?: number } | null
) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const tierPercent = getTierDiscountPercent(subtotal);
  const tierDiscount = Math.round((tierPercent / 100) * subtotal);

  let afterTier = subtotal - tierDiscount;

  let couponDiscount = 0;
  if (coupon) {
    if (coupon.percent) couponDiscount = Math.round((coupon.percent / 100) * afterTier);
    if (coupon.amount) couponDiscount = Math.min(coupon.amount, afterTier);
  }

  const total = Math.max(0, afterTier - couponDiscount);

  return { subtotal, tierDiscount, couponDiscount, total, tierPercent };
}
