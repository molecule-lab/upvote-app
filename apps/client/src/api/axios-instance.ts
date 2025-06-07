import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";
import app from "@/lib/firebase";

export const getBaseURL = () => {
  if (typeof window !== "undefined") {
    const { hostname } = window.location;

    if (hostname.includes("localhost")) {
      return "http://localhost:3001/api/v1";
    }
  }

  return "http://localhost:3001/api/v1";
};

type RequestOptions<TData = unknown, TParams = Record<string, unknown>> = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
  url: string;
  headers?: AxiosRequestHeaders;
  data?: TData;
  params?: TParams | null;
};

const auth = getAuth(app);

let currentTenantId: string | null = null;

// Function to set tenant ID (called from TenantProvider)
export const setCurrentTenantId = (tenantId: string | null) => {
  currentTenantId = tenantId;
};

const requestInstance = axios.create({
  baseURL: getBaseURL(),
  responseType: "json",
  headers: {},
  timeout: 60000,
});

requestInstance.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (currentTenantId) {
    config.headers["x-tenant-id"] = currentTenantId;
    // Alternative: Add to query params
    // config.params = { ...config.params, tenantId: currentTenantId };
  }

  return config;
});

const request = function <T = any>({
  method,
  url,
  headers,
  data = undefined,
  params = null,
}: RequestOptions): Promise<AxiosResponse<T>> {
  const payload = {
    method,
    url,
    headers: {
      ...(headers || {}),
    },
    params,
    data,
  };

  return requestInstance(payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.error.message);

      return Promise.reject(new Error(error.toString()));
    });
};

export { request };
