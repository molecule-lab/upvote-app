import { useQuery } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getFeedback = async (filter: any) => {
  const data = await request({
    method: "GET",
    url: "/public/feedback",
    params: filter,
  });

  return data.data.data.feedback;
};

const useQueryGetFeedback = (filter: any, enabled: boolean) =>
  useQuery({
    queryKey: ["feedback", filter],
    queryFn: () => getFeedback(filter),
    enabled,
  });

export { useQueryGetFeedback };
