import axios from "axios";

export const getBaseURL = () => {
  return "http://localhost:3001/api/v1";
};

let currentTenantId = null;

// Function to set tenant ID (called from TenantProvider)
export const setCurrentTenantId = (tenantId) => {
  currentTenantId = tenantId;
};

const requestInstance = axios.create({
  baseURL: getBaseURL(),
  responseType: "json",
  headers: {},
  timeout: 60000,
});

requestInstance.interceptors.request.use(async (config) => {
  if (currentTenantId) {
    config.headers["x-tenant-id"] = currentTenantId;
    // Alternative: Add to query params
    // config.params = { ...config.params, tenantId: currentTenantId };
  }

  return config;
});

const request = function ({
  method,
  url,
  headers,
  data = undefined,
  params = null,
}) {
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
      return Promise.reject(new Error(error.toString()));
    });
};

export { request };
