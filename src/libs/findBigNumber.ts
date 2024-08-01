export function findBigNumber(arr: any, value: number) {
  const data = arr.map((i: any) => i.close - 5620);
  if (data.length === 0) {
    return undefined; // Manejar el caso de un array vacío
  }

  let bigNumber = data[0]; // Suponemos que el primer elemento es el mayor

  for (let i = 1; i < data.length; i++) {
    if (data[i] > bigNumber) {
      bigNumber = data[i]; // Si encontramos un número mayor, lo asignamos como el nuevo número mayor
    }
  }

  const result = (value * 100) / bigNumber;

  return result;
}
