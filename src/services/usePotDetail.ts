import { useQuery } from "@tanstack/react-query";
import { getPotDetail } from "./pot";

export const usePotDetail = (id: string) => {
  return useQuery({
    queryKey: ["pot-detail", id],
    queryFn: () => getPotDetail(id),
    enabled: !!id,
  });
};