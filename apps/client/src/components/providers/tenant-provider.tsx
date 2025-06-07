"use client";
import { setCurrentTenantId } from "@/api/axios-instance";
import { useQueryGetTenant } from "@/api/useQueryGetTenant";
import TenantContext from "@/components/contexts/tenant-context";
import { useEffect, useMemo, useState } from "react";

const TenantProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [tenantSlug, setTenantSlug] = useState(null);
  const [tenant, setTenant] = useState(null);

  const {
    data: tenantData,
    error,
    isSuccess,
  } = useQueryGetTenant(Boolean(tenantSlug), {
    slug: tenantSlug,
  });

  useEffect(() => {
    const hostname = window.location.hostname;
    const hostParts = hostname.split(".");

    // Only set tenantSlug if we have a subdomain (more than just base domain)
    if (hostParts.length > 1) {
      const subdomain = hostParts[0];
      setTenantSlug(subdomain);
    } else {
      setTenantSlug(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(error, isSuccess);
    if (isSuccess) {
      setTenant(tenantData);
      setLoading(false);
      setCurrentTenantId(tenantData.id);
    }
    if (error) {
      setTenant(null);
      setLoading(false);
    }
  }, [error, isSuccess]);

  const value = useMemo(
    () => ({ tenantSlug, loading, tenant }),
    [tenantSlug, loading, tenant]
  );

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
};

export { TenantProvider };
