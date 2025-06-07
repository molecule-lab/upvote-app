import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getChangelog = async (params) => {
  const data = await request({
    method: "GET",
    url: "/public/changelog",
    params,
  });

  return data.data.data.changelog;
};

const useQueryGetChangelog = (enabled: boolean, params) =>
  useQuery({
    queryKey: ["changelog", params],
    queryFn: () => getChangelog(params),
    enabled,
  });

export { useQueryGetChangelog };
