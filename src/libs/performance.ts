export const performance = (budget: number, revenue: number) => {
  return ((revenue - budget) / budget) * 100;
};
