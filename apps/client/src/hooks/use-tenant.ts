import TenantContext from "@/components/contexts/tenant-context";
import { useContext } from "react";

const useTenant = () => {
  return useContext(TenantContext);
};

export default useTenant;
