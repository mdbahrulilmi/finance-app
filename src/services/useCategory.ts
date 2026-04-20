import { useQuery } from "@tanstack/react-query";
import { getCategory } from "./category";

export const useCategory = (type: "income" | "expense") => {
  return useQuery({
    queryKey: ["categories", type],
    queryFn: () => getCategory(type),
  });
};