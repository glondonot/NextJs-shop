import { Product } from "../data/products";

export type CartItem = Product & { quantity: number };

export type OptimizeResponse = {
  selectedItems: CartItem[];
  total: number;
};

export function findBestCombination(inputProducts: (Product | CartItem)[], budgetInput: number): OptimizeResponse {
  const budget = Math.floor(budgetInput);
  if (budget <= 0) return { selectedItems: [], total: 0 };

  type Item = { productId: number; price: number; originalProduct: Product | CartItem };
  const items: Item[] = [];

  for (const p of inputProducts) {
    const qty = (p as CartItem).quantity ?? 1;
    for (let i = 0; i < qty; i++) {
      items.push({ productId: p.id, price: Math.floor((p as any).price), originalProduct: p });
    }
  }

  if (items.length === 0) return { selectedItems: [], total: 0 };

  const prevSum = new Array<number>(budget + 1).fill(-1);
  const choiceIdx = new Array<number>(budget + 1).fill(-1);
  prevSum[0] = -2;

  for (let i = 0; i < items.length; i++) {
    const p = items[i].price;
    if (p > budget) continue;
    for (let s = budget; s >= p; s--) {
      if (prevSum[s] === -1 && prevSum[s - p] !== -1) {
        prevSum[s] = s - p;
        choiceIdx[s] = i;
      }
    }
  }

  let best = -1;
  for (let s = budget; s >= 0; s--) {
    if (prevSum[s] !== -1) { best = s; break; }
  }
  if (best <= 0) return { selectedItems: [], total: 0 };

  const usedItems: Item[] = [];
  let s = best;
  while (s > 0) {
    const idx = choiceIdx[s];
    if (idx === -1) break;
    usedItems.push(items[idx]);
    s = prevSum[s];
  }

  const map = new Map<number, { originalProduct: Product | CartItem; quantity: number }>();
  for (const ui of usedItems) {
    const existing = map.get(ui.productId);
    if (existing) existing.quantity += 1;
    else map.set(ui.productId, { originalProduct: ui.originalProduct, quantity: 1 });
  }

  const selectedItems: CartItem[] = [];
  let total = 0;
  map.forEach((v) => {
    const cartItem: CartItem = {
      ...v.originalProduct,
      quantity: v.quantity
    };
    selectedItems.push(cartItem);
    total += cartItem.price * cartItem.quantity;
  });

  return { selectedItems, total };
}