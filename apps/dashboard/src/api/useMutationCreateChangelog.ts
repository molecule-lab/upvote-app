import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const createChangeLog = async (data) => {
  await request({
    url: `/dashboard/changelog`,
    method: "POST",
    data: data.data,
  });
};

const useMutationCreateChangeLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createChangeLog(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["changelog"],
        refetchType: "active",
      }),
  });
};

export { useMutationCreateChangeLog };
