import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getUser = async () => {
  const data = await request({ method: "GET", url: "/admin/user" });

  return data.data.data.user;
};

const useQueryGetUser = (enabled: boolean) =>
  useQuery({
    queryKey: ["system-user"],
    queryFn: getUser,
    enabled,
  });

export { useQueryGetUser };
