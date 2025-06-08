import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";
import { AxiosRequestHeaders } from "axios";

const updateChangeLog = async (data) => {
  await request({
    url: `/dashboard/changelog/${data.changeLogId}`,
    method: "PATCH",
    data: data.data,
  });
};

const useMutationUpdateChangeLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateChangeLog(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["changelog"],
        refetchType: "active",
      }),
  });
};

export { useMutationUpdateChangeLog };
