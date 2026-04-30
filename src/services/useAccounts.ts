import { useQuery } from "@tanstack/react-query";
import { getAccount } from "./account";

export const useAccount = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => getAccount(),
  });
};