"use client";

import { create } from "zustand";

type SnackbarState = {
  message: string | null;
  open: boolean;
  show: (msg: string) => void;
  hide: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: null,
  open: false,
  show: (msg) => set({ message: msg, open: true }),
  hide: () => set({ open: false }),
}));
