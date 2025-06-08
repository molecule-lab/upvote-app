import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getUsers = async () => {
  const data = await request({
    method: "GET",
    url: "/dashboard/users",
  });

  return data.data.data;
};

const useQueryGetUsers = (enabled: boolean) =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    enabled,
  });

export { useQueryGetUsers };
