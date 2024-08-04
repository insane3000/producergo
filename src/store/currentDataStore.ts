import { FilmIT } from "@/json/data";
import { create } from "zustand";

interface CurrentDataStoreIT {
  currentData: FilmIT[];
  setCurrentData: any;
}

export const useCurrentDataStore = create<CurrentDataStoreIT>((set) => ({
  currentData: [],
  setCurrentData: (data: FilmIT[]) => set((state: CurrentDataStoreIT) => ({ ...state, currentData: data })),
}));
