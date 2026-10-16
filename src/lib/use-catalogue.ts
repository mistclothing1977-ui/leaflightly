'use client';

// Client-side access to the full catalogue (curated + approved feed products).
// Starts with the curated list so the first render is never empty, then swaps in
// the full list from /api/catalogue. Requests are shared across components.
import { useEffect, useState } from 'react';
import { products as curatedProducts, type Product } from '@/data/products';

let cached: Product[] | null = null;
let request: Promise<Product[]> | null = null;

function loadCatalogue(): Promise<Product[]> {
  if (!request) {
    request = fetch('/api/catalogue')
      .then((res) => (res.ok ? (res.json() as Promise<Product[]>) : curatedProducts))
      .catch(() => curatedProducts)
      .then((list) => {
        cached = list;
        return list;
      });
  }
  return request;
}

export function useCatalogue(): Product[] {
  const [items, setItems] = useState<Product[]>(cached ?? curatedProducts);

  useEffect(() => {
    let active = true;
    loadCatalogue().then((list) => {
      if (active) setItems(list);
    });
    return () => {
      active = false;
    };
  }, []);

  return items;
}
