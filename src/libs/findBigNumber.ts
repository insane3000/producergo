export function findBigNumber(arr: any, field1: string, field2: string, value: number) {
  const data1 = arr.map((i: any) => i[field1]);
  if (data1.length === 0) {
    return undefined; // Manejar el caso de un array vacío
  }

  const data2 = arr.map((i: any) => i[field2]);
  if (data2.length === 0) {
    return undefined; // Manejar el caso de un array vacío
  }

  let bigNumber1 = data1[0]; // Suponemos que el primer elemento es el mayor
  let bigNumber2 = data2[0]; // Suponemos que el primer elemento es el mayor

  for (let i = 1; i < data1.length; i++) {
    if (data1[i] > bigNumber1) {
      bigNumber1 = data1[i]; // Si encontramos un número mayor, lo asignamos como el nuevo número mayor
    }
  }
  for (let i = 1; i < data2.length; i++) {
    if (data2[i] > bigNumber2) {
      bigNumber2 = data2[i]; // Si encontramos un número mayor, lo asignamos como el nuevo número mayor
    }
  }

  if (bigNumber1 > bigNumber2) {
    return (value * 100) / bigNumber1;
  } else {
    return (value * 100) / bigNumber2;
  }
}
