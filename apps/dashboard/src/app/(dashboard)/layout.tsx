"use client";
import { Header } from "@/components/layouts/header";
import { TenantProvider } from "@/components/providers/tenant-provider";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useBreakpoint from "@/hooks/use-breakpoint";
import useTenant from "@/hooks/use-tenant";
import withProtectedRoute from "@/hooks/with-protected-route";
import withSubscriptionProtection from "@/hooks/with-subscription-protection";
import { THEME_BUTTON_VISIBLE_BREAKPOINTS } from "@/lib/feature-display-config";
import { ExternalLink, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <TenantProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className=' w-full flex flex-col  h-dvh box-border'>
          <div className='m-2  bg-background shadow-xl rounded-xl flex flex-1 flex-col overflow-hidden'>
            <Header />
            <Separator />
            <main className='flex-1 flex w-full overflow-y-auto'>
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TenantProvider>
  );
}

export default withProtectedRoute(withSubscriptionProtection(DashboardLayout));
