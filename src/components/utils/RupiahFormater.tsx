export const RupiahFormater = (value: number) => {
  return "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};