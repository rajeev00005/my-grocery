import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useSnackbarStore } from "./useSnackbarStore";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  qty: number;
};

type Coupon = {
  code: string;
  percent?: number;
  amount?: number;
};

type CartState = {
  items: CartItem[];
  coupon: Coupon | null;
  history: CartItem[][];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clearCart: () => void;
  undo: () => void;
  applyCoupon: (code: string) => boolean;
};

const COUPONS: Coupon[] = [
  { code: "FLAT10", percent: 10 },
  { code: "FLAT50", amount: 50 },
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      history: [],

      addItem: (item) => {
        const snackbar = useSnackbarStore.getState();
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          const newItems = existing
            ? state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i
              )
            : [...state.items, { ...item, qty: 1 }];

          snackbar.show(`${item.name} added to cart`);
          return { items: newItems, history: [...state.history, state.items] };
        });
      },

      removeItem: (id) => {
        const snackbar = useSnackbarStore.getState();
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          const newItems = state.items.filter((i) => i.id !== id);
          if (item) snackbar.show(`${item.name} removed from cart`);
          return { items: newItems, history: [...state.history, state.items] };
        });
      },

      setQty: (id, qty) => {
        const snackbar = useSnackbarStore.getState();
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;

          let newItems: CartItem[];
          if (qty <= 0) {
            newItems = state.items.filter((i) => i.id !== id);
            snackbar.show(`${item.name} removed from cart`);
          } else {
            newItems = state.items.map((i) =>
              i.id === id ? { ...i, qty } : i
            );
            snackbar.show(`${item.name} quantity updated`);
          }

          return { items: newItems, history: [...state.history, state.items] };
        });
      },

      clearCart: () => {
        const snackbar = useSnackbarStore.getState();
        set((state) => {
          snackbar.show("Cart cleared");
          return { items: [], history: [...state.history, state.items] };
        });
      },

      undo: () => {
        const snackbar = useSnackbarStore.getState();
        set((state) => {
          if (state.history.length === 0) return state;
          const prev = state.history[state.history.length - 1];
          snackbar.show("Undo last action");
          return {
            items: prev,
            history: state.history.slice(0, -1),
          };
        });
      },

      applyCoupon: (code) => {
        const snackbar = useSnackbarStore.getState();
        const found = COUPONS.find((c) => c.code === code.toUpperCase());
        if (found) {
          set({ coupon: found });
          snackbar.show(`Coupon ${code} applied`);
          return true;
        }
        return false;
      },
    }),
    { name: "cart-storage" }
  )
);
