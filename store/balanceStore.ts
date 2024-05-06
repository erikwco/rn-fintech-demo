import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";

// Define el objeto tipo transacción
export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  title: string;
}

// Operaciones sobre las transacciones
export interface BalanceState {
  transactions: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}

// Store persistido en zustand
export const useBalanceStore = create<BalanceState>()(
  devtools(
    persist((set, get) => ({
      transactions: [],
      runTransaction: (transaction: Transaction) => {
        set((state) => ({ transactions: [...state.transactions, transaction] }));
      },
      balance: () => {
        return get().transactions.reduce((total, transaction) => total + transaction.amount, 0);
      },
      clearTransactions: () => {
        set({ transactions: [] });
      }
    }), {
      name: 'balance',
      storage: createJSONStorage(() => zustandStorage),
    }))
);


// balance: () => 0,

// balance: () => {
//   return get().transactions.reduce((total, transaction) => total + transaction.amount, 0);
// },


