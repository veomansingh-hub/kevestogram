export interface PricingPlan {
  id: 'standard' | 'premium' | 'vip';
  name: string;
  price: string;
  currency: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'standard',
    name: 'Стандарт (Standard)',
    price: '250',
    currency: 'BYN'
  },
  {
    id: 'premium',
    name: 'Премиум (Premium)',
    price: '450',
    currency: 'BYN'
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '950',
    currency: 'BYN'
  }
];
