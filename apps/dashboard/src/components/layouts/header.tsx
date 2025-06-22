import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { ExternalLink, Moon, Sun } from "lucide-react";
import useTenant from "@/hooks/use-tenant";
import { THEME_BUTTON_VISIBLE_BREAKPOINTS } from "@/lib/feature-display-config";
import useBreakpoint from "@/hooks/use-breakpoint";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useEffect } from "react";
const PATH_PAGE_NAME_MAP: Record<string, { name: string; subtitle: string }> = {
  "/": { name: "Dashboard", subtitle: "Overview of your project metrics" },
  "/feedback": {
    name: "Feedback",
    subtitle: "Manage user feedback and requests",
  },
  "/users": { name: "Users", subtitle: "View and manage your users" },
  "/customization": {
    name: "Customization",
    subtitle: "Customize your project settings",
  },
  "/roadmap": {
    name: "Roadmap",
    subtitle: "Plan and track feature development",
  },
  "/changelog": {
    name: "Changelog",
    subtitle: "Document your project updates",
  },
  "/widget": {
    name: "Widget",
    subtitle: "",
  },
};
const Header = () => {
  const pathname = usePathname();
  const breakpoint = useBreakpoint();
  const { theme, setTheme } = useTheme();
  const { currentTenant: tenant } = useTenant();
  const onThemeChangeHandler = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const currentPage = PATH_PAGE_NAME_MAP[pathname] || {
    name: "Dashboard",
    subtitle: "",
  };

  return (
    <div className='px-6 py-2 flex items-center gap-2 justify-between'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger />{" "}
        <div className='h-5'>
          <Separator orientation='vertical' />
        </div>{" "}
        <div>
          <div>{currentPage.name}</div>
          {/* <div className='text-xs'>
        {currentPage.subtitle}
      </div> */}
        </div>
      </div>
      <div className='flex gap-2'>
        <Button
          variant='outline'
          size='icon'
          className='cursor-pointer'
          onClick={() =>
            window.open(`https://${tenant.tenant.slug}.aura.vote`, "_blank")
          }
        >
          <ExternalLink />
        </Button>
        {!THEME_BUTTON_VISIBLE_BREAKPOINTS[
          breakpoint as keyof typeof THEME_BUTTON_VISIBLE_BREAKPOINTS
        ] && (
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
  );
};

export { Header };
