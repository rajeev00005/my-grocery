"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./useCartStore";

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  tierDiscount: number;
  couponDiscount: number;
  total: number;
  timestamp: number;
};

type OrderState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
      clearOrders: () => set({ orders: [] }),
    }),
    { name: "orders-storage" }
  )
);
