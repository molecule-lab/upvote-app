import { useEffect, useMemo, useState } from "react";
import TenantContext from "../contexts/tenant-context";
import { setCurrentTenantId } from "@/api/axios-instance";
import { useQueryClient } from "@tanstack/react-query";

const TenantProvider = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentTenant?.tenant?.id) {
      setCurrentTenantId(currentTenant?.tenant?.id);
      queryClient.invalidateQueries();
    } else {
      setCurrentTenantId(null);
    }
  }, [currentTenant]);

  const value = useMemo(
    () => ({ currentTenant, setCurrentTenant }),
    [currentTenant, setCurrentTenant]
  );

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
};

export { TenantProvider };
