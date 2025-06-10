"use client";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";
import useAuth from "./use-auth";
import FullScreenLoader from "@/components/ui/full-screen-loader";

const withProtectedRoute = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return function ProtectedComponent(props: P) {
    const { firebaseUser, loading, systemUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
      console.log(loading, firebaseUser);
      if (!loading && !firebaseUser) {
        router.replace("/sign-up");
      }
    }, [firebaseUser, loading, router]);

    if (loading) {
      return <FullScreenLoader />;
    }

    if (!systemUser) {
      return <FullScreenLoader />;
    }

    if (!firebaseUser) {
      return <FullScreenLoader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;
