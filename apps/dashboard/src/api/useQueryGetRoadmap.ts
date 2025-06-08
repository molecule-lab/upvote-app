import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getRoadmap = async () => {
  const data = await request({
    method: "GET",
    url: "/dashboard/roadmap",
  });

  return data.data.data;
};

const useQueryGetRoadmap = (enabled: boolean) =>
  useQuery({
    queryKey: ["roadmap"],
    queryFn: () => getRoadmap(),
    enabled,
  });

export { useQueryGetRoadmap };
