import { FilmIT } from "@/json/data";
import { performance } from "./performance";

export const word = (percentage: number) => {
  switch (true) {
    case percentage <= 100:
      return "mal rendimiento";
    case percentage > 100 && percentage <= 300:
      return "rendimiento moderado ";
    case percentage > 300 && percentage <= 400:
      return "buen rendimiento";
    case percentage > 400:
      return "extraordinario rendimiento";
  }
};
export const prompt = (film: FilmIT | undefined) => {
  const percentage = performance(film?.budget || 0, film?.revenue || 0);

  return `
  Razones por el ${word(percentage)} financiero de la película ${film?.title} de ${new Date(
    film?.date || 0
  ).getFullYear()},
  teniendo en cuenta que su presupuesto fue ${film?.budget} USD y su recaudacion fue ${film?.revenue} USD?
  Asegúrate de responder en español.
  `;
};
