import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPotMembers } from "./potMember";

export const usePotMembers = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ["pot-members", id],
    queryFn: () => getPotMembers(id!),
    enabled: !!id,
  });
};