import { Request } from "express";
const checkApp = (
  req: Request
): "dashboard" | "client" | "admin" | undefined => {
  if (req.baseUrl.startsWith("/api/v1/dashboard")) {
    return "dashboard";
  }
  if (req.baseUrl.startsWith("/api/v1/public")) {
    return "client";
  }

  if (req.baseUrl.startsWith("/api/v1/admin")) {
    return "admin";
  }
};
export { checkApp };
