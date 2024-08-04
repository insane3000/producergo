import { FilmIT } from "@/json/data";
import { create } from "zustand";

interface FilmStoreIT {
  film: FilmIT;
  setFilm: any;
}

export const useFilmStore = create<FilmStoreIT>((set) => ({
  film: {
    id: 0,
    poster_path: "",
    title: "",
    original_title: "",
    date: "",
    budget: 0,
    revenue: 0,
    certification: "",
    folder: "",
    tagline: "",
    runtime: 0,
    vote_average: 0,
  },
  setFilm: (data: FilmIT) => set((state: FilmStoreIT) => ({ ...state, film: data })),
}));
