"use client";
import { TenantProvider } from "@/components/providers/tenant-provider";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useBreakpoint from "@/hooks/use-breakpoint";
import withProtectedRoute from "@/hooks/with-protected-route";
import { THEME_BUTTON_VISIBLE_BREAKPOINTS } from "@/lib/feature-display-config";
import { ExternalLink, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const PATH_PAGE_NAME_MAP = {
  "/": "Dashboard",
  "/feedback": "Feedback",
  "/users": "Users",
  "/customization": "Customization",
  "/roadmap": "Roadmap",
  "/changelog": "Changelog",
};

function DashboardLayout({ children }) {
  const pathname = usePathname();
  const breakpoint = useBreakpoint();
  const { theme, setTheme } = useTheme();
  const onThemeChangeHandler = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <TenantProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className=' w-full flex flex-col  h-dvh box-border'>
          <div className='m-2  bg-background shadow-xl rounded-xl flex flex-1 flex-col overflow-hidden'>
            <div className='px-6 py-2 flex items-center gap-2 justify-between'>
              <div className='flex items-center gap-2'>
                <SidebarTrigger />{" "}
                <div className='h-5'>
                  <Separator orientation='vertical' />
                </div>{" "}
                {PATH_PAGE_NAME_MAP[pathname]}
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  className='cursor-pointer'
                >
                  <ExternalLink />
                </Button>
                {!THEME_BUTTON_VISIBLE_BREAKPOINTS[breakpoint] && (
                  <Button
                    onClick={onThemeChangeHandler}
                    variant='outline'
                    size='icon'
                    className='cursor-pointer'
                  >
                    {theme === "light" ? <Moon /> : <Sun />}
                  </Button>
                )}
              </div>
            </div>
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

export default withProtectedRoute(DashboardLayout);
