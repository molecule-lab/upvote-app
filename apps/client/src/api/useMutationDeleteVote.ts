import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const deleteVote = async (data) => {
  const response = await request({
    method: "DELETE",
    url: "/public/vote",
    data: data.data,
  });

  return response.data.data;
};

const useMutationDeleteVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteVote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedback"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["profile"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["roadmap"],
        refetchType: "active",
      });
    },
  });
};

export { useMutationDeleteVote };
