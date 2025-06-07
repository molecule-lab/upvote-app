import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const createPost = async (data) => {
  const response = await request({
    method: "POST",
    url: "/public/feedback",
    data: data.data,
  });

  return response.data.data;
};

const useMutationCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createPost(data),
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

export { useMutationCreatePost };
