import { useMutation } from "@tanstack/react-query";
import { request } from "./axios-instance";

const createRequest = async (data) => {
  const response = await request({
    method: "POST",
    url: "/widget/feedback",
    data: data.data,
  });

  return response.data.data;
};

const useMutationCreateRequest = () => {
  return useMutation({
    mutationFn: (data) => createRequest(data),
  });
};

export { useMutationCreateRequest };
