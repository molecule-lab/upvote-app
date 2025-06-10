import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const createTenant = async (data) => {
  const slug = data.data.slug;

  await request({
    url: "/dashboard/tenant/check-slug",
    method: "POST",
    data: { slug: slug },
  });

  await request({
    url: `/admin/tenant`,
    method: "POST",
    data: data.data,
  });
};

const useMutationCreateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createTenant(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["system-user"],
        refetchType: "active",
      }),
  });
};

export { useMutationCreateTenant };
