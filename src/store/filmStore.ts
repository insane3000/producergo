import { FilmIT } from "@/json/data";
import { create } from "zustand";

interface FilmStoreIT {
  film: FilmIT;
  setFilm: any;
}

export const useFilmStore = create<FilmStoreIT>((set) => ({
  film: {
    id: 0,
    imdb_id: "",
    poster_path: "",
    title: "",
    original_title: "",
    date: "",
    budget: 0,
    revenue: 0,
    certification: "",
    folder: "",
    keywords: "",
  },
  setFilm: (data: FilmIT) => set((state: FilmStoreIT) => ({ ...state, film: data })),
}));
