import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const updateRequest = async (data) => {
  const response = await request({
    method: "PATCH",
    url: `/public/feedback/${data.requestId}`,
    data: data.data,
  });

  return response.data.data;
};

const useMutationUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedback"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["profile"],
        refetchType: "active",
      });
    },
  });
};

export { useMutationUpdatePost };
