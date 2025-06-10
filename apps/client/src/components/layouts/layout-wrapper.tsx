"use client";
import useTenant from "@/hooks/use-tenant";
import { Header } from "./header";
import SiteNotFound from "./site-not-found";
import { Logo } from "../icons/Logo";

const LayoutWrapper = ({ children }) => {
  const { tenant, loading } = useTenant();

  if (loading) {
    return (
      <div className='h-full w-full flex items-center justify-center'>
        <Logo />
      </div>
    );
  }

  if (!tenant) {
    return <SiteNotFound />;
  }

  return (
    <>
      <Header />
      <main className='flex-1 flex w-full overflow-y-auto items-center justify-center'>
        <div className='w-[95%] max-w-[1000px] h-full flex items-center'>
          {children}
        </div>
      </main>
    </>
  );
};
export { LayoutWrapper };
