import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "./transaction";
import type { Transaction } from "@/types/Transaction";

export const useTransaction = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: () => getTransaction({}),
  });
};