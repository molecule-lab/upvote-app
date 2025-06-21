import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getTenant = async (params) => {
  const data = await request({ method: "GET", url: "/widget/tenant", params });

  return data.data.data.tenant;
};

const useQueryGetTenant = (params) =>
  useQuery({
    queryKey: ["tenant", params],
    queryFn: () => getTenant(params),
    enabled: Boolean(params.tenantId),
    retry: false,
  });

export { useQueryGetTenant };
