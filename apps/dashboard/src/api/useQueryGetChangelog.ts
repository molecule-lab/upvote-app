import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getChangelog = async () => {
  const data = await request({
    method: "GET",
    url: "/dashboard/changelog",
  });

  return data.data.data;
};

const useQueryGetChangelog = (enabled: boolean) =>
  useQuery({
    queryKey: ["changelog"],
    queryFn: () => getChangelog(),
    enabled,
  });

export { useQueryGetChangelog };
