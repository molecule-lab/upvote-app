import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getRoadmap = async (params) => {
  const data = await request({ method: "GET", url: "/public/roadmap", params });

  const response = data.data.data.roadmap;

  if (!response.find((status) => status.status === "in-review")) {
    response.push({ status: "in-review", priority: 1, items: [] });
  }

  if (!response.find((status) => status.status === "in-progress")) {
    response.push({ status: "in-progress", priority: 2, items: [] });
  }

  if (!response.find((status) => status.status === "completed")) {
    response.push({ status: "completed", priority: 3, items: [] });
  }

  return data.data.data.roadmap;
};

const useQueryGetRoadmap = (enabled: boolean, params) =>
  useQuery({
    queryKey: ["roadmap", params],
    queryFn: () => getRoadmap(params),
    enabled,
  });

export { useQueryGetRoadmap };
