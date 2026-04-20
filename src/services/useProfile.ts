import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "./profile";

export const useProfile = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const mutation = useMutation({
    mutationFn: updateProfile,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["profile"] });

      const previous = queryClient.getQueryData(["profile"]);

      queryClient.setQueryData(["profile"], (old: any) => ({
        ...old,
        ...newData,
      }));

      return { previous };
    },

    onError: (context) => {
      // rollback kalau gagal
      queryClient.setQueryData(["profile"], context);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return {
    ...query,
    updateProfile: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};