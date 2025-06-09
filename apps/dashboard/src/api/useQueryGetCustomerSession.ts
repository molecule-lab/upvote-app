import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getCustomerSession = async () => {
  const response = await request({
    method: "GET",
    url: "/admin/payment/session",
  });

  return response.data.data.session;
};

const useMutationGetCustomerSession = () => {
  return useMutation({
    mutationFn: () => getCustomerSession(),
  });
};

export { useMutationGetCustomerSession };
