export const RupiahFormater = (value: number) => {
  return "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const fmt = (n?: number) =>
  `Rp ${(n ?? 0).toLocaleString("id-ID")}`;