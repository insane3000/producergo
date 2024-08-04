
import { create } from "zustand";

interface SearchStoreIT {
  search: string;
  setSearch: any;
}

export const useSearchStore = create<SearchStoreIT>((set) => ({
  search: "",
  setSearch: (value: "") => set((state: SearchStoreIT) => ({ ...state, search: value })),
}));
