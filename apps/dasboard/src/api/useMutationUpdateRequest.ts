import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const updateRequest = async (data) => {
  await request({
    url: `/dashboard/feedback/${data.id}`,
    method: "PATCH",
    data: data.data,
  });
};

const useMutationUpdateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateRequest(data),
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

export { useMutationUpdateRequest };
