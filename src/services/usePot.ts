import { useQuery } from "@tanstack/react-query";
import { getPots } from "./pot";

export const usePots = () => {
  return useQuery<any[]>({
    queryKey: ["pots"],
    queryFn: getPots,
  });
};