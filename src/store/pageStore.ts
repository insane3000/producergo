
import { create } from "zustand";

interface PageStoreIT {
  page: number;
  setPage: any;
}

export const usePageStore = create<PageStoreIT>((set) => ({
  page: 2,
  setPage: (value: number) => set((state: PageStoreIT) => ({ ...state, page: value })),
}));
