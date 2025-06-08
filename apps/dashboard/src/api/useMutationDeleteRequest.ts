import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const deleteRequest = async (data) => {
  await request({
    url: `/dashboard/feedback/${data.id}`,
    method: "DELETE",
  });
};

const useMutationDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => deleteRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
        refetchType: "active",
      });

      queryClient.invalidateQueries({
        queryKey: ["feedback"],
        refetchType: "active",
      });
    },
  });
};

export { useMutationDeleteRequest };
