import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const addVote = async (data) => {
  const response = await request({
    method: "POST",
    url: "/public/vote",
    data: data.data,
  });

  return response.data.data;
};

const useMutationAddVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addVote(data),
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

export { useMutationAddVote };
