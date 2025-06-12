import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getRoadmap = async () => {
  const data = await request({
    method: "GET",
    url: "/dashboard/roadmap",
  });

  const response = data.data.data;

  if (!response.find((status) => status.status === "in-review")) {
    response.push({ status: "in-review", priority: 0, items: [] });
  }

  if (!response.find((status) => status.status === "in-progress")) {
    response.push({ status: "in-progress", priority: 1, items: [] });
  }

  if (!response.find((status) => status.status === "completed")) {
    response.push({ status: "completed", priority: 2, items: [] });
  }

  if (!response.find((status) => status.status === "declined")) {
    response.push({ status: "declined", priority: 3, items: [] });
  }

  return response;
};

const useQueryGetRoadmap = (enabled: boolean) =>
  useQuery({
    queryKey: ["roadmap"],
    queryFn: () => getRoadmap(),
    enabled,
  });

export { useQueryGetRoadmap };
