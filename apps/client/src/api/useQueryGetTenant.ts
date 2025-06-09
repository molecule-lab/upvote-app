import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getTenant = async (params) => {
  const data = await request({ method: "GET", url: "/public/tenant", params });

  return data.data.data.tenant;
};

const useQueryGetTenant = (enabled: boolean, params) =>
  useQuery({
    queryKey: ["tenant", params],
    queryFn: () => getTenant(params),
    enabled,
    retry: false,
  });

export { useQueryGetTenant };
