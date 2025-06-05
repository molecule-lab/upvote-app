import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";
import { AxiosRequestHeaders } from "axios";

const updateTenant = async (data) => {
  const slug = data.data.get("slug");

  if (slug !== data.currentSlug) {
    await request({
      url: "/dashboard/tenant/check-slug",
      method: "POST",
      data: { slug: slug },
    });
  }

  await request({
    url: `/dashboard/tenant`,
    method: "PATCH",
    data: data.data,
  });
};

const useMutationUpdateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateTenant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["system-user"],
        refetchType: "active",
      });
    },
  });
};

export { useMutationUpdateTenant };
