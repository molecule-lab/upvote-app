import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getRoadmap = async (params) => {
  const data = await request({ method: "GET", url: "/public/roadmap", params });

  return data.data.data.roadmap;
};

const useQueryGetRoadmap = (enabled: boolean, params) =>
  useQuery({
    queryKey: ["roadmap", params],
    queryFn: () => getRoadmap(params),
    enabled,
  });

export { useQueryGetRoadmap };
