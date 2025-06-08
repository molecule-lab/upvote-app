import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getDashboard = async () => {
  const data = await request({ method: "GET", url: "/dashboard" });

  return data.data.data;
};

const useQueryGetDashboard = (enabled: boolean) =>
  useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    enabled,
  });

export { useQueryGetDashboard };
