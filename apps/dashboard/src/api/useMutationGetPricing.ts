import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./axios-instance";

const getPricing = async (data) => {
  const response = await request({
    method: "GET",
    url: "/admin/payment/options",
    params: data.params,
  });

  return response.data.data.priceItem;
};

const useMutationGetPricing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => getPricing(data),
    onSuccess: () => {},
  });
};

export { useMutationGetPricing };
