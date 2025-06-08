"use client";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";
import useAuth from "./use-auth";
import FullScreenLoader from "@/components/ui/full-screen-loader";

const withSubscriptionProtection = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return function SubscriptionProtectedComponent(props: P) {
    const { systemUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && systemUser) {
        const hasActiveSubscription = ["active", "trialing"].includes(
          systemUser?.subscription?.status
        );

        if (!hasActiveSubscription) {
          router.replace("/plans");
        }
      }
    }, [systemUser, loading, router]);

    if (loading) {
      return <FullScreenLoader />;
    }

    if (!systemUser) {
      return <FullScreenLoader />;
    }

    const hasActiveSubscription = ["active", "trialing"].includes(
      systemUser?.subscription?.status
    );

    if (!hasActiveSubscription) {
      return <FullScreenLoader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withSubscriptionProtection;
