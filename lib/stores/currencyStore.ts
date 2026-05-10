// lib\stores\currencyStore.ts
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Rate = [string, number];

type CurrencyState = {
  baseCurrency: null | string;
  setBaseCurrency: (currency: string) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  exchangeInfo: null | ExchangeInfo;
  setExchangeInfo: (state: null | ExchangeInfo) => void;
  isLoading: boolean;
  setLoading: (state: boolean) => void;
  isError: boolean;
  setError: (state: boolean) => void;
  rates: Rate[];
  setRates: (state: Rate[]) => void;
};

export type ExchangeInfo = {
  rate: number;
  result: number;
  amount: number;
  from: string;
  to: string;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      baseCurrency: null,
      setBaseCurrency: (currency) => set(() => ({ baseCurrency: currency })),
      exchangeInfo: null,
      setExchangeInfo: (state) => set({ exchangeInfo: state }),
      isLoading: false,
      setLoading: (state) => set({ isLoading: state }),
      isError: false,
      setError: (state) => set({ isError: state }),
      rates: [],
      setRates: (state) => set({ rates: state }),
    }),
    {
      name: 'currency-store',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
