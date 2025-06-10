import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getChangelog = async (filter) => {
  const data = await request({
    method: "GET",
    url: "/dashboard/changelog",
    params: filter,
  });

  return data.data.data;
};

const useQueryGetChangelog = (enabled: boolean, filter) =>
  useQuery({
    queryKey: ["changelog", filter],
    queryFn: () => getChangelog(filter),
    enabled,
  });

export { useQueryGetChangelog };
