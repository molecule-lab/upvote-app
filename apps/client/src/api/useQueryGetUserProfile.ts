import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getUserProfile = async () => {
  const data = await request({ method: "GET", url: "/public/user/profile" });

  return data.data.data;
};

const useQueryGetUserProfile = (enabled: boolean) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfile(),
    enabled,
  });

export { useQueryGetUserProfile };
