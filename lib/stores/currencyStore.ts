// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrencyState = {
  baseCurrency: null | string;
  setBaseCurrency: (currency: string) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      baseCurrency: null,
      setBaseCurrency: (currency) => set(() => ({ baseCurrency: currency })),
    }),
    {
      name: 'currency-store',
      // Зберігаємо лише властивість draft
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
